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
  // { id:'s1', contractor:'GS건설', contractorLogo:'/logos/gs.png', name:'송도 A단지', units:1243, lat:37.382, lng:126.643 },
];

function RunningProjectsSection({
  sites = SAMPLE_SITES,
  height = "70vh",
  title = "진행 현장",
  lockZoom = false,               // true면 줌 고정
}) {
  const center = useMemo(() => [36.5, 127.8], []);
  const koreaBounds = useMemo(
    () => L.latLngBounds([[33.0, 124.5], [39.6, 130.0]]), // 제주~독도 포함 대략 경계
    []
  );

  return (
    <section id="running-projects" className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-16">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#004A91] mb-2 text-center">
          {title}
        </h2>
        <p className="text-gray-600 text-center mb-8">전국 진행 중인 현장을 지도에서 확인하세요.</p>

        <div className="w-full" style={{ height }}>
          <MapContainer
            center={center}
            zoom={7}
            minZoom={lockZoom ? 7 : 6}
            maxZoom={lockZoom ? 7 : 12}
            scrollWheelZoom={!lockZoom}
            doubleClickZoom={!lockZoom}
            touchZoom={!lockZoom}
            boxZoom={!lockZoom}
            zoomControl={!lockZoom}
            maxBounds={koreaBounds}
            maxBoundsViscosity={1.0}
            preferCanvas
            style={{ height: "100%", width: "100%" }}
          >
            {/* 라벨 없는 밝은 베이스맵 */}
            <TileLayer
              attribution="&copy; OpenStreetMap & CARTO"
              url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
              noWrap={true}
              bounds={koreaBounds}
            />

            <MarkerClusterGroup
              chunkedLoading
              iconCreateFunction={createClusterCustomIcon}
              showCoverageOnHover={false}
              spiderfyOnEveryZoom={false}
            >
              {sites.map((s) => (
                <Marker key={s.id} position={[s.lat, s.lng]}>
                  <Tooltip direction="top" offset={[0, -10]} opacity={0.95}>
                    <div className="text-[12px] leading-tight">
                      {s.contractorLogo ? (
                        <img src={s.contractorLogo} alt={s.contractor} className="h-4 mb-1" />
                      ) : (
                        <div className="font-semibold">{s.contractor}</div>
                      )}
                      <div className="font-medium">{s.name}</div>
                      <div className="text-gray-600">
                        세대수: {Number(s.units).toLocaleString()}세대
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
              ))}
            </MarkerClusterGroup>
          </MapContainer>

          {/* 클러스터 뱃지 스타일 */}
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
          `}</style>
        </div>
      </div>
    </section>
  );
}

export default memo(RunningProjectsSection);
