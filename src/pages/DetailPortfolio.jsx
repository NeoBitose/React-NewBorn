import { useEffect } from "react";
import { FiGithub } from "react-icons/fi";
import { useParams } from "react-router-dom";
import DetailPortfolioSkeleton from "../components/skeletons/DetailPortfolioSkeleton";
import { useFetchDetailPortfolio } from "../hooks/portfolio/useFetchDetailPortfolio";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useTheme } from "../hooks/useTheme";

export default function DetailPortfolio() {
  useDocumentTitle('Portfolio');
  const { slug } = useParams();
  const isDark = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const { dataDetailPortfolio, loadingDetailPortfolio } = useFetchDetailPortfolio(slug);

  // Handle jika data adalah array, ambil item pertama
  const portfolio = Array.isArray(dataDetailPortfolio) && dataDetailPortfolio.length > 0
    ? dataDetailPortfolio[0]
    : dataDetailPortfolio;

  useDocumentTitle(portfolio?.title ? `${portfolio.title} - Portfolio` : "Detail Portfolio");

  if (!portfolio || loadingDetailPortfolio) {
    return (
      <div className={`min-h-screen transition-colors duration-500 w-full flex items-center justify-center ${isDark ? "bg-gray-900" : "bg-white"}`}>
        <DetailPortfolioSkeleton />
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className={`min-h-screen transition-colors duration-500 w-full ${isDark ? "bg-gray-900" : "bg-white"}`}>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex items-center justify-center h-screen">
          <div className={`text-center py-12 rounded-lg ${isDark ? "bg-white/5 border border-white/10" : "bg-white/30 border border-white/50"}`}>
            <p className={isDark ? "text-white/70" : "text-gray-700"}>Portfolio tidak ditemukan</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 w-full flex items-center relative overflow-hidden ${isDark ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" : "bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50"}`}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-20 right-1/3 w-96 h-96 rounded-full blur-3xl opacity-20 transition-colors duration-500 ${isDark ? "bg-emerald-500" : "bg-emerald-400"
            }`}
        ></div>
        <div
          className={`absolute bottom-20 left-1/4 w-80 h-80 rounded-full blur-3xl opacity-15 transition-colors duration-500 ${isDark ? "bg-teal-500" : "bg-teal-300"
            }`}
        ></div>
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {portfolio?.image && (
            <div className="flex justify-center">
              <div
                className={`relative rounded-3xl overflow-hidden h-72 group cursor-pointer backdrop-blur-lg border shadow-2xl transition-all duration-300 ${isDark
                  ? "bg-white/15 border-white/30 hover:bg-white/25 hover:shadow-emerald-500/20"
                  : "bg-white/40 border-white/60 hover:bg-white/50 hover:shadow-emerald-400/20"
                  }`}
              >
                <img
                  src={import.meta.env.VITE_API_BASE_URL_ASSETS + "portfolio/" + portfolio.image}
                  alt={portfolio.title}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                <div
                  className={`absolute inset-0 ${isDark
                    ? "bg-gradient-to-t from-emerald-900/30 to-transparent"
                    : "bg-gradient-to-t from-emerald-400/20 to-transparent"
                    }`}
                ></div>
              </div>
            </div>
          )}

          <div className="flex flex-col justify-center gap-6">
            <div>
              <h1
                className={`text-3xl md:text-4xl font-bold mb-3 ${isDark ? "text-emerald-300" : "text-emerald-700"
                  }`}
              >
                {portfolio?.title}
              </h1>
              <div className="flex gap-1">
                <span className="inline-block w-20 h-1 rounded-full bg-emerald-500"></span>
                <span className="inline-block w-2 h-1 rounded-full bg-emerald-500/50"></span>
              </div>
            </div>

            <p className={`text-sm leading-relaxed backdrop-blur-sm rounded-xl p-3 border transition-all duration-300 ${isDark ? "bg-white/8 border-white/15 text-white/85" : "bg-white/30 border-white/40 text-gray-700"}`}>
              {portfolio?.description}
            </p>

            <div className={`rounded-2xl p-3 border backdrop-blur-md transition-all duration-300 ${isDark
              ? "bg-emerald-500/20 border-emerald-400/40 hover:bg-emerald-500/30 hover:border-emerald-400/60"
              : "bg-emerald-400/25 border-emerald-300/50 hover:bg-emerald-400/35 hover:border-emerald-300/70"
              }`}>
              <p className={`text-xs ${isDark ? "text-white/70" : "text-gray-600"}`}>
                <span className="font-semibold">Dibuat pada:</span>{" "}
                {new Date(portfolio?.created_at).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            {portfolio?.url && (
              <a
                href={portfolio.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 w-fit text-sm backdrop-blur-md border ${isDark
                  ? "bg-emerald-600/80 border-emerald-400/60 text-white hover:bg-emerald-600/100 hover:border-emerald-400"
                  : "bg-emerald-500/80 border-emerald-300/60 text-white hover:bg-emerald-500/100 hover:border-emerald-300"
                  }`}
              >
                <FiGithub size={18} />
                <span>Kunjungi GitHub</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
