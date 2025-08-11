// App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import HeroSection from "./HeroSection";
import ProductSlider from "./ProductSlider";
import KeyClient from "./KeyClient";
import MapSection from "./map";
import Company from "./pages/company";
import Products from "./pages/Products";
import FrameGallery from "./pages/FrameGallery";
import SupportPage from "./pages/SupportPage";

/* Leaflet 필수: CSS + 아이콘 경로 fix (딱 한 번만) */
import "leaflet/dist/leaflet.css";
import "./leafletIconFix";

/* 진행현장(Leaflet) 섹션 */
import RunningProjectsFromXLSX from "./pages/components/RunningProjectsFromXLSX";

function AppLayout() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  return (
    <div className="font-pretendard">
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

              <section className="min-h-[100dvh] md:h-screen md:snap-start bg-white">
                <KeyClient />
              </section>

              {/* 진행 현장 (xlsx 자동 로드 사용 예시) */}
              <RunningProjectsSection
                height="70vh"
                // lockZoom // 줌 고정 원하면 주석 해제
                // lockDrag // 패닝 잠금 원하면 주석 해제
                xlsxUrl="/data/sites.xlsx"  // public/data/sites.xlsx 에 파일 두면 자동 로드
              />

              <section className="min-h-[100dvh] md:h-screen md:snap-start bg-[#F4F4F4]">
                <MapSection />
              </section>
            </main>
          }
        />

        {/* 서브 페이지 */}
        <Route path="/company" element={<Company setNavbarVisible={setIsNavbarVisible} />} />
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
