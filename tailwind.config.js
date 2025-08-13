// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'bautek-blue': '#004A91',
        'bautek-light-blue': '#2563eb',
        'bautek-bullet-inactive': '#cbd5e1',
        'timeline-line': '#bfdbfe',
        'timeline-dot': '#004A91',
      },
      fontFamily: {
        Pretendard: ['Pretendard', 'sans-serif'],
      },
    },
  },
  plugins: [],
};