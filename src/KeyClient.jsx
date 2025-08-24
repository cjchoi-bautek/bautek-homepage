import React, { useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";

export default function KeyClient() {
  const clients = [
    { name: "삼성건설", logo: "/KeyClient/samsung.png" },
    { name: "현대건설", logo: "/KeyClient/Hyundai.png" },
    { name: "DL이앤씨", logo: "/KeyClient/DLE&C.png" },
    { name: "GS건설", logo: "/KeyClient/GS.png" },
    { name: "대우건설", logo: "/KeyClient/Daewoo.png" },
    { name: "포스코이앤씨", logo: "/KeyClient/Posco.png" },
    { name: "HDC 현대산업개발", logo: "/KeyClient/HDC.png" },
    { name: "DL건설", logo: "/KeyClient/DLC.png" },
    { name: "금호건설", logo: "/KeyClient/Kumho.png" },
    { name: "롯데건설", logo: "/KeyClient/Lotte.png" },
    { name: "대방건설", logo: "/KeyClient/Daebang.png" },
    { name: "동부건설", logo: "/KeyClient/Dongbu.png" },
    { name: "금강주택", logo: "/KeyClient/Kumkang.png" },
    { name: "HL 디엔아이한라", logo: "/KeyClient/HL.png" },
    { name: "쌍용건설", logo: "/KeyClient/Ssangyong.png" },
  ];

  const projects = [
    { name: "아크로 베스티뉴", company: "DL이앤씨", units: "1,011세대", completion: "2025년 2월", logo: "/KeyClient/DLE&C.png" },
    { name: "래미안 원베일리", company: "삼성물산", units: "2,990세대", completion: "2023년 08월", logo: "/KeyClient/samsung.png" },
    { name: "안양역 푸르지오 더샵", company: "대우건설/포스코이앤씨", units: "2,736세대", completion: "2024년 09월" },
    { name: "메이플자이", company: "GS건설", units: "3,307세대", completion: "2025년 05월", logo: "/KeyClient/GS.png" },
    { name: "과천 센트럴파크 푸르지오 써밋", company: "대우건설", units: "1,317세대", completion: "2020년 12월", logo: "/KeyClient/Daewoo.png" },
    { name: "잠원동 포스코 오티에르", company: "포스코이앤씨", units: "182세대", completion: "2026년 6월", logo: "/KeyClient/Posco.png" },
    { name: "부천 일루미스테이트", company: "현대건설", units: "3,724세대", completion: "2024년 11월", logo: "/KeyClient/Hyundai.png" },
    { name: "e편한세상 평촌 어반밸리", company: "DL건설", units: "458세대", completion: "2026년 10월", logo: "/KeyClient/DLC.png" },
    { name: "파주운정 중흥S클래스", company: "중흥건설", units: "1,262세대", completion: "2022년 04월", logo: "/KeyClient/Jungheung.png" },
    { name: "힐스테이트 청주 센트럴", company: "현대엔지니어링", units: "160세대", completion: "2025년 05월", logo: "/KeyClient/HyundaiE&C.png" },
    { name: "한라비발디센텀시티", company: "HL 디엔아이한라", units: "1,936세대", completion: "2021년 12월", logo: "/KeyClient/HL.png" },
    { name: "옥정신도시 디에트르 프레스티지", company: "대방건설", units: "1,859세대", completion: "2022년 10월", logo: "/KeyClient/Daebang.png" },
    { name: "올림픽파크포레온", company: "현대건설/HDC 현대산업개발/대우건설/롯데건설", units: "12,032세대", completion: "2024년 10월" },
    { name: "두류 센트레빌 더 파크", company: "동부건설", units: "433세대", completion: "2024년 11월", logo: "/KeyClient/Dongbu.png" },
    { name: "해운대 롯데캐슬 스타", company: "롯데건설", units: "828세대", completion: "2020년 09월", logo: "/KeyClient/Lotte.png" },
    { name: "힐스테이트e편한세상 문정", company: "현대엔지니어링/DL이앤씨", units: "1,265세대", completion: "2024년 08월" },
    { name: "광명 자이더샵포레나", company: "GS건설", units: "3,585세대", completion: "2025년 12월", logo: "/KeyClient/GS.png" },
  ];

  const companies = [
    "현대건설/HDC 현대산업개발/대우건설/롯데건설",
    "대우건설/포스코이앤씨",
    "GS건설/한화건설",
    "현대엔지니어링/DL이앤씨",
    "삼성물산",
    "포스코이앤씨",
    "현대건설",
    "DL이앤씨",
    "GS건설",
    "대우건설",
    "롯데건설",
    "DL건설",
    "중흥건설",
    "현대엔지니어링",
    "HL 디엔아이한라",
    "대방건설",
    "동부건설",
  ].sort((a, b) => b.length - a.length);

  // ✅ 팝오버는 '주요 프로젝트' 섹션에서만 사용 (뷰포트 좌표)
  const [popover, setPopover] = useState({
    show: false, x: 0, y: 0, logo: "", company: "", name: "", units: "", completion: "",
  });

  const placePopover = useCallback((e, data) => {
    setPopover({ show: true, x: e.clientX, y: e.clientY, ...data });
  }, []);

  const hidePopover = useCallback(() => {
    setPopover((p) => ({ ...p, show: false }));
  }, []);

  return (
    <section className="snap-start relative w-full min-h-screen overflow-hidden flex flex-col justify-center bg-white">
      {/* 상단: 주요 고객 (스니펫 제외 처리) */}
      <div
        id="key-clients"
        data-nosnippet
        className="relative z-10 flex flex-col items-center justify-center pt-24 pb-8 px-4"
      >
        <h2 className="text-3xl font-bold text-[#004A91] mb-2">주요 고객</h2>
        <p className="text-lg text-black mb-6 text-center">
          국내 유수 건설사들과의 협업으로 입증된 바우텍의 기술력
        </p>

        {/* 데스크탑 marquee */}
        <div className="hidden md:block overflow-hidden w-full max-w-7xl mx-auto group px-4">
          <div className="flex gap-10 animate-marquee min-w-max group-hover:[animation-play-state:paused]">
            {[...clients, ...clients].map((client, i) => (
              <div
                key={`${client.name}-${i}`}
                className="bg-slate-100/90 rounded-xl shadow-md flex-shrink-0 w-48 h-24 px-6 py-4 flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:scale-105 hover:drop-shadow-md"
              >
                {/* alt를 중립적으로 (스니펫 노출 감소용) */}
                <img src={client.logo} alt="고객사 로고" className="h-full w-full object-contain" />
              </div>
            ))}
          </div>
        </div>

        {/* 모바일 grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:hidden gap-4 max-w-4xl w-full px-4">
          {clients.map((client, i) => (
            <div
              key={`${client.name}-mobile-${i}`}
              className="bg-slate-100/90 rounded-xl shadow-md w-full h-20 flex items-center justify-center"
            >
              <img src={client.logo} alt="고객사 로고" className="h-full w-full object-contain p-2" />
            </div>
          ))}
        </div>
      </div>

      {/* 구분선 */}
      <div className="relative z-10 flex items-center justify-center py-4 gap-2">
        <hr className="border-t border-dashed border-[#004A91] w-1/3" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#004A91]" />
        <hr className="border-t border-dashed border-[#004A91] w-1/3" />
      </div>

      {/* 하단: 주요 프로젝트 (팝오버 O) */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-8 pb-24 px-4">
        <h2 className="text-3xl font-bold text-[#004A91] mb-2">주요 프로젝트</h2>
        <p className="text-lg text-black mb-6 text-center">전국 다양한 건설현장에서의 성공적인 시공/납품 경험</p>
        <p className="text-sm text-black mb-6 text-center">※2025년 08월 기준</p>

        {/* 데스크탑 marquee (호버 시 일시정지 + 포털 팝오버) */}
        <div
          className="hidden md:block overflow-hidden w-full max-w-7xl mx-auto group px-4 relative"
          onMouseLeave={hidePopover}
        >
          <div className="flex gap-10 animate-marquee-reverse text-xl whitespace-nowrap min-w-max group-hover:[animation-play-state:paused]">
            {[...projects, ...projects].map((proj, i) => (
              <span
                key={`${proj.company}-${proj.name}-${i}`}
                className="relative bg-slate-100/90 rounded-full px-6 py-3 shadow-sm cursor-pointer"
                onMouseMove={(e) =>
                  placePopover(e, {
                    logo: proj.logo,
                    company: proj.company,
                    name: proj.name,
                    units: proj.units,
                    completion: proj.completion,
                  })
                }
              >
                <span className="text-[#004A91] font-semibold">{proj.company}</span>{" "}
                <span className="text-black text-base">{proj.name}</span>
              </span>
            ))}
          </div>
        </div>

        {/* 모바일 리스트 */}
        <ul className="md:hidden w-full max-w-4xl mx-auto px-4 text-sm text-center leading-6 space-y-2">
          {projects.map((proj, i) => (
            <li key={`mobile-proj-${proj.company}-${proj.name}-${i}`} className="bg-white/80 rounded-full px-4 py-2 shadow">
              <span className="text-[#004A91] font-semibold">{proj.company}</span>{" "}
              <span className="text-black">{proj.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 포털 팝오버 */}
      {popover.show &&
        createPortal(
          <PopoverFixed
            x={popover.x}
            y={popover.y}
            logo={popover.logo}
            company={popover.company}
            name={popover.name}
            units={popover.units}
            completion={popover.completion}
          />,
          document.body
        )}
    </section>
  );
}

/** ===== 포털로 렌더되는 고정 팝오버 ===== */
function PopoverFixed({ x, y, logo, company, name, units, completion }) {
  const MARGIN = 12;
  const CARD_H = 170;
  const OFFSET = 16;

  let top = y + OFFSET;
  let left = x;

  if (top + CARD_H + MARGIN > window.innerHeight) {
    top = y - CARD_H - OFFSET; // 하단 넘치면 위로 플립
  }
  left = Math.max(MARGIN, Math.min(left, window.innerWidth - MARGIN));

  return (
    <div
      role="tooltip"
      className="pointer-events-none fixed z-[9999] w-[300px] max-w-[85vw] -translate-x-1/2"
      style={{ left, top }}
    >
      <div className="bg-white/95 backdrop-blur-md border border-gray-200 shadow-xl rounded-2xl px-4 py-3">
        <div className="flex flex-col items-start gap-2 mb-2">
          {logo && <img src={logo} alt={company} className="h-16 w-16 object-contain" />}
          <span className="text-[#004A91] font-bold text-lg leading-tight text-left">{company}</span>
        </div>
        <div className="text-black text-base mb-2">{name}</div>
        <div className="text-sm text-gray-700">
          <div>세대수: {units || "-"}</div>
          <div>준공일: {completion || "-"}</div>
        </div>
      </div>
    </div>
  );
}
