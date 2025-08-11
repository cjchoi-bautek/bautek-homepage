// src/pages/components/RunningProjectsSection.jsx
import React, { memo, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Tooltip, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";

/** ---------- 튜닝 포인트(길이/기준) ---------- */
const KOREA_CENTER_LON = 127.8;     // 대한민국 중앙쯤 경도
const CARD_OFFSET_PX   = 110;       // 마커 ↔ 카드 수평 간격(툴팁 offset)
const CONNECTOR_LEN_PX = 90;        // 카드에서 마커로 나가는 선 길이
const DOT_OUT_PX       = CONNECTOR_LEN_PX + 10; // 점 위치(선 끝)

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
  { id:'s1', contractor:'GS건설', contractorLogo:'/KeyClient/GS.png',  name:'송도 A단지', units:1243, lat:37.382, lng:126.643 },
  { id:'s2', contractor:'DL 이앤씨', contractorLogo:'/KeyClient/DLE&C.png', name:'송도 B단지', units:2341, lat:36.382, lng:127.643 },
];

function RunningProjectsSection({
  sites = SAMPLE_SITES,
  height = "70vh",
  title = "진행 현장",
  lockZoom = false,
  lockDrag = false,
  fullBleed = false,
  mapBg = "transparent",
}) {
  const center = useMemo(() => [36.5, 127.8], []);
  const koreaBounds = useMemo(
    () => L.latLngBounds([[31.0, 121.0], [41.5, 134.5]]),
    []
  );

  return (
    <section id="running-projects" className="bg-white">
      <div className={`${fullBleed ? "max-w-none px-0" : "max-w-6xl px-4"} mx-auto py-10 md:py-16`}>
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#004A91] mb-2 text-center">{title}</h2>
        <p className="text-gray-600 text-center mb-8">전국 진행 중인 현장을 지도에서 확인하세요.</p>

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
                // 🇰🇷 중앙 경도 기준: 왼쪽(<)이면 카드도 왼쪽, 오른쪽(>=)이면 카드도 오른쪽
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
                          <div className="text-gray-600 text-sm">
                            세대수: {Number(s.units).toLocaleString()}세대
                          </div>
                        </div>
                      </div>
                    </Tooltip>

                    {/* 클릭 팝업(원하면 유지) */}
                    <Popup>
                      <div className="text-sm leading-tight">
                        {s.contractorLogo ? (
                          <img src={s.contractorLogo} alt={s.contractor} className="h-5 mb-2" />
                        ) : (
                          <div className="font-semibold mb-1">{s.contractor}</div>
                        )}
                        <div className="font-bold">{s.name}</div>
                        <div className="text-gray-600">세대수: {Number(s.units).toLocaleString()}세대</div>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
            </MarkerClusterGroup>
          </MapContainer>

          {/* 스타일(카드/연결선/클러스터) — 길이 상수 반영 */}
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

            /* 더 길고 넓은 카드 */
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

            /* 연결선(카드 기준 바깥쪽으로 길게) */
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

            /* 선 끝의 점(마커 쪽) */
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
