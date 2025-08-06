import React, { useEffect } from "react";

export default function PrivacyModal({ isOpen, onClose }) {
  // 모달 열릴 때 body 스크롤 잠금
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // 언마운트 시 스크롤 원복
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 flex justify-center items-center px-4">
      <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg p-6 relative">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl"
        >
          &times;
        </button>

        {/* 타이틀 */}
        <h2 className="text-xl font-bold mb-4">개인정보처리방침</h2>

        {/* 내용 */}
        <div className="space-y-4 text-sm leading-relaxed text-gray-700">
          <p>㈜바우텍(이하 ‘회사’)는 개인정보 보호법 등 관련 법령을 준수하며, 아래와 같이 개인정보를 수집·이용하고 있습니다.</p>

          <div>
            <p className="font-semibold">1. 수집하는 개인정보 항목</p>
            <ul className="list-disc ml-5">
              <li>필수 항목: 이름, 이메일, 연락처, 제목, 문의 내용</li>
              <li>선택 항목: 회사명</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold">2. 개인정보 수집 및 이용 목적</p>
            <ul className="list-disc ml-5">
              <li>고객 문의 응대 및 관련 업무 처리</li>
              <li>제품 및 서비스 관련 상담</li>
              <li>A/S 및 기술 지원 요청에 대한 대응</li>
              <li>고객 응대 이력 관리</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold">3. 개인정보 보유 및 이용 기간</p>
            <p>수집일로부터 3년간 보관 후 파기하며, 법령에 따라 보존이 필요한 경우 해당 기간 동안 보관합니다.</p>
          </div>

          <div>
            <p className="font-semibold">4. 개인정보 제3자 제공</p>
            <p>회사는 원칙적으로 이용자의 개인정보를 외부에 제공하지 않으며, 법령에 의한 경우에만 제공될 수 있습니다.</p>
          </div>

          <div>
            <p className="font-semibold">5. 개인정보 처리 위탁</p>
            <p>홈페이지 유지관리 등의 업무에 한해 외부 업체에 위탁할 수 있으며, 위탁 계약 시 개인정보 보호 관련 법령을 준수합니다.</p>
          </div>

          <div>
            <p className="font-semibold">6. 정보주체의 권리</p>
            <p>이용자는 언제든지 본인의 개인정보에 대해 열람, 정정, 삭제, 처리정지를 요구할 수 있습니다.</p>
            <p>문의: business@greenbautek.com / 031-351-0178</p>
          </div>

          <div>
            <p className="font-semibold">7. 개인정보 보호책임자</p>
            <p>성명: 최종원</p>
            <p>이메일: business@greenbautek.com / 전화: 031-351-0178</p>
          </div>

          <div>
            <p className="font-semibold">8. 기타</p>
            <p>본 방침은 2025년 8월 5일부터 시행되며, 내용 변경 시 홈페이지에 게시합니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
