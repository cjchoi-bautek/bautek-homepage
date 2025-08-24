import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Particles } from "@tsparticles/react";
import { loadAll } from "@tsparticles/all";
import { Helmet } from "react-helmet"; // ✅ 인덱싱을 위한 JSON-LD 주입

const ORIGIN = "https://www.greenbautek.com"; // ✅ 절대경로 기준

export default function HeroSection() {
  const [videoIndex, setVideoIndex] = useState(0);
  const [isFading, setIsFading] = useState(false); // 페이드 전환 상태 관리

  // ✅ 각 비디오에 썸네일(png/jpg) 절대 URL 추가
  const videoList = [
    {
      id: "video-main-1",
      src: `${ORIGIN}/HeroSection/video/video5.mp4`,
      poster: `${ORIGIN}/HeroSection/video/video5-thumb.png`, // ← PNG 사용 가능
      name: "Bautek Hero Video 1",
      desc: "바우텍 회사 소개 HeroSection 영상 1"
    },
    {
      id: "video-main-2",
      src: `${ORIGIN}/HeroSection/video/video6.mp4`,
      poster: `${ORIGIN}/HeroSection/video/video6-thumb.png`,
      name: "Bautek Hero Video 2",
      desc: "바우텍 회사 소개 HeroSection 영상 2"
    },
  ];

  const particlesInit = useCallback(async (engine) => {
    await loadAll(engine);
  }, []);

  const handleVideoEnd = () => {
    setIsFading(true); // 페이드 아웃 시작
    setTimeout(() => {
      const nextIndex = (videoIndex + 1) % videoList.length;
      setVideoIndex(nextIndex);
    }, 1000); // CSS transition 시간과 동일하게 설정
  };

  const handleVideoCanPlay = () => {
    setIsFading(false); // 페이드 인 시작
  };

  const current = videoList[videoIndex];

  return (
    <section
      id="hero-section"
      className="snap-start h-[100dvh] relative flex flex-col justify-center items-center bg-black overflow-hidden transition-transform duration-700 ease-in-out"
    >
      {/* ✅ VideoObject 구조화 데이터 (인덱싱용) */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            "name": current.name,
            "description": current.desc,
            "thumbnailUrl": current.poster,   // ★ 필수
            "uploadDate": "2025-08-14",      // 실제 날짜로 교체 가능
            "contentUrl": current.src,
            "embedUrl": ORIGIN + "/"          // 해당 비디오가 노출되는 페이지 URL
          })}
        </script>
        {/* 선택: 사전 로딩 */}
        <link rel="preload" as="image" href={current.poster} />
        <link rel="preload" as="video" href={current.src} />
      </Helmet>

      {/* 입자 배경 */}
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
            events: { onHover: { enable: true, mode: "repulse" } },
            modes: { repulse: { distance: 100 } },
          },
          detectRetina: true,
        }}
      />

      {/* 배경 비디오 (✅ poster 추가만) */}
      <video
        key={current.src}
        className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000"
        style={{ opacity: isFading ? 0 : 1 }}
        src={current.src}
        poster={current.poster}    // ★ 썸네일 제공
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
        onCanPlay={handleVideoCanPlay}
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
      <div className="absolute bottom-4 w-full z-20 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 5 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
        >
          <img
            src="/HeroSection/scroll down.png"
            alt="scroll down icon"
            className="w-16 md:w-20 lg:w-24 opacity-80"
          />
        </motion.div>
      </div>
    </section>
  );
}
