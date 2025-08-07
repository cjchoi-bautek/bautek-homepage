import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";


// FileDownloadButton 컴포넌트는 그대로 사용합니다.
import FileDownloadButton from "./components/FileDownloadButton";

const fadeInVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// 📂 자료실 데이터를 위한 중첩된 더미 데이터로 변경
/*
const fileData = {
  testReports: {
    "단열차음도어": {
      "BPF 100": [
        { fileName: "단열차음도어 BPF 100 시험성적서 A", fileType: "pdf", downloadUrl: "#" },
      ],
      "BPF 130": [
        { fileName: "단열차음도어 BPF 130 시험성적서 A", fileType: "pdf", downloadUrl: "#" },
        { fileName: "단열차음도어 BPF 130 시험성적서 B", fileType: "pdf", downloadUrl: "#" },
        { fileName: "단열차음도어 BPF 130 시험성적서 C", fileType: "pdf", downloadUrl: "#" },
      ],
      "BPF 150": [
        { fileName: "단열차음도어 BPF 150 시험성적서 A", fileType: "pdf", downloadUrl: "#" },
        { fileName: "단열차음도어 BPF 150 시험성적서 B", fileType: "pdf", downloadUrl: "#" },
      ],
      "BPF 180": [
        { fileName: "단열차음도어 BPF 180 시험성적서 A", fileType: "pdf", downloadUrl: "#" },
      ],
      "BPF 180-1": [
        { fileName: "단열차음도어 BPF 180-1 시험성적서 A", fileType: "pdf", downloadUrl: "#" },
      ],
      "BPF 240": [
        { fileName: "단열차음도어 BPF 240 시험성적서 A", fileType: "pdf", downloadUrl: "#" },
      ],
    },
    "단열도어": {
      "BPF 100": [
        { fileName: "단열도어 Model A 시험성적서 1", fileType: "pdf", downloadUrl: "#" },
        { fileName: "단열도어 Model A 시험성적서 2", fileType: "pdf", downloadUrl: "#" },
      ],
      "BPF 130": [
        { fileName: "단열도어 Model B 시험성적서 1", fileType: "pdf", downloadUrl: "#" },
      ],
      "BPF 150": [
        { fileName: "단열도어 Model B 시험성적서 1", fileType: "pdf", downloadUrl: "#" },
      ],
      "BPF 180": [
        { fileName: "단열도어 Model B 시험성적서 1", fileType: "pdf", downloadUrl: "#" },
      ],
    },
    "외기형도어": {
      "BPF 180": [
        { fileName: "외기형도어-1 시험성적서", fileType: "pdf", downloadUrl: "#" },
      ],
    },
    "시스템루버": {
      "루버 타입 A": [
        { fileName: "시스템루버 루버 타입 A 시험성적서", fileType: "pdf", downloadUrl: "#" },
      ],
    },
  },
  certificates: [
    { fileName: "KS 인증서 (KS F 2200-1)", fileType: "pdf", downloadUrl: "#" },
    { fileName: "친환경 건축자재 인증서", fileType: "pdf", downloadUrl: "#" },
    { fileName: "품질경영시스템 인증서 (ISO 9001)", fileType: "pdf", downloadUrl: "#" },
    { fileName: "환경경영시스템 인증서 (ISO 14001)", fileType: "pdf", downloadUrl: "#" },
    { fileName: "기술혁신형 중소기업(Inno-Biz) 확인서", fileType: "pdf", downloadUrl: "#" },
    { fileName: "뿌리기술 전문기업 지정서", fileType: "pdf", downloadUrl: "#" },
    { fileName: "특허 등록증 (자동 환기 시스템)", fileType: "pdf", downloadUrl: "#" },
    { fileName: "특허 등록증 (단열 창호 기술)", fileType: "pdf", downloadUrl: "#" },
    { fileName: "벤처기업 확인서", fileType: "pdf", downloadUrl: "#" },
    { fileName: "성능인증서", fileType: "pdf", downloadUrl: "#" },
  ],
};
*/

// FileDownloadButton 컴포넌트에 아이콘을 추가하기 위한 컴포넌트 추가
const DownloadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 ml-2"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
    />
  </svg>
);

export default function SupportPage() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
    
  // 탭 상태 관리를 위한 useState 훅 3개 (자료실 섹션 주석 처리로 인해 사용되지 않음)
  /*
  const [activeCategoryTab, setActiveCategoryTab] = useState("testReports");
  const [activeProductTab, setActiveProductTab] = useState(Object.keys(fileData.testReports)[0]);
  const [activeModelTab, setActiveModelTab] = useState(Object.keys(fileData.testReports[Object.keys(fileData.testReports)[0]])[0]);

  // `activeProductTab`이 변경될 때, `activeModelTab`을 첫 번째 모델로 초기화
  useEffect(() => {
    if (activeCategoryTab === "testReports" && fileData.testReports[activeProductTab]) {
      const firstProductModel = Object.keys(fileData.testReports[activeProductTab])[0];
      setActiveModelTab(firstProductModel);
    }
  }, [activeCategoryTab, activeProductTab]);
  */


  // 폼 제출 핸들러 (커스텀 유효성 검사)
  const handleFormSubmit = (event) => {
    // 기본 제출 동작 막기
    event.preventDefault();

    const form = event.target;

    // 필수 텍스트 필드와 커스텀 메시지 설정
    const requiredFields = [
      { name: 'name', label: '이름을' },
      { name: 'email', label: '이메일을' },
      { name: 'phone', label: '연락처를' },
      { name: 'title', label: '제목을' },
      { name: 'message', label: '문의 내용을' },
    ];

    for (const field of requiredFields) {
      const input = form.elements[field.name];
      if (input.value.trim() === '') {
        alert(`${field.label} 입력해주세요.`);
        input.focus(); // 해당 필드로 포커스 이동
        return; // 유효성 검사 실패 시 함수 종료
      }
    }
      
    // ⚠️ 개인정보 필수 동의 체크박스 유효성 검사
    const requiredConsentCheckbox = form.elements['privacy_consent_required'];
    if (!requiredConsentCheckbox.checked) {
      alert("개인정보 수집 및 이용 필수사항에 동의해야 문의하기를 진행할 수 있습니다.");
      requiredConsentCheckbox.focus();
      return;
    }

    // 모든 필수 필드가 채워졌으면 실제 폼 제출
    form.submit();
  };

  return (
    <main className="font-Pretendard overflow-y-scroll h-screen md:snap-y md:snap-proximity md:scroll-smooth">
      {/* 🔵 Hero Landing Section */}
      <section className="min-h-screen bg-gradient-to-br from-white via-gray-200 to-gray-500 flex flex-col justify-center items-center px-4 py-10 md:py-20 md:snap-start">
        <motion.div
          className="text-center mb-8 md:mb-16"
          variants={fadeInVariants}
          initial="initial"
          animate="animate"
        >
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#004A91] mb-8">
            고객지원
          </h1>
          <p className="text-sm sm:text-lg text-gray-700 max-w-3xl mx-auto">
            제품 상담부터 견적 요청, A/S 문의, 자사 쇼핑몰이용까지 필요한 모든 정보를 한 곳에서 확인하세요.
          </p>
        </motion.div>

        {/* 🔵 Three Cards */}
        {/* 수정된 부분: md:grid-cols-2를 md:grid-cols-3으로 변경하고, 자료실 카드의 주석을 해제합니다. */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 w-full max-w-7xl">
          <motion.div
            onClick={() => scrollTo("contact")}
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer bg-white/20 backdrop-blur-md p-6 md:p-8 rounded-xl shadow-lg transition hover:shadow-xl hover:bg-white/30"
          >
            {/* 문의하기 카드 */}
            <div className="flex items-center mb-2">
              <img src="/Support/email.png" alt="문의하기" className="h-10 w-10 md:h-14 md:w-14 mr-3" />
              <h2 className="text-xl md:text-2xl font-bold text-[#004A91]">기타문의</h2>
            </div>
            <p className="text-sm md:text-base text-gray-800">
              제품 및 기타 문의 남겨주시면 연락드리겠습니다.
            </p>
          </motion.div>

          <motion.div
            onClick={() => scrollTo("service")}
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer bg-white/20 backdrop-blur-md p-6 md:p-8 rounded-xl shadow-lg transition hover:shadow-xl hover:bg-white/30"
          >
            {/* A/S 문의 카드 */}
            <div className="flex items-center mb-2">
              <img src="/Support/as.png" alt="A/S 문의" className="h-10 w-10 md:h-14 md:w-14 mr-3" />
              <h2 className="text-xl md:text-2xl font-bold text-[#004A91]">A/S 문의</h2>
            </div>
            <p className="text-sm md:text-base text-gray-800">
              카카오톡을 통해 쉽고 빠르게 A/S를 신청해주세요. 
            </p>
          </motion.div>

          <motion.div
            onClick={() => scrollTo("shoppingmall")}
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer bg-white/20 backdrop-blur-md p-6 md:p-8 rounded-xl shadow-lg transition hover:shadow-xl hover:bg-white/30"
          >
            {/* 자사 쇼핑몰 카드 */}
            <div className="flex items-center mb-2">
              <img src="/Support/shop.png" alt="자사 쇼핑몰" className="h-10 w-10 md:h-14 md:w-14 mr-3" />
              <h2 className="text-xl md:text-2xl font-bold text-[#004A91]">
                자사 쇼핑몰
              </h2>
            </div>
            <p className="text-sm md:text-base text-gray-800">
              다양한 제품을 온라인 쇼핑몰에서 만나보세요.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 🔵 문의하기 Section */}
      <section
        id="contact"
        className="min-h-screen bg-gradient-to-br from-gray-400 to-white py-8 px-2 flex flex-col justify-center items-center md:snap-start"
      >
        <motion.div
          className="max-w-4xl w-full"
          variants={fadeInVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-[#004A91] mb-2 text-center">
            문의하기
          </h2>
          <form
            onSubmit={handleFormSubmit}
            action="https://formspree.io/f/xjkoawed"
            method="POST"
            className="w-full max-w-2xl space-y-4 mx-auto bg-white p-2 md:p-4 rounded-xl shadow-lg"
          >
            <div>
              <label className="block text-xs font-medium text-gray-700">
                이름 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                className="w-full p-1 border border-gray-300 rounded-md shadow-sm text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700">
                회사명
              </label>
              <input
                type="text"
                name="company"
                className="w-full p-1 border border-gray-300 rounded-md shadow-sm text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700">
                이메일 <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                className="w-full p-1 border border-gray-300 rounded-md shadow-sm text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700">
                연락처 <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                className="w-full p-1 border border-gray-300 rounded-md shadow-sm text-sm"
                required
              />
            </div>
              
            <div>
              <label className="block text-xs font-medium text-gray-700">
                제목 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                className="w-full p-1 border border-gray-300 rounded-md shadow-sm text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700">
                문의 내용 <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                rows="2"
                className="w-full p-1 border border-gray-300 rounded-md shadow-sm text-sm"
                required
              ></textarea>
              <p className="mt-1 text-[11px] text-gray-500">
                <span className="text-red-500">*</span> 필수값입니다.
              </p>
            </div>
              
            {/* 🔵 개인정보 수집 및 이용 동의 섹션 (내용 업데이트 및 필수/선택 분리) */}
            <div>
              <h3 className="text-sm font-bold text-gray-700 mb-2">
                개인정보 수집, 이용 및 위탁 안내
              </h3>
              <div className="bg-gray-100 p-3 rounded-md text-xs text-gray-600 max-h-40 md:max-h-28 overflow-y-auto space-y-2">
                {/* 1. 수집 항목 */}
                <div>
                  <p className="font-bold">1. 수집 항목</p>
                  <ul className="list-disc pl-5">
                    <li><span className="font-bold">필수항목:</span> 이름, 이메일, 연락처(휴대전화번호/전화번호), 제목, 문의 내용</li>
                    <li><span className="font-bold">선택항목:</span> 회사명</li>
                  </ul>
                </div>
                {/* 2. 수집 목적 */}
                <div>
                  <p className="font-bold">2. 수집 목적</p>
                  <ul className="list-disc pl-5">
                    <li>제품 및 서비스 문의 응대</li>
                    <li>A/S 접수 및 처리</li>
                    <li>고객 응대 기록 보관</li>
                  </ul>
                </div>
                {/* 3. 보유 및 이용 기간 */}
                <div>
                  <p className="font-bold">3. 보유 및 이용 기간</p>
                  <p>수집일로부터 3년간 보관 후 파기</p>
                  <p>단, 관계 법령에 따라 보존이 필요한 경우 해당 기간까지 보관</p>
                </div>
                {/* 4. 동의 거부 권리 및 불이익 안내 */}
                <div>
                  <p className="font-bold">4. 동의 거부 권리 및 불이익 안내</p>
                  <p>귀하는 개인정보 수집·이용 및 위탁에 대해 동의를 거부할 권리가 있습니다. 다만, 필수정보에 대한 동의를 거부하시는 경우, 서비스 제공에 제한이 있을 수 있습니다.</p>
                  <p className="text-[10px] mt-1">※ 위 내용은 당사 홈페이지 개인정보처리방침에 따라 관리되며, 세부사항은 언제든지 확인하실 수 있습니다.</p>
                </div>
              </div>
                
              {/* 필수 동의 체크박스 */}
              <div className="mt-4 flex items-center">
                <input
                  type="checkbox"
                  id="privacy_consent_required"
                  name="privacy_consent_required"
                  className="mr-2 h-4 w-4 text-[#004A91] border-gray-300 rounded"
                />
                <label htmlFor="privacy_consent_required" className="text-xs font-medium text-gray-700">
                  개인정보 수집 및 이용 필수사항에 동의합니다. <span className="text-red-500">*</span>
                </label>
              </div>

              {/* 선택 동의 체크박스 */}
              <div className="mt-2 flex items-center">
                <input
                  type="checkbox"
                  id="marketing_consent_optional"
                  name="marketing_consent_optional"
                  className="mr-2 h-4 w-4 text-[#004A91] border-gray-300 rounded"
                />
                <label htmlFor="marketing_consent_optional" className="text-xs font-medium text-gray-700">
                  마케팅 정보 수신에 동의합니다. (선택)
                </label>
              </div>

            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#004A91] text-white font-bold rounded-md hover:bg-[#003A70] transition mt-6"
            >
              문의하기
            </button>
          </form>
        </motion.div>
      </section>

      {/* 🔵 A/S 문의 Section */}
      <section
        id="service"
        className="min-h-screen bg-gradient-to-br from-white via-gray-200 to-gray-500 py-10 px-4 flex flex-col justify-center items-center md:snap-start"
      >
        <motion.div
          className="max-w-4xl w-full text-center space-y-8"
          variants={fadeInVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-[#004A91]">A/S 문의</h2>
            
          {/* 카카오톡 안내 섹션 */}
          <div className="p-6 md:p-12">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
              카카오톡을 통한 편하고 빠른 A/S 접수가 가능합니다.
            </h3>
            <p className="text-sm md:text-base text-gray-600 mb-1">
              사진이나 동영상을 첨부하여 문의하시면 <span className="font-extrabold text-[#004A91]">더욱 빠르고 정확한 상담</span>을 받을 수 있습니다.  
            </p>
      <p className="text-xs md:text-base text-gray-600 mb-4">
              자사 쇼핑몰에서 제품을 구매하신 후 제공되는 셀프 시공 영상을 참고하여 직접 설치하실 수도 있습니다.
            </p>
      <p className="text-[11px] text-gray-600 mb-4">
              자재 수급 상황이나 A/S 기사 배정 일정에 따라 처리까지 다소 시간이 소요될 수 있는 점 양해 부탁드립니다.
            </p>
      
            

            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <a
                href="https://pf.kakao.com/_GRYWT/chat"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-3 rounded-full transition w-full md:w-auto justify-center"
              >
                <img src="/Support/kakaotalk.png" className="h-8 w-8 md:h-10 md:w-10" alt="카카오톡 아이콘" />
                <span>카카오톡 채팅 바로가기</span>
              </a>
            </div>

            {/* A/S 절차 안내 */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-2">A/S 접수 절차</h4>
              <ol className="text-center space-y-3 text-sm text-gray-700 list-decimal list-inside">
                <li>
                  <span className="font-bold text-[#004A91]">카카오톡 채널 추가: </span>
                  바우텍 A/S 채널을 추가하고 채팅을 시작해 주세요.
                </li>
                <li>
                  <span className="font-bold text-[#004A91]">상세 정보 전달: </span>
                  <span className="font-bold">아파트명, 동, 호수, 증상 사진/영상</span> 등을 함께 보내주시면 더 빠른 상담이 가능합니다.
                </li>
                <li>
                  <span className="font-bold text-[#004A91]">접수 및 상담: </span>
                  전문 상담원이 내용을 확인하고 A/S 접수 및 처리 절차를 안내해 드립니다.
                </li>
              </ol>
            </div>
          </div>
            
          {/* 전화 문의 섹션 */}
          <div className="p-6">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
              <span className="font-extrabold text-[#004A91]">전화 문의</span>
            </h3>
            <p className="text-sm md:text-base text-gray-600 mb-2">
              긴급한 문의사항이나 전화 상담을 원하시면 아래 번호로 연락 주시기 바랍니다.
            </p>
            <div className="text-xl md:text-2xl font-bold text-[#004A91]">
              대표번호: 031-351-0178
            </div>
            <div className="text-xs md:text-sm text-gray-500 mt-2">
              운영 시간: <span className="font-semibold">평일 09:00 ~ 17:30</span> (점심시간 12:30 ~ 13:30 제외) | 토,일요일 및 공휴일 휴무
            </div>
          </div>
        </motion.div>
      </section>

      {/* 🔵 자료실 Section
      <section
        id="resources"
        className="min-h-screen bg-gradient-to-br from-gray-400 to-white py-10 px-4 flex flex-col justify-center items-center md:snap-start"
      >
        <motion.div
          className="max-w-4xl w-full text-center"
          variants={fadeInVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-[#004A91] mb-2">자료실</h2>
          <p className="text-sm md:text-lg text-gray-700 mb-8">
            찾으시는 시험성적서 및 인증서를 다운로드 하실 수 있습니다.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <motion.button
              onClick={() => setActiveCategoryTab("testReports")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`py-2 px-4 rounded-full font-bold text-sm md:text-base transition-colors ${
                activeCategoryTab === "testReports"
                  ? "bg-[#004A91] text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              시험성적서
            </motion.button>
            <motion.button
              onClick={() => setActiveCategoryTab("certificates")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`py-2 px-4 rounded-full font-bold text-sm md:text-base transition-colors ${
                activeCategoryTab === "certificates"
                  ? "bg-[#004A91] text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              인증서
            </motion.button>
          </div>

          <div className="p-4 md:p-8 w-full max-w-3xl mx-auto">
            {activeCategoryTab === "testReports" && (
              <motion.div
                className="space-y-4"
                key="testReports"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl md:text-2xl font-extrabold text-gray-800 mb-4 border-b pb-2">
                  제품 시험성적서
                </h3>
                  
                <div className="flex justify-center gap-2 mb-4 flex-wrap">
                  {Object.keys(fileData.testReports).map((productName) => (
                    <motion.button
                      key={productName}
                      onClick={() => setActiveProductTab(productName)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`py-1.5 px-3 rounded-full text-xs md:text-sm font-semibold transition-colors ${
                        activeProductTab === productName
                          ? "bg-gray-500 text-white shadow"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {productName}
                    </motion.button>
                  ))}
                </div>

                <div className="flex justify-center gap-1.5 mb-4 flex-wrap">
                  {fileData.testReports[activeProductTab] && Object.keys(fileData.testReports[activeProductTab]).map((modelName) => (
                    <motion.button
                      key={modelName}
                      onClick={() => setActiveModelTab(modelName)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`py-1 px-2.5 rounded-full text-[10px] md:text-xs font-medium transition-colors ${
                        activeModelTab === modelName
                          ? "bg-gray-700 text-white shadow"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {modelName}
                    </motion.button>
                  ))}
                </div>

                <motion.div
                  key={activeModelTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3 mt-6"
                >
                  {fileData.testReports[activeProductTab] && fileData.testReports[activeProductTab][activeModelTab] ? (
                    fileData.testReports[activeProductTab][activeModelTab].map((file, index) => (
                      <FileDownloadButton
                        key={index}
                        fileName={file.fileName}
                        fileType={file.fileType}
                        downloadUrl={file.downloadUrl}
                      />
                    ))
                  ) : (
                    <p className="text-gray-500 italic text-center py-4">선택된 모델에 대한 자료가 없습니다.</p>
                  )}
                </motion.div>
              </motion.div>
            )}

            {activeCategoryTab === "certificates" && (
              <motion.div
                className="space-y-4"
                key="certificates"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl md:text-2xl font-extrabold text-gray-800 mb-4 border-b pb-2">
                  인증서 목록
                </h3>
                <div className="space-y-3">
                  {fileData.certificates.map((file, index) => (
                    <FileDownloadButton
                      key={index}
                      fileName={file.fileName}
                      fileType={file.fileType}
                      downloadUrl={file.downloadUrl}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </section>
      */}


      {/* 🔵 자사 쇼핑몰 Section */}
      <section
        id="shoppingmall"
        className="min-h-screen bg-gradient-to-br from-white via-gray-200 to-gray-500 py-10 px-4 flex flex-col justify-center items-center md:snap-start"
      >
        <motion.div
          className="max-w-4xl w-full text-center"
          variants={fadeInVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-[#004A91] mb-6">
            자사 쇼핑몰
          </h2>
          <p className="text-sm md:text-lg text-gray-700 mb-6">
            바우텍 쇼핑몰에서 필요한 부품을 구매하신 후, 누구나 직접 교체하실 수 있습니다.
          </p>
          <a
            href="https://greenbautekmall.co.kr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#004A91] hover:bg-[#003A70] text-white font-semibold px-6 py-3 rounded-full transition"
          >
            쇼핑몰 바로가기
          </a>
        </motion.div>
      </section>
    </main>
  );
}