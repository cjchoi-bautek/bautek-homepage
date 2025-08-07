import React from "react";

// 소제목을 포함한 연혁 데이터
const leftData = [
  {
    subtitle: "창립 및 기반 구축",
    year: "2002년",
    items: [{ month: "12월", text: "(주)바우텍 설립" }],
  },
  {
    year: "2003년",
    items: [{ month: "01월", text: "KCC 창호 협력업체 등록" }],
  },
  {
    year: "2007년",
    items: [{ month: "05월", text: "경영 혁신형 기업 인증" }],
  },
  {
    year: "2008년",
    items: [{ month: "05월", text: "벤처기업 인증" }],
  },
  {
    subtitle: "제품 혁신의 시작",
    year: "2010년",
    items: [
      { month: "03월", text: "화성 신축공장 확장 이전" },
      { month: "07월", text: "전략제품 '기어 시스템루버' 개발" },
      { month: "07월", text: "루버 및 루버 관련 디자인 출원" },
      { month: "12월", text: "루버 모듈과 시스템 특허 등록" },
    ],
  },
  {
    year: "2011년",
    items: [
      { month: "03월", text: "통합브랜드 '엘리브' 개발/상표출원" },
      { month: "06월", text: "ISO 9001/14001 인증 획득" },
    ],
  },
  {
    year: "2012년",
    items: [
      { month: "01월", text: "INNOBIZ 기술혁신형 인증기업" },
      { month: "07월", text: "유망중소기업 선정 (경기도)" },
    ],
  },
  {
    year: "2013년",
    items: [{ month: "01월", text: "글로벌 리딩 중소기업 대상 선정 (뉴스메이커)" }],
  },
];

const rightData = [
  {
    subtitle: "기술 경쟁력 확보",
    year: "2017년",
    items: [
      { month: "05월", text: "중소벤처기업부 장관 - 대한민국 중소기업대상 기술혁신부문 대상" },
      { month: "09월", text: "LH 신자재 선정" },
    ],
  },
  {
    year: "2019년",
    items: [{ month: "01월", text: "패밀리기업 선정 (IBK 기업은행)" }],
  },
  {
    subtitle: "제품 다각화 및 품질 경쟁력 강화",
    year: "2020년",
    items: [
      { month: "02월", text: "외기형도어 개발 및 상품 출시" },
      { month: "02월", text: "KS인증 (창세트 KSF3117 및 문세트 KSF3109)" },
      { month: "04월", text: "BBG (Blind Between Glass) 개발 및 상품 출시" },
    ],
  },
  {
    year: "2022년",
    items: [
      { month: "05월", text: "성과공유기업 인증 (중소벤처기업부장관)" },
      { month: "05월", text: "MAIN-BIZ 기업 인증" },
    ],
  },
  {
    year: "2023년",
    items: [
      { month: "02월", text: "전동시스템루버 개발 및 상품 출시" },
    ],
  },
];

const renderTimeline = (data) => {
  return (
    <div className="relative max-w-xl mx-auto">
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-200" />
      <div className="flex flex-col gap-y-0.25">
        {data.map((entry, idx) => {
          const isLeft = idx % 2 === 0;
          return (
            <div key={idx} className={`relative w-full flex ${isLeft ? "justify-start" : "justify-end"}`}>
              <div className="w-[calc(50%-20px)] px-2">
                {entry.subtitle && (
                  <h4 className="text-sm md:text-lg font-semibold text-[#004A91] mb-1">
                    {entry.subtitle}
                  </h4>
                )}
                {entry.items.map((item, i) => (
                  <div key={i} className="mb-0.5 group transition-all duration-300">
                    {i === 0 && (
                      <div className="flex items-center text-sm font-bold text-[#004A91] mb-1">
                        <span>{entry.year}</span>
                        <span className="ml-1 text-[11px] font-semibold text-gray-700 bg-gray-200 px-2 py-0.5 rounded">
                          {item.month}
                        </span>
                      </div>
                    )}
                    <div className={`border border-gray-300 shadow-sm p-1.5 text-xs leading-tight rounded-md group-hover:bg-white group-hover:text-white group-hover:scale-[1.03] transform transition duration-300 ${item.text.includes("설립") || item.text.includes("인증") || item.text.includes("출시") || item.text.includes("개발") || item.text.includes("대상") ? 'bg-white' : 'bg-white'}`}>
                      <span>
                        {item.text.includes("설립") || item.text.includes("인증") || item.text.includes("출시") || item.text.includes("개발") || item.text.includes("대상")
                          ? <strong>{item.text}</strong>
                          : item.text}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#004A91] rounded-full border-2 border-white shadow" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function HistoryTimeline() {
  return (
    <section
      id="history"
      className="snap-start min-h-screen pt-24 pb-12 px-4 bg-white"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-center text-[#004A91] mb-6">
        회사연혁
      </h2>

      <div className="max-w-screen-xl mx-auto md:flex justify-between gap-4 md:gap-8 px-2">
        {/* 왼쪽 타임라인 */}
        <div className="w-full md:w-1/2 mb-20 md:mb-0">
          <h3 className="text-xl md:text-2xl font-semibold text-[#004A91] mb-8 text-center">
            2002년 – 2016년
          </h3>
          {renderTimeline(leftData)}
        </div>

        {/* 오른쪽 타임라인 */}
        <div className="w-full md:w-1/2">
          <h3 className="text-xl md:text-2xl font-semibold text-[#004A91] mb-8 text-center">
            2017년 – 현재
          </h3>
          {renderTimeline(rightData)}
        </div>
      </div>
    </section>
  );
}