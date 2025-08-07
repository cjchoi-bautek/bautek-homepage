import React, { useState } from "react";

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
      { month: "07월", text: "유망중소기업 선정 (경기 중소기업청)" },
      { month: "12월", text: "우수벤처기업 수상 (경기 중소기업청" },
    ],
  },
];

const rightData = [
  {
    subtitle: "기술 경쟁력 확보",
    year: "2013년",
    items: [{ month: "01월", text: "글로벌 리딩 중소기업 대상 선정 (뉴스메이커)" }],
  },
  {
    year: "2015년",
    items: [{ month: "10월", text: "단열차음터닝도어 개발" }],
  },
  {
    year: "2016년",
    items: [{ month: "01월", text: "건축설계사 협회 우수 건축자제 업체 선정" }],
  },
  {
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
      { month: "02월", text: "결로방지도어 인증 흭득" },
      { month: "02월", text: "외기형도어 개발 및 상품 출시" },
      { month: "02월", text: "KS인증 (창세트 KSF3117 및 문세트 KSF3109)" },
      { month: "04월", text: "BBG (Blind Between Glass) 개발 및 상품 출시" },
      { month: "08월", text: "터닝도어 고효율 에너지 기자재 등록" },
      { month: "11월", text: "화성시청 모밤상공인 표창" },
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

const combinedData = [...leftData, ...rightData].sort((a, b) =>
  parseInt(a.year) - parseInt(b.year)
);

export default function HistoryTimeline() {
  const [openItems, setOpenItems] = useState({});

  const toggleOpen = (year) => {
    setOpenItems(prev => ({
      ...prev,
      [year]: !prev[year],
    }));
  };

  return (
    <section
      id="history"
      className="snap-start pt-24 pb-12 px-4 bg-white"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-center text-[#004A91] mb-6">
        회사연혁
      </h2>

      <div className="max-w-3xl mx-auto space-y-4">
        {combinedData.map((entry) => (
          <div key={entry.year} className="border-b border-gray-200 last:border-b-0">
            <button
              onClick={() => toggleOpen(entry.year)}
              className="w-full flex justify-between items-center py-4 px-4 text-left bg-white hover:bg-gray-50 transition-colors duration-200"
            >
              <h3 className="text-xl font-bold text-[#004A91] tracking-wide">
                {entry.year}
                {entry.subtitle && (
                  <span className="ml-4 text-sm text-gray-600 font-normal">
                    {entry.subtitle}
                  </span>
                )}
              </h3>
              <svg
                className={`w-5 h-5 text-[#004A91] transform transition-transform duration-200 ${
                  openItems[entry.year] ? 'rotate-180' : 'rotate-0'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openItems[entry.year] ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <div className="py-4 px-4 bg-gray-50">
                {entry.items.map((item, i) => (
                  <div key={i} className="mb-2 last:mb-0">
                    <p className="text-sm">
                      <span className="font-bold mr-2 text-gray-700">{item.month}</span>
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}