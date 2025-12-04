import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import HeroSection from "../components/HeroSection";

import { APP_CONFIG } from '../config';
import { useFetchDetailProker } from '../hooks/proker/useFetchDetailProker';
import { useFetchGalleryProker } from '../hooks/proker/useFetchGalleryProker';
import { useFetchTimelineProker } from '../hooks/proker/useFetchTimelineProker';
import { useTheme } from "../hooks/useTheme";

import { FiCalendar, FiFileText, FiImage, FiX } from "react-icons/fi";
import useDocumentTitle from '../hooks/useDocumentTitle';

const removeHtmlTags = (input) => {
  let cleanedString = input.replace(/<[^>]*>/g, '');
  cleanedString = cleanedString.replace(/&nbsp;/g, ' ');
  return cleanedString;
};

const ImageFallback = ({ src, alt, className }) => (
  <img src={src} alt={alt} className={className} onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/150?text=Logo+Error" }} />
);

const SimpleLightboxModal = ({ image, caption, onClose }) => {
  if (!image) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm" onClick={onClose}>
      <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/50 hover:bg-slate-800/70 text-white transition duration-200"
          aria-label="Tutup Galeri"
        >
          <FiX className="w-6 h-6" />
        </button>
        <img
          src={image}
          alt={caption || 'Galeri Program Kerja'}
          className="max-h-[80vh] w-auto mx-auto object-contain rounded-lg shadow-2xl"
        />
        {caption && (
          <div className="mt-4 p-3 bg-slate-900/70 text-slate-200 text-center rounded-lg max-w-full mx-auto">
            <p className="text-sm italic">{caption}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default function ProkerDetailPage() {
  useDocumentTitle('Program Kerja');
  const isDark = useTheme();
  const { slug } = useParams();

  const { dataDetailProker, loadingDetailProker } = useFetchDetailProker(slug);
  const { dataGalleryProker, loadingGalleryProker } = useFetchGalleryProker(slug);
  const { dataTimelineProker, loadingTimelineProker } = useFetchTimelineProker(slug);

  const [galleryProker, setGalleryProker] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCaption, setSelectedCaption] = useState(null);

  const isLoading = loadingDetailProker || loadingGalleryProker || loadingTimelineProker;

  useEffect(() => {
    if (!loadingGalleryProker && dataGalleryProker && dataDetailProker.length > 0) {
      const updatedGallery = dataGalleryProker.map((gallery) => {
        return {
          src: APP_CONFIG.API_BASE_URL_ASSETS + 'proker-gallery/' + gallery.image,
          caption: gallery.caption
        };
      });
      setGalleryProker(updatedGallery);
    }
  }, [dataGalleryProker, loadingGalleryProker, dataDetailProker]);

  const openLightbox = (imageSrc, caption) => {
    setSelectedImage(imageSrc);
    setSelectedCaption(caption);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setSelectedCaption(null);
  };

  // Scroll to top when component mounts or slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const detail = dataDetailProker.length > 0 ? dataDetailProker[0] : {};

  const getStatusStyle = (status, updated_at) => {
    const currentYear = new Date().getFullYear();
    const updatedYear = new Date(updated_at).getFullYear();
    const isUpdatedThisYear = updatedYear === currentYear;
    const isActive = status === "active";

    // Logic:
    // - Jika active dan updated tahun ini = "Sedang Berjalan" (emerald)
    // - Jika deactive dan updated tahun ini = "Selesai" (blue)
    // - Jika deactive dan updated tahun lalu = "Belum Berjalan" (purple)
    if (isActive && isUpdatedThisYear) {
      return {
        status: "SEDANG BERJALAN",
        style: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      };
    } else if (!isActive && isUpdatedThisYear) {
      return {
        status: "SELESAI",
        style: "bg-blue-500/20 text-blue-400 border-blue-500/30"
      };
    } else {
      return {
        status: "BELUM BERJALAN",
        style: "bg-purple-500/20 text-purple-400 border-purple-500/30"
      };
    }
  };

  // Skeleton Loading menggunakan Ternary
  const LoadingSkeleton = () => (
    <div className="animate-pulse space-y-12">
      <div className={`${isDark ? "bg-slate-900/50 border border-slate-800/50" : "bg-gray-100/70 border border-gray-300"} backdrop-blur-sm rounded-2xl p-8 shadow-2xl`}>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className={`w-32 h-32 md:w-40 md:h-40 rounded-xl ${isDark ? "bg-slate-800/70" : "bg-gray-200"}`} />
          <div className="flex-1 space-y-4">
            <div className={`h-6 w-24 rounded-lg ${isDark ? "bg-slate-700/70" : "bg-gray-300"}`} />
            <div className={`h-10 w-3/4 rounded ${isDark ? "bg-slate-700/70" : "bg-gray-300"}`} />
            <div className="flex gap-3">
              <div className={`h-8 w-32 rounded-lg ${isDark ? "bg-slate-800/70" : "bg-gray-200"}`} />
              <div className={`h-8 w-20 rounded-lg ${isDark ? "bg-slate-800/70" : "bg-gray-200"}`} />
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col lg:flex-row gap-8'>
        <div className={`lg:w-2/3 ${isDark ? "bg-slate-900/50 border border-slate-800/50" : "bg-gray-100/70 border border-gray-300"} rounded-2xl p-8`}>
          <div className={`h-6 w-1/3 mb-6 ${isDark ? "bg-slate-700/70" : "bg-gray-300"} rounded`} />
          <div className="space-y-3">
            <div className={`h-4 ${isDark ? "bg-slate-800/70" : "bg-gray-200"} rounded w-full`} />
            <div className={`h-4 ${isDark ? "bg-slate-800/70" : "bg-gray-200"} rounded w-11/12`} />
            <div className={`h-4 ${isDark ? "bg-slate-800/70" : "bg-gray-200"} rounded w-5/6`} />
          </div>
        </div>
        <div className={`lg:w-1/3 ${isDark ? "bg-slate-900/50 border border-slate-800/50" : "bg-gray-100/70 border border-gray-300"} rounded-2xl p-8`}>
          <div className={`h-6 w-1/2 mb-6 ${isDark ? "bg-slate-700/70" : "bg-gray-300"} rounded`} />
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex relative pb-8">
              <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                <div className={`h-full w-0.5 ${isDark ? "bg-slate-800/70" : "bg-gray-300"} pointer-events-none`} />
              </div>
              <div className={`w-10 h-10 rounded-full ${isDark ? "bg-slate-700/70" : "bg-gray-300"} flex-shrink-0 relative z-10`} />
              <div className="flex-grow pl-4">
                <div className={`h-4 w-20 ${isDark ? "bg-slate-700/70" : "bg-gray-300"} rounded my-1`} />
                <div className={`h-3 w-3/4 ${isDark ? "bg-slate-800/70" : "bg-gray-200"} rounded`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`${isDark ? "bg-slate-900/50 border border-slate-800/50" : "bg-gray-100/70 border border-gray-300"} rounded-2xl p-8`}>
        <div className={`h-6 w-1/4 mb-6 ${isDark ? "bg-slate-700/70" : "bg-gray-300"} rounded`} />
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          <div className={`h-48 rounded-lg ${isDark ? "bg-slate-800/70" : "bg-gray-200"}`} />
          <div className={`h-48 rounded-lg ${isDark ? "bg-slate-800/70" : "bg-gray-200"}`} />
          <div className={`h-48 rounded-lg ${isDark ? "bg-slate-800/70" : "bg-gray-200"}`} />
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    // Background Loading di Dark Mode dipertahankan, kecuali jika Anda ingin Light Mode saat loading
    return (
      <div className={`min-h-screen ${isDark ? "bg-slate-950" : "bg-white"}`}>
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
            <LoadingSkeleton />
          </div>
        </div>
      </div>
    );
  }

  const cleanedDescription = detail.description ? removeHtmlTags(detail.description) : 'Deskripsi tidak tersedia.';
  const statusInfo = getStatusStyle(detail.status, detail.updated_at);
  const statusText = statusInfo.status;
  const statusStyle = statusInfo.style;


  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? "bg-slate-950" : "bg-white"}`}>
      <HeroSection
        title="Detail Program Kerja"
        subtitle="Informasi lengkap tentang program kerja, timeline, dan tim yang terlibat"
        subtitleLabel="Rincian Program"
      />
      <div className="relative">
        <div className="max-w-7xl mx-auto py-12 space-y-12 px-4 sm:px-6 lg:px-8">

          <div className={`${isDark ? "bg-slate-900/50 border-slate-800/50" : "bg-white border-gray-200"} backdrop-blur-sm border rounded-2xl p-8 shadow-2xl`}>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0">
                <div className={`w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden border-2 ${isDark ? "border-slate-700/50 bg-slate-800/50" : "border-gray-300 bg-gray-200"} shadow-xl`}>
                  <ImageFallback
                    src={APP_CONFIG.API_BASE_URL_ASSETS + 'proker/' + detail.logo}
                    alt={`${detail.name || 'Program'} Logo`}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
              </div>

              <div className="flex-1 space-y-6">
                <div>
                  <span className={`inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full border ${statusStyle}`}>
                    {statusText}
                  </span>
                </div>
                <h1 className={`text-4xl font-bold ${isDark ? "text-slate-50" : "text-gray-900"}`}>{detail.name || 'Detail Program Kerja'}</h1>
                <div className="flex flex-wrap gap-3">
                  <div className={`flex items-center gap-2 px-4 py-2 ${isDark ? "bg-emerald-500/20 border-emerald-500/50" : "bg-emerald-50 border-emerald-300"} border rounded-lg`}>
                    <img src={`/icon-divisi/${detail.division}.png`} alt={detail.division} className="w-5 h-5" />
                    <span className={`text-sm ${isDark ? "text-emerald-200" : "text-emerald-800"}`}>{detail.division || 'N/A'}</span>
                  </div>
                  <div className={`flex items-center gap-2 px-4 py-2 ${isDark ? "bg-slate-800/60" : "bg-gray-100"} border border-emerald-500/30 rounded-lg`}>
                    <FiCalendar className="w-4 h-4 text-emerald-500" />
                    <span className={`text-sm ${isDark ? "text-slate-200" : "text-gray-800"}`}>{new Date().getFullYear()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='flex flex-col lg:flex-row gap-8'>
            <section className={`lg:w-2/3 ${isDark ? "bg-slate-900/50 border-slate-800/50" : "bg-white border-gray-200"} backdrop-blur-sm border rounded-2xl p-8 shadow-xl`}>
              <div className={`flex items-center gap-3 mb-6 pb-4 border-b ${isDark ? "border-slate-700/50" : "border-gray-200"}`}>
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center">
                  <FiFileText className="w-5 h-5 text-cyan-500" />
                </div>
                <h2 className={`text-lg font-semibold ${isDark ? "text-slate-50" : "text-gray-900"}`}>Deskripsi Program</h2>
              </div>

              <div className="space-y-4">
                {cleanedDescription.split('\n').filter(p => p.trim() !== '').map((paragraph, index) => (
                  <p key={index} className={`${isDark ? "text-slate-300" : "text-gray-600"} leading-relaxed text-base`}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            <section className={`lg:w-1/3 ${isDark ? "bg-slate-900/50 border-slate-800/50" : "bg-white border-gray-200"} backdrop-blur-sm border rounded-2xl p-8 shadow-xl`}>
              <div className={`flex items-center gap-3 mb-6 pb-4 border-b ${isDark ? "border-slate-700/50" : "border-gray-200"}`}>
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center">
                  <FiCalendar className="w-5 h-5 text-purple-500" />
                </div>
                <h2 className={`text-lg font-semibold ${isDark ? "text-slate-50" : "text-gray-900"}`}>Timeline Pelaksanaan</h2>
              </div>
              <div className="pl-5">
                {dataTimelineProker.map((timeline, index) => (
                  <div className="flex relative pb-12" key={index}>
                    <div className={`h-full w-0.5 absolute inset-0 left-[20px] ${isDark ? "bg-slate-800" : "bg-gray-300"} pointer-events-none`} />

                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-500 inline-flex items-center justify-center text-white relative z-10">
                      <FiCalendar className="w-5 h-5 text-white" />
                    </div>

                    <div className="flex-grow pl-4">
                      <h3 className={`font-medium text-md mb-1 tracking-wider ${isDark ? "text-slate-50" : "text-gray-900"}`}>
                        {timeline.date}
                      </h3>
                      <p className={`leading-relaxed ${isDark ? "text-slate-400" : "text-gray-700"} text-sm`}>
                        {timeline.name}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="flex relative">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-500 inline-flex items-center justify-center text-white relative z-10">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                      <path d="M22 4L12 14.01l-3-3" />
                    </svg>
                  </div>
                  <div className="flex-grow pl-4">
                    <h3 className={`font-medium text-md mb-1 tracking-wider ${isDark ? "text-slate-50" : "text-gray-900"}`}>
                      {dataTimelineProker.length > 0 ? 'SELESAI' : 'COMING SOON'}
                    </h3>
                    <p className={`leading-relaxed ${isDark ? "text-slate-400" : "text-gray-700"} text-sm`}>
                      {dataTimelineProker.length > 0 ? 'Proker telah selesai dilaksanakan' : 'Proker belum dimulai'}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <section className={`${isDark ? "bg-slate-900/50 border-slate-800/50" : "bg-white border-gray-200"} backdrop-blur-sm border rounded-2xl p-8 shadow-xl`}>
            <div className={`flex items-center gap-3 mb-6 pb-4 border-b ${isDark ? "border-slate-700/50" : "border-gray-200"}`}>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 flex items-center justify-center">
                <FiImage className="w-5 h-5 text-emerald-500" />
              </div>
              <h2 className={`text-lg font-semibold ${isDark ? "text-slate-50" : "text-gray-900"}`}>Dokumentasi Program</h2>
            </div>

            {galleryProker.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {galleryProker.map((item, index) => (
                  <div
                    key={index}
                    className="aspect-square w-full rounded-lg overflow-hidden cursor-pointer relative group"
                    onClick={() => openLightbox(item.src, item.caption)}
                  >
                    <ImageFallback
                      src={item.src}
                      alt={item.caption || `Galeri ${index + 1}`}
                      className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <span className="text-white text-xs font-semibold p-2 bg-slate-900/50 rounded-lg">Lihat</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Empty State
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className={`w-20 h-20 rounded-full ${isDark ? "bg-slate-800/60 border-slate-700/50" : "bg-gray-100 border-gray-300"} border flex items-center justify-center mb-4`}>
                  <FiImage className={isDark ? "w-10 h-10 text-slate-600" : "w-10 h-10 text-gray-400"} />
                </div>
                <p className={isDark ? "text-slate-400" : "text-gray-500"}>
                  Tidak ada galeri proker tersedia
                </p>
              </div>
            )}
          </section>
        </div>
      </div>

      <SimpleLightboxModal
        image={selectedImage}
        caption={selectedCaption}
        onClose={closeLightbox}
      />
    </div>
  );
}
