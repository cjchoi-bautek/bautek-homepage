// src/pages/components/RunningProjectsFromXLSX.jsx
import React, { useEffect, useMemo, useState, memo } from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import * as XLSX from "xlsx";
import L from "leaflet";

/** ---------- 튜닝 포인트(길이/기준) ---------- */
const KOREA_CENTER_LON = 127.8;
const CARD_OFFSET_PX   = 130;   // (데스크탑) 카드-마커 수평거리
const CONNECTOR_LEN_PX = 110;   // (데스크탑) 카드에서 마커로 나가는 선 길이
const DOT_OUT_PX       = CONNECTOR_LEN_PX + 10;
const MOBILE_STEM_PX   = 16;    // (모바일) 카드 아래 수직 스템 길이

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

/** 행 → 사이트 객체 매핑 */
function mapRowToSite(row, idx) {
  const lat = parseFloat(row.lat ?? row.Lat ?? row.위도);
  const lng = parseFloat(row.lng ?? row.Lng ?? row.Long ?? row.경도);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;

  return {
    id: row.id || row.ID || `row-${idx}`,
    contractor: row.contractor ?? row.건설사 ?? "",
    contractorLogo: row.contractorLogo ?? row.로고 ?? "",
    name: row.name ?? row.현장명 ?? "",
    units: Number(row.units ?? row.세대수 ?? 0),
    lat, lng,
  };
}

function RunningProjectsFromXLSX({
  src = "/data/sites.xlsx",   // public/data/sites.xlsx
  sheetName,
  height = "70vh",
  title = "진행 현장",
  lockZoom = false,
  lockDrag = false,
  fullBleed = false,
  mapBg = "transparent",
  note = "※ 25년 8월 기준",
}) {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // ✅ 반응형(모바일/데스크탑) 감지: 폭 기준
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // 엑셀 로드
  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        setErr("");
        const res = await fetch(src);
        if (!res.ok) throw new Error(`엑셀 파일을 불러오지 못했습니다: ${res.status}`);
        const buf = await res.arrayBuffer();
        const wb  = XLSX.read(buf);
        const ws  = sheetName ? wb.Sheets[sheetName] : wb.Sheets[wb.SheetNames[0]];
        if (!ws) throw new Error("시트를 찾을 수 없습니다.");

        const rows = XLSX.utils.sheet_to_json(ws, { defval: "" });
        const parsed = rows.map((row, i) => mapRowToSite(row, i)).filter(Boolean);
        if (mounted) setSites(parsed);
      } catch (e) {
        console.error(e);
        if (mounted) setErr(e.message || "엑셀 파싱 중 오류");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, [src, sheetName]);

  const center = useMemo(() => [36.5, 127.8], []);
  const koreaBounds = useMemo(
    () => L.latLngBounds([[31.0, 121.0], [41.5, 134.5]]),
    []
  );

  return (
    <section id="running-projects" className="bg-white">
      {/* ⬇️ 전체 섹션을 살짝 위로 당김(-mt) — 필요 없으면 제거 */}
      <div className={`${fullBleed ? "max-w-none px-0" : "max-w-6xl px-4"} mx-auto pt-3 md:pt-4 pb-10 md:pb-12 -mt-6 md:-mt-10`}>
        <h2
          className="text-2xl md:text-3xl font-extrabold text-[#004A91] text-center animate-fadeDown mb-5 md:mb-6"
          style={{ letterSpacing: "-0.02em" }}
        >
          {title}
        </h2>

        {loading && <div className="text-center text-gray-500 py-8">현장 데이터를 불러오는 중…</div>}
        {err && <div className="text-center text-red-600 py-4">오류: {err}</div>}

        {!loading && !err && (
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
              style={{ height: "100%", width: "100%", background: mapBg, borderRadius: 14 }}
              className="shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* 라벨 없는 타일로 지명 제거 */}
              <TileLayer
                attribution="&copy; OpenStreetMap & CARTO"
                url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
              />

              <MarkerClusterGroup
                chunkedLoading
                iconCreateFunction={createClusterCustomIcon}
                showCoverageOnHover={false}
                spiderfyOnEveryZoom={false}
                // disableClusteringAtZoom={9} // 필요하면 주석 해제
              >
                {sites.map((s) => {
                  const side = s.lng < KOREA_CENTER_LON ? "left" : "right";
                  const offset = side === "right" ? [CARD_OFFSET_PX, -10] : [-CARD_OFFSET_PX, -10];
                  const sideClass = side === "right" ? "side-card--right" : "side-card--left";

                  // ⬇️ 모바일/데스크탑 툴팁 설정 분기
                  const tooltipProps = isMobile
                    ? {
                        interactive: true,
                        direction: "top",
                        offset: [0, -18],
                        opacity: 1,
                        className: "mobile-card",
                      }
                    : {
                        interactive: true,
                        direction: side,
                        offset,
                        opacity: 1,
                        className: `side-card ${sideClass}`,
                      };

                  // ⬇️ 카드 내용 공통 DOM
                  const CardInner = (
                    <div className="card animate-cardIn hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-200">
                      {/* 데스크탑: 수평 연결선 + 점 / 모바일: 수직 스템 */}
                      {!isMobile ? (
                        <>
                          <div className="connector" />
                          <div className="dot" />
                        </>
                      ) : (
                        <div className="m-stem" />
                      )}

                      <div className="card-body">
                        {s.contractorLogo ? (
                          <img src={s.contractorLogo} alt={s.contractor} className="h-5 mb-2" />
                        ) : (
                          <div className="font-semibold mb-1">{s.contractor}</div>
                        )}
                        <div className="font-bold">{s.name}</div>
                        <div className="text-gray-600 text-sm">
                          세대수: {Number(s.units).toLocaleString()}세대
                        </div>
                      </div>
                    </div>
                  );

                  return (
                    <Marker
                      key={s.id}
                      position={[s.lat, s.lng]}
                      eventHandlers={
                        isMobile
                          ? { click: (e) => e.target.openTooltip() } // 모바일: 탭하면 위로 표시
                          : {
                              mouseover: (e) => e.target.openTooltip(),
                              mouseout: (e) => e.target.closeTooltip(),
                            }
                      }
                    >
                      <Tooltip {...tooltipProps}>{CardInner}</Tooltip>
                    </Marker>
                  );
                })}
              </MarkerClusterGroup>
            </MapContainer>

            <div className="mt-2 text-right text-[11px] md:text-xs text-gray-500 select-none">
              {note}
            </div>

            {/* 스타일(애니메이션/카드/연결선/클러스터) */}
            <style>{`
              /* 타이틀 페이드+슬라이드 다운 */
              @keyframes fadeDown {
                from { opacity: 0; transform: translateY(-6px); }
                to   { opacity: 1; transform: translateY(0); }
              }
              .animate-fadeDown { animation: fadeDown .45s ease-out both; }

              /* 카드 등장 */
              @keyframes cardIn {
                from { opacity: 0; transform: translateY(4px); }
                to   { opacity: 1; transform: translateY(0); }
              }
              .animate-cardIn { animation: cardIn .25s ease-out both; }

              /* 클러스터 뱃지 */
              .cluster-icon { background: transparent; }
              .cluster-badge {
                display: grid; place-items: center;
                width: 100%; height: 100%;
                border-radius: 9999px;
                background: rgba(0,74,145,0.9);
                color: #fff; font-weight: 700; font-size: 12px;
                box-shadow: 0 2px 6px rgba(0,0,0,.25);
                border: 2px solid #fff;
              }

              /* 공통: Leaflet 툴팁 컨테이너 베이스 */
              .leaflet-tooltip.side-card,
              .leaflet-tooltip.mobile-card {
                background: transparent;
                border: none;
                box-shadow: none;
                padding: 0;
                white-space: normal;
                overflow: visible;
              }

              /* ---------------- 데스크탑 카드 ---------------- */
              .side-card .card {
                position: relative;
                background: #fff;
                border: 1px solid #e5e7eb;
                border-radius: 14px;
                padding: 14px 16px;
                min-width: 360px;
                max-width: 460px;
                box-shadow: 0 14px 28px rgba(0,0,0,.12);
              }
              .side-card .connector {
                position: absolute; top: 50%;
                width: ${CONNECTOR_LEN_PX}px; height: 2px;
                background: #004A91; transform: translateY(-50%);
              }
              .side-card--right .connector { left: -${CONNECTOR_LEN_PX}px; }
              .side-card--left  .connector { right: -${CONNECTOR_LEN_PX}px; }
              .side-card .dot {
                position: absolute; top: 50%;
                width: 10px; height: 10px; border-radius: 9999px;
                background: #004A91; transform: translateY(-50%);
                box-shadow: 0 0 0 2px #fff;
              }
              .side-card--right .dot { left: -${DOT_OUT_PX}px; }
              .side-card--left  .dot { right: -${DOT_OUT_PX}px; }

              /* ---------------- 모바일 카드(위쪽) ---------------- */
              .mobile-card .card {
                position: relative;
                background: #fff;
                border: 1px solid #e5e7eb;
                border-radius: 12px;
                padding: 12px 14px;
                min-width: 240px;
                max-width: 280px;
                box-shadow: 0 10px 20px rgba(0,0,0,.10);
              }
              /* 수직 스템: 카드 아래에서 마커 쪽으로 */
              .mobile-card .m-stem {
                position: absolute;
                left: 50%;
                bottom: -${MOBILE_STEM_PX}px;
                width: 2px; height: ${MOBILE_STEM_PX}px;
                background: #004A91;
                transform: translateX(-50%);
                border-radius: 2px;
              }
            `}</style>
          </div>
        )}
      </div>
    </section>
  );
}

export default memo(RunningProjectsFromXLSX);
