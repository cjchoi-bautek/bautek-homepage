// src/components/RunningProjectsSection.jsx
import React, { memo, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Tooltip, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";

/**
 * ⚠️ 전제:
 * - App.jsx 등 상위에서 한 번만 아래를 임포트해 주세요.
 *   import 'leaflet/dist/leaflet.css';
 *   import './map/leafletIconFix';
 */

// 클러스터 아이콘(원형 배지)
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
  // { id: 's1', contractor: 'GS건설', contractorLogo: '/logos/gs.png', name: '송도 A단지', units: 1243, lat: 37.382, lng: 126.643 },
  // { id: 's2', contractor: '현대건설', contractorLogo: '/logos/hdec.png', name: '수서 B주택', units: 812, lat: 37.487, lng: 127.106 },
  // { id: 's3', contractor: '대우건설', contractorLogo: '/logos/daewoo.png', name: '부산 C현장', units: 532, lat: 35.159, lng: 129.06 },
];

function RunningProjectsSection({ sites = SAMPLE_SITES, height = "70vh", title = "공사/납품 진행중인 현장" }) {
  // 한국 중심/줌
  const center = useMemo(() => [36.5, 127.8], []);
  const zoom = 7;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 md:py-16">
      <h2 className="text-2xl md:text-3xl font-extrabold text-[#004A91] mb-2 text-center">
        {title}
      </h2>
      <p className="text-gray-600 text-center mb-8">
        전국 진행 중인 현장을 지도에서 확인하세요.
      </p>

      <div className="w-full" style={{ height }}>
        <MapContainer
          center={center}
          zoom={zoom}
          minZoom={5}
          maxZoom={18}
          style={{ height: "100%", width: "100%" }}
          preferCanvas
          scrollWheelZoom
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MarkerClusterGroup
            chunkedLoading
            iconCreateFunction={createClusterCustomIcon}
            showCoverageOnHover={false}
            spiderfyOnEveryZoom={false}
          >
            {sites.map((s) => (
              <Marker key={s.id} position={[s.lat, s.lng]}>
                {/* 데스크탑: hover / 모바일: 탭 → Popup */}
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
            display: grid;
            place-items: center;
            width: 100%;
            height: 100%;
            border-radius: 9999px;
            background: rgba(0,74,145,0.9);
            color: #fff;
            font-weight: 700;
            font-size: 12px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.25);
            border: 2px solid #fff;
          }
        `}</style>
      </div>
    </div>
  );
}

export default memo(RunningProjectsSection);
