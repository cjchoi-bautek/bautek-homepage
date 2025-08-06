// src/data/products.js
export const productData = [
  {
    id: 'door',
    name: "단열차음도어",
    category: "DOOR SYSTEM",
    mainImage: "/ProductImages/door_main_3d.jpg",
    desc: "더 조용하고 따듯한 공간을 담은 단열차음도어입니다.",
    featureIcons: [
        { id: 'door-f1', icon: "/ProductSlider/turningdooricon1.png", title: "단열/기밀성", subtitle: ["열 손실을 줄이는 고기밀 설계"] },
        { id: 'door-f2', icon: "/ProductSlider/turningdooricon2.png", title: "차음성", subtitle: ["소음을 차단하는 구조"] },
        { id: 'door-f3', icon: "/ProductSlider/turningdooricon3.png", title: "마감성", subtitle: ["완성도를 높이는 정돈된 디자인"] },
        { id: 'door-f4', icon: "/ProductSlider/turningdoor4.png", title: "유틸성", subtitle: ["다양한 현장에 유연한 설치"] },
    ],
    galleryImages: [
      "/ProductImages/door_3d_01.jpg", "/ProductImages/door_3d_02.jpg", "/ProductImages/door_3d_03.jpg", "/ProductImages/door_3d_04.jpg",
      "/ProductImages/door_3d_05.jpg", "/ProductImages/door_3d_06.jpg", "/ProductImages/door_3d_07.jpg", "/ProductImages/door_3d_08.jpg",
    ],
  },
  {
    id: 'louver',
    name: "시스템 루버",
    category: "LOUVER SYSTEM",
    mainImage: "/ProductImages/louver_main_3d.jpg",
    desc: "단열 및 기밀을 통해 실외기를 지키는 환기 시스템입니다.",
    featureIcons: [
        { id: 'louver-f1', icon: "/ProductSlider/turningdooricon1.png", title: "단열/기밀성", subtitle: ["결로 완화와 냉·난방 효율을 높인 구조 설계"] },
        { id: 'louver-f2', icon: "/ProductSlider/louvericon2.png", title: "유지관리 / 청소 용이성", subtitle: ["오염·부식에 강한 고내구성 소재 적용"] },
        { id: 'louver-f3', icon: "/ProductSlider/louvericon3.png", title: "구조 안정성 / 제품 내구성", subtitle: ["날개 결속 기술로 개폐 시 흔들림 및 소음 최소화"] },
        { id: 'louver-f4', icon: "/ProductSlider/louvericon4.png", title: "설계 완성도", subtitle: ["기능성과 구조 안정성을 함께 고려한 기술 설계"] },
    ],
    galleryImages: [
        "/ProductImages/louver_3d_01.jpg", "/ProductImages/louver_3d_02.jpg", "/ProductImages/louver_3d_03.jpg", "/ProductImages/louver_3d_04.jpg",
        "/ProductImages/louver_3d_05.jpg", "/ProductImages/louver_3d_06.jpg", "/ProductImages/louver_3d_07.jpg", "/ProductImages/louver_3d_08.jpg",
    ],
  },
  {
    id: 'bbg',
    name: "블라인드유리 (BBG)",
    category: "GLASS SOLUTION",
    mainImage: "/ProductImages/bbg_main_3d.jpg",
    desc: "블라인드를 유리 사이에 담은 새로운 개념의 유리입니다.",
    featureIcons: [
        { id: 'bbg-f1', icon: "/ProductSlider/turningdooricon1.png", title: "절감효율", subtitle: ["냉난방 에너지 절감"] },
        { id: 'bbg-f2', icon: "/ProductSlider/bbgicon2.png", title: "사용편의성", subtitle: ["무전원 간편 조작"] },
        { id: 'bbg-f3', icon: "/ProductSlider/louvericon2.png", title: "청결관리", subtitle: ["청소/세탁 없는 간편 관리"] },
        { id: 'bbg-f4', icon: "/ProductSlider/bbgicon4.png", title: "안전성", subtitle: ["줄꼬임·파손 방지"] },
    ],
    galleryImages: [
        "/ProductImages/bbg_3d_01.jpg", "/ProductImages/bbg_3d_02.jpg", "/ProductImages/bbg_3d_03.jpg", "/ProductImages/bbg_3d_04.jpg",
        "/ProductImages/bbg_3d_05.jpg", "/ProductImages/bbg_3d_06.jpg", "/ProductImages/bbg_3d_07.jpg", "/ProductImages/bbg_3d_08.jpg",
    ],
  },
  {
    id: 'hardware',
    name: "하드웨어",
    category: "HARDWARE",
    mainImage: "/ProductImages/hardware_main_3d.jpg",
    desc: "고품질의 하드웨어 부품으로 제품의 완성도를 높입니다.",
    featureIcons: [], // 필요에 따라 추가
    galleryImages: [
        "/ProductImages/hardware_3d_01.jpg", "/ProductImages/hardware_3d_02.jpg", "/ProductImages/hardware_3d_03.jpg", "/ProductImages/hardware_3d_04.jpg",
        "/ProductImages/hardware_3d_05.jpg", "/ProductImages/hardware_3d_06.jpg", "/ProductImages/hardware_3d_07.jpg", "/ProductImages/hardware_3d_08.jpg",
    ],
  },
];