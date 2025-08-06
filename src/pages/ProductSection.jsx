// src/components/ProductSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Thumbs, FreeMode } from 'swiper/modules'; // Thumbs, FreeMode 추가 (npm install swiper)

// Swiper CSS (필수)
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

// Framer Motion Variants
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1, ease: "easeOut" } },
};

const textOverlayVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8, delay: 0.5, ease: "easeOut" } },
};

const galleryVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, delay: 0.8, ease: "easeOut" } },
};

export default function ProductSection({ product }) {
  const [thumbsSwiper, setThumbsSwiper] = React.useState(null);

  return (
    <motion.section
      id={product.id} // react-scroll 링크를 위한 id
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden
                 snap-start bg-gradient-to-br from-gray-50 to-blue-50 pt-20 md:pt-24" // 네비바 높이 고려 패딩
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible" // 뷰포트 진입 시 애니메이션 실행
      viewport={{ once: true, amount: 0.3 }} // 한 번만 실행, 30% 보일 때 실행
    >
      {/* 배경 이미지 (3D 렌더링 메인 이미지) */}
      <img
        src={product.mainImage}
        alt={`${product.name} 메인 이미지`}
        className="absolute inset-0 w-full h-full object-cover filter brightness-[.6] z-0" // 텍스트 가독성을 위해 어둡게
      />

      {/* 콘텐츠 오버레이 */}
      <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-center justify-center p-4 md:p-12 gap-8 md:gap-16 max-w-7xl mx-auto">
        {/* 좌측: 제품 정보 텍스트 오버레이 */}
        <motion.div
          className="bg-white/85 backdrop-blur-md rounded-xl shadow-2xl p-6 md:p-10
                     w-full md:w-1/2 max-w-lg md:max-w-none text-left flex flex-col items-start"
          variants={textOverlayVariants}
        >
          <p className="text-base md:text-lg tracking-widest uppercase mb-2 font-medium text-blue-700">{product.category}</p>
          <h2 className="text-5xl md:text-6xl font-extrabold text-[#004A91] mb-4 leading-tight">{product.name}</h2>
          <p className="text-lg md:text-xl mb-8 leading-relaxed text-gray-700">{product.desc}</p>

          {/* 특징 리스트 (ProductSlider에서 가져옴) */}
          {product.featureIcons && product.featureIcons.length > 0 && (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 w-full"
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            >
              {product.featureIcons.map((feature) => (
                <motion.div
                  key={feature.id}
                  className="flex items-start gap-4"
                  variants={featureItemVariants} // 여기서 featureItemVariants는 외부에서 정의되어야 합니다.
                >
                  <img src={feature.icon} alt={feature.title} className="w-10 h-10 mt-0.5 shrink-0 object-contain" />
                  <div>
                    <h4 className="text-base font-semibold text-blue-800 mb-0.5">{feature.title}</h4>
                    {feature.subtitle.map((line, i) => (
                      <p key={i} className="text-sm text-gray-600 leading-snug">{line}</p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* 우측: 3D 렌더링 갤러리 */}
        {product.galleryImages && product.galleryImages.length > 0 && (
          <motion.div
            className="w-full md:w-1/2 max-w-lg md:max-w-none bg-white/70 backdrop-blur-md rounded-xl shadow-2xl p-4 flex flex-col"
            variants={galleryVariants}
          >
            {/* 메인 갤러리 슬라이더 */}
            <Swiper
              spaceBetween={10}
              navigation={true}
              pagination={{ clickable: true }}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs, Pagination]}
              className="mySwiper2 w-full h-80 md:h-96 rounded-lg overflow-hidden mb-4"
            >
              {product.galleryImages.map((imgSrc, index) => (
                <SwiperSlide key={index}>
                  <img src={imgSrc} alt={`${product.name} 갤러리 이미지 ${index + 1}`} className="w-full h-full object-contain" />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* 썸네일 슬라이더 */}
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper w-full h-20 md:h-24"
            >
              {product.galleryImages.map((imgSrc, index) => (
                <SwiperSlide key={index} className="cursor-pointer rounded-md overflow-hidden border-2 border-transparent hover:border-[#004A91] transition-colors duration-200">
                  <img src={imgSrc} alt={`썸네일 ${index + 1}`} className="w-full h-full object-cover" />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}