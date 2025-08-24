// App.jsx
import React, { useState, useEffect } from "react";
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
import NotFound from "./pages/NotFound"; // ✅ 404 페이지 추가


import "leaflet/dist/leaflet.css";
import "./leafletIconFix";

function AppLayout() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

 
 // ✅ MarkerClustering.js 동적 로딩
  useEffect(() => {
    const existingScript = document.querySelector('script[src="/MarkerClustering.js"]');
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "/MarkerClustering.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);






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

        {/* ✅ 404 페이지 처리 (항상 마지막에!) */}
        <Route path="*" element={<NotFound />} />
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




 //{/* 진행 현장 (xlsx 자동 로드 사용 예시) */}
              //<RunningProjectsFromXLSX
			    //src="/data/sites.xlsx"
                //height="70vh"
                //lockZoom={true}
				//lockDrag={true}
                
              ///>