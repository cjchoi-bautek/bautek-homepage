import React, { useState } from "react";
import ProductNavbar from "./components/ProductNavbar";
import { motion, AnimatePresence } from "framer-motion";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

// 데이터를 객체 배열로 통일하여 관리합니다.
const productCategories = {
  insulationDoors: {
    title: "터닝도어",
    id: 'section-0',
    subtitle: "[단열차음도어 / 단열도어 / 외기형도어 / 유리터닝도어]",
    shortDescription: "터닝도어는 최고의 단열 성능과 완벽한 차음 효과로 \n 쾌적하고 조용한 실내 환경을 제공합니다.\n\n미니멀한 디자인과 뛰어난 기능성으로 \n모든 공간의 가치를 높입니다.",
    shortDescriptionHighlights: [
      { text: "최고의 단열 성능", color: true },
      { text: "완벽한 차음 효과", color: true },
      { text: "뛰어난 기능성", color: true },
    ],
    images: [
      { src: "/Products/TD/product.jpg", alt: "터닝도어 제품 이미지 1" },
      { src: "/Products/TD/product2.jpg", alt: "터닝도어 제품 이미지 2" },
      { src: "/Products/TD/product3.jpg", alt: "터닝도어 제품 이미지 3" },
      { src: "/Products/TD/product5.jpg", alt: "터닝도어 제품 이미지 5" },
      { src: "/Products/TD/product6.jpg", alt: "터닝도어 제품 이미지 6" },
      { src: "/Products/TD/product7.jpg", alt: "터닝도어 제품 이미지 7" },
    ],
    detailedFeatures: [
      {
        icon: "/Products/TD/icon1.png",
        title: "단열/기밀성",
        description: "열 손실을 줄이는 고기밀 설계로, 단열 기준 1,2 지역을 충족하고 \n5-locking Gear 구조로 기밀/밀폐 성능을 극대화합니다.",
        descriptionHighlights: [
          { text: "고기밀 설계", color: true },
          { text: "기밀/밀폐 성능을 극대화", color: true },
        ],
        details: [
          "단열기준 결로 1,2 지역 충족",
          "우수한 단열성으로 에너지 효율 향상",
          "5-locking Gear 구조로 기밀/밀폐 성능 극대화",
        ],
      },
      {
        icon: "/Products/TD/icon2.png",
        title: "차음성",
        description: "소음을 막아주는 차단 구조로 차음재가 추가된 패널과 \n고밀도 프레임으로 소음 차단 성능을 강화했습니다.",
        descriptionHighlights: [
          { text: "소음 차단 성능을 강화", color: true },
        ],
        details: [
          "차음재가 추가된 패널과 고밀도 프레임으로 소음 차단 성능 강화",
          "소음 민감 공간에 적합",
          "기밀 구조와 결합해 프라이버시 효과 향상",
        ],
      },
      {
        icon: "/Products/TD/icon3.png",
        title: "마감성",
        description: "완성도를 높이는 정돈된 마감 디자인으로,\n White Line Zero 구조와 라미네이트 필름 마감으로 \n고급스러운 외관과 내구성을 확보합니다.",
        descriptionHighlights: [
          { text: "고급스러운 외관과 내구성", color: true },
        ],
        details: [
          "White Line Zero 구조로 틈새 없는 매끄러운 외관 구현",
          "라미네이트 필름 마감으로 고급스러운 질감과 내구성 확보",
        ],
      },
      {
        icon: "/Products/TD/icon4.png",
        title: "유틸성",
        description: "다양한 현장에 최적화된 설치 유연성으로, \n프레임 규격이 다양하여 직/간접외기 모두에 적용 가능합니다.",
        descriptionHighlights: [
          { text: "프레임 규격이 다양", color: true },
        ],
        details: [
          "프레임 규격 다양 (100/130/150/180/240 mm 선택 가능)",
          "고성능 PVC 시스템도어로 직/간접외기 모두 적용 가능",
          "일체형 프레임 설계로 깔끔한 시공 마감",
        ],
      },
    ],
    specs: [
      ["적용구간", ["간접외기: 보조주방 / 실외기실 / 발코니", "직접외기: 외기형도어"]],
      ["프레임규격", ["130mm / 150mm / 180mm / 240mm"]],
      ["사이즈", ["맞춤제작 가능"]],
      ["색상", ["내부 필름 색상 지정가능"]],
      ["패널두께", ["23mm 또는 27mm(차음재적용)", "33mm 또는 37mm(차음재적용)", "43mm 또는 47mm(차음재적용)"]],
      ["열관류율", ["0.625 W/㎡·K ~ 1.196 W/㎡·K"]],
      ["기밀성", ["1등급"]],
      ["차음재", ["적용 / 비적용 가능"]],
    ],
  },
  systemLouvers: {
    title: "PVC 시스템루버",
    id: 'section-1',
    subtitle: "[단열/비단열/자동]",
    shortDescription: "PVC 복합 구조와 다층 설계를 통해 \n외기 유입을 철저히 차단하고 실내 온도 변화에 의한 \n결로를 효과적으로 방지합니다. \n\n건축물의 에너지 효율과 마감 품질을 모두 고려한 \n기능성 루버 단열 솔루션입니다.",
    shortDescriptionHighlights: [
      { text: "PVC 복합 구조와 다층 설계", color: true },
      { text: "결로를 효과적으로 방지", color: true },
    ],
    images: [
      { src: "/Products/louver/product1.jpg", alt: "시스템루버 이미지 1" },
      { src: "/Products/louver/product2.jpg", alt: "시스템루버 이미지 2" },
	  { src: "/Products/louver/product3.jpg", alt: "시스템루버 이미지 3" },
    ],
    detailedFeatures: [
      {
        icon: "/Products/louver/icon1.png",
        title: "우수한 단열·기밀 성능",
        description: "PVC 재질과 다중 구조 설계로 뛰어난 단열 및 기밀 성능을 확보해 \n실내 온도 유지와 결로 방지에 탁월합니다.",
        descriptionHighlights: [
          { text: "실내 온도 유지와 결로 방지", color: true },
        ],
        details: [
          "결로 완화 구조 설계로 난방 효율 향상",
          "실외기 의한 실내 온도 저하 차단",
          "기밀 성능을 높이는 다층 구조 날개"
        ]
      },
      {
        icon: "/Products/louver/icon2.png",
        title: "간편한 유지관리",
        description: "오염·부식에 강한 고내구성 소재를 적용하여 색바램이 없고 \n탈착형 구조로 손쉽게 블레이드 교체가 가능합니다.",
        descriptionHighlights: [
          { text: "오염·부식에 강한 고내구성 소재", color: true },
          { text: "탈착형 구조", color: true },
        ],
        details: [
          "루버 날개 개별 분리 가능",
          "청소 및 필터 교체가 간편",
          "복잡한 분해 없이 간단한 접근성"
        ]
      },
      {
        icon: "/Products/louver/icon3.png",
        title: "내구성과 구조 안정성",
        description: "고강도 재질과 루버 결속 구조로 \n외부 환경 변화에도 뒤틀림 없는 안정성을 제공합니다.",
        descriptionHighlights: [
          { text: "외부 환경 변화에도 뒤틀림 없는 안정성", color: true },
        ],
        details: [
          "장기 사용을 고려한 소재 선택",
          "날개 접속 기술로 진동 및 소음 최소화",
          "뒤틀림 방지 구조로 설치 후 안정성 확보"
        ]
      },
      {
        icon: "/Products/louver/icon4.png",
        title: "기능성과 설계 완성도",
        description: "단열, 기밀, 청소 용이성을 모두 고려한 설계로, \n기능과 미관을 동시에 만족하는 제품입니다.",
        descriptionHighlights: [
          { text: "단열, 기밀, 청소 용이성", color: true },
        ],
        details: [
          "반복 사용 환경에서도 성능 유지",
          "기능별 구조 조합 최적화",
          "외부 디자인과의 조화 고려"
        ]
      }
    ],
    specs: [
      ["적용구간", ["실외기실"]],
      ["프레임 규격", ["135mm"]],
      ["색상", ["내/외부 전체 ASA, 외부 ASA/내부 화이트, 내/외부 전체 화이트"]],
      ["개폐 타입", ["자동/수동 개폐 선택 가능"]],
      ["열관류율", ["2.496 W/㎡·K (단열 시스템루버 기준)"]],
      ["기밀성", ["1등급 (단열 시스템루버 기준)"]],
    ],
  },
  bbg: {
    title: "블라인드 내장형 복층유리 (BBG)",
    id: 'section-2',
    subtitle: "",
    shortDescription: "블라인드가 복층 유리 내부에 내장되어 있어 \n차광, 사생활 보호, 편리한 조작, 쉬운 관리가 \n가능한 혁신적인 유리 시스템입니다.",
    shortDescriptionHighlights: [
      { text: "차광, 사생활 보호, 편리한 조작, 쉬운 관리가", color: true },
    ],
    images: [
      { src: "/Products/bbg/pic1.png", alt: "블라인드 내장형 복층유리 이미지 1" },
      { src: "/Products/bbg/pic2.jpg", alt: "블라인드 내장형 복층유리 이미지 2" },
      { src: "/Products/bbg/pic3.jpg", alt: "블라인드 내장형 복층유리 이미지 3" },
    ],
    detailedFeatures: [
      {
        icon: "/Products/bbg/icon1.png",
        title: "차광 및 사생활 보호",
        description: "태양열 차단으로 냉난방 효율을 높이고, \n외부 시선을 차단하여 거주자의 프라이버시를 보호합니다.",
        descriptionHighlights: [
          { text: "냉난방 효율", color: true },
          { text: "거주자의 프라이버시", color: true },
        ],
        details: [
          "태양열 차단을 통한 냉난방비 절감",
          "블라인드 각도 조절로 프라이버시 확보",
        ],
      },
      {
        icon: "/Products/bbg/icon2.png",
        title: "편리한 조작",
        description: "무전원 자력 구동 방식으로 누구나 쉽고 간편하게 사용할 수 있으며, \n상하 및 각도 조절로 상황에 맞게 사용 가능합니다.",
        descriptionHighlights: [
          { text: "쉽고 간편하게 사용", color: true },
        ],
        details: [
          "자력 구동 방식으로 간편한 조작",
          "Up/Down 및 각도 조절 가능",
        ],
      },
      {
        icon: "/Products/bbg/icon3.png",
        title: "쉬운 관리",
        description: "블라인드가 유리 내부에 밀폐되어 먼지나 오염이 없고, \n 별도의 청소나 교체가 필요 없습니다.",
        descriptionHighlights: [
          { text: "먼지나 오염이 없고", color: true },
          ],
        details: [
          "청소/세탁이 필요 없는 간편 관리",
          "먼지나 오염에 강해 물걸레로 유리 관리 가능",
        ],
      },
      {
        icon: "/Products/bbg/icon4.png",
        title: "뛰어난 안정성",
        description: "끼임 위험 없이 아이나 반려동물을 안전하게 보호하며, \n스크래치나 파손 위험이 없는 안전한 구조입니다.",
        descriptionHighlights: [
          { text: "아이나 반려동물을 안전하게 보호", color: true },
          { text: "안전한 구조", color: true },
        ],
        details: [
          "끼임 없는 구조로 아이·반려동물 안전 확보",
          "스크래치, 파손 위험 없는 안전한 구조",
        ],
      },
    ],
    specs: [
      ["제품 두께", [
        "30T (5T + 공기/블라인드 20T + 5T)",
        "41T (5T + 공기/블라인드 20T + 5T + 6T 공기 +5T)",
        "26T (5T + 공기/블라인드 16T + 5T)"
      ]],
      ["주문제작크기", [
        "최소폭 300mm | 최대폭 1,300mm",
        "최소높이 500mm | 최대높이 2,200mm"
      ]],
      ["블라인드 색상", ["화이트, 라이트베이지"]],
    ],
  },
};

// ----------------------------------------------------------------------
// 기존 `renderTextWithMarkup` 함수를 대체할 새로운 컴포넌트
// ----------------------------------------------------------------------
const HighlightedText = ({
  text,
  highlights,
  defaultClassName = "text-gray-700 text-base md:text-xl font-light leading-relaxed",
  highlightClassName = "font-extrabold text-[#004A91]",
}) => {
  if (!text) {
    return null;
  }

  const parts = [];
  let currentText = text;

  highlights?.forEach((highlight) => {
    currentText = currentText.split(highlight.text).join(`_HIGHLIGHT_${highlight.text}_ENDHIGHLIGHT_`);
  });

  const lines = currentText.split('\n');

  lines.forEach((line, lineIndex) => {
    if (lineIndex > 0) {
      parts.push(<br key={`br-${lineIndex}`} />);
    }

    line.split(/(_HIGHLIGHT_.*?_ENDHIGHLIGHT_)/g).forEach((part, partIndex) => {
      if (part.startsWith('_HIGHLIGHT_') && part.endsWith('_ENDHIGHLIGHT_')) {
        const highlightText = part.substring('_HIGHLIGHT_'.length, part.length - '_ENDHIGHLIGHT_'.length);
        const highlightConfig = highlights.find(h => h.text === highlightText);

        parts.push(
          <span key={`${lineIndex}-${partIndex}`} className={highlightConfig?.color ? highlightClassName : ""}>
            {highlightText}
          </span>
        );
      } else {
        parts.push(part);
      }
    });
  });

  return (
    <p className={defaultClassName} style={{ wordBreak: 'keep-all' }}>
      {parts.map((part, index) => (
        <React.Fragment key={index}>{part}</React.Fragment>
      ))}
    </p>
  );
};

// 재사용 가능한 애니메이션 variants 정의
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const titleVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

// 이미지 슬라이드를 위한 variants
const imageSlideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    position: "absolute",
  }),
};

export default function Products() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedImageAlt, setSelectedImageAlt] = useState('');
  const navigate = useNavigate();

  const onOpenModal = (imageSrc, imageAlt = '') => {
    setSelectedImage(imageSrc);
    setSelectedImageAlt(imageAlt);
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
    setSelectedImage('');
    setSelectedImageAlt('');
  };

  const [sliderStates, setSliderStates] = useState({
    'section-0': { currentIndex: 0, direction: 0 },
    'section-1': { currentIndex: 0, direction: 0 },
    'section-2': { currentIndex: 0, direction: 0 },
  });

  const handlePaginate = (sectionId, newDirection) => {
    setSliderStates(prevStates => {
      const currentCategory = productCategories[Object.keys(productCategories).find(key => productCategories[key].id === sectionId)];
      const totalImages = currentCategory.images.length;
      const prevIndex = prevStates[sectionId].currentIndex;

      const newIndex = newDirection > 0
        ? (prevIndex + 1) % totalImages
        : (prevIndex - 1 + totalImages) % totalImages;

      return {
        ...prevStates,
        [sectionId]: { currentIndex: newIndex, direction: newDirection },
      };
    });
  };

  const handleThumbnailClick = (sectionId, newIndex) => {
    setSliderStates(prevStates => {
      const prevIndex = prevStates[sectionId].currentIndex;
      const newDirection = newIndex > prevIndex ? 1 : -1;
      return {
        ...prevStates,
        [sectionId]: { currentIndex: newIndex, direction: newDirection },
      };
    });
  };

  const sliderSections = ['section-0', 'section-1', 'section-2'];
  const productCategoryArray = Object.values(productCategories);

    return (
		<>
		<Helmet>
			<title>제품소개 | BAUTEK</title>
			<meta
			 name="description"
			 content="바우텍은 터닝도어, 시스템루버, BBG 등 고기능성 건축자재를 자체 금형으로 생산하여 에너지 효율과 실내 환경을 개선하는 혁신 제품을 제공합니다."
			/>
			<meta name="robots" content="index, follow" />
			<link rel="canonical" href="https://www.greenbautek.com/products" />
		</Helmet>

		<main className="lg:h-screen lg:snap-y lg:snap-proximity lg:overflow-y-scroll scroll-smooth font-Pretendard">
        {/* Hero Section */}
        <section
          id="hero-section"
          // 히어로 섹션 레이아웃을 flexbox로 재구성했습니다.
          className="snap-start h-dvh lg:h-screen flex flex-col relative pt-16"
        >
          {/* ProductNavbar를 section의 직계 자식으로 배치 */}
          <ProductNavbar
            productList={productCategoryArray.map(cat => ({
              id: cat.id,
              name: cat.title,
            }))}
          />

          {/* 나머지 Hero 섹션 콘텐츠를 감싸는 div 추가 */}
          <div className="flex-1 w-full relative">
            <motion.img
              src="/Products/BPF130.png"
              alt="바우텍 자체 금형 프레임 제품군"
              className="w-full h-full object-cover lg:object-contain absolute inset-0 z-0"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 text-white px-6 flex flex-col justify-center items-center z-10">
              <motion.div
                className="flex-1 flex flex-col justify-center items-center text-center px-6"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
              >
                <h2 className="text-lg md:text-2xl font-semibold mb-10 md:mb-20 leading-relaxed">
                  프레임 금형부터 제작까지, <span className="text-[#004A91]"><br/>바우텍</span>은<br className="md:hidden" /> 독자적인 생산 기술로 다양한 폭의 프레임을 구현합니다.
                </h2>
              </motion.div>

              <motion.div
                className="w-full flex justify-center pb-20 md:pb-10"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.7 }}
                whileHover={{ scale: 1.05, boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)" }}
              >
                <button
                  onClick={() => navigate("/frame-gallery")}
                  className="px-6 py-3 bg-white text-[#004A91] rounded-full font-bold hover:bg-gray-200 transition shadow-lg"
                >
                  바우텍 프레임 보기
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Product Categories Sections */}
        {productCategoryArray.map((category, index) => {
          const isSliderSection = sliderSections.includes(category.id);
          const sliderState = sliderStates?.[category.id] || { currentIndex: 0, direction: 0 };
          const currentImage = category.images?.[sliderState.currentIndex];

          let sectionBgClass;
          if (category.id === 'section-1') {
            sectionBgClass = 'bg-white';
          } else {
            sectionBgClass = index % 2 === 0 ? 'bg-white' : 'bg-gray-50';
          }

          return (
            <section
              key={category.id}
              id={category.id}
              className={`snap-start min-h-screen pt-10 md:pt-20 pb-10 md:pb-20 flex flex-col items-center justify-start relative z-0 ${sectionBgClass}`}
            >
              <motion.h2
                className="text-3xl md:text-4xl font-extrabold text-[#004A91] text-center tracking-tight mb-2 md:mb-4 px-4"
                initial="hidden"
                whileInView="visible"
                variants={titleVariants}
                viewport={{ once: true, amount: 0.5 }}
              >
                {category.title}
              </motion.h2>

              {category.subtitle && (
                <motion.p
                  className="text-sm md:text-md text-gray-600 text-center px-4 mb-8 md:mb-16"
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                  viewport={{ once: true, amount: 0.5 }}
                >
                  {category.subtitle}
                </motion.p>
              )}

              <div className="flex flex-col lg:flex-row items-center max-w-7xl mx-auto px-4 w-full gap-8 md:gap-12 mb-10 md:mb-20">
                <motion.div
                  className={`w-full lg:w-1/2 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}
                  initial="hidden"
                  whileInView="visible"
                  variants={sectionVariants}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  {isSliderSection ? (
                    <>
                      <div className="relative w-full aspect-video md:h-[500px] bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center mb-4 shadow-xl">
                        <AnimatePresence initial={false} custom={sliderState.direction}>
                          <motion.img
                            key={sliderState.currentIndex}
                            src={currentImage?.src}
                            alt={currentImage?.alt}
                            className="max-h-full max-w-full object-contain cursor-pointer absolute"
                            onClick={() => onOpenModal(currentImage?.src, currentImage?.alt)}
                            variants={imageSlideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            custom={sliderState.direction}
                            transition={{
                              x: { type: "spring", stiffness: 300, damping: 30 },
                              opacity: { duration: 0.2 },
                            }}
                          />
                        </AnimatePresence>
                        {category.images.length > 1 && (
                          <>
                            <motion.button
                              className="absolute left-4 bg-white p-2 rounded-full shadow-md opacity-70 hover:opacity-100 transition z-20"
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePaginate(category.id, -1);
                              }}
                              whileHover={{ scale: 1.1, x: -5 }}
                            >
                              &#x25C0;
                            </motion.button>
                            <motion.button
                              className="absolute right-4 bg-white p-2 rounded-full shadow-md opacity-70 hover:opacity-100 transition z-20"
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePaginate(category.id, 1);
                              }}
                              whileHover={{ scale: 1.1, x: 5 }}
                            >
                              &#x25B6;
                            </motion.button>
                          </>
                        )}
                      </div>
                      <div className="flex flex-wrap justify-center gap-2 md:gap-3 mt-4">
                        {category.images.map((img, idx) => (
                          <motion.img
                            key={idx}
                            src={img.src}
                            alt={img.alt}
                            className={`w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg cursor-pointer transition-all duration-300 ${
                              sliderState.currentIndex === idx ? "border-4 border-[#004A91] shadow-lg" : "border-2 border-gray-200 opacity-70 hover:opacity-100"
                            }`}
                            onClick={() => handleThumbnailClick(category.id, idx)}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.05 * idx, duration: 0.4 }}
                            viewport={{ once: true, amount: 0.1 }}
                            whileHover={{ scale: 1.1 }}
                          />
                        ))}
                      </div>
                    </>
                  ) : (
                    category.images.length > 0 && (
                      <motion.img
                        src={currentImage?.src}
                        alt={currentImage?.alt}
                        className="mx-auto w-full h-auto object-contain rounded-lg shadow-md border border-gray-100"
                        onClick={() => onOpenModal(currentImage?.src, currentImage?.alt)}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        viewport={{ once: true, amount: 0.2 }}
                      />
                    )
                  )}
                </motion.div>
                <motion.div
                  className={`w-full lg:w-1/2 text-center ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'} lg:text-left mt-8 lg:mt-0`}
                  initial="hidden"
                  whileInView="visible"
                  variants={sectionVariants}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <HighlightedText
                    text={category.shortDescription}
                    highlights={category.shortDescriptionHighlights}
                    defaultClassName="text-gray-700 text-lg md:text-2xl font-light leading-relaxed"
                    highlightClassName="font-extrabold text-[#004A91]"
                  />
                </motion.div>
              </div>

              {/* 핵심 특징 */}
              {category.detailedFeatures && category.detailedFeatures.length > 0 && (
                <div className="w-full max-w-7xl mx-auto px-4 mb-10 md:mb-20">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#004A91] text-center mb-4">핵심 특징</h3>
                  {['section-0', 'section-1'].includes(category.id) && (
                    <div className="flex justify-center items-center gap-1 md:gap-2 mb-6 md:mb-10">
                      <span className="text-gray-500 text-sm md:text-md font-Pretendard">※</span>
                      <p className="text-gray-500 text-xs md:text-sm font-Pretendard">
                        해당 특징은 {category.id === 'section-0' ? '단열차음도어' : '단열 시스템루버'} 기준입니다.
                      </p>
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-16">
                    {category.detailedFeatures.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        className="p-4 flex flex-col items-center text-center group"
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                          delay: 0.1 * idx,
                          duration: 0.6,
                          ease: "easeOut",
                          when: "beforeChildren"
                        }}
                        viewport={{ once: true, amount: 0.1 }}
                        whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}
                      >
                        {feature.icon && (
                          <motion.img
                            src={feature.icon}
                            alt={feature.title}
                            className="w-16 h-16 md:w-20 md:h-20 mb-4 opacity-80 group-hover:brightness-75 transition-all duration-300"
                            initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
                            whileInView={{ scale: 1, opacity: 0.8, rotate: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 * idx + 0.3 }}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                          />
                        )}
                        <motion.h3
                          className="text-xl md:text-2xl font-semibold text-[#004A91] mb-2 group-hover:text-[#003A70] transition-colors duration-300"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 * idx + 0.4 }}
                        >
                          {feature.title}
                        </motion.h3>
                        <HighlightedText
                          text={feature.description}
                          highlights={feature.descriptionHighlights}
                          defaultClassName="text-gray-600 text-sm md:text-base mb-0 leading-normal group-hover:text-gray-700 transition-colors duration-300"
                          highlightClassName="font-bold text-[#004A91]"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* 제품 스펙 */}
              {category.specs && category.specs.length > 0 && (
                <div className="w-full lg:w-2/3 max-w-7xl mx-auto px-4 mb-10">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#004A91] text-center mb-6 md:mb-10">제품 스펙</h3>
                  <table className="w-full border-collapse">
                    <tbody>
                      {category.specs.map(([label, value], idx) => (
                        <motion.tr
                          key={label}
                          className="border-b border-gray-100 last:border-b-0 transition-all duration-200 ease-out"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.08 * idx, duration: 0.5, ease: "easeOut" }}
                          viewport={{ once: true, amount: 0.1 }}
                          whileHover={{ backgroundColor: "#F3F4F6", scale: 1.01, boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.05)" }}
                        >
                          <td className="py-3 px-3 md:px-5 font-semibold text-gray-700 w-1/3 border-r border-gray-100 text-sm md:text-base">{label}</td>
                          <td className="py-3 px-3 md:px-5 text-gray-800 text-sm md:text-base">
                            <ul className="list-disc list-inside space-y-1">
                              {value.map((item, i) => (
                                <li key={i}>{item}</li>
                              ))}
                            </ul>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          );
        })}

        {/* Modal for image viewing */}
        <Modal open={openModal} onClose={onCloseModal} center classNames={{
          modal: 'customModal',
        }}>
          <img src={selectedImage} alt={selectedImageAlt} className="max-w-full max-h-[80vh]" />
        </Modal>
      </main>
	  </>
    );
}