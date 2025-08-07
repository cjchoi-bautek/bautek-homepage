// src/Company.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import HistoryTimeline from './components/history';

// Motion Variants (재사용 가능한 애니메이션 설정)
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      staggerChildren: 0.2
    }
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Company() {
  const [videoKey, setVideoKey] = useState(0);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, []);

  const handleVideoEnd = () => {
    setTimeout(() => {
      setVideoKey(prevKey => prevKey + 1);
    }, 500);
  };

  return (
    <main className="h-screen overflow-y-auto snap-y snap-proximity font-Pretendard">
      {/* Greeting Section (인사말) - 최종 버전 */}
      <section
        id="greeting"
        className="snap-start min-h-screen relative flex flex-col items-start justify-center overflow-hidden font-Pretendard"
      >
        <img
          src="/Company/factory.jpg"
          alt="바우텍 공장 전경"
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
        />
        <div className="absolute inset-0 bg-black opacity-60 z-0"></div>
        <motion.div
          className="relative z-10 w-full max-w-4xl p-6 md:p-12 md:ml-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={sectionVariants}
        >
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-white mb-6 text-shadow-lg text-left"
            variants={itemVariants}
          >
            대표이사 인사말
          </motion.h2>
          <motion.div
            className="text-lg md:text-xl text-white leading-relaxed space-y-6 text-shadow-lg"
            variants={itemVariants}
          >
            <span className="block text-xl md:text-2xl font-semibold mb-4 text-white text-wrap break-keep hyphens-auto text-left italic">
              “기술은 사람을 위하고, 품질은 신뢰를 만듭니다.”
            </span>
            <p className="text-left text-wrap break-keep">
              2002년 창립한 <strong>㈜바우텍</strong>은 창호(Window & Door) 분야에서 독일식 시스템이 접목된 고성능·고기술 제품을 중심으로 성장해온 기술 중심 강소기업입니다.
            </p>
            <p className="text-left text-wrap break-keep">
              바우텍은 <strong>제로 에너지 빌딩(ZEB) SMART 주택</strong>에 필요한 에너지 절약형 제품과 <strong>주거 편의성·친환경성 향상에 기여하는 솔루션</strong>을 지속적으로 개발하고 있습니다.
            </p>
            <p className="text-left text-wrap break-keep">
              앞으로도 바우텍은 사람과 기술, 그리고 사회에 대한 정직함과 성실함을 바탕으로 고객과 함께 성장하고, <strong>시장의 변화를 주도하는 기업</strong>이 되겠습니다.
            </p>
          </motion.div>
          <motion.div
            className="mt-8 flex flex-col items-start justify-center space-y-2"
            variants={itemVariants}
          >
            <span className="text-xl font-medium text-white text-shadow-lg">대표이사 백기한</span>
            <img
              src="/Company/signature.png"
              alt="백기한 대표이사 서명"
              className="h-10 object-contain drop-shadow-md"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Core Capabilities Section (핵심역량) */}
      <section
        id="core"
        className="snap-start min-h-screen px-6 py-16 md:px-20 bg-gradient-to-br from-gray-500 to-white flex flex-col items-center justify-center text-gray-800"
      >
        <motion.h2
          className="text-2xl md:text-4xl font-bold text-bautek-blue mb-10 md:mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          핵심역량
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 w-full max-w-7xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          {[
            {
              icon: "/Company/icon1.png",
              title: "신뢰 기반 납품 실적",
              desc: (
                <>
                  여러 건설사와의 공동 프로젝트 및 납품을 통해 축적된 경험으로, <br />
                  <strong className="font-semibold text-[#003A70]">납기·품질·시공성에서 높은 평가</strong>를 받고 있습니다.
                </>
              ),
            },
            {
              icon: "/Company/icon2.png",
              title: "품질 및 연구개발 시스템",
              desc: (
                <>
                  자체 공장 및 연구소 운영을 통해 <br />생산 공정 전반에 걸친 철저한 품질 관리와 <strong className="font-semibold text-[#003A70]">지속적인 기술개발</strong>을 이어가고 있습니다.
                </>
              ),
            },
            {
              icon: "/Company/icon3.png",
              title: "기술력 & 생산 기반",
              desc: (
                <>
                  <strong className="font-semibold text-[#003A70]">20년 이상 업력의 생산 기반</strong>과<br />고기능 시스템 창호 대응력으로 <br />
                  <strong className="font-semibold text-[#003A70]">다양한 제품을 안정적으로 공급</strong>합니다.
                </>
              ),
            },
            {
              icon: "/Company/icon4.png",
              title: "고객 중심 맞춤 설계",
              desc: (
                <>
                  다양한 시공 환경에 유연하게 대응하며, <br />
                  <strong className="font-semibold text-[#003A70]">프로젝트별 최적화 설계·금형 개발</strong>을 지원합니다.
                </>
              ),
            },
          ].map((item, index) => (
            <motion.div
              key={`core-skill-${item.title.replace(/\s/g, '-')}-${index}`}
              className="flex flex-col items-center text-center px-4 py-6"
              variants={itemVariants}
            >
              <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center mb-6">
                <img src={item.icon} alt={item.title + " 아이콘"} className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 leading-snug break-keep">
                {item.title}
              </h3>
              <p className="text-base text-gray-700 leading-relaxed break-keep">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Vision & Mission Section */}
      <section
        id="vision"
        className="snap-start min-h-screen px-6 py-16 md:px-20 bg-gradient-to-br from-white via-gray-200 to-gray-500 flex flex-col items-center justify-center text-gray-800"
      >
        <motion.h2
          className="text-2xl md:text-4xl font-bold text-bautek-blue mb-10 md:mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          Vision & Mission
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-x-16 mb-8 w-full max-w-6xl">
          <motion.div
            className="flex flex-col items-center text-center"
            initial="hidden"
            whileInView="visible"
            variants={itemVariants}
            transition={{ delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="w-16 h-16 flex items-center justify-center mb-3">
              <img src="/Company/icon6.png" alt="비전 아이콘" className="w-full h-full object-contain" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Vision</h3>
            <p className="text-base text-gray-700 leading-relaxed max-w-sm mx-auto text-wrap break-keep">
              <strong className="text-bautek-blue font-semibold">정밀한 설계, 우수한 품질, 유연한 대응력</strong>을 기반으로 <strong className="font-semibold"><br />최고의 프리미엄 건축자재 브랜드로 도약</strong>합니다.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col items-center text-center"
            initial="hidden"
            whileInView="visible"
            variants={itemVariants}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="w-16 h-16 flex items-center justify-center mb-3">
              <img src="/Company/icon5.png" alt="미션 아이콘" className="w-full h-full object-contain" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Mission</h3>
            <p className="text-base text-gray-700 leading-relaxed max-w-sm mx-auto text-wrap break-keep">
              <strong className="text-bautek-blue font-semibold">기술력과 품질 경쟁력</strong>을 바탕으로, <strong className="font-semibold"><br />고객의 신뢰</strong>를 받는 고성능 건축자재를 생산하고 공급합니다.
            </p>
          </motion.div>

        </div>

        {/* Our Core Values (핵심 가치) 수정된 부분 */}
        <motion.div
          className="w-full max-w-6xl p-4 flex flex-col items-center justify-center relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="relative z-10 flex flex-col items-center mb-4">
            <div className="w-14 h-14 flex items-center justify-center mb-2">
              <img src="/Company/icon7.png" alt="핵심 가치 아이콘" className="w-full h-full object-contain" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center">Our Core Values</h3>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 w-full">
            {[
              {
                title: <span className="font-bold text-bautek-blue">기술 기반의 완성도</span>,
                desc: <><strong className="font-semibold">기능성, 시공성, 디자인</strong>을 모두 고려한 제품 설계</>,
              },
              {
                title: <span className="font-bold text-bautek-blue">고객 중심 설계 대응력</span>,
                desc: <>현장 요구에 맞춘 <strong className="font-semibold">맞춤형 기술 적용</strong> 및 <strong className="font-semibold">유연한 커스터마이징</strong></>,
              },
              {
                title: <span className="font-bold text-bautek-blue">품질을 뛰어넘는 신뢰</span>,
                desc: <>납기·품질·협업의 <strong className="font-semibold">안정성까지 아우르는 실제 경험 기반 대응</strong></>,
              },
              {
                title: <span className="font-bold text-bautek-blue">지속 가능한 혁신 역량</span>,
                desc: <>끊임없는 <strong className="font-semibold">기술개발</strong>과 <strong className="font-semibold">생산 인프라 확장</strong>으로 미래 수요 대응</>,
              },
            ].map((value, idx) => (
              <motion.div
                key={`core-value-${idx}`}
                className="flex flex-col items-center text-center p-2 group"
                variants={itemVariants}
                transition={{ delay: 0.1 * idx }}
              >
                <div className="flex-shrink-0 w-6 h-6 mr-0 mb-1 flex items-center justify-center text-bautek-blue group-hover:scale-110 transition-transform duration-200">
                  <svg className="w-full h-full" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-bautek-blue transition-colors duration-200">{value.title}</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{value.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* History Timeline Block (HistoryTimeline 컴포넌트) - 기존 유지 */}
      <HistoryTimeline />

      {/* CI Section (CI / BI) - ELIV 로고 크기 재조정 */}
      <section
        id="CI"
        className="snap-start relative min-h-screen px-6 py-16 md:px-20 bg-gradient-to-br from-white via-slate-100 to-blue-100 flex flex-col items-center justify-center overflow-hidden"
      >
        <motion.video
          key={videoKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1 }}
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnd}
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="/Company/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </motion.video>
        <motion.div
          className="absolute inset-0 bg-black z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: (videoKey % 2 === 0) ? 0.4 : 1 }}
          transition={{ duration: 0.5 }}
        />
        <div className="relative z-10 w-full max-w-6xl flex flex-col items-center">
          <div className="mb-10 md:mb-16 text-center">
            <motion.h2
              className="text-2xl md:text-4xl font-bold text-bautek-blue text-shadow-sm"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
            >
              CI / BI
            </motion.h2>
          </div>
          <div className="w-full flex flex-col md:flex-row items-stretch justify-center gap-12 md:gap-24">
            <motion.div
              className="w-full md:w-1/2 flex flex-col items-center text-center p-4 md:p-0"
              initial="hidden"
              whileInView="visible"
              variants={itemVariants}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-white mb-8 text-shadow-sm">CI (Corporate Identity)</h3>
              <div className="flex justify-center mb-8 h-24 md:h-28 items-center w-full">
                <img
                  src="/Company/logo1.png"
                  alt="바우텍 로고 풀버전"
                  className="w-[200px] md:w-[300px] h-auto object-contain drop-shadow-md"
                />
              </div>
              <div className="flex flex-col gap-5 max-w-md mx-auto">
                <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start space-y-2 md:space-y-0 md:space-x-4 text-center md:text-left">
                  <img src="/Company/logo3.png" alt="BAU 로고 부분" className="h-7 object-contain mt-1 shrink-0 drop-shadow-sm" />
                  <p className="text-white text-base md:text-lg leading-relaxed text-shadow-sm text-wrap break-keep">
                    ‘바우하우스’의 핵심철학인 신용기술과 디자인을 연구개발의 핵심철학으로 삼고 있습니다.
                  </p>
                </div>
                <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start space-y-2 md:space-y-0 md:space-x-4 text-center md:text-left">
                  <img src="/Company/logo4.png" alt="TEK 로고 부분" className="h-7 object-contain mt-1 shrink-0 drop-shadow-sm" />
                  <p className="text-white text-base md:text-lg leading-relaxed text-shadow-sm text-wrap break-keep">
                    인간중심 기술을 지향하는 바우텍의 마음을 담았습니다.
                  </p>
                </div>
              </div>
            </motion.div>
            <div className="flex-shrink-0 flex items-center justify-center">
              <motion.div
                className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center text-white text-5xl md:text-6xl font-bold mx-auto"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1, transition: { delay: 0.4, duration: 0.5, ease: "easeOut" } }}
                viewport={{ once: true, amount: 0.5 }}
              >
                &
              </motion.div>
            </div>
            <motion.div
              className="w-full md:w-1/2 flex flex-col items-center text-center p-4 md:p-0"
              initial="hidden"
              whileInView="visible"
              variants={itemVariants}
              transition={{ delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-white mb-8 text-shadow-sm">BI (Brand Identity)</h3>
              <div className="flex justify-center mb-8 h-24 md:h-28 items-center w-full">
                <img
                  src="/Company/logo2.png"
                  alt="엘리브 로고"
                  className="w-[160px] md:w-[220px] h-auto object-contain drop-shadow-md"
                />
              </div>
              <div className="flex flex-col gap-4 max-w-md mx-auto">
                <p className="text-white text-base md:text-lg leading-relaxed text-left text-shadow-sm">
                  하늘과 땅 그리고 공간, <strong className="text-bautek-blue">ELIV</strong>
                </p>
                <p className="text-white text-base md:text-lg leading-relaxed text-left text-shadow-sm text-wrap break-keep">
                  엘리브는 자연을 공간감으로 담아내는 제품이야말로 <br />삶을 풍요롭게 만든다고 믿고 있습니다. <br />
                  자연을 품은 공간 엘리브가 만들어 갑니다.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}