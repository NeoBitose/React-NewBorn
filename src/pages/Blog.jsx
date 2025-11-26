import HeroSection from "../components/HeroSection";
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { RiArrowLeftDoubleFill, RiArrowRightDoubleFill, RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import useFetchPost from '../hooks/blog/useFetchPost';
import useDocumentTitle from "../hooks/useDocumentTitle";
import { useTheme } from "../hooks/useTheme";
import { useDebounce } from 'use-debounce';

export default function Blog() {
  useDocumentTitle("Blog");
  const isDark = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, posts, totalPages } = useFetchPost(debouncedSearchQuery, currentPage);
  
  const removeHtmlTags = (input) => {
    let cleanedString = input.replace(/<[^>]*>/g, '');
    return cleanedString.replace(/&nbsp;/g, ' ');
  };

  const postsData = posts.data || [];
  const handlePagination = (page) => setCurrentPage(page);
  const handleSearch = (q) => { 
    setCurrentPage(1); 
    setSearchQuery(q); 
  };

 
  const commonClasses = {
    // Backgrounds
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {postsData.map((post, i) => (
              <NavLink 
                to={`/blog/${post.slug}`} 
                key={i} 
                className="hover:scale-[1.02] transition duration-300"
              >
                <div
                  className={`group relative rounded-xl overflow-hidden transition-all duration-300 border h-full flex flex-col ${commonClasses.bgCard}`}
                >
                 
                  <div className={`relative h-48 overflow-hidden ${commonClasses.bgImage}`}>
                    <img
                      src={import.meta.env.VITE_API_BASE_URL_ASSETS + 'post/' + post.thumbnail}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/400x300/e0f2f7/00796b?text=HMIF+Blog"
                      }}
                    />
                  </div>

                  
                  <div className="p-6 space-y-3 flex-1 flex flex-col">
                    <h3 className={`text-xl font-bold transition-colors duration-300 line-clamp-2 ${isDark ? "text-emerald-50 group-hover:text-emerald-400" : "text-slate-800 group-hover:text-emerald-600"}`}>
                      {post.title}
                    </h3>

                    
                    <div className={`flex items-center gap-2 text-sm ${commonClasses.textSecondary}`}>
                      <MdOutlineAccessTimeFilled className={`w-4 h-4 ${isDark ? "text-emerald-400" : "text-emerald-600"}`} />
                      <span>{moment(post.created_at).format('LL')}</span>
                    </div>

                  
                    <p className={`text-sm line-clamp-3 flex-1 ${commonClasses.textSecondary}`}>
                      {removeHtmlTags(post.description.substring(0, 140))}...
                    </p>

                  
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-3">
                        {post.tags.slice(0, 3).map((tag, idx) => (
                          <span 
                            key={idx} 
                            className={`px-3 py-1 text-xs font-medium rounded-full ${isDark ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50" : "bg-emerald-100 text-emerald-700 border border-emerald-300"}`}
                          >
                            #{tag.name}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${commonClasses.textSecondary}`}>
                            +{post.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
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
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => handlePagination(1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg border transition-all disabled:opacity-30 disabled:cursor-not-allowed ${commonClasses.btnPagination}`}
              title="Halaman pertama"
            >
              <RiArrowLeftDoubleFill className="w-5 h-5" />
            </button>

            <button
              onClick={() => handlePagination(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg border transition-all disabled:opacity-30 disabled:cursor-not-allowed ${commonClasses.btnPagination}`}
              title="Halaman sebelumnya"
            >
              <RiArrowLeftSLine className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 px-4">
              <span className={`${commonClasses.textHighlight} min-w-[3rem] text-center font-semibold`}>
                {currentPage}
              </span>
              <span className={isDark ? "text-slate-600" : "text-slate-400"}>/</span>
              <span className={commonClasses.textSecondary}>
                {totalPages}
              </span>
            </div>

            <button
              onClick={() => handlePagination(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg border transition-all disabled:opacity-30 disabled:cursor-not-allowed ${commonClasses.btnPagination}`}
              title="Halaman selanjutnya"
            >
              <RiArrowRightSLine className="w-5 h-5" />
            </button>

            <button
              onClick={() => handlePagination(totalPages)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg border transition-all disabled:opacity-30 disabled:cursor-not-allowed ${commonClasses.btnPagination}`}
              title="Halaman terakhir"
            >
              <RiArrowRightDoubleFill className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}