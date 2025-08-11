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


/* ✅ 이미지 지도 컴포넌트 임포트 (경로 확인) */
import RunningProjectsSection from "./pages/components/RunningProjectsSection";

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

              <section className="min-h-[100dvh] md:h-screen md:snap-start bg-gradient-to-br from-gray-400 to-white via-gray-200 to-gray-500">
                <KeyClient />
              </section>

              {/* ✅ 진행현장: 이미지 지도 버전 */}
              <section
                id="running-projects"
                className="min-h-[100dvh] md:h-screen md:snap-start bg-white"
              >
                <div className="max-w-6xl mx-auto px-4 py-10 md:py-16">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-[#004A91] mb-2 text-center">
                    진행 현장
                  </h2>
                  <p className="text-gray-600 text-center mb-8">
                    전국 진행 중인 현장을 지도에서 확인하세요.
                  </p>

                  <RunningProjectsSection
                    imageSrc="/maps/korea.svg"                // public/maps/korea.svg 에 파일 넣기
                    bounds={[[33.0, 124.5], [39.6, 132.0]]}   // 필요시 조정
                    height="70vh"
                    sites={[
                      { id:'s1', contractor:'GS건설', contractorLogo:'/logos/gs.png', name:'송도 A단지', units:1243, lat:37.382, lng:126.643 },
                    ]}
                  />
                </div>
              </section>

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
