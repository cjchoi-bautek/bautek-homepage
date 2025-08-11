// src/pages/components/RunningProjectsSection.jsx
import React, { memo, useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Tooltip, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";

/** ---------- 카드/연결선 튜닝 포인트 ---------- */
const KOREA_CENTER_LON = 127.8; // 중앙 경도
const CARD_OFFSET_PX   = 140;   // 마커 ↔ 카드 수평 간격(px)
const CONNECTOR_LEN_PX = 120;   // 카드에서 마커로 나가는 선 길이(px)
const DOT_OUT_PX       = CONNECTOR_LEN_PX + 10; // 점 위치(px)

/** 클러스터 뱃지 */
const createClusterCustomIcon = (cluster) => {
  const count = cluster.getChildCount();
  const size = count < 10 ? 30 : count < 50 ? 36 : 42;
  return L.divIcon({
    html: `<div class="cluster-badge">${count}</div>`,
    className: "cluster-icon",
    iconSize: L.point(size, size, true),
  });
};

/** 기본 샘플 (xlsxUrl 없고 sites prop도 비어있을 때 사용) */
const SAMPLE_SITES = [
  { id:'s1', contractor:'GS건설', contractorLogo:'/KeyClient/GS.png',  name:'송도 A단지', units:1243, lat:37.382, lng:126.643 },
  { id:'s2', contractor:'DL 이앤씨', contractorLogo:'/KeyClient/DLE&C.png', name:'대구 B단지', units:980,  lat:35.8714, lng:128.6014 },
];

function RunningProjectsSection({
  /** 데이터 */
  sites = [],
  xlsxUrl,                 // public 경로의 엑셀 파일 URL (예: "/data/sites.xlsx")

  /** UI 옵션 */
  title = "진행 현장",
  height = "70vh",
  mapBg = "transparent",
  fullBleed = false,

  /** 인터랙션 잠금 */
  lockZoom = false,
  lockDrag = false,
}) {
  /** xlsx 로드용 상태 */
  const [xlsxSites, setXlsxSites] = useState(null);
  const [xlsxError, setXlsxError] = useState(null);

  /** Excel(xlsx) 자동 로드 */
  useEffect(() => {
    let cancelled = false;
    async function loadXlsx() {
      if (!xlsxUrl) return;
      try {
        const [{ read, utils }] = await Promise.all([
          import("xlsx"),
        ]);
        const resp = await fetch(xlsxUrl);
        if (!resp.ok) throw new Error(`엑셀 로드 실패: ${resp.status}`);
        const ab = await resp.arrayBuffer();
        const wb = read(ab, { type: "array" });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const rows = utils.sheet_to_json(ws, { defval: "" });

        // 기대 컬럼: contractor, contractorLogo, name, units, lat, lng
        const parsed = rows
          .map((r, i) => {
            const lat = Number(r.lat);
            const lng = Number(r.lng);
            const units = r.units !== "" ? Number(r.units) : "";
            return {
              id: r.id || `row_${i+1}`,
              contractor: r.contractor || "",
              contractorLogo: r.contractorLogo || "",
              name: r.name || "",
              units: Number.isFinite(units) ? units : "",
              lat,
              lng,
            };
          })
          .filter((r) => Number.isFinite(r.lat) && Number.isFinite(r.lng));
        if (!cancelled) setXlsxSites(parsed);
      } catch (err) {
        if (!cancelled) setXlsxError(err.message || "엑셀 파싱 중 오류");
      }
    }
    loadXlsx();
    return () => { cancelled = true; };
  }, [xlsxUrl]);

  /** 실제 렌더링에 쓸 데이터 선택 우선순위: xlsx → props.sites → SAMPLE */
  const data = useMemo(() => {
    if (xlsxSites && xlsxSites.length) return xlsxSites;
    if (sites && sites.length) return sites;
    return SAMPLE_SITES;
  }, [xlsxSites, sites]);

  /** 맵 기본 세팅 */
  const center = useMemo(() => [36.5, 127.8], []);
  const koreaBounds = useMemo(
    () => L.latLngBounds([[31.0, 121.0], [41.5, 134.5]]),
    []
  );

  return (
    <section id="running-projects" className="bg-white">
      <div className={`${fullBleed ? "max-w-none px-0" : "max-w-6xl px-4"} mx-auto py-10 md:py-16`}>
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#004A91] mb-2 text-center">
          {title}
        </h2>

        {/* xlsx 오류 메시지 (있을 때만) */}
        {xlsxError && (
          <p className="text-center text-sm text-red-600 mb-4">
            {xlsxError}
          </p>
        )}

        <div className="relative z-0 w-full" style={{ height }}>
          <MapContainer
            center={center}
            zoom={7}
            minZoom={lockZoom ? 7 : 7}
            maxZoom={lockZoom ? 7 : 12}
            scrollWheelZoom={!lockZoom}
            doubleClickZoom={!lockZoom}
            touchZoom={!lockZoom}
            boxZoom={!lockZoom}
            dragging={!lockDrag}
            zoomControl={!lockZoom}
            maxBounds={koreaBounds}
            maxBoundsViscosity={0.85}
            preferCanvas
            style={{ height: "100%", width: "100%", background: mapBg }}
          >
            {/* 라벨 없는 밝은 베이스맵 */}
            <TileLayer
              attribution="&copy; OpenStreetMap & CARTO"
              url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
            />

            <MarkerClusterGroup
              chunkedLoading
              iconCreateFunction={createClusterCustomIcon}
              showCoverageOnHover={false}
              spiderfyOnEveryZoom={false}
            >
              {data.map((s) => {
                const side = s.lng < KOREA_CENTER_LON ? "left" : "right";
                const offset = side === "right" ? [CARD_OFFSET_PX, -10] : [-CARD_OFFSET_PX, -10];
                const sideClass = side === "right" ? "side-card--right" : "side-card--left";

                return (
                  <Marker key={s.id} position={[s.lat, s.lng]}>
                    {/* 옆으로 길게 나오는 카드형 툴팁 */}
                    <Tooltip
                      direction={side}
                      offset={offset}
                      opacity={1}
                      className={`side-card ${sideClass}`}
                    >
                      <div className="card">
                        {/* 연결선 + 끝점(마커쪽) */}
                        <div className="connector" />
                        <div className="dot" />
                        <div className="card-body">
                          {s.contractorLogo ? (
                            <img src={s.contractorLogo} alt={s.contractor} className="h-5 mb-2" />
                          ) : (
                            <div className="font-semibold mb-1">{s.contractor}</div>
                          )}
                          <div className="font-bold">{s.name}</div>
                          {s.units !== "" && (
                            <div className="text-gray-600 text-sm">
                              세대수: {Number(s.units).toLocaleString()}세대
                            </div>
                          )}
                        </div>
                      </div>
                    </Tooltip>

                    {/* 클릭 팝업(선택) */}
                    <Popup>
                      <div className="text-sm leading-tight">
                        {s.contractorLogo ? (
                          <img src={s.contractorLogo} alt={s.contractor} className="h-5 mb-2" />
                        ) : (
                          <div className="font-semibold mb-1">{s.contractor}</div>
                        )}
                        <div className="font-bold">{s.name}</div>
                        {s.units !== "" && (
                          <div className="text-gray-600">
                            세대수: {Number(s.units).toLocaleString()}세대
                          </div>
                        )}
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
            </MarkerClusterGroup>
          </MapContainer>

          {/* 스타일(클러스터/카드/연결선) */}
          <style>{`
            .cluster-icon { background: transparent; }
            .cluster-badge {
              display: grid; place-items: center;
              width: 100%; height: 100%;
              border-radius: 9999px;
              background: rgba(0,74,145,0.9);
              color: #fff; font-weight: 700; font-size: 12px;
              box-shadow: 0 2px 6px rgba(0,0,0,0.25);
              border: 2px solid #fff;
            }

            .leaflet-tooltip.side-card {
              background: transparent;
              border: none;
              box-shadow: none;
              padding: 0;
              white-space: normal;
            }
            .side-card .card {
              position: relative;
              background: #fff;
              border: 1px solid #e5e7eb;
              border-radius: 14px;
              padding: 14px 16px;
              min-width: 360px;
              max-width: 460px;
              box-shadow: 0 14px 28px rgba(0,0,0,.14);
            }
            .side-card .connector {
              position: absolute;
              top: 50%;
              width: ${CONNECTOR_LEN_PX}px;
              height: 2px;
              background: #004A91;
              transform: translateY(-50%);
            }
            .side-card--right .connector { left: -${CONNECTOR_LEN_PX}px; }
            .side-card--left  .connector { right: -${CONNECTOR_LEN_PX}px; }

            .side-card .dot {
              position: absolute;
              top: 50%;
              width: 10px; height: 10px;
              border-radius: 9999px;
              background: #004A91;
              transform: translateY(-50%);
              box-shadow: 0 0 0 2px #fff;
            }
            .side-card--right .dot { left: -${DOT_OUT_PX}px; }
            .side-card--left  .dot { right: -${DOT_OUT_PX}px; }
          `}</style>
        </div>
      </div>
    </section>
  );
}

export default memo(RunningProjectsSection);
