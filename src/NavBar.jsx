// src/NavBar.jsx
import React, { useState, useRef, useEffect, useCallback } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

export default function NavBar() {
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const timeoutRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  // ✅ 이전 pathname을 추적하기 위한 useRef 추가
  const prevPathname = useRef(location.pathname);

  const isHome = location.pathname === "/";

  /** ---------------- 공통 유틸: 스크롤 부모 찾기 ---------------- */
  const getScrollParent = useCallback((el) => {
    let node = el?.parentElement;
    while (node) {
      const style = getComputedStyle(node);
      const canScrollY =
        /(auto|scroll|overlay)/.test(style.overflowY) ||
        node.scrollHeight > node.clientHeight;
      if (canScrollY) return node;
      node = node.parentElement;
    }
    return document.scrollingElement || document.documentElement;
  }, []);

  /** ---------------- 스냅/스크롤비헤이비어 임시 OFF 후, 스크롤 멈춤 감지로 복원 ---------------- */
  const runWithSnapOff = useCallback((container, action) => {
    if (!container) return;

    const prevSnap = container.style.scrollSnapType;
    const prevBehavior = container.style.scrollBehavior;

    // 임시 비활성
    container.style.scrollSnapType = "none";
    container.style.scrollBehavior = "auto"; // 즉시 이동

    let idleTimer = null;
    const RESTORE_IDLE_MS = 150; // 스크롤이 멈춘 뒤 복원
    const FALLBACK_MS = 600;      // 혹시 스크롤 이벤트가 거의 없을 때를 대비한 백업 복원

    const restore = () => {
      container.removeEventListener("scroll", onScroll);
      // Company에서 history구간에 스냅 잠금이 걸린 경우 복원 금지 (이 로직은 이제 Company에서 data-snap-lock 제거했으므로 영향 없음)
      if (container?.dataset?.snapLock === "1") return; 
      container.style.scrollBehavior = prevBehavior;
      container.style.scrollSnapType = prevSnap;
    };

    const onScroll = () => {
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(restore, RESTORE_IDLE_MS);
    };

    container.addEventListener("scroll", onScroll, { passive: true });

    try {
      action?.();
    } finally {
      // 이동이 아주 짧아 scroll 이벤트가 거의 없을 때를 대비
      idleTimer = setTimeout(restore, FALLBACK_MS);
    }
  }, []);

  /** ---------------- 네비 높이 보정 + 컨테이너 스크롤 ---------------- */
  const scrollToElWithHeader = useCallback(
    (el) => {
      if (!el) return;
      const container = getScrollParent(el);
      const nav = document.getElementById("site-nav");
      const navH = nav ? Math.ceil(nav.getBoundingClientRect().height) : 0;
      const safeGap = 8;

      if (
        container === document.scrollingElement ||
        container === document.documentElement
      ) {
        const y =
          window.pageYOffset +
          el.getBoundingClientRect().top -
          navH -
          safeGap;
        // runWithSnapOff에서 scrollBehavior=auto로 바꿔줬으므로 즉시 이동
        window.scrollTo({ top: y, behavior: "auto" });
      } else {
        const rect = el.getBoundingClientRect();
        const cRect = container.getBoundingClientRect();
        const target =
          container.scrollTop + (rect.top - cRect.top) - navH - safeGap;
        container.scrollTo({ top: target, behavior: "auto" });
      }
    },
    [getScrollParent]
  );

  /** ---------------- 전체 컨테이너를 맨 위로 ---------------- */
  const getScrollContainers = useCallback(() => {
    const containers = [];
    const win = document.scrollingElement || document.documentElement;
    if (win) containers.push(win);

    document.querySelectorAll("main, section, div").forEach((el) => {
      const cs = getComputedStyle(el);
      const canScrollY =
        /(auto|scroll|overlay)/.test(cs.overflowY) &&
        el.scrollHeight > el.clientHeight;
      if (canScrollY) containers.push(el);
    });
    return containers;
  }, []);

  const scrollAllToTop = useCallback(() => {
    const containers = getScrollContainers();
    const win = document.scrollingElement || document.documentElement;

    const prevSnap = containers.map((c) => c.style.scrollSnapType);
    const prevBehavior = containers.map((c) => c.style.scrollBehavior);

    containers.forEach((c) => {
      c.style.scrollSnapType = "none";
      c.style.scrollBehavior = "auto";
    });

    if (win) window.scrollTo({ top: 0, behavior: "auto" });
    containers.forEach((c) => {
      if (c !== win) c.scrollTo({ top: 0, behavior: "auto" });
    });

    // 스크롤 멈춤 감지로 복원
    const RESTORE_IDLE_MS = 150;
    const FALLBACK_MS = 600;
    const onScroll = [];
    containers.forEach((c, i) => {
      let idleTimer = null;
      const restore = () => {
        c.removeEventListener("scroll", onScroll[i]);
        if (c?.dataset?.snapLock === "1") return; // 이 로직도 이제 data-snap-lock 제거했으므로 영향 없음
        c.style.scrollBehavior = prevBehavior[i] || "";
        c.style.scrollSnapType = prevSnap[i] || "";
      };
      onScroll[i] = () => {
        if (idleTimer) clearTimeout(idleTimer);
        idleTimer = setTimeout(restore, RESTORE_IDLE_MS);
      };
      c.addEventListener("scroll", onScroll[i], { passive: true });
      // fallback 복원
      setTimeout(restore, FALLBACK_MS);
    });
  }, [getScrollContainers]);

  /** ---------------- 해시로 이동(재시도 + 스크롤멈춤기반 복원) ---------------- */
  const tryScrollToHash = useCallback(
    (hash) => {
      if (!hash) return;
      const id = hash.startsWith("#") ? hash.substring(1) : hash;

      let attempts = 0;
      const maxAttempts = 30; // ~1.5s
      const interval = 50;

      const tryOnce = () => {
        attempts += 1;
        const el = document.getElementById(id);
        if (el) {
          const container = getScrollParent(el);
          runWithSnapOff(container, () => {
            // 다음 프레임에 정확한 위치로 즉시 이동
            requestAnimationFrame(() => scrollToElWithHeader(el));
          });
          return;
        }
        if (attempts < maxAttempts) {
          setTimeout(tryOnce, interval);
        }
      };

      tryOnce();
    },
    [getScrollParent, runWithSnapOff, scrollToElWithHeader]
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
    // pathname이 변경되었을 때만 scrollAllToTop() 호출
    if (location.pathname !== prevPathname.current) {
      scrollAllToTop();
    }

    // 해시가 있는 경우, pathname 변경 여부와 상관없이 해당 위치로 스크롤
    if (location.hash) {
      tryScrollToHash(location.hash);
    }

    // ✅ 현재 pathname을 저장하여 다음 렌더링 시 비교
    prevPathname.current = location.pathname;
  }, [location.pathname, location.hash, tryScrollToHash, scrollAllToTop]);

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
      hero?.scrollIntoView({ behavior: "smooth" });
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
          // pathname은 같지만 hash가 없는 경우 (예: /company 에서 /company 로 이동)
          scrollAllToTop();
        }
      } else {
        // 다른 페이지로 이동 (useEffect에서 스크롤 처리됨)
        navigate(path);
      }
    },
    [location.pathname, navigate, tryScrollToHash, scrollAllToTop]
  );

  return (
    <nav
      id="site-nav"
      className={`fixed top-0 left-0 w-full px-3 py-2 md:py-5 flex justify-between items-center z-50 transition-all duration-300 ${textColorClass} ${bgClass}`}
    >
      {/* 로고 */}
      <div onClick={handleLogoClick} className="cursor-pointer flex items-center">
        <img src="/logo2.png" alt="BAUTEK Logo" className="h-4 md:h-10 object-contain" />
      </div>

      {/* 햄버거 메뉴 버튼 (모바일) */}
      <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
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
          <div className="bg-white backdrop-blur-md max-w-[320px] mx-auto rounded-xl shadow-md transition-all duration-300 ease-in-out">
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
