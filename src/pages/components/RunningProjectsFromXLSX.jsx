// src/pages/components/RunningProjectsFromXLSX.jsx
import React, { useEffect, useMemo, useState, memo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  Pane,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import * as XLSX from "xlsx";
import L from "leaflet";
import { ChevronDown, ChevronUp } from "lucide-react"; // 아이콘 라이브러리 (npm install lucide-react)

/** ---------- 튜닝 포인트(길이/기준) ---------- */
const KOREA_CENTER_LON = 127.8;
const CARD_OFFSET_PX   = 130;   // 카드-마커 간격(조절 가능)
const CONNECTOR_LEN_PX = 110;   // 카드에서 마커로 나가는 선 길이
const DOT_OUT_PX       = CONNECTOR_LEN_PX + 10;

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
  src = "/data/sites.xlsx",
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
  const [showList, setShowList] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);

  const isMobile = useMemo(() => {
    if (typeof window === "undefined") return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }, []);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        setErr("");
        const res = await fetch(src);
        if (!res.ok) throw new Error(`엑셀 파일을 불러오지 못했습니다: ${res.status}`);
        const buf = await res.arrayBuffer();
        const wb  = XLSX.read(buf);
        const ws  = sheetName ? wb.Sheets[sheetName] : wb.Sheets[wb.SheetNames[0]];
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

  const allContractors = useMemo(() => {
    const contractors = [...new Set(sites.map(s => s.contractor))].filter(Boolean);
    return contractors.sort((a, b) => a.localeCompare(b));
  }, [sites]);

  const filteredSites = useMemo(() => {
    if (activeFilters.length === 0) return sites;
    return sites.filter(site => activeFilters.includes(site.contractor));
  }, [sites, activeFilters]);

  const handleFilterClick = (contractor) => {
    setActiveFilters(prevFilters =>
      prevFilters.includes(contractor)
        ? prevFilters.filter(f => f !== contractor)
        : [...prevFilters, contractor]
    );
  };

  const center = useMemo(() => [36.5, 127.8], []);
  const koreaBounds = useMemo(
    () => L.latLngBounds([[31.0, 121.0], [41.5, 134.5]]),
    []
  );

  return (
    <section id="running-projects" className="bg-white">
      <div className={`${fullBleed ? "max-w-none px-0" : "max-w-6xl px-4"} mx-auto pt-4 md:pt-6 pb-12 md:pb-16`}>
        <h2
          className="text-2xl md:text-3xl font-extrabold text-[#004A91] text-center animate-fadeDown mb-6 md:mb-10"
          style={{ letterSpacing: "-0.02em" }}
        >
          {title}
        </h2>
        {loading && (
          <div className="text-center text-gray-500 py-8">현장 데이터를 불러오는 중…</div>
        )}
        {err && (
          <div className="text-center text-red-600 py-4">오류: {err}</div>
        )}

        {!loading && !err && (
          <div className="relative z-0 w-full">
            {/* 필터링 기능 */}
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              <button
                onClick={() => setActiveFilters([])}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilters.length === 0
                    ? "bg-[#004A91] text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                전체 보기 ({sites.length})
              </button>
              {allContractors.map((contractor) => (
                <button
                  key={contractor}
                  onClick={() => handleFilterClick(contractor)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeFilters.includes(contractor)
                      ? "bg-[#004A91] text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {contractor} ({sites.filter(s => s.contractor === contractor).length})
                </button>
              ))}
            </div>

            <div className="relative" style={{ height }}>
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
                <TileLayer
                  attribution="&copy; OpenStreetMap & CARTO"
                  url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
                />
                <Pane name="card-tooltips" style={{ zIndex: 700, pointerEvents: "none", overflow: "visible" }} />
                <MarkerClusterGroup
                  chunkedLoading
                  iconCreateFunction={createClusterCustomIcon}
                  showCoverageOnHover={false}
                  spiderfyOnEveryZoom={false}
                >
                  {filteredSites.map((s) => {
                    const side = s.lng < KOREA_CENTER_LON ? "left" : "right";
                    const offset = side === "right" ? [CARD_OFFSET_PX, -10] : [-CARD_OFFSET_PX, -10];
                    const sideClass = side === "right" ? "side-card--right" : "side-card--left";
                    return (
                      <Marker
                        key={s.id}
                        position={[s.lat, s.lng]}
                        eventHandlers={
                          isMobile
                            ? { click: (e) => e.target.openTooltip() }
                            : { mouseover: (e) => e.target.openTooltip(), mouseout: (e) => e.target.closeTooltip() }
                        }
                      >
                        <Tooltip
                          pane="card-tooltips"
                          interactive
                          direction={side}
                          offset={offset}
                          opacity={1}
                          className={`side-card ${sideClass}`}
                        >
                          <div className="card animate-cardIn">
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
                      </Marker>
                  );
                })}
              </MarkerClusterGroup>
            </MapContainer>

            <div className="mt-2 text-right text-[11px] md:text-xs text-gray-500 select-none">
              {note}
            </div>
          </div>
          
          {/* 전체 목록 보기 */}
          <div className="mt-12 md:mt-16 bg-gray-50 rounded-xl p-4 md:p-6 shadow-md">
            <button
              onClick={() => setShowList(!showList)}
              className="w-full flex justify-between items-center text-left text-lg md:text-xl font-bold text-[#004A91] hover:text-blue-800 transition-colors"
            >
              전체 현장 목록 ({filteredSites.length}개)
              {showList ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            {showList && (
              <div className="mt-4 animate-fadeDown overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-100 border-b">
                      <th className="py-3 px-4 font-semibold text-sm text-gray-600 rounded-tl-lg">현장명</th>
                      <th className="py-3 px-4 font-semibold text-sm text-gray-600">건설사</th>
                      <th className="py-3 px-4 font-semibold text-sm text-gray-600 rounded-tr-lg">세대수</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSites.map((site) => (
                      <tr key={site.id} className="border-b last:border-b-0 hover:bg-gray-100 transition-colors">
                        <td className="py-3 px-4 text-sm text-gray-800">{site.name}</td>
                        <td className="py-3 px-4 text-sm text-gray-800">{site.contractor}</td>
                        <td className="py-3 px-4 text-sm text-gray-800">{Number(site.units).toLocaleString()}세대</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>
      <style>{`
        /* 타이틀 페이드+슬라이드 다운 */
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeDown { animation: fadeDown .45s ease-out both; }

        /* 카드 등장 */
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
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
          box-shadow: 0 2px 6px rgba(0,0,0,0.25);
          border: 2px solid #fff;
        }

        /* 툴팁/Pane 오버플로우 허용 (연결선이 카드 밖으로 나가도 보이게) */
        .leaflet-tooltip.side-card { 
          background: transparent; border: none; box-shadow: none; padding: 0; 
          white-space: normal; overflow: visible !important; 
          pointer-events: auto; /* interactive 작동 */
        }
        .card-tooltips-pane { overflow: visible !important; }

        /* 카드형 툴팁 */
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
        .side-card--left  .connector { right: -${CONNECTOR_LEN_PX}px; }

        .side-card .dot {
          position: absolute; top: 50%;
          width: 10px; height: 10px; border-radius: 9999px;
          background: #004A91; transform: translateY(-50%);
          box-shadow: 0 0 0 2px #fff;
        }
        .side-card--right .dot { left: -${DOT_OUT_PX}px; }
        .side-card--left  .dot { right: -${DOT_OUT_PX}px; }

        /* 컨트롤/마커 인터랙션 */
        .leaflet-control-zoom a {
          transition: transform .15s ease, box-shadow .15s ease;
          border-radius: 10px !important;
        }
        .leaflet-control-zoom a:hover { transform: translateY(-1px); box-shadow: 0 6px 12px rgba(0,0,0,.08); }

        .leaflet-marker-icon {
          filter: drop-shadow(0 2px 4px rgba(0,0,0,.12));
          transition: filter .15s ease;
        }
        .leaflet-marker-icon:hover { filter: brightness(1.1) drop-shadow(0 6px 10px rgba(0,0,0,.18)); }
        
        /* 필터 버튼 호버 및 클릭 효과 추가 */
        .filter-button-active { transform: translateY(-1px); box-shadow: 0 2px 4px rgba(0,0,0,.1); }
      `}</style>
    </section>
  );
}

export default memo(RunningProjectsFromXLSX);