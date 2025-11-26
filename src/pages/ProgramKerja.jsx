import { useMemo, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiSearch } from "react-icons/fi";
import { NavLink } from 'react-router-dom';
import { useDebounce } from "use-debounce";
import HeroSection from "../components/HeroSection";
import { APP_CONFIG } from "../config";
import { useFetchAllProker } from "../hooks/proker/useFetchAllProker";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useTheme } from "../hooks/useTheme";

const ImageWithFallback = ({ src, alt, className }) => (
  <img
    src={src}
    alt={alt}
    className={className}
    onError={(e) => {
      e.target.onerror = null;
      e.target.src = "https://via.placeholder.com/400x300/e0f2f7/00796b?text=HMIF"
    }}
  />
);

export default function ProgramKerja() {

  useDocumentTitle("Program Kerja HMIF");
  const isDark = useTheme();

  const divisions = ["Semua", "BPI", "PSDM", "LITBANG", "HUMAS", "MEDIATEK", "KWU"]; // Tambahan divisi dari mock data
  const ITEMS_PER_PAGE = 9;

  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const [selectedDivision, setSelectedDivision] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);

  const { loading, proker } = useFetchAllProker(debouncedSearchQuery);
  const prokerData = proker.data || [];

  const filteredPrograms = useMemo(() => {
    let filtered = prokerData;
    const query = debouncedSearchQuery.toLowerCase().trim();

    if (selectedDivision !== "Semua") {
      filtered = filtered.filter(p => p.division === selectedDivision);
    }

    if (query) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.division.toLowerCase().includes(query)
      );
    }

    // Sort: Sedang Berjalan di awal, Selesai di kedua, Belum Berjalan di akhir
    filtered.sort((a, b) => {
      const currentYear = new Date().getFullYear();
      const aYear = new Date(a.updated_at).getFullYear();
      const bYear = new Date(b.updated_at).getFullYear();

      const aIsActive = a.status === "active" && aYear === currentYear;
      const bIsActive = b.status === "active" && bYear === currentYear;
      const aIsSelesai = a.status === "deactive" && aYear === currentYear;
      const bIsSelesai = b.status === "deactive" && bYear === currentYear;

      // Sedang Berjalan di awal
      if (aIsActive && !bIsActive) return -1;
      if (!aIsActive && bIsActive) return 1;

      // Selesai di kedua (sebelum Belum Berjalan)
      if (aIsSelesai && !bIsSelesai) return -1;
      if (!aIsSelesai && bIsSelesai) return 1;

      return 0;
    });

    return filtered;
  }, [prokerData, selectedDivision, debouncedSearchQuery]); const totalPages = Math.ceil(filteredPrograms.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPrograms = filteredPrograms.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleDivisionChange = (division) => {
    setSelectedDivision(division);
    setCurrentPage(1);
  };

  const commonClasses = {
    // Backgrounds
    bgSticky: isDark ? "bg-slate-900/95" : "bg-white/95",
    bgCard: isDark ? "bg-slate-800 border-emerald-500/30 hover:border-emerald-400" : "bg-white border-emerald-500/50 hover:border-emerald-500 shadow-md",
    bgImage: isDark ? "bg-slate-900" : "bg-slate-50",
    bgImageGradient: isDark ? "bg-gradient-to-t from-slate-800 via-slate-800/20 to-transparent" : "bg-gradient-to-t from-white via-white/20 to-transparent",

    // Text
    textPrimary: isDark ? "text-emerald-50 group-hover:text-emerald-400" : "text-slate-800 group-hover:text-emerald-600",
    textSecondary: isDark ? "text-slate-400" : "text-slate-600",
    textAccent: isDark ? "text-slate-300" : "text-slate-700",
    textDivider: isDark ? "border-slate-700" : "border-slate-300",
    textHighlight: isDark ? "text-emerald-400" : "text-emerald-600",

    // Status Badges
    statusSuccess: isDark ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50" : "bg-emerald-100 text-emerald-600 border border-emerald-300",
    statusPending: isDark ? "bg-amber-500/20 text-amber-400 border border-amber-500/50" : "bg-amber-100 text-amber-600 border border-amber-300",

    // Search Input
    inputBg: isDark ? "bg-slate-800 border-slate-700 text-slate-200 placeholder:text-slate-500 focus:ring-emerald-500" : "bg-slate-100 border-slate-300 text-slate-800 placeholder:text-slate-500 focus:ring-emerald-600",
    inputIcon: isDark ? "text-slate-400" : "text-slate-500",

    // Division Buttons
    btnActive: isDark ? "bg-emerald-500 text-slate-950 shadow-lg" : "bg-emerald-600 text-white shadow-md",
    btnInactive: isDark ? "bg-slate-800 text-slate-300 border border-slate-700 hover:border-emerald-500/50 hover:text-emerald-400" : "bg-slate-100 text-slate-700 border border-slate-300 hover:border-emerald-500 hover:text-emerald-600",

    btnPagination: isDark ? "bg-slate-800 border-slate-700 text-slate-300 hover:border-emerald-500/50 hover:text-emerald-400 disabled:hover:border-slate-700 disabled:hover:text-slate-300" : "bg-white border-slate-300 text-slate-600 hover:border-emerald-500 hover:text-emerald-600 disabled:hover:border-slate-300 disabled:hover:text-slate-600",
  };


  const ProkerCard = ({ proker }) => {
    const currentYear = new Date().getFullYear();
    const updatedYear = new Date(proker.updated_at).getFullYear();
    const isUpdatedThisYear = updatedYear === currentYear;
    const isActive = proker.status === "active";

    // Logic:
    // - Jika active dan updated tahun ini = "Sedang Berjalan" (green)
    // - Jika deactive dan updated tahun ini = "Selesai" (blue)
    // - Jika deactive dan updated tahun lalu = "Belum Berjalan" (purple)
    let status = "Belum Berjalan";
    let badgeClass = isDark ? "bg-purple-500/30 backdrop-blur-md text-purple-200 border border-purple-500/50" : "bg-purple-100/60 backdrop-blur-md text-purple-700 border border-purple-300";

    if (isActive && isUpdatedThisYear) {
      status = "Sedang Berjalan";
      badgeClass = isDark ? "bg-emerald-500/30 backdrop-blur-md text-emerald-200 border border-emerald-500/50" : "bg-emerald-100/60 backdrop-blur-md text-emerald-700 border border-emerald-300";
    } else if (!isActive && isUpdatedThisYear) {
      status = "Selesai";
      badgeClass = isDark ? "bg-blue-500/30 backdrop-blur-xl text-blue-200 border border-blue-500/50" : "bg-blue-100/60 backdrop-blur-md text-blue-700 border border-blue-300";
    }

    const imageUrl = APP_CONFIG.API_BASE_URL_ASSETS + '/proker/' + proker.logo;

    return (
      <NavLink to={`/proker/${proker.slug}`} className="hover:scale-[1.02] transition duration-300">
        <div
          className={`group relative rounded-xl overflow-hidden transition-all duration-300 border
          ${isDark ? "bg-slate-800 border-emerald-500/30 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20" : "bg-white border-emerald-500/50 hover:border-emerald-500 shadow-sm hover:shadow-md hover:shadow-emerald-500/15"}
          `}
        >
          <div className="absolute top-4 right-4 z-10">
            <span
              className={`px-3 py-1.5 rounded-full text-xs font-semibold ${badgeClass}`}
            >
              {status}
            </span>
          </div>

          <div className={`relative h-48 overflow-hidden flex items-center justify-center p-4 ${commonClasses.bgImage}`}>
            <ImageWithFallback
              src={imageUrl}
              alt={proker.name}
              className="h-32 object-contain transition-transform duration-300 group-hover:scale-110"
            />
            <div className={`absolute inset-0 ${commonClasses.bgImageGradient}`}></div>
          </div>

          <div className="p-6 space-y-4">
            <h3 className={`text-xl font-bold transition-colors duration-300 ${commonClasses.textPrimary}`}>
              {proker.name}
            </h3>

            <p className={`text-sm line-clamp-2 ${commonClasses.textSecondary}`}>
              {proker.description.length > 100 ? proker.description.slice(0, 100) + '...' : proker.description}
            </p>

            <div className={`flex items-center gap-2 pt-2 border-t ${commonClasses.textDivider}`}>
              <div className={`w-2 h-2 rounded-full ${isDark ? "bg-emerald-500" : "bg-emerald-600"}`}></div>
              <span className={`text-sm font-medium ${commonClasses.textAccent}`}>
                {proker.division}
              </span>
            </div>
          </div>
        </div>
      </NavLink>
    );
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 w-full ${isDark ? "bg-gray-900" : "bg-white"}`}>
      <HeroSection
        title="Program Kerja HMIF"
        subtitle="Jelajahi rangkaian program kerja strategis dan inovatif yang kami rancang untuk mengembangkan talenta mahasiswa, membangun kolaborasi lintas divisi, dan menciptakan dampak positif bagi komunitas informatika di Universitas Jember"
        subtitleLabel="Rencana Tahunan"
      />
      <div className={`sticky top-0 z-40 ${commonClasses.bgSticky}`}>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-4">
          <div className="relative">
            <FiSearch className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${commonClasses.inputIcon}`} />
            <input
              type="text"
              placeholder="Cari program kerja..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className={`w-full border rounded-xl pl-12 pr-6 py-4 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${commonClasses.inputBg}`}
            />
          </div>
          <div className="flex overflow-x-auto pb-2 gap-3 items-center">
            <button
              onClick={() => handleDivisionChange("Semua")}
              className={`flex-shrink-0 px-6 py-2 rounded-full transition-all duration-300 font-medium text-sm
                ${selectedDivision === "Semua"
                  ? commonClasses.btnActive
                  : commonClasses.btnInactive
                }`}
            >
              Semua
            </button>
            {divisions.slice(1).map((division) => (
              <div key={division} className="flex items-center gap-2 flex-shrink-0">
                {selectedDivision === division && (
                  <div className="flex items-center gap-2">
                    <img
                      src={`/icon-divisi/${division}.png`}
                      className="w-7 h-7"
                    />
                    <div className={`h-6 w-0.5 ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
                  </div>
                )}
                <button
                  onClick={() => handleDivisionChange(division)}
                  className={`flex-shrink-0 px-6 py-2 rounded-full transition-all duration-300 font-medium text-sm
                    ${selectedDivision === division
                      ? commonClasses.btnActive
                      : commonClasses.btnInactive
                    }`}
                >
                  {division}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <p className={commonClasses.textSecondary}>
            Menampilkan <span className={commonClasses.textHighlight}>{filteredPrograms.length}</span> program kerja
          </p>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 animate-pulse">
            {[...Array(ITEMS_PER_PAGE)].map((_, index) => (
              <div
                key={index}
                className={`rounded-xl h-96 ${isDark ? "bg-slate-800" : "bg-slate-100"}`}
              >
                <div className={`h-48 rounded-t-xl ${isDark ? "bg-slate-700" : "bg-slate-200"}`}></div>
                <div className="p-6 space-y-4">
                  <div className={`h-6 rounded w-3/4 ${isDark ? "bg-slate-600" : "bg-slate-300"}`}></div>
                  <div className={`h-3 rounded w-full ${isDark ? "bg-slate-700" : "bg-slate-200"}`}></div>
                  <div className={`h-3 rounded w-2/3 ${isDark ? "bg-slate-700" : "bg-slate-200"}`}></div>
                  <div className={`h-4 rounded w-1/4 mt-4 ${isDark ? "bg-slate-700" : "bg-slate-200"}`}></div>
                </div>
              </div>
            ))}
          </div>
        ) : paginatedPrograms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {paginatedPrograms.map((program) => (
              <ProkerCard key={program.slug} proker={program} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${isDark ? "bg-slate-800" : "bg-slate-100"}`}>
              <FiSearch className={`w-10 h-10 ${isDark ? "text-slate-600" : "text-slate-400"}`} />
            </div>
            <h3 className={`mb-2 font-semibold ${isDark ? "text-slate-400" : "text-slate-700"}`}>Tidak ada program ditemukan</h3>
            <p className={commonClasses.textSecondary}>Coba ubah filter atau kata kunci pencarian</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg border transition-all disabled:opacity-30 disabled:cursor-not-allowed ${commonClasses.btnPagination}`}
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <span className={`${commonClasses.textHighlight} min-w-[3rem] text-center font-semibold`}>
                {currentPage}
              </span>
              <span className={isDark ? "text-slate-600" : "text-slate-400"}>/</span>
              <span className={commonClasses.textSecondary}>
                {totalPages}
              </span>
            </div>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg border transition-all disabled:opacity-30 disabled:cursor-not-allowed ${commonClasses.btnPagination}`}
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
