// App.jsx
import React, { useState } from "react"; // useState 임포트
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"; // useLocation 임포트
import NavBar from "./NavBar";
import HeroSection from "./HeroSection";
import ProductSlider from "./ProductSlider";
import KeyClient from "./KeyClient";
import MapSection from "./map";
import Footer from "./Footer";
import Company from "./pages/company"; // Company 컴포넌트 임포트 확인
import Products from "./pages/Products";
import FrameGallery from "./pages/FrameGallery";
import SupportPage from "./pages/SupportPage";

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