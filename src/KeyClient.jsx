import React from "react";

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
    "DL이앤씨 아크로 베스티뉴",
    "GS건설 메이플자이",
    "대우건설 과천 센트럴파크 푸르지오 써밋",
    "삼성물산 래미안 원베일리",
    "대우건설/포스코이앤씨 안양역 푸르지오 더샵",
    "포스코이앤씨 잠원동 포스코 오티에르",
    "현대건설 부천 일루미스테이트",
    "DL건설 e편한세상 평촌 어반밸리",
    "중흥건설 파주운정 중흥S클래스",
    "현대엔지니어링 힐스테이트 청주 센트럴",
    "HL 디엔아이한라 한라비발디센텀시티",
    "대방건설 옥정신도시 디에트르 프레스티지",
    "현대건설/HDC 현대산업개발/대우건설/롯데건설 올림픽파크포레온",
    "동부건설 두류 센트레빌 더 파크",
    "롯데건설 해운대 롯데캐슬 스타",
    "현대엔지니어링/DL이앤씨 힐스테이트e편한세상문정",
    "GS건설/한화건설 광명 자이더샵포레나",
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

  return (
    <section className="snap-start relative w-full min-h-screen overflow-hidden flex flex-col justify-center bg-gradient-to-br from-gray-400 to-white via-gray-200">
      {/* 상단 영역 */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-24 pb-8 px-4">
        <h2 className="text-3xl font-bold text-[#004A91] mb-2">주요 고객</h2>
        <p className="text-lg text-black mb-6 text-center">국내 유수 건설사들과의 협업으로 입증된 바우텍의 기술력</p>

        {/* 데스크탑 marquee */}
        <div className="hidden md:block overflow-hidden w-full max-w-7xl mx-auto group px-4">
          <div className="flex gap-10 animate-marquee min-w-max group-hover:[animation-play-state:paused]">
            {[...clients, ...clients].map((client, i) => (
              <div
                key={`${client.name}-${i}`}
                className="bg-slate-100/90 rounded-xl shadow-md flex-shrink-0 w-48 h-24 px-6 py-4 flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:scale-105 hover:drop-shadow-md"
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="h-full w-full object-contain"
                />
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
              <img
                src={client.logo}
                alt={client.name}
                className="h-full w-full object-contain p-2"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 구분선 */}
      <div className="relative z-10 flex items-center justify-center py-4 gap-2">
        <hr className="border-t border-dashed border-[#004A91] w-1/3" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#004A91] flex-shrink-0"></div>
        <hr className="border-t border-dashed border-[#004A91] w-1/3" />
      </div>

      {/* 하단 프로젝트 영역 */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-8 pb-24 px-4">
        <h2 className="text-3xl font-bold text-[#004A91] mb-2">주요 프로젝트</h2>
        <p className="text-lg text-black mb-6 text-center">전국 다양한 건설현장에서의 성공적인 시공/납품 경험</p>

        {/* 데스크탑 marquee */}
        <div className="hidden md:block overflow-hidden w-full max-w-7xl mx-auto group px-4">
          <div className="flex gap-10 animate-marquee-reverse text-xl whitespace-nowrap min-w-max group-hover:[animation-play-state:paused]">
            {[...projects, ...projects].map((proj, i) => {
              const matchedCompany = companies.find((company) =>
                proj.startsWith(company)
              );
              const siteName = matchedCompany
                ? proj.replace(matchedCompany, "").trim()
                : proj;
              return (
                <span
                  key={`${proj}-${i}`}
                  className="bg-slate-100/90 rounded-full px-6 py-3 shadow-sm"
                >
                  <span className="text-[#004A91] font-semibold">{matchedCompany}</span>{" "}
                  <span className="text-black text-base">{siteName}</span>
                </span>
              );
            })}
          </div>
        </div>

        {/* 모바일 리스트 */}
        <ul className="md:hidden w-full max-w-4xl mx-auto px-4 text-sm text-center leading-6 space-y-2">
          {projects.map((proj, i) => {
            const matchedCompany = companies.find((company) =>
              proj.startsWith(company)
            );
            const siteName = matchedCompany
              ? proj.replace(matchedCompany, "").trim()
              : proj;
            return (
              <li key={`mobile-proj-${i}`} className="bg-white/80 rounded-full px-4 py-2 shadow">
                <span className="text-[#004A91] font-semibold">{matchedCompany}</span>{" "}
                <span className="text-black">{siteName}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
