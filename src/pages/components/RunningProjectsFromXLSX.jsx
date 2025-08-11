// src/pages/components/RunningProjectsFromXLSX.jsx
import React, { useEffect, useMemo, useState, memo } from "react";
import { MapContainer, TileLayer, Marker, Tooltip, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import * as XLSX from "xlsx";
import L from "leaflet";

/** ---------- 튜닝 포인트(길이/기준) ---------- */
const KOREA_CENTER_LON = 127.8;
const CARD_OFFSET_PX   = 110;
const CONNECTOR_LEN_PX = 90;
const DOT_OUT_PX       = CONNECTOR_LEN_PX + 10;

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
    lat, lng
  };
}

function RunningProjectsFromXLSX({
  src = "/data/sites.xlsx",   // public/data/sites.xlsx
  sheetName,                  // 지정 안 하면 첫 번째 시트
  height = "70vh",
  title = "진행 현장",
  lockZoom = false,
  lockDrag = false,
  fullBleed = false,
  mapBg = "transparent",
}) {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

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
        const parsed = rows
          .map((row, i) => mapRowToSite(row, i))
          .filter(Boolean);

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
      <div className={`${fullBleed ? "max-w-none px-0" : "max-w-6xl px-4"} mx-auto py-10 md:py-16`}>
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#004A91] mb-2 text-center">
          {title}
        </h2>

        {loading && (
          <div className="text-center text-gray-500 py-8">현장 데이터를 불러오는 중…</div>
        )}
        {err && (
          <div className="text-center text-red-600 py-4">오류: {err}</div>
        )}

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
              style={{ height: "100%", width: "100%", background: mapBg }}
            >
              <TileLayer
                attribution="&copy; OpenStreetMap & CARTO"
                url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
              />

              <MarkerClusterGroup
                chunkedLoading
                iconCreateFunction={createClusterCustomIcon}
                showCoverageOnHover={false}
                spiderfyOnEveryZoom={false}
                // 줌 조금만 올려도 개별 마커로 보고 싶다면:
                // disableClusteringAtZoom={9}
              >
                {sites.map((s) => {
                  const side = s.lng < KOREA_CENTER_LON ? "left" : "right";
                  const offset = side === "right" ? [CARD_OFFSET_PX, -10] : [-CARD_OFFSET_PX, -10];
                  const sideClass = side === "right" ? "side-card--right" : "side-card--left";

                  return (
                    <Marker key={s.id} position={[s.lat, s.lng]}>
                      <Tooltip
                        direction={side}
                        offset={offset}
                        opacity={1}
                        className={`side-card ${sideClass}`}
                      >
                        <div className="card">
                          <div className="connector" />
                          <div className="dot" />
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
                      </Tooltip>

                      <Popup>
                        <div className="text-sm leading-tight">
                          {s.contractorLogo ? (
                            <img src={s.contractorLogo} alt={s.contractor} className="h-5 mb-2" />
                          ) : (
                            <div className="font-semibold mb-1">{s.contractor}</div>
                          )}
                          <div className="font-bold">{s.name}</div>
                          <div className="text-gray-600">
                            세대수: {Number(s.units).toLocaleString()}세대
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  );
                })}
              </MarkerClusterGroup>
            </MapContainer>

            {/* 스타일(카드/연결선/클러스터) */}
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
              .leaflet-tooltip.side-card { background: transparent; border: none; box-shadow: none; padding: 0; white-space: normal; }
              .side-card .card {
                position: relative;
                background: #fff;
                border: 1px solid #e5e7eb;
                border-radius: 14px;
                padding: 14px 16px;
                min-width: 340px;
                max-width: 420px;
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
        )}
      </div>
    </section>
  );
}

export default memo(RunningProjectsFromXLSX);
