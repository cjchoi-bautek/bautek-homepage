// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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

// 라우터 내부에 위치하여 useLocation 훅을 사용할 수 있는 컴포넌트
function AppLayout() {
  const location = useLocation();

  // /company 페이지의 #history 섹션일 때만 네비게이션 바를 숨깁니다.
  // URL 해시(#history)가 정확히 일치해야 합니다.
  const isHistorySection = location.pathname === "/company" && location.hash === "#history";

  return (
    <div className="font-pretendard">
      {/* isHistorySection이 false일 때만 NavBar를 렌더링합니다. */}
      {!isHistorySection && <NavBar />}

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
      <Footer />
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