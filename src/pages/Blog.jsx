import moment from 'moment';
import { useEffect, useState } from 'react';
import { FiSearch } from "react-icons/fi";
import { NavLink } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import HeroSection from "../components/HeroSection";
import useFetchPost from '../hooks/blog/useFetchPost';
import useDocumentTitle from "../hooks/useDocumentTitle";
import { useTheme } from "../hooks/useTheme";

export default function Blog() {
  useDocumentTitle("Blog");
  const isDark = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, posts, totalPages } = useFetchPost(debouncedSearchQuery, currentPage);

  const removeHtmlTags = (input) => {
    let cleanedString = input.replace(/<[^>]*>/g, '');
    return cleanedString.replace(/&nbsp;/g, ' ');
  };

  const postsData = posts || [];
  const handlePagination = (page) => setCurrentPage(page);
  const handleSearch = (q) => {
    setCurrentPage(1);
    setSearchQuery(q);
  };


  const commonClasses = {
    bgCard: isDark
      ? "bg-slate-800 border border-emerald-500/30 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20"
      : "bg-white border border-emerald-500/50 hover:border-emerald-500 shadow-sm hover:shadow-md hover:shadow-emerald-500/15",

    bgImage: isDark ? "bg-slate-900" : "bg-slate-50",

    // Text
    textPrimary: isDark ? "text-emerald-50" : "text-slate-800",
    textSecondary: isDark ? "text-slate-400" : "text-slate-600",
    textAccent: isDark ? "text-slate-300" : "text-slate-700",
    textHighlight: isDark ? "text-emerald-400" : "text-emerald-600",

    // Search Input
    inputBg: isDark
      ? "bg-slate-800 border-slate-700 text-slate-200 placeholder:text-slate-500 focus:ring-emerald-500"
      : "bg-slate-100 border-slate-300 text-slate-800 placeholder:text-slate-500 focus:ring-emerald-600",
    inputIcon: isDark ? "text-slate-400" : "text-slate-500",

    // Pagination
    btnPagination: isDark
      ? "bg-slate-800 border-slate-700 text-slate-300 hover:border-emerald-500/50 hover:text-emerald-400 disabled:hover:border-slate-700 disabled:hover:text-slate-300"
      : "bg-white border-slate-300 text-slate-600 hover:border-emerald-500 hover:text-emerald-600 disabled:hover:border-slate-300 disabled:hover:text-slate-600",
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 w-full ${isDark ? "bg-gray-900" : "bg-white"}`}>
      <HeroSection
        title="Blog HMIF"
        subtitle="Artikel, tips, dan cerita menarik dari komunitas HMIF UNEJ. Temukan berbagai insight, pengalaman, dan informasi terkini seputar dunia informatika dan kegiatan himpunan"
        subtitleLabel="Berita dan Artikel"
      />


      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="relative">
          <FiSearch className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${commonClasses.inputIcon}`} />
          <input
            type="text"
            placeholder="Cari artikel berdasarkan judul..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className={`w-full border rounded-xl pl-12 pr-6 py-4 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${commonClasses.inputBg}`}
          />
        </div>
      </div>


      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">


        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`rounded-xl h-96 ${isDark ? "bg-slate-800" : "bg-slate-100"}`}
              >
                <div className={`h-48 rounded-t-xl ${isDark ? "bg-slate-700" : "bg-slate-200"}`}></div>
                <div className="p-6 space-y-4">
                  <div className={`h-6 rounded w-3/4 ${isDark ? "bg-slate-600" : "bg-slate-300"}`}></div>
                  <div className={`h-3 rounded w-1/2 ${isDark ? "bg-slate-700" : "bg-slate-200"}`}></div>
                  <div className={`h-3 rounded w-full ${isDark ? "bg-slate-700" : "bg-slate-200"}`}></div>
                  <div className={`h-3 rounded w-2/3 ${isDark ? "bg-slate-700" : "bg-slate-200"}`}></div>
                  <div className="flex gap-2 mt-4">
                    <div className={`h-6 rounded-full w-16 ${isDark ? "bg-slate-700" : "bg-slate-200"}`}></div>
                    <div className={`h-6 rounded-full w-20 ${isDark ? "bg-slate-700" : "bg-slate-200"}`}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : postsData.length > 0 ? (

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-12">
            {postsData.map((post, i) => (
              <NavLink
                to={`/blog/${post.slug}`}
                key={i}
                className={`group relative rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full flex flex-col ${isDark
                  ? "bg-gradient-to-br from-white/10 via-white/5 to-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/50"
                  : "bg-gradient-to-br from-white/60 via-white/40 to-emerald-200/30 border border-emerald-200 hover:border-emerald-400"
                  }`}
              >
                <div className="absolute inset-0 backdrop-blur-md pointer-events-none"></div>

                {post.thumbnail && (
                  <div className="relative w-full h-56 overflow-hidden">
                    <img
                      src={import.meta.env.VITE_API_BASE_URL_ASSETS + 'post/' + post.thumbnail}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                )}

                <div className="relative z-10 p-6 flex flex-col flex-grow">
                  <h3 className={`text-lg font-bricolage font-bold line-clamp-2 mb-3 transition-colors duration-300 ${isDark
                    ? "text-white group-hover:text-emerald-300"
                    : "text-gray-900 group-hover:text-emerald-600"
                    }`}>
                    {post.title}
                  </h3>

                  <div className={`flex items-center gap-2 text-sm mb-3 font-medium ${isDark ? "text-emerald-300" : "text-emerald-700"}`}>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      {moment(post.created_at).format('MMMM D, YYYY')}
                    </span>
                  </div>

                  <p className={`text-sm transition-colors duration-300 line-clamp-3 flex-grow ${isDark ? "text-white/75 group-hover:text-white/90" : "text-gray-700 group-hover:text-gray-800"
                    }`}>
                    {removeHtmlTags(post.description.substring(0, 150))}
                  </p>

                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/10 items-center">
                      {post.tags.slice(0, 2).map((tag, idx) => (
                        <span
                          key={idx}
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${isDark
                            ? "bg-emerald-500/30 text-emerald-200"
                            : "bg-emerald-200/60 text-emerald-800"
                            }`}
                        >
                          #{tag.name}
                        </span>
                      ))}
                      {post.tags.length > 2 && (
                        <div className="relative">
                          <button
                            className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-all duration-300 peer ${isDark
                              ? "bg-emerald-500/30 text-emerald-200 hover:bg-emerald-500/50"
                              : "bg-emerald-200/60 text-emerald-800 hover:bg-emerald-300/70"
                              }`}
                          >
                            +{post.tags.length - 2}
                          </button>

                          <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 rounded-lg text-xs whitespace-nowrap pointer-events-none opacity-0 peer-hover:opacity-100 transition-opacity duration-200 z-50 ${isDark
                            ? "bg-slate-900 text-white border border-emerald-500/30"
                            : "bg-white text-gray-900 border border-emerald-400/50 shadow-lg"
                            }`}>
                            <div className="space-y-1">
                              {post.tags.slice(2).map((tag, idx) => (
                                <div key={idx} className="flex items-center gap-1">
                                  <span className={`${isDark ? "text-emerald-300" : "text-emerald-600"}`}>#</span>
                                  <span>{tag.name}</span>
                                </div>
                              ))}
                            </div>
                            <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 ${isDark ? "bg-slate-900" : "bg-white"} border-r border-b ${isDark ? "border-emerald-500/30" : "border-emerald-400/50"} transform rotate-45`}></div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${isDark
                    ? "bg-gradient-to-t from-emerald-500/20 to-transparent"
                    : "bg-gradient-to-t from-emerald-300/30 to-transparent"
                    }`}
                ></div>
              </NavLink>
            ))}
          </div>
        ) : (

          <div className="text-center py-20">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${isDark ? "bg-slate-800" : "bg-slate-100"}`}>
              <FiSearch className={`w-10 h-10 ${isDark ? "text-slate-600" : "text-slate-400"}`} />
            </div>
            <h3 className={`mb-2 font-semibold ${isDark ? "text-slate-400" : "text-slate-700"}`}>
              Tidak ada artikel ditemukan
            </h3>
            <p className={commonClasses.textSecondary}>
              Coba ubah kata kunci pencarian Anda
            </p>
          </div>
        )}


        {totalPages > 1 && !loading && (
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
      </div>
    </div>
  );
}
