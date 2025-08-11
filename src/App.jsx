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

/* ✅ Leaflet 복구: CSS + 아이콘 경로 fix */
import "leaflet/dist/leaflet.css";
import "./leafletIconFix";

/* ✅ 진행현장(Leaflet) 섹션 */
import RunningProjectsSection from "./pages/components/RunningProjectsSection.jsx";

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

              {/* ✅ 진행현장(Leaflet). 섹션 자체를 렌더하므로 래퍼 섹션 없이 바로 배치 */}
              <RunningProjectsSection
                height="70vh"
                // lockZoom={true} // 줌 고정 원하면 주석 해제
                sites={[
                  
                  { id:'s1', contractor:'GS건설', contractorLogo:'/logos/gs.png', name:'송도 A단지', units:1243, lat:37.382, lng:126.643 },
                ]}
              />

              <section className="min-h-[100dvh] md:h-screen md:snap-start bg-[#F4F4F4]">
                <MapSection />
              </section>
            </main>
          }
        />

        {/* 서브 페이지 */}
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
