// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'bautek-blue': '#004A91', // 바우텍의 주 색상
        'bautek-light-blue': '#2563eb', // 스와이퍼 활성화 불릿 등 (다른 용도로 활용 가능)
        'bautek-bullet-inactive': '#cbd5e1', // 스와이퍼 비활성화 불릿 등 (다른 용도로 활용 가능)
        // 여기에 추가적으로 연혁 라인 색상 등 필요한 색상을 정의할 수 있습니다.
        'timeline-line': '#bfdbfe', // blue-200에 해당하는 색상 코드 (약간 더 명시적)
        'timeline-dot': '#004A91', // #004A91에 해당하는 색상 코드 (주요 색상과 동일)
      },
      fontFamily: {
        Pretendard: ['Pretendard', 'sans-serif'],
      },
    },
  },
  plugins: [],
}