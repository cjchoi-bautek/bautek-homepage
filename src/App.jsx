// App.jsx
import React from "react";
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

export default function App() {
  return (
    <Router>
      <div className="font-pretendard">
        {/* 공통 네비게이션 바 */}
        <NavBar />

        <Routes>
          {/* 랜딩 페이지 */}
          <Route
            path="/"
            element={
              <main className="overflow-y-auto md:snap-y md:snap-mandatory md:h-screen">
                <section className="min-h-[100dvh] md:h-screen md:snap-start">
                  <HeroSection />
                </section>
                <section className="min-h-[100dvh] md:h-screen md:snap-start bg-white">
                  <ProductSlider />
                </section>
                <section className="min-h-[100dvh] md:h-screen md:snap-start bg-gradient-to-br from-gray-400 to-white via-gray-200 to-gray-500">
                  <KeyClient />
                </section>
                <section className="min-h-[100dvh] md:h-screen md:snap-start bg-[#F4F4F4]">
                  <MapSection />
                </section>
              
              </main>
            }
          />

          {/* 서브 페이지 */}
          <Route path="/company" element={<Company />} />
          <Route path="/products" element={<Products />} />
          <Route path="/frame-gallery" element={<FrameGallery />} />
          <Route path="/support" element={<SupportPage />} />
        </Routes>
      </div>
    </Router>
  );
}
