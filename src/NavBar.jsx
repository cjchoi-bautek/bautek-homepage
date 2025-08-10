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

  /** ---------------- 공통 유틸: 스크롤 부모 찾기 ---------------- */
  const getScrollParent = useCallback((el) => {
    // 가장 가까운 수직 스크롤 가능한 조상 요소를 찾음
    let node = el?.parentElement;
    while (node) {
      const style = getComputedStyle(node);
      const canScrollY =
        /(auto|scroll|overlay)/.test(style.overflowY) ||
        node.scrollHeight > node.clientHeight;
      if (canScrollY) return node;
      node = node.parentElement;
    }
    // 윈도우 스크롤로 폴백
    return document.scrollingElement || document.documentElement;
  }, []);

  /** ---------------- 스냅 일시 해제 (컨테이너 대상) ---------------- */
  const disableSnapTemporarily = useCallback((container) => {
    if (!container) return () => {};
    // 기존 inline 값 백업(클래스는 건드리지 않고 inline만 덮어씀)
    const prev = container.style.scrollSnapType;
    container.style.scrollSnapType = "none";
    return () => {
      container.style.scrollSnapType = prev;
    };
  }, []);

  /** ---------------- 네비 높이 보정 + 컨테이너 스크롤 ---------------- */
  const scrollToElWithHeader = useCallback(
    (el) => {
      if (!el) return;
      const container = getScrollParent(el);
      const nav = document.getElementById("site-nav");
      const navH = nav ? Math.ceil(nav.getBoundingClientRect().height) : 0;
      const safeGap = 8;

      if (container === document.scrollingElement || container === document.documentElement) {
        // 윈도우 스크롤
        const y = window.pageYOffset + el.getBoundingClientRect().top - navH - safeGap;
        window.scrollTo({ top: y, behavior: "smooth" });
      } else {
        // 내부 컨테이너 스크롤
        const rect = el.getBoundingClientRect();
        const cRect = container.getBoundingClientRect();
        const target = container.scrollTop + (rect.top - cRect.top) - navH - safeGap;
        container.scrollTo({ top: target, behavior: "smooth" });
      }
    },
    [getScrollParent]
  );

  /** ---------------- 해시로 이동(재시도 + 컨테이너 스냅 임시 해제) ---------------- */
  const tryScrollToHash = useCallback(
    (hash) => {
      if (!hash) return;
      const id = hash.startsWith("#") ? hash.substring(1) : hash;

      let attempts = 0;
      const maxAttempts = 30; // ~1.5s (50ms * 30)
      const interval = 50;
      let restoreSnap = null;

      const tryOnce = () => {
        attempts += 1;
        const el = document.getElementById(id);
        if (el) {
          const container = getScrollParent(el);
          if (!restoreSnap) {
            // 스냅으로 앵커 스크롤이 끌려가지 않게 컨테이너 스냅 잠시 해제
            restoreSnap = disableSnapTemporarily(container);
          }
          // 레이아웃/이미지 로딩 타이밍 고려해 다음 프레임에 스크롤
          requestAnimationFrame(() => {
            scrollToElWithHeader(el);
            // 스크롤 안정화 후 스냅 복원
            setTimeout(() => restoreSnap && restoreSnap(), 300);
          });
          return;
        }
        if (attempts < maxAttempts) {
          setTimeout(tryOnce, interval);
        } else {
          // 실패해도 스냅은 복원
          if (restoreSnap) restoreSnap();
        }
      };

      tryOnce();
    },
    [getScrollParent, disableSnapTemporarily, scrollToElWithHeader]
  );

  /** ---------------- Hero 가시성(색상/배경 전환) ---------------- */
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

  /** ---------------- 라우트/해시 변경 시 앵커 스크롤 ---------------- */
  useEffect(() => {
    if (location.hash) {
      tryScrollToHash(location.hash);
    } else if (!isHome) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname, location.hash, isHome, tryScrollToHash]);

  /** ---------------- 스타일 클래스 ---------------- */
  const textColorClass = isHeroVisible ? "text-white" : "text-gray-900";
  const bgClass = isHeroVisible
    ? "bg-transparent"
    : "bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm";

  /** ---------------- 메뉴 ---------------- */
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

  /** ---------------- 로고 클릭 ---------------- */
  const handleLogoClick = useCallback(() => {
    if (isHome) {
      const hero = document.getElementById("hero-section");
      if (hero) hero.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
    }
  }, [isHome, navigate]);

  /** ---------------- 데스크톱 호버 ---------------- */
  const handleMouseEnter = useCallback((idx) => {
    clearTimeout(timeoutRef.current);
    setHoveredMenu(idx);
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setHoveredMenu(null);
    }, 200);
  }, []);

  /** ---------------- 서브메뉴 클릭 ---------------- */
  const handleSubmenuClick = useCallback(
    (path) => {
      const [pathname, hash] = path.split("#");
      setHoveredMenu(null);
      setIsMobileMenuOpen(false);

      if (location.pathname === pathname) {
        if (hash) {
          tryScrollToHash(`#${hash}`);
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } else {
        // 라우팅 후 useEffect에서 tryScrollToHash가 동작
        navigate(`${pathname}${hash ? `#${hash}` : ""}`);
      }
    },
    [location.pathname, navigate, tryScrollToHash]
  );

  return (
    <nav
      id="site-nav"
      className={`fixed top-0 left-0 w-full px-3 py-5 flex justify-between items-center z-50 transition-all duration-300 ${textColorClass} ${bgClass}`}
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
