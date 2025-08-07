// src/pages/FrameGallery.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import FramePopUp from "./FramePopUp"; // 팝업 컴포넌트 import

const frames = [
  { id: "BPF130", src: "/Products/BPF130.png", alt: "BPF130 Frame" },
  { id: "BPF150", src: "/Products/BPF150.png", alt: "BPF150 Frame" },
  { id: "BPF180", src: "/Products/BPF180.png", alt: "BPF180 Frame" },
  { id: "BPF180-1", src: "/Products/BPF180-1.png", alt: "BPF180-1 Frame" },
  { id: "BPF180(100)", src: "/Products/BPF180(100).png", alt: "BPF180(100) Frame" },
  { id: "BPF240(130)", src: "/Products/BPF240(130).png", alt: "BPF240(130) Frame" },
];

export default function FrameGallery() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [activeFrame, setActiveFrame] = useState("BPF130");

  const handleImageClick = (frameId) => {
    setActiveFrame(frameId);
    setPopupOpen(true);
  };

  return (
    <>
      <div className="py-16 px-4 sm:px-8 lg:px-16 min-h-screen bg-white">
        <motion.h2
          id="frame-section"
          className="text-center text-xl sm:text-2xl font-extrabold text-[#004A91] mb-10 sm:mb-16 scroll-mt-24"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          바우텍 프레임 종류
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {frames.map((frame, index) => (
            <motion.div
              key={frame.id}
              className="relative w-full h-[150px] sm:h-[200px] md:h-[260px] cursor-pointer group overflow-hidden rounded-2xl"
              onClick={() => handleImageClick(frame.id)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <img
                src={frame.src}
                alt={frame.alt}
                className="w-full h-full object-cover transition duration-300 transform group-hover:scale-105 group-hover:brightness-90"
              />

              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-40 transition duration-300">
                <motion.span
                  className="text-white text-sm sm:text-base md:text-lg font-bold opacity-0 group-hover:opacity-100"
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {frame.id} 상세보기
                </motion.span>
              </div>

              <div className="absolute inset-0 rounded-2xl shadow-[0_4px_20px_rgba(0,74,145,0.3)] group-hover:shadow-[0_6px_30px_rgba(0,74,145,0.5)] transition-all duration-500"></div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 팝업 연결 */}
      <FramePopUp
        isOpen={isPopupOpen}
        onClose={() => setPopupOpen(false)}
        activeFrameId={activeFrame}
      />
    </>
  );
}
