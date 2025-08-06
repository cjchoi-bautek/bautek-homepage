// ImageSlider.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const imageSlideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    position: "absolute",
  }),
};

export default function ImageSlider({ category, index, onOpenModal }) {
  const [sliderState, setSliderState] = useState({ currentIndex: 0, direction: 0 });
  const images = category.images;
  const isImageObject = typeof images[0] === 'object';
  const currentImage = images[sliderState.currentIndex];
  const imageSrc = isImageObject ? currentImage.src : currentImage;
  const imageAlt = isImageObject ? currentImage.alt : `${category.title} 이미지`;

  const handlePaginate = (newDirection) => {
    const total = images.length;
    setSliderState(prev => ({
      currentIndex: (prev.currentIndex + newDirection + total) % total,
      direction: newDirection,
    }));
  };

  const handleThumbnailClick = (newIndex) => {
    const direction = newIndex > sliderState.currentIndex ? 1 : -1;
    setSliderState({ currentIndex: newIndex, direction });
  };

  return (
    <motion.div
      className="flex flex-col lg:flex-row items-center max-w-7xl mx-auto px-4 w-full gap-12 mb-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div
        className={`w-full lg:w-1/2 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="relative w-full aspect-video md:h-[600px] bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center mb-6 shadow-xl">
          <AnimatePresence initial={false} custom={sliderState.direction}>
            <motion.img
              key={sliderState.currentIndex}
              src={imageSrc}
              alt={imageAlt}
              className="max-h-full max-w-full object-contain cursor-pointer absolute"
              onClick={() => onOpenModal(imageSrc, imageAlt)}
              variants={imageSlideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              custom={sliderState.direction}
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
            />
          </AnimatePresence>
          {images.length > 1 && (
            <>
              <motion.button
                className="absolute left-4 bg-white p-2 rounded-full shadow-md opacity-70 hover:opacity-100 transition z-20"
                onClick={(e) => { e.stopPropagation(); handlePaginate(-1); }}
                whileHover={{ scale: 1.1, x: -5 }}
                aria-label="이전 이미지"
              >
                ◀
              </motion.button>
              <motion.button
                className="absolute right-4 bg-white p-2 rounded-full shadow-md opacity-70 hover:opacity-100 transition z-20"
                onClick={(e) => { e.stopPropagation(); handlePaginate(1); }}
                whileHover={{ scale: 1.1, x: 5 }}
                aria-label="다음 이미지"
              >
                ▶
              </motion.button>
            </>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-4">
          {images.map((img, idx) => {
            const thumbSrc = isImageObject ? img.src : img;
            const thumbAlt = isImageObject ? img.alt : `${category.title} 썸네일 ${idx + 1}`;
            return (
              <motion.img
                key={idx}
                src={thumbSrc}
                alt={thumbAlt}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition-all duration-300 ${
                  sliderState.currentIndex === idx
                    ? "border-4 border-[#004A91] shadow-lg"
                    : "border-2 border-gray-200 opacity-70 hover:opacity-100"
                }`}
                onClick={() => handleThumbnailClick(idx)}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05 * idx, duration: 0.4 }}
                viewport={{ once: true, amount: 0.1 }}
                whileHover={{ scale: 1.1 }}
              />
            );
          })}
        </div>
      </motion.div>

      <motion.div
        className={`w-full lg:w-1/2 text-center ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'} lg:text-left`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <p
          className="text-gray-700 text-xl md:text-2xl font-light leading-relaxed mb-6"
          style={{ wordBreak: 'keep-all' }}
          dangerouslySetInnerHTML={{ __html: category.shortDescription || "제품 설명 준비 중입니다." }}
        ></p>
      </motion.div>
    </motion.div>
  );
}
