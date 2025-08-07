import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Particles } from "@tsparticles/react";
import { loadAll } from "@tsparticles/all";

export default function HeroSection() {
  const [videoIndex, setVideoIndex] = useState(0);
  const [isFading, setIsFading] = useState(false); // 페이드 전환 상태 관리

  const videoList = [
    { id: "video-main-1", src: "/HeroSection/video/video5.mp4" },
    { id: "video-main-2", src: "/HeroSection/video/video6.mp4" },
  ];

  const particlesInit = useCallback(async (engine) => {
    await loadAll(engine);
  }, []);

  const handleVideoEnd = () => {
    setIsFading(true); // 페이드 아웃 시작

    setTimeout(() => {
      // 1초 후 비디오 인덱스 변경
      const nextIndex = (videoIndex + 1) % videoList.length;
      setVideoIndex(nextIndex);
      // setIsFading(false); // 비디오가 로드될 때까지 페이드 상태 유지
    }, 1000); // CSS transition 시간과 동일하게 설정
  };
  
  // 새로운 비디오가 로드될 준비가 되면 페이드 아웃 상태 해제 (페이드 인)
  const handleVideoCanPlay = () => {
    setIsFading(false);
  };

  return (
    <section
      id="hero-section"
      className="snap-start h-[100dvh] relative flex flex-col justify-center items-center bg-black overflow-hidden transition-transform duration-700 ease-in-out"
    >
      {/* 인터랙티브 입자 배경 */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="absolute inset-0 z-0"
        options={{
          fullScreen: { enable: false },
          background: { color: "transparent" },
          particles: {
            number: { value: 80, density: { enable: true, area: 800 } },
            color: { value: "#ffffff" },
            links: {
              enable: true,
              color: "#ffffff",
              distance: 120,
              opacity: 0.3,
              width: 1,
            },
            move: { enable: true, speed: 1 },
            opacity: { value: 0.5 },
            size: { value: 2 },
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
            },
            modes: {
              repulse: { distance: 100 },
            },
          },
          detectRetina: true,
        }}
      />

      {/* 비디오 */}
      <video
        key={videoList[videoIndex].src}
        className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000"
        style={{ opacity: isFading ? 0 : 1 }}
        src={videoList[videoIndex].src}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
        onCanPlay={handleVideoCanPlay} // 수정된 부분
      />

      {/* 어두운 반투명 오버레이 */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10" />

      {/* 헤드라인 */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-20 text-center px-4 mt-60"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
          Built For Your Comfort
        </h1>
        <p className="text-lg md:text-xl text-white/60">
          더 조용하고, 더 따뜻하게. 바우텍과 함께
        </p>
      </motion.div>

      

      {/* 스크롤 아이콘 */}
      <motion.div
			initial={{ opacity: 0, y: -5 }}
			animate={{ opacity: 1, y: 5 }}
			transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
			className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20"
	  >
		<img
			src="/HeroSection/scroll down.png"
			alt="scroll down icon"
			className="w-24 opacity-80"
		/>
		</motion.div>
    </section>
  );
}