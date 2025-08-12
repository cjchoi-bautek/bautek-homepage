import React, { useRef, useCallback, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const productList = [
  {
    id: 'door',
    name: "터닝도어",
    desc: "더 조용하고 따듯한 공간을 담은 도어",
    category: "DOOR SOLUTION",
    image: "/ProductSlider/turningdoor1.jpg",
    alt: "모던한 인테리어에 설치된 단열차음도어",
  },
  {
    id: 'louver',
    name: "시스템 루버",
    desc: "단열 및 기밀을 통해 실외기를 지키는 환기 시스템",
    category: "LOUVER SOLUTION",
    image: "/ProductSlider/louver1.jpg",
    alt: "건물 외벽에 설치된 시스템 루버",
  },
  {
    id: 'bbg',
    name: "블라인드 내장형 복층유리 (BBG)",
    desc: "블라인드를 유리 사이에 담은 새로운 개념",
    category: "GLASS SOLUTION",
    image: "/ProductSlider/BBG1.jpg",
    alt: "유리 사이에 블라인드가 내장된 블라인드유리",
  },
];

const featuresByProduct = {
  "터닝도어": [
    { id: 'door-f1', icon: "/ProductSlider/turningdooricon1.png", title: "에너지효율", subtitle: ["열 손실을 줄이는 고기밀 설계"] },
    { id: 'door-f2', icon: "/ProductSlider/turningdooricon2.png", title: "소음 차단", subtitle: ["소음을 차단하는 구조"] },
    { id: 'door-f3', icon: "/ProductSlider/turningdooricon3.png", title: "디테일 완성도", subtitle: ["완성도를 높이는 정돈된 디자인"] },
    { id: 'door-f4', icon: "/ProductSlider/turningdooricon4.png", title: "현장 대응력", subtitle: ["다양한 현장에 유연한 설치"] },
  ],
  "시스템 루버": [
    { id: 'louver-f1', icon: "/ProductSlider/turningdooricon1.png", title: "단열/기밀성", subtitle: ["결로 완화와 냉·난방 효율을 높인 구조 설계"] },
    { id: 'louver-f2', icon: "/ProductSlider/louvericon2.png", title: "청소 및 유지관리", subtitle: ["오염·부식에 강한 고내구성 소재 적용"] },
    { id: 'louver-f3', icon: "/ProductSlider/louvericon3.png", title: "구조 안정성 / 제품 내구성", subtitle: ["날개 결속 기술로 개폐 시 흔들림 및 소음 최소화"] },
    { id: 'louver-f4', icon: "/ProductSlider/louvericon4.png", title: "설계 완성도", subtitle: ["기능성과 구조 안정성을 함께 고려한 기술 설계"] },
  ],
  "블라인드 내장형 복층유리 (BBG)": [
    { id: 'bbg-f1', icon: "/ProductSlider/turningdooricon1.png", title: "에너지 절감", subtitle: ["냉난방 에너지 절감"] },
    { id: 'bbg-f2', icon: "/ProductSlider/bbgicon2.png", title: "사용편의", subtitle: ["무전원 간편 조작"] },
    { id: 'bbg-f3', icon: "/ProductSlider/louvericon2.png", title: "위생적 유지", subtitle: ["청소/세탁 없는 간편 관리"] },
    { id: 'bbg-f4', icon: "/ProductSlider/bbgicon4.png", title: "사용 안전", subtitle: ["줄꼬임·파손 방지"] },
  ],
};

export default function ProductSlider() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const swiperNavigation = useMemo(() => ({
    prevEl: prevRef.current,
    nextEl: nextRef.current,
  }), [prevRef.current, nextRef.current]);

  const handleSwiperBeforeInit = useCallback((swiper) => {
    if (prevRef.current && nextRef.current) {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
    }
  }, []);

  return (
    <section className="snap-start min-h-screen flex flex-col relative overflow-hidden bg-white font-Pretendard">
      <style>{`
		.swiper-button-prev::after,
		.swiper-button-next::after { display: none !important; }
		.swiper-pagination { bottom: 40px !important; }
		.swiper-pagination-bullet { background: #cbd5e1; opacity: 1; }
		.swiper-pagination-bullet-active { background: #2563eb; }

		/* ✅ 한글은 단어 중간 금지, 영어/긴 토큰은 자연스럽게 줄바꿈 */
		.no-cjk-break,
		.no-cjk-break * {
			word-break: keep-all !important;
			overflow-wrap: anywhere !important;  /* ← 이게 핵심 */
			white-space: normal !important;
			hyphens: auto;
						}

		/* 기존 클래스도 보강 (desc 전용) */
		.product-desc {
			word-break: keep-all;
			overflow-wrap: anywhere;   /* ← 추가 */
						}
`}</style>

      {/* div에 있던 패딩을 제거하고, h2에 마진을 추가 */}
      <div className="w-full text-center relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold text-bautek-blue mt-14 md:mt-24 mb-4">주요 제품</h2>
      </div>

      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 15000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={swiperNavigation}
        onBeforeInit={handleSwiperBeforeInit}
        modules={[Autoplay, Pagination, Navigation]}
        className="flex-grow w-full"
      >
        {productList.map((item) => {
          const currentFeatures = featuresByProduct[item.name];
          return (
            <SwiperSlide key={`product-slide-${item.id}`}>
              <motion.div
                className="w-full h-full flex flex-col md:flex-row items-center justify-center px-4 md:px-24 py-8 md:py-14 min-w-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                {/* 이미지 + 모바일 버튼 */}
                <motion.div
                  className="w-full md:w-1/2 min-w-0 basis-0 flex justify-center items-center relative py-4"
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  {/* 모바일 버튼 (좌우) */}
                  <div
                    ref={prevRef}
                    className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white/70 backdrop-blur p-1 rounded-full shadow-md hover:scale-105 transition w-8 h-8 flex items-center justify-center"
                  >
                    <img src="/ProductSlider/arrowleft.png" alt="이전" className="w-4 h-4" />
                  </div>
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="max-h-[45vh] md:max-h-[70vh] object-contain rounded-xl shadow-2xl"
                  />
                  <div
                    ref={nextRef}
                    className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white/70 backdrop-blur p-1 rounded-full shadow-md hover:scale-105 transition w-8 h-8 flex items-center justify-center"
                  >
                    <img src="/ProductSlider/arrowright.png" alt="다음" className="w-4 h-4" />
                  </div>
                </motion.div>

                {/* 텍스트 */}
                <motion.div
                  className="w-full md:w-1/2 min-w-0 basis-0 p-4 md:p-8"
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <p className="text-sm md:text-base tracking-widest text-bautek-blue uppercase mb-2">
                    {item.category}
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold text-bautek-blue mb-3">
                    {item.name}
                  </h2>
                  <p 
				    className="text-base md:text-lg text-gray-700 mb-6 leading-relaxed product-desc no-cjk-break">
                    {item.desc}
                  </p>

                  {/* 특징 리스트 */}
                  {currentFeatures && (
                    <motion.ul
                      className="list-none p-0 m-0 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4"
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.1 } },
                      }}
                    >
                      {currentFeatures.map((feature) => (
                        <motion.li
                          key={`feature-${feature.id}`}
                          className="flex items-start gap-3 py-2"
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                        >
                          <img
                            src={feature.icon}
                            alt={`${item.name}의 ${feature.title} 아이콘`}
                            className="w-10 h-10 flex-shrink-0 mt-1"
                          />
                          <div>
                            <h4 className="text-lg md:text-xl font-bold text-bautek-blue mb-1">
                              {feature.title}
                            </h4>
                            {feature.subtitle.map((line, i) => (
                              <p key={`subtitle-${feature.id}-${i}`} className="text-base md:text-lg text-gray-700 leading-relaxed">
                                {line}
                              </p>
                            ))}
                          </div>
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </motion.div>
              </motion.div>
            </SwiperSlide>
          );
        })}

        {/* 데스크탑 내비게이션 버튼 */}
        <div
          ref={prevRef}
          className="swiper-button-prev hidden md:flex absolute top-1/2 left-4 -translate-y-1/2 z-20 cursor-pointer bg-white/70 backdrop-blur p-2 rounded-full shadow-md hover:scale-105 transition flex items-center justify-center w-10 h-10"
          role="button"
          aria-label="이전 제품 보기"
        >
          <img src="/ProductSlider/arrowleft.png" alt="이전 제품 아이콘" className="w-5 h-5" />
        </div>
        <div
          ref={nextRef}
          className="swiper-button-next hidden md:flex absolute top-1/2 right-4 -translate-y-1/2 z-20 cursor-pointer bg-white/70 backdrop-blur p-2 rounded-full shadow-md hover:scale-105 transition flex items-center justify-center w-10 h-10"
          role="button"
          aria-label="다음 제품 보기"
        >
          <img src="/ProductSlider/arrowright.png" alt="다음 제품 아이콘" className="w-5 h-5" />
        </div>
      </Swiper>
    </section>
  );
}