import { useCallback, useEffect, useRef, useState } from "react";
import { FaBars, FaMoon, FaSun, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();
  const menuRef = useRef();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [menuRef]);

  const navItems = [
    { id: "home", label: "Home", path: "/" },
    { id: "tentang", label: "Tentang", path: "/about" },
    { id: "staff", label: "Staf", path: "/staf" },
    { id: "proker", label: "Proker", path: "/proker" },
    { id: "blog", label: "Blog", path: "/blog" },
    { id: "portfolio", label: "Portfolio", path: "/portfolio" },
  ];

  const isActive = (path) => {
    // Jika path adalah root ("/"), cek exact match
    if (path === "/") {
      return location.pathname === "/";
    }
    // Untuk path lain, cek apakah pathname dimulai dengan path tersebut
    return location.pathname.startsWith(path);
  };

  const toggleTheme = useCallback(() => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" style={{ backdropFilter: "blur(8px)" }} onClick={() => setIsOpen(false)} />
      )}
      <nav
        className={`fixed block z-50 w-full py-4 transition-colors duration-300`}
        role="navigation"
        aria-label="Main navigation"
        ref={menuRef}
      >
        <div className="font-bricolage container px-4 mx-auto ">
          <div className="flex items-center justify-between gap-3 lg:gap-5">
            <Link
              to="/"
              aria-label="HMIF Home"
              className={`group relative h-[44px] rounded-[70px] backdrop-blur-[50px] px-5 flex items-center transition-all duration-500 hover:scale-[1.02] ${isDark
                ? "bg-white/[0.05] shadow-[0_4px_16px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.20),inset_1px_0_0_rgba(255,255,255,0.15)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.2),inset_0_1px_0_rgba(255,255,255,0.25)]"
                : "bg-black/[0.1] shadow-[0_2px_8px_rgba(0,0,0,0.08),inset_0_1px_0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_2px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12),inset_0_1px_0.5px_rgba(255,255,255,0.7),inset_-1px_-1px_2px_rgba(0,0,0,0.10)] border border-white/[0.25]"
                }`}
            >
              <div className="flex items-center space-x-2">
                <img
                  src="/hmif.svg"
                  alt="HMIF"
                  className={`w-auto h-4 transition-all duration-500 ${isDark ? "brightness-110 drop-shadow-[0_0_8px_rgba(96,165,250,0.3)]" : "drop-shadow-[0_4px_12px_rgba(0,0,0,0.2)]"} group-hover:scale-105`}
                />
              </div>
            </Link>
            <div
              className={`hidden lg:block relative h-[44px] rounded-[70px] backdrop-blur-[50px] transition-all duration-500 ${isDark
                ? "bg-white/[0.05] shadow-[0_4px_16px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.20),inset_1px_0_0_rgba(255,255,255,0.15)]"
                : "bg-black/[0.1] shadow-[0_2px_8px_rgba(0,0,0,0.08),inset_0_1px_0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_2px_rgba(0,0,0,0.08)] border border-white/[0.25]"
                }`}
            >
              <ul className="flex items-center justify-center h-full gap-0.5 px-3">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <Link
                      to={item.path}
                      onClick={handleNavClick}
                      className={`relative px-2 py-1.5 font-semibold text-[13px] tracking-wide leading-normal cursor-pointer transition-all duration-500 ${isActive(item.path)
                        ? isDark
                          ? "text-emerald-400"
                          : "text-emerald-500"
                        : isDark
                          ? "text-gray-200 hover:text-emerald-400"
                          : "text-black/70 hover:text-emerald-400"
                        }`}
                      aria-current={isActive(item.path) ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={`hidden lg:flex relative w-[44px] h-[44px] rounded-full backdrop-blur-[50px] items-center justify-center transition-all duration-500 cursor-pointer group hover:scale-110 ${isDark
                ? "bg-white/[0.05] shadow-[0_4px_16px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.20)] hover:shadow-[0_6px_20px_rgba(251,191,36,0.2)]"
                : "bg-black/[0.1] shadow-[0_2px_8px_rgba(0,0,0,0.08),inset_0_1px_0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_2px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12),inset_0_1px_0.5px_rgba(255,255,255,0.7),inset_-1px_-1px_2px_rgba(0,0,0,0.10)] border border-white/[0.25]"
                }`}
            >
              {isDark ? (
                <FaSun
                  size={19}
                  className="text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.6)] transition-all duration-500 group-hover:rotate-180"
                />
              ) : (
                <FaMoon
                  size={17}
                  className="text-blue-300 drop-shadow-[0_0_10px_rgba(147,197,253,0.5)] transition-all duration-500 group-hover:-rotate-12"
                />
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden relative w-[44px] h-[44px] rounded-full backdrop-blur-[50px] flex items-center justify-center transition-all duration-500 hover:scale-105 ${isDark
                ? "bg-white/[0.05] shadow-[0_4px_16px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.20)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.2)]"
                : "bg-black/[0.1] shadow-[0_2px_8px_rgba(0,0,0,0.08),inset_0_1px_0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_2px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12),inset_0_1px_0.5px_rgba(255,255,255,0.7)] border border-white/[0.25]"
                } ${isOpen ? "text-white" : "text-white"}`}
              aria-label="Toggle menu"
            >
              {isOpen ? <FaTimes size={19} /> : <FaBars size={19} />}
            </button>

            {isOpen && (
              <div className="fixed inset-0 top-[70px] lg:hidden">
                <div className="relative mx-4 mt-2 rounded-[24px] backdrop-blur-[50px] p-6 transition-all duration-500 overflow-y-auto max-h-[calc(100vh-120px)]"
                  style={{
                    backgroundColor: isDark
                      ? "rgba(15, 23, 42, 0.85)"
                      : "rgba(255, 255, 255, 0.95)"
                  }}
                >
                  <ul className="flex flex-col space-y-1.5">
                    {navItems.map((item, index) => (
                      <li
                        key={item.id}
                        style={{
                          animation: `slideIn 0.3s ease-out ${index * 0.05}s both`,
                        }}
                      >
                        <Link
                          to={item.path}
                          onClick={handleNavClick}
                          className={`block px-5 py-3 rounded-lg font-semibold text-sm tracking-wide transition-all duration-300 ${isActive(item.path)
                            ? isDark
                              ? "bg-emerald-500/30 text-emerald-400 border border-emerald-500/50"
                              : "bg-emerald-500/20 text-emerald-600 border border-emerald-500/40"
                            : isDark
                              ? "text-gray-300 hover:bg-white/10 hover:text-white"
                              : "text-gray-700 hover:bg-black/5 hover:text-black"
                            }`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div
                    className={`pt-3 mt-4 transition-colors duration-300 ${isDark
                      ? "border-t border-white/10"
                      : "border-t border-black/10"
                      }`}
                  >
                    <button
                      type="button"
                      onClick={toggleTheme}
                      className={`w-full flex items-center justify-center gap-3 px-5 py-3 font-semibold text-sm tracking-wide rounded-lg transition-all duration-300 ${isDark
                        ? "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
                        : "bg-black/5 text-gray-700 hover:bg-black/10 hover:text-black"
                        }`}
                    >
                      {isDark ? (
                        <>
                          <FaSun size={18} className="text-amber-400" />
                          <span>Light Mode</span>
                        </>
                      ) : (
                        <>
                          <FaMoon size={16} className="text-blue-400" />
                          <span>Dark Mode</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
