// Footer.jsx
import React, { useState } from "react";
import PrivacyModal from "./pages/components/PrivacyModal"; // 모달 컴포넌트 추가

export default function Footer() {
  const [isPrivacyOpen, setPrivacyOpen] = useState(false);

  return (
    <>
      <footer className="bg-[#1A1A1A] text-white py-6 px-6 md:px-20 text-sm">
        {/* 메인 컨테이너: 모든 내용을 수평 중앙에 배치 */}
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-center items-center gap-y-6 md:gap-x-10"> {/* ✅ justify-center로 수평 중앙 정렬, items-center로 수직 중앙 정렬, md:gap-x-10으로 로고와 정보 그룹 사이 간격 추가 */}
          {/* 로고 */}
          <div className="flex-shrink-0">
            <img src="/Footer/color.png" alt="BAUTEK 로고" className="h-6" />
          </div>

          {/* 회사 정보, 연락처, 주소, 법적 고지 그룹 */}
          {/* 이 그룹 자체도 부모 컨테이너에 의해 가운데 정렬됩니다. */}
          <div className="flex flex-col md:flex-row md:justify-center md:items-start gap-x-10 gap-y-6"> {/* ✅ md:justify-center로 데스크탑에서 그룹 내부 항목 중앙 정렬, w-full 제거 */}
            {/* 회사 정보 */}
            <div className="text-center"> {/* ✅ 텍스트 자체도 가운데 정렬 */}
              <h3 className="text-sm font-bold text-white mb-2">(주) 바우텍</h3>
              <address className="not-italic text-xs text-white/70 space-y-0.5">
                <p>대표이사: 백기한</p>
                <p>사업자등록번호: 124-86-03952</p>
				
              </address>
            </div>

            
            {/* 주소 */}
            <div className="text-center"> {/* ✅ 텍스트 자체도 가운데 정렬 */}
              <h3 className="text-sm font-bold text-white mb-2">연락처</h3>
              <address className="not-italic text-xs text-white/70 space-y-0.5 break-words">
                <p>본사/공장: ☎ 031-351-0178</p>
                <p>서울 사무소: ☎ 02-585-0178 </p>
                <p>이메일: business@greenbautek.com</p>
              </address>
            </div>

          </div>
        </div>

        {/* 저작권 정보 */}
        <div className="border-t border-white/10 mt-6 pt-3 text-center text-xs text-white/50">
          ⓒ 2025 (주)바우텍. All rights reserved. |{" "}
          <button
            onClick={() => setPrivacyOpen(true)}
            className="underline hover:text-white transition"
          >
            개인정보처리방침
          </button>
        </div>
      </footer>

      {/* 개인정보처리방침 모달 */}
      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setPrivacyOpen(false)} />
    </>
  );
}