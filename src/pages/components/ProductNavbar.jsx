import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinkVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

export default function ProductNavbar({ productList }) {
  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-[56px] z-40 bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 py-2 md:py-3 flex flex-wrap justify-center items-center gap-3 md:gap-8">
        <AnimatePresence>
          {productList.map((product, index) => (
            <React.Fragment key={product.id}>
              <motion.a
                href={`#${product.id}`}
                onClick={(e) => scrollToSection(e, product.id)}
                className="py-1 md:py-2 text-[11px] md:text-base font-medium md:font-semibold text-gray-700 hover:text-[#004A91] transition-colors duration-300 relative group whitespace-nowrap"
                variants={navLinkVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                {product.name}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#004A91] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
              </motion.a>

              {/* 모바일에서만 구분선 표시 */}
              {index < productList.length - 1 && (
                <span className="text-gray-300 text-xs inline-block md:hidden px-1">|</span>
              )}
            </React.Fragment>
          ))}
        </AnimatePresence>
      </nav>
    </div>
  );
}
