import React, { useState, useRef, useEffect, useCallback } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

export default function NavBar() {
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const timeoutRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  const isHome = location.pathname === "/";

  useEffect(() => {
    if (!isHome) {
      setIsHeroVisible(false);
      return;
    }

    const hero = document.getElementById("hero-section");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsHeroVisible(entry.isIntersecting),
      { threshold: 0.5 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        requestAnimationFrame(() => {
          const yOffset = -80; // 고정된 네비게이션 바 높이에 맞게 보정
          const y =
            element.getBoundingClientRect().top +
            window.pageYOffset +
            yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        });
      }
    } else if (!isHome) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.hash, location.pathname, isHome]);

  const textColorClass = isHeroVisible ? "text-white" : "text-gray-900";
  const bgClass = isHeroVisible
    ? "bg-transparent"
    : "bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm";

  const menuItems = [
    {
      label: "회사소개",
      path: "/company",
      submenu: [
        { label: "인사말", path: "/company#greeting" },
        { label: "핵심역량", path: "/company#core" },
        { label: "비전/미션", path: "/company#vision" },
        { label: "회사연혁", path: "/company#history" },
        { label: "CI/BI", path: "/company#CI" },
      ],
    },
    {
      label: "제품소개",
      path: "/products",
      submenu: [
        { label: "터닝도어", path: "/products#section-0" },
        { label: "PVC 시스템루버", path: "/products#section-1" },
        { label: "블라인드 내장형 복층유리 (BBG)", path: "/products#section-2" },
      ],
    },
    {
      label: "고객지원",
      path: "/support",
      submenu: [
        { label: "기타문의", path: "/support#contact" },
        { label: "A/S 문의", path: "/support#service" },
        { label: "자사쇼핑몰", path: "/support#shoppingmall" },
      ],
    },
  ];

  const handleLogoClick = useCallback(() => {
    if (isHome) {
      const hero = document.getElementById("hero-section");
      hero?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
    }
  }, [isHome, navigate]);

  const handleMouseEnter = useCallback((idx) => {
    clearTimeout(timeoutRef.current);
    setHoveredMenu(idx);
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setHoveredMenu(null);
    }, 200);
  }, []);

  const handleSubmenuClick = useCallback(
    (path) => {
      const [pathname, hash] = path.split("#");
      setHoveredMenu(null);
      setIsMobileMenuOpen(false);

      if (location.pathname === pathname) {
        if (hash) {
          const element = document.getElementById(hash);
          if (element) {
            const yOffset = -80;
            const y =
              element.getBoundingClientRect().top +
              window.pageYOffset +
              yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
          }
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } else {
        navigate(path);
      }
    },
    [location.pathname, navigate]
  );

  return (
    <nav
      className={`fixed top-0 left-0 w-full px-3 py-5 h-8 md:h-20 flex justify-between items-center z-50 transition-all duration-300 ${textColorClass} ${bgClass}`}
    >
      {/* 로고 */}
      <div onClick={handleLogoClick} className="cursor-pointer flex items-center">
        <img
          src="/logo2.png"
          alt="BAUTEK Logo"
          className="h-4 md:h-10 object-contain"
        />
      </div>

      {/* 햄버거 메뉴 버튼 (모바일) */}
      <button
        className="md:hidden"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <img src="/Navbar/navbar.png" alt="Menu" className="h-10 w-10" />
      </button>

      {/* 데스크탑 메뉴 */}
      <ul className="hidden md:flex space-x-10 font-medium text-xl mr-32">
        {menuItems.map((menu) => (
          <div
            key={menu.label}
            className="relative"
            onMouseEnter={() => handleMouseEnter(menu.label)}
            onMouseLeave={handleMouseLeave}
          >
            <Link to={menu.path} className="hover:text-[#004A91]">
              {menu.label}
            </Link>

            {hoveredMenu === menu.label && (
              <div className="absolute left-0 top-full mt-2 bg-white text-black border rounded shadow-lg z-50 w-44 py-1 text-sm font-normal">
                {menu.submenu.map((sub) => (
                  <button
                    key={sub.path}
                    onClick={() => handleSubmenuClick(sub.path)}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 hover:text-[#004A91] hover:font-bold text-md"
                  >
                    {sub.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </ul>

      {/* 모바일 메뉴 */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full px-4 mt-2 md:hidden z-40">
          <div className="bg-white/60 backdrop-blur-md max-w-[320px] mx-auto rounded-xl shadow-md transition-all duration-300 ease-in-out">
            {menuItems.map((menu) => (
              <div key={menu.label} className="border-b border-gray-200">
                <div className="flex justify-between items-center px-4 py-3">
                  <button
                    onClick={() => {
                      navigate(menu.path);
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-base font-semibold text-gray-800 text-left"
                  >
                    {menu.label}
                  </button>
                  <button
                    onClick={() =>
                      setHoveredMenu(hoveredMenu === menu.label ? null : menu.label)
                    }
                    className="text-gray-600 text-sm"
                  >
                    {hoveredMenu === menu.label ? "▲" : "▼"}
                  </button>
                </div>
                {hoveredMenu === menu.label && (
                  <div className="px-4 py-2 space-y-2">
                    {menu.submenu.map((sub) => (
                      <button
                        key={sub.path}
                        onClick={() => handleSubmenuClick(sub.path)}
                        className="block w-full text-left text-sm text-gray-700 hover:text-[#004A91] transition"
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
