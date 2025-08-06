// productData.js

export const sectionIdMap = {
  'section-0': 'insulated-door',
  'section-1': 'system-louver',
  'section-2': 'bbg',
};

export const productCategories = {
  insulationDoors: {
    title: "터닝도어",
    id: 'section-0',
    images: [
      "/Products/TD/product.jpg",
      "/Products/TD/product2.jpg",
      "/Products/TD/product3.jpg",
      "/Products/TD/product4.jpg",
      "/Products/TD/product5.jpg",
    ],
    shortDescription: "터닝도어는 <strong>최고의 단열 성능</strong>과 <strong>완벽한 차음 효과</strong>로 <strong>쾌적하고 조용한 실내 환경</strong>을 제공합니다. <strong>미니멀한 디자인</strong>과 <strong>뛰어난 기능성</strong>으로 모든 공간의 가치를 높입니다.",
    detailedFeatures: [
      {
        icon: "/Products/TD/icon1.png",
        title: "단열/기밀성",
        description: "열 손실을 줄이는 <strong>고기밀 설계</strong>로, 단열 기준 1,2 지역을 충족하고 5-locking Gear 구조로 <strong>기밀/밀폐 성능을 극대화</strong>합니다.",
        details: [
          "단열기준 결로 1,2 지역 충족",
          "우수한 단열성으로 에너지 효율 향상",
          "5-locking Gear 구조로 기밀/밀폐 성능 극대화",
        ],
      },
      // 생략 가능: 다른 특징도 포함
    ],
    specs: [
      ["적용구간", { indirect: "보조주방 / 실외기실 / 거실베란다", direct: "외기형도어" }],
      ["프레임규격", "130mm / 150mm / 180mm / 240mm"],
      ["사이즈", "맞춤제작 가능"],
      ["색상", "내부 필름 색상 지정가능"],
      ["패널두께", "23mm or 27mm / 33mm or 37mm / 43mm or 47mm"],
      ["열관류율 (W/㎡·K)", "0.625 ~ 1.196"],
      ["기밀성", "1등급"],
      ["차음재", "선택가능"],
    ],
  },
  systemLouvers: {
    title: "PVC 시스템루버",
    id: 'section-1',
    images: [
      { src: "/Products/BPF150(27T)IN_2.png", alt: "시스템루버 이미지 1" },
      { src: "/Products/BPF180(47T)IN_2.png", alt: "시스템루버 이미지 2" },
    ],
    shortDescription: "<strong>PVC 복합 구조와 다층 설계</strong>를 통해 외기 유입을 철저히 차단하고 실내 온도 변화에 의한 <strong>결로를 효과적으로 방지</strong>합니다.<br/><br/> 건축물의 에너지 효율과 마감 품질을 모두 고려한 기능성 루버 단열 솔루션입니다.",
    detailedFeatures: [
      {
        icon: "/Products/louver/icon1.png",
        title: "우수한 단열·기밀 성능",
        description: "<strong>PVC 재질과 다중 구조 설계</strong>로 뛰어난 단열 및 기밀 성능을 확보해 <strong>실내 온도 유지와 결로 방지</strong>에 탁월합니다.",
        details: [
          "결로 완화 구조 설계로 난방 효율 향상",
          "실외기 의한 실내 온도 저하 차단",
          "기밀 성능을 높이는 다층 구조 날개"
        ]
      }
    ],
    specs: [
      ["적용구간", "실외기실"],
      ["프레임 규격", "135mm"],
      ["색상", "내/외부 ASA 또는 외부 ASA / 내부 화이트"],
      ["개폐 타입", "자동/수동 개폐 선택 가능"],
      ["열관류율 (W/㎡·K)", "2.496 (단열 시스템루버 기준)"],
      ["기밀성", "1등급 (단열 시스템루버 기준)"],
    ]
  },
  bbg: {
    title: "블라인드 내장형 복층유리 (BBG)",
    id: 'section-2',
    images: [
      { src: "/Products/bbg/pic1.png", alt: "BBG 이미지 1" },
      { src: "/Products/bbg/pic2.jpg", alt: "BBG 이미지 2" },
      { src: "/Products/bbg/pic3.jpg", alt: "BBG 이미지 3" },
    ],
    shortDescription: "블라인드가 복층 유리 내부에 내장되어 있어 <strong>단열, 사생활 보호, 편리한 조작, 쉬운 관리가 가능한 혁신적인 유리 시스템</strong>입니다.",
    detailedFeatures: [
      {
        icon: "/Products/bbg/icon1.png",
        title: "단열 및 사생활 보호",
        description: "태양열 차단으로 <strong>냉난방 효율</strong>을 높이고, 외부 시선을 차단하여 <strong>거주자의 프라이버시</strong>를 보호합니다.",
        details: [
          "태양열 차단을 통한 냉난방비 절감",
          "블라인드 각도 조절로 프라이버시 확보",
        ],
      }
    ],
    specs: [
      ["제품 두께", [
        "30T (5T + 공기/블라인드 20T + 5T)",
        "41T (5T + 공기/블라인드 20T + 5T + 6T 공기 +5T)",
        "26T (5T + 공기/블라인드 16T + 5T)"
      ]],
      ["주문제작크기", [
        "최소폭 300mm",
        "최소높이 500mm",
        "최대폭 1,300mm",
        "최대높이 2,200mm"
      ]],
      ["블라인드 색상", "White or Grey Black"],
    ],
  },
};
