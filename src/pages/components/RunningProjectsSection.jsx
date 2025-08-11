import React, { useMemo, useState } from "react";

/**
 * 이미지 한 장 위에 마커 찍는 섹션
 */
export default function RunningProjectsSection({
  imageSrc = "/maps/korea.svg",                     // public/maps/korea.svg
  sites = [],                                       // [{ id, contractor, contractorLogo?, name, units, lat, lng }]
  bounds = [[33.0, 124.5], [39.6, 132.0]],          // [남서][북동] (이미지 외곽에 맞게 필요시 조정)
  height = "70vh",
  title = "공사/납품 진행중인 현장",
}) {
  const [[south, west], [north, east]] = bounds;
  const [openId, setOpenId] = useState(null);

  const toPercent = (lat, lng) => {
    const x = ((lng - west) / (east - west)) * 100;     // left%
    const y = ((north - lat) / (north - south)) * 100;  // top%
    return { left: `${x}%`, top: `${y}%` };
  };

  const markers = useMemo(
    () => sites.map((s) => ({ ...s, pos: toPercent(s.lat, s.lng) })),
    [sites]
  );

  return (
    <section id="running-projects" className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-16">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#004A91] mb-2 text-center">
          {title}
        </h2>
        <p className="text-gray-600 text-center mb-8">
          전국 진행 중인 현장을 지도에서 확인하세요.
        </p>

        <div className="relative w-full overflow-hidden rounded-xl shadow" style={{ height }}>
          {/* 지도 이미지 */}
          <img
            src={imageSrc}
            alt="대한민국 지도"
            className="absolute inset-0 w-full h-full object-contain bg-[#F2F4F7]"
            draggable={false}
          />

          {/* 마커 레이어 */}
          <div className="absolute inset-0">
            {markers.map((m) => (
              <button
                key={m.id}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={m.pos}
                onClick={() => setOpenId((id) => (id === m.id ? null : m.id))}
                onMouseEnter={() => setOpenId(m.id)}
                onMouseLeave={() => setOpenId(null)}
                onTouchStart={() => setOpenId(m.id)}
                aria-label={m.name}
              >
                {/* 점 마커 */}
                <span className="block w-3 h-3 rounded-full bg-[#004A91] ring-2 ring-white shadow" />

                {/* 툴팁 */}
                {openId === m.id && (
                  <div className="absolute left-1/2 -translate-x-1/2 -translate-y-full mt-[-10px] whitespace-nowrap">
                    <div className="rounded-lg bg-white/95 shadow-lg px-3 py-2 text-xs text-gray-900 border border-gray-200">
                      {m.contractorLogo ? (
                        <img src={m.contractorLogo} alt={m.contractor} className="h-4 mb-1" />
                      ) : (
                        <div className="font-semibold mb-0.5">{m.contractor}</div>
                      )}
                      <div className="font-semibold">{m.name}</div>
                      <div className="text-gray-600">
                        세대수: {Number(m.units).toLocaleString()}세대
                      </div>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
