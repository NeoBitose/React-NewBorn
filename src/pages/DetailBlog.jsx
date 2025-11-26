import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchDetailPost } from '../hooks/blog/useFetchDetailPost';
import { useFetchGalleryPost } from '../hooks/blog/useFetchGalleryPost';
import { useFetchTopPost } from '../hooks/homepage/useFetchTopPost';
import { useFetchAllTags } from '../hooks/blog/useFetchAllTags';
import moment from 'moment';
import { MdOutlineAccessTimeFilled, MdArrowForward } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { useTheme } from "../hooks/useTheme";
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import 'yet-another-react-lightbox/plugins/captions.css';

export default function PostDetailPage() {
  const { slug } = useParams();
  const { dataDetailPost, loadingDetailPost } = useFetchDetailPost(slug);
  const { dataGalleryPost, loadingGalleryPost } = useFetchGalleryPost(slug);
  const { data: topPost, loading } = useFetchTopPost();
  const { data: allTags, loadingTag } = useFetchAllTags();
  const isDark = useTheme();

  useEffect(() => {
    const setImagesSize = async () => {
      const updatedGallery = await Promise.all(
        dataGalleryPost.map(async (gallery) => {
          const image = new Image();
          image.src = import.meta.env.VITE_API_BASE_URL_ASSETS + 'post-gallery/' + gallery.image;
          await image.decode();
          return {
            src: image.src,
            title: dataDetailPost[0].title,
            width: image.width,
            height: image.height,
            description: gallery.caption,
          };
        })
      );
      setGalleryPost(updatedGallery);
    };
    if (!loadingGalleryPost && dataGalleryPost.length > 0) {
      setImagesSize();
    }
  }, [dataGalleryPost, loadingGalleryPost]);

  const [galleryPost, setGalleryPost] = useState([]);
  const isLoading = loadingDetailPost || loadingGalleryPost || loading || loadingTag;

  return (
    <>
      {/* <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        
        .animate-blob {
          animation: blob 20s infinite ease-in-out;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style> */}

      <div className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-gray-900" : "bg-slate-50"}`}>
        {isLoading ? (
          <div className="animate-pulse">
            <div className={`relative py-20 overflow-hidden ${isDark ? "bg-gradient-to-b from-slate-900 via-gray-900 to-gray-900" : "bg-gradient-to-b from-white via-slate-50 to-slate-100"}`}>
              <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl">
                  <div className={`h-6 ${isDark ? "bg-slate-700" : "bg-slate-200"} rounded-full w-48 mb-6`}></div>
                  <div className={`h-12 ${isDark ? "bg-slate-600" : "bg-slate-300"} rounded-lg w-full mb-4`}></div>
                  <div className={`h-12 ${isDark ? "bg-slate-600" : "bg-slate-300"} rounded-lg w-3/4 mb-8`}></div>
                  <div className="flex gap-3">
                    <div className={`h-8 ${isDark ? "bg-slate-700" : "bg-slate-200"} rounded-full w-32`}></div>
                    <div className={`h-8 ${isDark ? "bg-slate-700" : "bg-slate-200"} rounded-full w-40`}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className={`${isDark ? "bg-slate-800" : "bg-white"} rounded-2xl shadow-lg overflow-hidden`}>
                    <div className={`h-96 ${isDark ? "bg-slate-700" : "bg-slate-300"}`}></div>
                    <div className="p-8 space-y-4">
                      <div className={`h-4 ${isDark ? "bg-slate-700" : "bg-slate-200"} rounded w-full`}></div>
                      <div className={`h-4 ${isDark ? "bg-slate-700" : "bg-slate-200"} rounded w-5/6`}></div>
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-1 space-y-6">
                  <div className={`${isDark ? "bg-slate-800" : "bg-white"} rounded-2xl shadow-lg p-6`}>
                    <div className={`h-6 ${isDark ? "bg-slate-700" : "bg-slate-200"} rounded w-40 mb-6`}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className={`relative py-20 overflow-hidden ${isDark ? "bg-gradient-to-b from-slate-900 via-gray-900 to-gray-900" : "bg-gradient-to-b from-white via-slate-50 to-slate-100"}`}>
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className={`absolute top-20 right-20 w-96 h-96 ${isDark ? "bg-emerald-600" : "bg-emerald-500"} rounded-full mix-blend-multiply filter blur-3xl animate-blob`}></div>
                <div className={`absolute bottom-20 left-20 w-96 h-96 ${isDark ? "bg-emerald-500" : "bg-emerald-300"} rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000`}></div>
                <div className={`absolute top-40 left-1/2 w-96 h-96 ${isDark ? "bg-emerald-400" : "bg-emerald-400"} rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000`}></div>
              </div>
              
              <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="max-w-4xl">
                  <div className="mb-6">
                    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${isDark ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-emerald-50 border-emerald-200 text-emerald-700"}`}>
                      <span className={`w-2 h-2 rounded-full animate-pulse ${isDark ? "bg-emerald-400" : "bg-emerald-500"}`}></span>
                      Blog Himpunan Mahasiswa Informatika
                    </span>
                  </div>
                  
                  <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
                    {dataDetailPost[0].title}
                  </h1>
                  
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm border transition-all duration-300 ${isDark ? "bg-slate-800/50 border-slate-700 text-slate-300" : "bg-white/80 border-slate-200 text-slate-600"}`}>
                      <MdOutlineAccessTimeFilled className={isDark ? "text-emerald-400" : "text-emerald-600"} />
                      <span className="text-sm font-medium">
                        {moment(dataDetailPost[0].created_at).format('LL')}
                      </span>
                    </div>
                    
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm border transition-all duration-300 ${isDark ? "bg-slate-800/50 border-slate-700 text-slate-300" : "bg-white/80 border-slate-200 text-slate-600"}`}>
                      <span className="text-sm font-medium">
                        {dataDetailPost[0].tags.length} Tags
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 flex-wrap">
                    {dataDetailPost[0].tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className={`px-4 py-2 text-sm font-semibold rounded-full shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 ${isDark ? "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-emerald-500/30 hover:shadow-emerald-500/50" : "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-emerald-500/30 hover:shadow-emerald-500/50"}`}
                      >
                        #{tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <article className={`rounded-2xl shadow-xl overflow-hidden border transition-all duration-300 hover:shadow-2xl ${isDark ? "bg-slate-800 border-slate-700 hover:border-emerald-500/30" : "bg-white border-slate-200 hover:shadow-emerald-500/10"}`}>
                    <div className="relative group overflow-hidden">
                      <img 
                        src={import.meta.env.VITE_API_BASE_URL_ASSETS + 'post/' + dataDetailPost[0].thumbnail} 
                        alt={dataDetailPost[0].title}
                        className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    <div className="p-8 lg:p-12">
                        <div className="p-8 lg:p-12">
                            <div
                              className={`prose prose-lg max-w-none leading-relaxed
                                prose-headings:font-bold prose-headings:tracking-tight
                                prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4
                                prose-h3:text-2xl prose-h3:mt-6 prose-h3:mb-3
                                prose-p:text-base prose-p:leading-relaxed prose-p:mb-4
                                prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                                prose-img:rounded-xl prose-img:shadow-lg prose-img:my-6
                                prose-blockquote:border-l-4 prose-blockquote:pl-4 prose-blockquote:italic
                                prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
                                prose-pre:rounded-xl prose-pre:p-4
                                prose-ul:my-4 prose-ol:my-4 prose-li:my-1
                                ${isDark 
                                  ? "prose-invert prose-headings: text-white prose-h2: text-white prose-h3: text-white prose-p: text-slate-300 prose-li: text-slate-300 prose-blockquote: text-slate-300 prose-a: text-emerald-400 hover: prose-a: text-emerald-300 prose-strong: text-white  prose-code: text-emerald-400  prose-blockquote: border-emerald-500" 
                                  : "prose-headings: text-slate-900 prose-p: text-slate-700 prose-a: text-emerald-600 hover: prose-a: text-emerald-700 prose-strong: text-slate-900  prose-code: text-emerald-700  prose-blockquote: border-emerald-500 prose-blockquote: text-slate-600"
                                }`}
                              
                              dangerouslySetInnerHTML={{ __html: dataDetailPost[0].description }}
                            />
                          </div>
                      </div>
                  </article>
                </div>

                <div className="lg:col-span-1">
                  <div className="space-y-6 lg:sticky lg:top-24">
                    <div className={`rounded-2xl shadow-xl p-6 border transition-all duration-300 ${isDark ? "bg-slate-800 border-slate-700 hover:shadow-emerald-500/10" : "bg-white border-slate-200 hover:shadow-2xl"}`}>
                      <div className="flex items-center justify-between mb-6">
                        <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                          Postingan Terbaru
                        </h3>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDark ? "bg-emerald-500/10" : "bg-emerald-50"}`}>
                          <MdArrowForward className={isDark ? "text-emerald-400" : "text-emerald-600"} />
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        {topPost.slice(0, 4).map((value, index) => (
                          <NavLink to={`/blog/${value.slug}`} key={index}>
                            <div className={`group flex gap-4 p-3 rounded-xl transition-all duration-300 cursor-pointer ${isDark ? "hover:bg-slate-700/50" : "hover:bg-slate-50"}`}>
                              <div className="relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
                                <img 
                                  src={import.meta.env.VITE_API_BASE_URL_ASSETS + 'post/' + value.thumbnail} 
                                  alt={value.title}
                                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300" 
                                />
                                <div className={`absolute inset-0 transition-colors duration-300 ${isDark ? "bg-emerald-500/0 group-hover:bg-emerald-500/10" : "bg-emerald-500/0 group-hover:bg-emerald-500/10"}`}></div>
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <h4 className={`font-semibold mb-1 line-clamp-2 transition-colors text-sm ${isDark ? "text-white group-hover:text-emerald-400" : "text-slate-900 group-hover:text-emerald-600"}`}>
                                  {value.title}
                                </h4>
                                <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                                  {moment(value.created_at).format('MMM DD, YYYY')}
                                </p>
                              </div>
                            </div>
                          </NavLink>
                        ))}
                      </div>
                    </div>

                    <div className={`rounded-2xl shadow-xl p-6 border transition-all duration-300 ${isDark ? "bg-gradient-to-br from-slate-800 to-slate-800/50 border-slate-700" : "bg-gradient-to-br from-emerald-50 to-white border-emerald-100"}`}>
                      <h3 className={`text-xl font-bold mb-6 ${isDark ? "text-white" : "text-slate-900"}`}>
                        Explore Tags
                      </h3>
                      
                      <div className="flex flex-wrap gap-2">
                        {allTags.map((value, index) => (
                          <span 
                            key={index} 
                            className={`px-3 py-1.5 text-xs font-medium rounded-full border-2 transition-all duration-300 cursor-pointer hover:scale-105 ${isDark ? "bg-slate-700 text-slate-300 border-slate-600 hover:border-emerald-500 hover:text-emerald-400" : "bg-white text-slate-700 border-slate-300 hover:border-emerald-500 hover:text-emerald-600 hover:shadow-md"}`}
                          >
                            #{value.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>          
          </>
        )}
      </div>
    </>
  );
}




