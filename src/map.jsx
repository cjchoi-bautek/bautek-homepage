// src/map.jsx

import React from "react";
import Footer from "./Footer";
import useNaverMap from "./utils/useNaverMap";

// 📌 공장 지도
function FactoryMap() {
  const mapRef = useNaverMap(
    { lat: 37.139708, lng: 126.857125 },
    "본사/공장",
    `
      <div style="padding:10px; font-size:14px; color: #333;">
        <strong>바우텍 본사/공장</strong><br/>
        경기도 화성시 팔탄면 온천로165번길 67
      </div>
    `
  );

  return (
    <div className="flex-1 min-w-[300px] px-2">
      <h3 className="text-lg font-semibold text-center text-[#004A91] mb-2">본사/공장</h3>
      <div
        ref={mapRef}
        className="w-full h-[300px] md:h-[400px] rounded-xl shadow-md"
      />
    </div>
  );
}

// 📌 서울사무소 지도
function OfficeMap() {
  const mapRef = useNaverMap(
    { lat: 37.488897, lng: 127.010051 },
    "서울사무소",
    `
      <div style="padding:10px; font-size:14px; color: #333;">
        <strong>바우텍 서울사무소</strong><br/>
        서울시 서초구 서초대로42길 71<br/>
        거림빌딩 3층
      </div>
    `
  );

  return (
    <div className="flex-1 min-w-[300px] px-2">
      <h3 className="text-lg font-semibold text-center text-[#004A91] mb-2">서울 사무소</h3>
      <div
        ref={mapRef}
        className="w-full h-[300px] md:h-[400px] rounded-xl shadow-md"
      />
    </div>
  );
}

// 📌 전체 Map 섹션
export default function MapSection() {
  return (
    <section
      id="map-section"
      className="snap-start min-h-screen bg-gradient-to-br from-white via-gray-200 to-gray-500 flex flex-col justify-between"
    >
      <div className="flex-grow pt-24 px-4">
        {/* 섹션 제목 */}
        <h2 className="text-2xl md:text-3xl text-center font-bold text-[#004A91] mb-4">
          회사 위치
        </h2>

        {/* 설명 텍스트 */}
        <div className="max-w-6xl mx-auto mb-10 text-center">
          <span className="text-[#004A91] text-xl font-bold">바우텍</span>
          <span className="text-gray-800 text-md">은 언제나 고객분들을 환영합니다.</span>
        </div>

        {/* 지도 영역 */}
        <div className="flex flex-col md:flex-row justify-center items-center max-w-6xl mx-auto gap-10 pb-14">
          <FactoryMap />
          <OfficeMap />
        </div>
      </div>

      {/* 푸터는 이 섹션 내 고정 */}
      <Footer />
    </section>
  );
}
