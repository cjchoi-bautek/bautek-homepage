// App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import HeroSection from "./HeroSection";
import ProductSlider from "./ProductSlider";
import KeyClient from "./KeyClient";
import MapSection from "./map";
import Footer from "./Footer";
import Company from "./pages/company";
import Products from "./pages/Products";
import FrameGallery from "./pages/FrameGallery";
import SupportPage from "./pages/SupportPage";

/* ✅ 진행현장 지도용: react-leaflet v4 CSS & 아이콘 경로 fix */
import "leaflet/dist/leaflet.css";
import "./map/leafletIconFix";

/* ✅ 네가 만든 진행현장 섹션 컴포넌트 임포트
   ─ 실제 위치가 `src/pages/components/RunningProjectsSection.jsx`면 아래 경로 사용
   ─ 만약 `src/components/RunningProjectsSection.jsx`라면 './components/RunningProjectsSection' 로 바꿔줘 */
import RunningProjectsSection from "./pages/components/RunningProjectsSection";

// 라우터 내부에 위치하여 useLocation 훅을 사용할 수 있는 컴포넌트
function AppLayout() {
  // 내비게이션 바의 상태를 관리합니다. 기본값은 true(보임)
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  return (
    <div className="font-pretendard">
      {/* isNavbarVisible 상태에 따라 NavBar를 조건부 렌더링 */}
      {isNavbarVisible && <NavBar />}

      <Routes>
        {/* 랜딩 페이지 */}
        <Route
          path="/"
          element={
            <main className="overflow-y-auto md:snap-y md:snap-proximity md:h-screen">
              <section className="min-h-[100dvh] md:h-screen md:snap-start">
                <HeroSection />
              </section>
              <section className="min-h-[100dvh] md:h-screen md:snap-start bg-white">
                <ProductSlider />
              </section>
              <section className="min-h-[100dvh] md:h-screen md:snap-start bg-gradient-to-br from-gray-400 to-white via-gray-200 to-gray-500">
                <KeyClient />
              </section>

              {/* ✅ KeyClient ↔ MapSection 사이에 섹션 래퍼로 감싸서 삽입 (스냅/높이 유지) */}
              <section id="running-projects" className="min-h-[100dvh] md:h-screen md:snap-start bg-white">
                <RunningProjectsSection />
              </section>

              <section className="min-h-[100dvh] md:h-screen md:snap-start bg-[#F4F4F4]">
                <MapSection />
              </section>
			   
            </main>
          }
        />

        {/* 서브 페이지 */}
        {/* Company 라우트에 내비게이션 바 상태를 변경하는 함수를 props로 전달 */}
        <Route
          path="/company"
          element={<Company setNavbarVisible={setIsNavbarVisible} />}
        />
        <Route path="/products" element={<Products />} />
        <Route path="/frame-gallery" element={<FrameGallery />} />
        <Route path="/support" element={<SupportPage />} />
      </Routes>
      
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}
