// src/pages/components/RunningProjectsSection.jsx
import React, { memo, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Tooltip, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";

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

const SAMPLE_SITES = [
  { id: "s1", contractor: "GS건설", contractorLogo: "/KeyClient/GS.png", name: "송도 A단지", units: 1243, lat: 37.382, lng: 126.643 },
  { id: "s2", contractor: "DL 이앤씨", contractorLogo: "/KeyClient/DLE&C.png", name: "송도 B단지", units: 2341, lat: 36.382, lng: 127.643 },
];

function RunningProjectsSection({
  sites = SAMPLE_SITES,
  height = "70vh",
  title = "진행 현장",
  lockZoom = false,
  lockDrag = false,
  fullBleed = false,
  mapBg = "transparent",
  /** 'auto'면 경도에 따라 자동으로 좌/우 결정, 'left' 또는 'right'로 고정 가능 */
  tooltipSide = "auto",
}) {
  const center = useMemo(() => [36.5, 127.8], []);

  const koreaBounds = useMemo(
    () => L.latLngBounds([[31.0, 121.0], [41.5, 134.5]]),
    []
  );

  const decideSide = (lng) => {
    if (tooltipSide === "left" || tooltipSide === "right") return tooltipSide;
    // auto: 서쪽(127.5 미만) → 오른쪽으로 카드, 동쪽 → 왼쪽으로 카드
    return lng < 127.5 ? "right" : "left";
  };

  return (
    <section id="running-projects" className="bg-white">
      <div className={`${fullBleed ? "max-w-none px-0" : "max-w-6xl px-4"} mx-auto py-10 md:py-16`}>
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#004A91] mb-2 text-center">
          {title}
        </h2>
        <p className="text-gray-600 text-center mb-8">
          전국 진행 중인 현장을 지도에서 확인하세요.
        </p>

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
            >
              {sites.map((s) => {
                const side = decideSide(s.lng);
                const offset = side === "right" ? [22, -10] : [-22, -10];
                const sideClass = side === "right" ? "side-card--right" : "side-card--left";

                return (
                  <Marker key={s.id} position={[s.lat, s.lng]}>
                    {/* ▶ 옆으로 크게 나오는 카드형 툴팁 (hover 시 표시, 모바일은 탭) */}
                    <Tooltip
                      direction={side}
                      offset={offset}
                      opacity={1}
                      permanent={false}
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

                    {/* 클릭 시 기본 팝업도 유지하고 싶으면 남겨둠 */}
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

          {/* 스타일: 카드/연결선/클러스터 */}
          <style>{`
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

            /* Leaflet 기본 툴팁 스킨 걷어내고 카드로 */
            .leaflet-tooltip.side-card {
              background: transparent;
              border: none;
              box-shadow: none;
              padding: 0;
              white-space: normal; /* 줄바꿈 허용 */
            }
            .leaflet-tooltip-left.side-card,
            .leaflet-tooltip-right.side-card { /* 양쪽 여백 제거 */
              margin: 0 !important;
            }

            /* 카드 본문 */
            .side-card .card {
              position: relative;
              background: #fff;
              border: 1px solid #e5e7eb;
              border-radius: 12px;
              padding: 12px 14px;
              min-width: 240px;
              max-width: 280px;
              box-shadow: 0 10px 24px rgba(0,0,0,.12);
            }

            /* 연결선 */
            .side-card .connector {
              position: absolute;
              top: 50%;
              width: 24px;
              height: 2px;
              background: #004A91;
              transform: translateY(-50%);
            }
            .side-card--right .connector { left: -24px; }
            .side-card--left  .connector { right: -24px; }

            /* 마커쪽 점 */
            .side-card .dot {
              position: absolute;
              top: 50%;
              width: 10px; height: 10px;
              border-radius: 9999px;
              background: #004A91;
              transform: translateY(-50%);
              box-shadow: 0 0 0 2px #fff;
            }
            .side-card--right .dot { left: -6px; }
            .side-card--left  .dot { right: -6px; }

            .side-card .card-body img { display: block; }
          `}</style>
        </div>
      </div>
    </section>
  );
}

export default memo(RunningProjectsSection);
