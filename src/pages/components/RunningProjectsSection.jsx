// src/pages/components/RunningProjectsSection.jsx
import React, { memo, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Tooltip, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";

/**
 * 전제:
 * - App.jsx 등 상위에서 한 번만 아래를 임포트
 *   import 'leaflet/dist/leaflet.css';
 *   import './leafletIconFix';
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

// 예시 데이터
const SAMPLE_SITES = [
  // { id: 's1', contractor: 'GS건설', contractorLogo: '/logos/gs.png', name: '송도 A단지', units: 1243, lat: 37.382, lng: 126.643 },
];

function RunningProjectsSection({
  sites = SAMPLE_SITES,
  height = "70vh",
  title = "공사/납품 진행중인 현장",
}) {
  // 한국 중심/줌
  const center = useMemo(() => [36.5, 127.8], []);

  // 🇰🇷 한국 영역(제주~독도 대략 범위)
  const koreaBounds = useMemo(
    () => L.latLngBounds([[33.0, 124.5], [39.6, 132.0]]),
    []
  );

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
          zoom={7}
          /* 🔒 줌 완전 고정 (원하면 min/max 조절해서 약간의 줌 허용 가능) */
          minZoom={7}
          maxZoom={7}
          zoomControl={false}
          scrollWheelZoom={false}
          doubleClickZoom={false}
          touchZoom={false}
          boxZoom={false}
          keyboard={false}

          /* 🌍 한국 영역 밖으로 못 나가게 */
          maxBounds={koreaBounds}
          maxBoundsViscosity={1.0}  // 1.0 = 바깥으로 못 나감

          /* (선택) 패닝까지 막으려면 ↓ 주석 해제
          dragging={false}
          */

          style={{ height: "100%", width: "100%" }}
          preferCanvas
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            /* 반복 지도 제거 + 범위 전달 */
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
