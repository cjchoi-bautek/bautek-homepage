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
      { month: "07월", text: "유망중소기업 선정 (경기 중소기업청)" },
      { month: "12월", text: "우수벤처기업 수상 (경기 중소기업청)" },
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

const renderTimeline = (data) => {
  return (
    <div className="relative">
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-200 hidden md:block" />
      <div className="flex flex-col gap-y-1">
        {data.map((entry, idx) => {
          const isLeft = idx % 2 === 0;
          return (
            <div key={idx} className={`relative w-full flex ${isLeft ? "md:justify-start" : "md:justify-end"}`}>
              <div className="w-full md:w-[calc(50%-20px)] px-2">
                {entry.subtitle && (
                  <h4 className="text-sm font-semibold text-[#004A91] mb-0.5">
                    {entry.subtitle}
                  </h4>
                )}
                <div className="mb-1">
                  <div className="flex items-center text-xs font-bold text-[#004A91] mb-0.5">
                    <span>{entry.year}</span>
                  </div>
                  {entry.items.map((item, i) => (
                    <div key={i} className="mb-0.5">
                      <div className={`border border-gray-300 shadow-sm p-1 text-xs leading-tight rounded-md`}>
                        <span>
                          <span className="text-[10px] font-semibold text-gray-700 bg-gray-200 px-1 py-0.5 rounded mr-1">
                            {item.month}
                          </span>
                          {/* 볼드 처리 로직 재추가 */}
                          {item.text.includes("설립") || item.text.includes("인증") || item.text.includes("출시") || item.text.includes("개발") || item.text.includes("대상")
                            ? <strong>{item.text}</strong>
                            : item.text}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute top-1 md:top-1.5 left-1/2 transform -translate-x-1/2 w-2.5 h-2.5 bg-[#004A91] rounded-full border-2 border-white shadow hidden md:block" />
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
      className="snap-start min-h-screen pt-12 pb-6 px-4 bg-white"
    >
      <h2 className="text-2xl md:text-4xl font-bold text-center text-[#004A91] mb-4">
        회사연혁
      </h2>

      <div className="max-w-screen-xl mx-auto md:grid md:grid-cols-2 md:gap-x-8">
        <div className="col-span-1 mb-10 md:mb-0">
          <h3 className="text-xl font-semibold text-[#004A91] mb-4 text-center">
            2002년 – 2012년
          </h3>
          {renderTimeline(leftData)}
        </div>
        <div className="col-span-1">
          <h3 className="text-xl font-semibold text-[#004A91] mb-4 text-center">
            2013년 – 현재
          </h3>
          {renderTimeline(rightData)}
        </div>
      </div>
    </section>
  );
}