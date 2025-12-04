import { useEffect, useState } from "react";
import { FiGithub, FiSearch } from "react-icons/fi";
import { useDebounce } from "use-debounce";
import HeroSection from "../components/HeroSection";
import PortfolioSkeleton from "../components/skeletons/PortfolioSkeleton";
import { useFetchAllPortfolio } from "../hooks/portfolio/useFetchAllPortfolio";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useTheme } from "../hooks/useTheme";

export default function Portfolio() {
  useDocumentTitle("Portfolio");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const [currentPage, setCurrentPage] = useState(1);

  const { loading, portfolio, totalPages } = useFetchAllPortfolio(debouncedSearchQuery, currentPage);
  const portfolioData = portfolio || [];
  const isDark = useTheme();

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePagination = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <HeroSection
        title="Portfolio HMIF UNEJ"
        subtitle="Koleksi karya dan prestasi mahasiswa informatika yang menunjukkan dedikasi dan inovasi mereka di berbagai bidang akademik dan profesional."
        subtitleLabel="PORTFOLIO"
        gradientFrom="from-emerald-50"
        gradientTo="to-teal-50"
        darkGradientFrom="from-gray-900"
        darkGradientTo="to-gray-900"
        showPattern={false}
      />

      <div className={`min-h-screen transition-colors duration-500 w-full ${isDark ? "bg-gray-900" : "bg-white"}`}>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-12">
            <div className="relative">
              <FiSearch className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? "text-slate-400" : "text-slate-500"}`} />
              <input
                type="text"
                placeholder="Cari portfolio ..."
                value={searchQuery}
                onChange={handleSearch}
                className={`w-full border rounded-xl pl-12 pr-6 py-4 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${isDark ? "bg-slate-800 border-slate-700 text-slate-200 placeholder:text-slate-500 focus:ring-emerald-500" : "bg-slate-100 border-slate-300 text-slate-800 placeholder:text-slate-500 focus:ring-emerald-600"}`}
              />
            </div>
          </div>

          {loading ? (
            <PortfolioSkeleton />
          ) : portfolioData && portfolioData.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                {portfolioData.map((item) => (
                  <a
                    key={item.id}
                    href={`/portfolio/${item.slug}`}
                    className={`group relative rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full flex flex-col ${isDark
                      ? "bg-gradient-to-br from-white/10 via-white/5 to-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/50"
                      : "bg-gradient-to-br from-white/60 via-white/40 to-emerald-200/30 border border-emerald-200 hover:border-emerald-400"
                      }`}
                  >
                    <div className="absolute inset-0 backdrop-blur-md pointer-events-none"></div>

                    {item.image && (
                      <div className="relative h-48 overflow-hidden bg-gradient-to-b from-emerald-500/20 to-transparent">
                        <img
                          src={import.meta.env.VITE_API_BASE_URL_ASSETS + "portfolio/" + item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:opacity-100 transition-opacity duration-300"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                        <div
                          className={`absolute inset-0 transition-opacity duration-300 ${isDark
                            ? "bg-gradient-to-b from-transparent to-emerald-900/40"
                            : "bg-gradient-to-b from-transparent to-emerald-600/30"
                            }`}
                        ></div>
                      </div>
                    )}

                    <div className="relative z-10 p-4 flex flex-col flex-grow">
                      <h3
                        className={`text-base font-bold line-clamp-2 mb-2 transition-colors duration-300 ${isDark
                          ? "text-emerald-300 group-hover:text-emerald-200"
                          : "text-emerald-700 group-hover:text-emerald-600"
                          }`}
                      >
                        {item.title}
                      </h3>

                      <p
                        className={`text-xs transition-colors duration-300 line-clamp-3 flex-grow ${isDark ? "text-white/70 group-hover:text-white/90" : "text-gray-700 group-hover:text-gray-800"
                          }`}
                      >
                        {item.description.length > 100
                          ? item.description.slice(0, 100) + "..."
                          : item.description}
                      </p>

                      <div className="flex items-center justify-between mt-4 pt-2 border-t border-white/10">
                        <span
                          className={`inline-block px-3 py-1.5 rounded-full text-xs font-semibold transition-colors duration-300 ${isDark
                            ? "bg-emerald-500/30 text-emerald-200 group-hover:bg-emerald-500/50"
                            : "bg-emerald-200/60 text-emerald-800 group-hover:bg-emerald-300/70"
                            }`}
                        >
                          {new Date(item.created_at).getFullYear()}
                        </span>
                        {item.url && (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className={`transition-all duration-300 hover:scale-110 ${isDark ? "text-emerald-300" : "text-emerald-600"}`}
                          >
                            <FiGithub size={20} />
                          </a>
                        )}
                      </div>
                    </div>

                    <div
                      className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${isDark
                        ? "bg-gradient-to-t from-emerald-500/20 to-transparent"
                        : "bg-gradient-to-t from-emerald-300/30 to-transparent"
                        }`}
                    ></div>
                  </a>
                ))}
              </div>

              {totalPages > 0 && (
                <div className={`flex justify-center items-center gap-2 md:gap-3 py-6 md:py-8 px-4 md:px-8 rounded-2xl backdrop-blur-lg transition-all duration-300`}>
                  <button
                    disabled={currentPage === 1}
                    onClick={() => handlePagination(1)}
                    title="Halaman pertama"
                    className={`px-2 md:px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl text-sm md:text-base font-semibold transition-all duration-300 backdrop-blur-sm border hover:scale-105 active:scale-95 ${currentPage === 1
                      ? isDark
                        ? "bg-white/5 border-white/10 text-white/40 cursor-not-allowed"
                        : "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed"
                      : isDark
                        ? "bg-emerald-600/80 border-emerald-400/70 text-white hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/30"
                        : "bg-emerald-500/80 border-emerald-300/70 text-white hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-400/30"
                      }`}
                  >
                    ⟨⟨
                  </button>

                  <button
                    disabled={currentPage === 1}
                    onClick={() => handlePagination(currentPage - 1)}
                    title="Halaman sebelumnya"
                    className={`px-2 md:px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl text-sm md:text-base font-semibold transition-all duration-300 backdrop-blur-sm border hover:scale-105 active:scale-95 ${currentPage === 1
                      ? isDark
                        ? "bg-white/5 border-white/10 text-white/40 cursor-not-allowed"
                        : "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed"
                      : isDark
                        ? "bg-emerald-600/80 border-emerald-400/70 text-white hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/30"
                        : "bg-emerald-500/80 border-emerald-300/70 text-white hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-400/30"
                      }`}
                  >
                    ⟨
                  </button>

                  <div className={`px-3 md:px-6 py-2 md:py-2.5 rounded-lg md:rounded-xl text-sm md:text-base font-semibold backdrop-blur-sm border transition-all duration-300 ${isDark
                    ? "bg-emerald-600/30 border-emerald-400/50 text-emerald-200"
                    : "bg-emerald-400/30 border-emerald-300/60 text-emerald-800"
                    }`}>
                    <span className="font-bold">{currentPage}</span> / <span className="opacity-70">{totalPages}</span>
                  </div>

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePagination(currentPage + 1)}
                    title="Halaman berikutnya"
                    className={`px-2 md:px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl text-sm md:text-base font-semibold transition-all duration-300 backdrop-blur-sm border hover:scale-105 active:scale-95 ${currentPage === totalPages
                      ? isDark
                        ? "bg-white/5 border-white/10 text-white/40 cursor-not-allowed"
                        : "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed"
                      : isDark
                        ? "bg-emerald-600/80 border-emerald-400/70 text-white hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/30"
                        : "bg-emerald-500/80 border-emerald-300/70 text-white hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-400/30"
                      }`}
                  >
                    ⟩
                  </button>

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePagination(totalPages)}
                    title="Halaman terakhir"
                    className={`px-2 md:px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl text-sm md:text-base font-semibold transition-all duration-300 backdrop-blur-sm border hover:scale-105 active:scale-95 ${currentPage === totalPages
                      ? isDark
                        ? "bg-white/5 border-white/10 text-white/40 cursor-not-allowed"
                        : "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed"
                      : isDark
                        ? "bg-emerald-600/80 border-emerald-400/70 text-white hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/30"
                        : "bg-emerald-500/80 border-emerald-300/70 text-white hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-400/30"
                      }`}
                  >
                    ⟩⟩
                  </button>
                </div>
              )}
            </>
          ) : (
            <div
              className={`text-center py-12 rounded-lg ${isDark ? "bg-white/5 border border-white/10" : "bg-white/30 border border-white/50"
                }`}
            >
              <p className={isDark ? "text-white/70" : "text-gray-700"}>
                Tidak ada portfolio yang cocok dengan pencarian Anda.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>

  );
}
