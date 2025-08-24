/* // src/pages/components/RunningProjectsFromXLSX.jsx
import React, {
  useEffect, useMemo, useState, useRef, useCallback, memo,
} from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import * as XLSX from "xlsx";
import L from "leaflet";

/** ---------- 튜닝 포인트(길이/기준) ---------- */
/*const KOREA_CENTER_LON = 127.8;
const CARD_OFFSET_PX   = 130;
const CONNECTOR_LEN_PX = 110;
const DOT_OUT_PX       = CONNECTOR_LEN_PX + 10;

const DEFAULT_REGION_ORDER = [
  "수도권", "강원권", "충청권", "호남권", "영남권", "제주", "기타"
];

/** 클러스터 뱃지 */
/*const createClusterCustomIcon = (cluster) => {
  const count = cluster.getChildCount();
  const size = count < 10 ? 30 : count < 50 ? 36 : 42;
  return L.divIcon({
    html: `<div class="cluster-badge">${count}</div>`,
    className: "cluster-icon",
    iconSize: L.point(size, size, true),
  });
};

/** 위경도로 대략 지역 추정 (엑셀에 지역이 없을 때만 사용) */
/*function inferRegion(lat, lng) {
  if (lat < 34.2 && lng > 125 && lng < 127.5) return "제주";
  if (lng >= 127.5 && lat >= 37.0) return "강원권";
  if (lng >= 128.0) return "영남권";
  if (lat < 36.0 && lng <= 127.8) return "호남권";
  if (lat >= 36.0 && lat < 37.3 && lng <= 128.5) return "충청권";
  if (lat >= 36.5 && lng >= 126.0 && lng <= 128.0) return "수도권";
  return "기타";
}

/** 행 → 사이트 객체 매핑 */
/*function mapRowToSite(row, idx) {
  const lat = parseFloat(row.lat ?? row.Lat ?? row.위도);
  const lng = parseFloat(row.lng ?? row.Lng ?? row.Long ?? row.경도);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;

  const region =
    row.region ??
    row.Region ??
    row.지역 ??
    inferRegion(lat, lng);

  const contractor = (row.contractor ?? row.건설사 ?? "").toString().trim() || "기타";

  return {
    id: row.id || row.ID || `row-${idx}`,
    contractor,
    contractorLogo: row.contractorLogo ?? row.로고 ?? "",
    name: (row.name ?? row.현장명 ?? "").toString().trim(),
    units: Number(row.units ?? row.세대수 ?? 0),
    lat, lng, region,
  };
}

function RunningProjectsFromXLSX({
  src = "/data/sites.xlsx",   // public/data/sites.xlsx
  sheetName,
  height = "64vh",            // ↓ 70vh → 64vh로 살짝 축소
  title = "진행 현장",
  note = "※ 25년 8월 기준",
  lockZoom = false,
  lockDrag = false,
  fullBleed = false,
  mapBg = "transparent",
  regionOrder = DEFAULT_REGION_ORDER,
}) {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // ✅ 필터 상태
  const [selectedRegions, setSelectedRegions] = useState(new Set());
  const [selectedContractors, setSelectedContractors] = useState(new Set());

  // 드롭다운
  const [regionOpen, setRegionOpen] = useState(false);
  const [contractorOpen, setContractorOpen] = useState(false);
  const regionRef = useRef(null);
  const contractorRef = useRef(null);

  // 기기 감지(툴팁 열림 방식 분기)
  const isMobile = useMemo(() => {
    if (typeof window === "undefined") return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }, []);

  // 지도 & 마커 참조
  const mapRef = useRef(null);
  const markersRef = useRef({});
  const [selectedId, setSelectedId] = useState(null);
  const [openList, setOpenList] = useState(false);

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

  // 지역/건설사 옵션
  const regionOptions = useMemo(() => {
    const set = new Set(sites.map((s) => s.region || "기타"));
    const arr = Array.from(set);
    return arr.sort((a, b) => {
      const ia = regionOrder.indexOf(a);
      const ib = regionOrder.indexOf(b);
      return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
    });
  }, [sites, regionOrder]);

  const contractorOptions = useMemo(() => {
    const set = new Set(sites.map((s) => s.contractor || "기타"));
    return Array.from(set).sort((a, b) => a.localeCompare(b, "ko"));
  }, [sites]);

  // 옵션 변경 시 기본값: 모두 선택
  useEffect(() => { setSelectedRegions(new Set(regionOptions)); }, [regionOptions]);
  useEffect(() => { setSelectedContractors(new Set(contractorOptions)); }, [contractorOptions]);

  // 드롭다운 외부 클릭 닫기
  useEffect(() => {
    const onDown = (e) => {
      if (regionRef.current && !regionRef.current.contains(e.target)) setRegionOpen(false);
      if (contractorRef.current && !contractorRef.current.contains(e.target)) setContractorOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  // 토글/전체선택/해제
  const toggleRegion = (r) => setSelectedRegions((prev) => {
    const next = new Set(prev);
    next.has(r) ? next.delete(r) : next.add(r);
    return next;
  });
  const toggleContractor = (c) => setSelectedContractors((prev) => {
    const next = new Set(prev);
    next.has(c) ? next.delete(c) : next.add(c);
    return next;
  });
  const selectAllRegions = () => setSelectedRegions(new Set(regionOptions));
  const clearAllRegions = () => setSelectedRegions(new Set());
  const selectAllContractors = () => setSelectedContractors(new Set(contractorOptions));
  const clearAllContractors = () => setSelectedContractors(new Set());

  // 필터링 (지역 ∩ 건설사)
  const filtered = useMemo(() => {
    if (selectedRegions.size === 0 || selectedContractors.size === 0) return [];
    return sites.filter(
      (s) => selectedRegions.has(s.region || "기타") && selectedContractors.has(s.contractor || "기타")
    );
  }, [sites, selectedRegions, selectedContractors]);

  // 목록 클릭 → 지도 이동 + 툴팁 오픈
  const focusSite = useCallback((site) => {
    setSelectedId(site.id);
    const map = mapRef.current;
    if (!map) return;
    map.setView([site.lat, site.lng], Math.max(map.getZoom(), 8), { animate: true });

    const m = markersRef.current[site.id];
    if (m && m.openTooltip) {
      setTimeout(() => m.openTooltip(), 220);
    }
  }, []);

  /*return (
    <section id="running-projects" className="bg-white">
      {/* 타이틀/여백 살짝 축소: pt-3 / pb-8 */}
      /*<div className={`${fullBleed ? "max-w-none px-0" : "max-w-6xl px-4"} mx-auto pt-3 md:pt-4 pb-8 md:pb-10`}>
        <h2
          className="text-2xl md:text-3xl font-extrabold text-[#004A91] text-center animate-fadeDown mb-3 md:mb-4"
          style={{ letterSpacing: "-0.02em" }}
        >
          {title}
        </h2>

        {/* 🔽 필터 바: 드롭다운 2개 (여백 축소) */}
      /*  <div className="relative z-[5] mb-2 md:mb-3 flex flex-wrap items-center gap-2">
          {/* 지역 드롭다운 */}
         /* <div className="relative" ref={regionRef}>
            <button
              onClick={() => { setRegionOpen((v) => !v); setContractorOpen(false); }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 active:bg-gray-100 transition text-sm"
            >
              지역
              <span className="text-xs text-gray-500">
                ({selectedRegions.size}/{regionOptions.length})
              </span>
              <svg width="14" height="14" viewBox="0 0 20 20"><path d="M5 7l5 6 5-6" fill="none" stroke="currentColor" strokeWidth="2"/></svg>
            </button>
            {regionOpen && (
              <div className="absolute mt-2 w-72 max-h-64 overflow-auto rounded-xl border border-gray-200 bg-white shadow-xl p-3 z-[10]">
                <div className="flex justify-end gap-2 mb-2">
                  <button onClick={selectAllRegions} className="px-2 py-1 text-xs rounded border">전체선택</button>
                  <button onClick={clearAllRegions} className="px-2 py-1 text-xs rounded border">전체해제</button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {regionOptions.map((r) => (
                    <label key={r} className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        className="accent-[#004A91]"
                        checked={selectedRegions.has(r)}
                        onChange={() => toggleRegion(r)}
                      />
                      <span className="text-sm">{r}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 건설사 드롭다운 */}
          /*<div className="relative" ref={contractorRef}>
            <button
              onClick={() => { setContractorOpen((v) => !v); setRegionOpen(false); }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 active:bg-gray-100 transition text-sm"
            >
              건설사
              <span className="text-xs text-gray-500">
                ({selectedContractors.size}/{contractorOptions.length})
              </span>
              <svg width="14" height="14" viewBox="0 0 20 20"><path d="M5 7l5 6 5-6" fill="none" stroke="currentColor" strokeWidth="2"/></svg>
            </button>
            {contractorOpen && (
              <div className="absolute mt-2 w-[22rem] max-h-64 overflow-auto rounded-xl border border-gray-200 bg-white shadow-xl p-3 z-[10]">
                <div className="flex justify-end gap-2 mb-2">
                  <button onClick={selectAllContractors} className="px-2 py-1 text-xs rounded border">전체선택</button>
                  <button onClick={clearAllContractors} className="px-2 py-1 text-xs rounded border">전체해제</button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {contractorOptions.map((c) => (
                    <label key={c} className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        className="accent-emerald-600"
                        checked={selectedContractors.has(c)}
                        onChange={() => toggleContractor(c)}
                      />
                      <span className="text-sm truncate max-w-[140px]" title={c}>{c}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 개수 & 전체목록 버튼 */}
          /*<div className="ml-auto flex items-center gap-2 text-sm text-gray-600">
            <div>
              선택 결과: <span className="font-semibold text-gray-800">{filtered.length}</span> 건
            </div>
            <button
              onClick={() => setOpenList((v) => !v)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 active:bg-gray-100 transition animate-bounceOnce"
            >
              {openList ? "목록 닫기" : "전체목록 보기"}
            </button>
          </div>
        </div>

        {/* 지도/에러/로딩 */}
        /*{loading && (
          <div className="text-center text-gray-500 py-6">현장 데이터를 불러오는 중…</div>
        )}
        {err && (
          <div className="text-center text-red-600 py-4">오류: {err}</div>
        )}

        {!loading && !err && (
          <div className="relative z-0 w-full" style={{ height }}>
            <MapContainer
              center={[36.5, 127.8]}
              zoom={7}
              minZoom={lockZoom ? 7 : 7}
              maxZoom={lockZoom ? 7 : 12}
              scrollWheelZoom={!lockZoom}
              doubleClickZoom={!lockZoom}
              touchZoom={!lockZoom}
              boxZoom={!lockZoom}
              dragging={!lockDrag}
              zoomControl={!lockZoom}
              maxBounds={L.latLngBounds([[31.0, 121.0], [41.5, 134.5]])}
              maxBoundsViscosity={0.85}
              preferCanvas
              whenCreated={(map) => (mapRef.current = map)}
              style={{ height: "100%", width: "100%", background: mapBg, borderRadius: 12 }}
              className="shadow-md hover:shadow-lg transition-shadow duration-300"
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
                disableClusteringAtZoom={9}
              >
                {filtered.map((s) => {
                  const side = s.lng < KOREA_CENTER_LON ? "left" : "right";
                  const offset = side === "right" ? [CARD_OFFSET_PX, -10] : [-CARD_OFFSET_PX, -10];
                  const sideClass = side === "right" ? "side-card--right" : "side-card--left";

                  return (
                    <Marker
                      key={s.id}
                      position={[s.lat, s.lng]}
                      ref={(m) => { if (m) markersRef.current[s.id] = m; }}
                      eventHandlers={
                        isMobile
                          ? { click: (e) => e.target.openTooltip() }
                          : {
                              mouseover: (e) => e.target.openTooltip(),
                              mouseout: (e) => e.target.closeTooltip(),
                            }
                      }
                    >
                      <Tooltip
                        interactive
                        direction={side}
                        offset={offset}
                        opacity={1}
                        className={`side-card ${sideClass}`}
                      >
                        <div className="card animate-cardIn hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-200">
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
                            <div className="text-[11px] text-gray-500 mt-1">
                              지역: {s.region || "기타"}
                            </div>
                          </div>
                        </div>
                      </Tooltip>
                    </Marker>
                  );
                })}
              </MarkerClusterGroup>
            </MapContainer>

            {/* 좌하단 노트 (여백 축소) */}
            /*<div className="mt-1 text-right text-[11px] md:text-xs text-gray-500 select-none">
              {note}
            </div>

            {/* 전체목록 패널 */}
            /*<div
              className={`fixed z-[1000] right-3 md:right-6 bottom-3 md:top-24 md:bottom-auto
                          w-[92%] md:w-[340px] max-h-[66vh] md:max-h-[calc(100dvh-120px)]
                          bg-white/95 backdrop-blur rounded-2xl shadow-2xl border border-gray-200 overflow-hidden
                          transition-all duration-300 ${openList ? "opacity-100 translate-y-0" : "opacity-0 pointer-events-none translate-y-2"}`}
              aria-hidden={!openList}
            >
              <div className="flex items-center justify-between px-4 py-2.5 border-b bg-white/80">
                <div className="font-semibold text-gray-900">전체목록</div>
                <button
                  onClick={() => setOpenList(false)}
                  className="text-gray-500 hover:text-gray-700 rounded-lg px-2 py-1"
                >
                  닫기
                </button>
              </div>
              <div className="p-3 overflow-auto" style={{ maxHeight: "56vh" }}>
                {filtered.length === 0 && (
                  <div className="text-sm text-gray-500 py-8 text-center">
                    선택한 조건에 현장이 없습니다.
                  </div>
                )}
                <ul className="space-y-2">
                  {filtered.map((s) => (
                    <li key={s.id}>
                      <button
                        onClick={() => { setOpenList(false); focusSite(s); }}
                        className={`w-full text-left rounded-xl border px-3 py-2 transition
                          ${selectedId === s.id ? "border-[#004A91] bg-[#004A91]/5" : "border-gray-200 hover:bg-gray-50"}`}
                      >
                        <div className="text-xs text-gray-500">{s.region || "기타"}</div>
                        <div className="font-semibold text-gray-900">{s.name || "무제"}</div>
                        <div className="text-sm text-gray-500">{s.contractor || "건설사 미지정"}</div>
                        <div className="text-xs text-gray-500">
                          세대수 {Number(s.units||0).toLocaleString()}세대
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 애니메이션 & 스타일 */}
            /*<style>{`
              @keyframes fadeDown { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
              .animate-fadeDown { animation: fadeDown .45s ease-out both; }

              @keyframes cardIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
              .animate-cardIn { animation: cardIn .25s ease-out both; }

              @keyframes bounceOnce {
                0%{ transform: translateY(0) }
                30%{ transform: translateY(-3px) }
                60%{ transform: translateY(0) }
                100%{ transform: translateY(0) }
              }
              .animate-bounceOnce { animation: bounceOnce .6s ease-out .6s 1 both; }

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

              .leaflet-tooltip.side-card { background: transparent; border: none; box-shadow: none; padding: 0; white-space: normal; overflow: visible; }
              .side-card .card {
                position: relative;
                background: #fff;
                border: 1px solid #e5e7eb;
                border-radius: 12px;
                padding: 12px 14px;     /* 카드 안 패딩도 살짝 축소 */
                /*min-width: 220px;       /* 360 → 340 */
               // max-width: 280px;       /* 460 → 440 */
                //box-shadow: 0 12px 24px rgba(0,0,0,.11);
                //transition: transform .2s ease, box-shadow .2s ease;
              //}
              /*.side-card .connector {
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

              .leaflet-marker-icon {
                filter: drop-shadow(0 2px 4px rgba(0,0,0,.12));
                transition: filter .15s ease, transform .15s ease;
              }
              .leaflet-marker-icon:hover { filter: brightness(1.08) drop-shadow(0 6px 10px rgba(0,0,0,.18)); transform: translateY(-1px); }
            `}</style>
          </div>
        )}
      </div>
    </section>
  );
}

export default memo(RunningProjectsFromXLSX);
*/