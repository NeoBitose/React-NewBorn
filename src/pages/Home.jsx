import React from "react";
import { Link } from "react-router-dom";
import CurvedLoop from "../components/CurvedLoop";
import { DivisionCard } from "../components/DivisionCard";
import { NavigationCard } from "../components/NavigationCard";
import { SuccessToast, ValidationAlert } from "../components/Notifications";
import HomeBlogSkeleton from "../components/skeletons/HomeBlogSkeleton";
import HomeProkerSkeleton from "../components/skeletons/HomeProkerSkeleton";
import { divisionsData } from "../constants/divisions";
import { useFetchActiveProker } from "../hooks/homepage/useFetchActiveProker";
import { useFetchTopPost } from "../hooks/homepage/useFetchTopPost";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useNotification } from "../hooks/useNotification";
import { useTheme } from "../hooks/useTheme";
import { validateFormData } from "../utils/formValidation";

function Home() {
  useDocumentTitle("Beranda");
  const isDark = useTheme();
  const { data: topPosts, loading: loadingPosts } = useFetchTopPost();
  const { dataActiveProker, loading: loadingActiveProker } = useFetchActiveProker();
  const carouselRef = React.useRef(null);
  const {
    showToast,
    isExiting,
    validationAlert,
    isValidationExiting,
    showSuccessToast,
    showValidationAlert,
  } = useNotification();

  const handleScroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 400;
      carouselRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const validation = validateFormData(formData);

    if (!validation.valid) {
      showValidationAlert(validation.message);
      return;
    }

    showSuccessToast();
    e.target.reset();
  };

  return (
    <div className={`transition-colors duration-500 ${isDark ? "bg-gray-900" : "bg-white"}`}>
      <section
        className={`pt-24 pb-20 overflow-hidden transition-colors duration-500 relative ${isDark ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" : "bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50"}`}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className={`absolute top-10 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 ${isDark ? "bg-emerald-500" : "bg-emerald-400"}`}
          ></div>
          <div
            className={`absolute bottom-10 left-1/3 w-80 h-80 rounded-full blur-3xl opacity-15 ${isDark ? "bg-teal-500" : "bg-teal-300"}`}
          ></div>
          <div
            className={`absolute top-1/2 right-0 w-72 h-72 rounded-full blur-3xl opacity-10 ${isDark ? "bg-blue-500" : "bg-blue-300"}`}
          ></div>
        </div>

        <div className="container px-4 mx-auto relative z-10">
          <div
            className={`rounded-3xl overflow-hidden backdrop-blur-xl transition-all duration-500 ${isDark
              ? "bg-white/[0.05] border border-white/[0.1] shadow-2xl"
              : "bg-white/[0.75] border-2 border-white shadow-2xl"
              }`}
          >
            <div
              className={`absolute inset-0 rounded-3xl ${isDark ? "bg-gradient-to-br from-white/[0.05] to-transparent" : "bg-gradient-to-br from-white/[0.5] to-white/[0.2]"}`}
            ></div>

            <div className="relative grid items-center grid-cols-1 gap-3 md:gap-8 px-6 md:px-16 py-12 md:py-20 md:grid-cols-3">
              <div className="space-y-6">
                <div>
                  <p
                    className={`text-xs md:text-sm tracking-widest uppercase transition-colors duration-500 ${isDark ? "text-white/70" : "text-gray-900/90"}`}
                  >
                    HMIF 24/25
                  </p>
                  <h1
                    className={`font-bricolage text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 transition-colors duration-500 ${isDark ? "text-white" : "text-gray-900 drop-shadow-lg"}`}
                  >
                    SELANGKAH
                    <br />
                    LEBIH DEKAT
                    <br />
                    DENGAN
                    <br />
                    <span
                      className={`block drop-shadow-lg transition-colors duration-500 ${isDark ? "text-emerald-500" : "text-emerald-500"}`}
                    >
                      HMIF UNEJ
                    </span>
                  </h1>
                </div>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link
                    to="/tentang"
                    className={`inline-flex items-center justify-center gap-2 px-8 py-3 font-semibold transition-all duration-300 backdrop-blur-md rounded-full hover:scale-105 active:scale-95 ${isDark
                      ? 'bg-white/20 border border-white/30 text-white hover:bg-white/30 hover:border-white/50 hover:shadow-2xl'
                      : 'bg-emerald-600/20 border border-emerald-600/40 text-emerald-700 hover:bg-emerald-600/30 hover:border-emerald-600/60 hover:shadow-2xl hover:shadow-emerald-500/20'
                      }`}
                  >
                    Tentang
                  </Link>
                  <Link
                    to="/blog"
                    className={`inline-flex items-center justify-center gap-2 px-8 py-3 font-semibold transition-all duration-300 backdrop-blur-md rounded-full hover:scale-105 active:scale-95 ${isDark
                      ? 'border-2 border-white/40 bg-white/10 text-white hover:bg-white/20 hover:border-white/60 hover:shadow-2xl'
                      : 'border-2 border-emerald-500/40 bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20 hover:border-emerald-500/60 hover:shadow-2xl hover:shadow-emerald-500/20'
                      }`}
                  >
                    Card
                  </Link>
                </div>
              </div>

              <div className="hidden md:block relative">
                <div
                  className={`absolute -top-16 left-1/2 transform -translate-x-1/2 w-full scale-150 transition-all duration-500 ${isDark ? "drop-shadow-2xl" : "drop-shadow-2xl"}`}
                >
                  <img
                    src="/cogito.webp"
                    alt="HMIF Mascot"
                    className={`object-contain filter brightness-105 scale-125 transition-all duration-500 ${isDark ? "drop-shadow-2xl" : "drop-shadow-2xl filter brightness-110"}`}
                  />
                </div>
              </div>

              <div className="hidden lg:flex flex-col justify-center">
                <div
                  className={`text-right leading-relaxed space-y-3 max-w-sm ml-auto transition-colors duration-500 ${isDark ? "text-gray-100" : "text-gray-700"}`}
                >
                  <p
                    className={`transition-colors duration-500 text-base md:text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}
                  >
                    Organisasi yang berada di bawah naungan Fakultas Ilmu Komputer dengan tujuan
                    untuk menampung aspirasi serta meningkatkan kualitas mahasiswa di dalam
                    lingkungan Program Studi Informatika Universitas Jember.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`transition-colors duration-500 py-2 ${isDark ? "bg-black" : "bg-white"}`}>
        <CurvedLoop
          marqueeText="✦     JAYALAH HIMPUNANKU!     ✦"
          speed={0.5}
          curveAmount={0}
          interactive={true}
          isDark={isDark}
          className={`font-bricolage`}
        />
      </section>

      <section
        className={`py-12 transition-colors duration-500 ${isDark ? "bg-gray-900" : "bg-white"}`}
      >
        <div className="container px-4 mx-auto relative z-10">
          <div className="mb-3 flex items-center gap-4">
            <div className={`h-1 w-12 transition-colors duration-500 ${isDark ? "bg-emerald-500" : "bg-emerald-500"}`}></div>
            <p className={`text-sm font-semibold tracking-widest uppercase transition-colors duration-500 ${isDark ? "text-emerald-400" : "text-emerald-600"}`}>Navigasi Cepat</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <NavigationCard
              to="/blog"
              icon="📝"
              title="Blog & Artikel"
              description="Baca berita dan artikel terbaru"
              isDark={isDark}
              colorClass="emerald"
            />
            <NavigationCard
              to="/portfolio"
              icon="💼"
              title="Portfolio"
              description="Karya dan proyek mahasiswa"
              isDark={isDark}
              colorClass="teal"
            />
            <NavigationCard
              to="/proker"
              icon="📅"
              title="Program Kerja"
              description="Kegiatan dan acara HMIF"
              isDark={isDark}
              colorClass="cyan"
            />
            <NavigationCard
              to="/staff"
              icon="👥"
              title="Kepengurusan"
              description="Struktur organisasi HMIF"
              isDark={isDark}
              colorClass="blue"
            />
          </div>
        </div>
      </section>

      <section
        className={`py-12 transition-colors duration-500 ${isDark ? "bg-gray-900" : "bg-white"}`}
      >
        <div className="container px-4 mx-auto relative z-10">
          <div className={`absolute left-0 top-1/2 w-1 h-24 transition-colors duration-500 ${isDark ? "bg-gradient-to-b from-transparent via-emerald-500/50 to-transparent" : "bg-gradient-to-b from-transparent via-emerald-400/50 to-transparent"}`}></div>
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <div>
                <p className="inline-block px-3 py-1 text-white rounded-full backdrop-blur-xl bg-gradient-to-r from-teal-500/40 via-cyan-500/40 to-teal-500/40 border border-teal-300/30 shadow-lg">
                  Kabinet
                </p>
              </div>
              <h2
                className={`text-4xl md:text-5xl font-black font-bricolage transition-colors duration-500 ${isDark ? "text-white" : "text-gray-800"}`}
              >
                Arunachakra
              </h2>
              <div className={`flex-grow h-0.5 transition-colors duration-500 ${isDark ? "bg-gradient-to-r from-emerald-500/50 to-transparent" : "bg-gradient-to-r from-emerald-400/50 to-transparent"}`}></div>
            </div>
            <div>
              <p
                className={`text-md md:text-lg transition-colors duration-500 max-w-6xl ${isDark ? "text-gray-300" : "text-gray-600"}`}
              >
                Terdiri dari dua kata, Aruna yang berarti fajar atau cahaya matahari terbit, dan
                Chakra yang berarti roda atau siklus. Secara keseluruhan, ArunaChakra dapat
                diartikan sebagai "Roda Fajar yang melambangkan harapan baru, awal yang cerah, dan
                kebangkitan." Nama ini menggambarkan perjalanan yang terus bergerak maju, dengan
                setiap siklus baru membawa peluang dan pencerahan.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className={`py-12 transition-colors duration-500 ${isDark ? "bg-gray-800" : "bg-white"}`}
      >
        <div className="container px-4 mx-auto relative z-10">
          <div className="mb-3 flex items-center gap-3">
            <h2
              className={`text-3xl md:text-4xl font-black font-bricolage transition-colors duration-500 ${isDark ? "text-white" : "text-gray-800"}`}
            >
              DIVISI
            </h2>
            <div className={`flex-grow h-0.5 transition-colors duration-500 ${isDark ? "bg-gradient-to-r from-emerald-500/50 to-transparent" : "bg-gradient-to-r from-emerald-400/50 to-transparent"}`}></div>
          </div>
          <div>
            <p
              className={`mb-4 text-lg transition-colors duration-500 max-w-2xl ${isDark ? "text-gray-300" : "text-gray-600"}`}
            >
              Enam Divisi, Satu Misi. Temukan Peran Mereka!
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
            {divisionsData.map((division) => (
              <DivisionCard key={division.name} division={division} isDark={isDark} />
            ))}
          </div>
        </div>
      </section>

      <section
        className={`py-12 transition-colors duration-500 ${isDark ? "bg-gray-900" : "bg-white"}`}
      >
        <div className="container px-4 mx-auto relative z-10">
          <div className="mb-3 flex items-center gap-3">
            <h2
              className={`text-3xl md:text-4xl font-black font-bricolage transition-colors duration-500 ${isDark ? "text-white" : "text-gray-800"}`}
            >
              PROGRAM KERJA AKTIF
            </h2>
            <div className={`flex-grow h-0.5 transition-colors duration-500 ${isDark ? "bg-gradient-to-r from-emerald-500/50 to-transparent" : "bg-gradient-to-r from-emerald-400/50 to-transparent"}`}></div>
          </div>
          <p
            className={`mb-2 text-lg transition-colors duration-500 max-w-2xl ${isDark ? "text-gray-300" : "text-gray-600"}`}
          >
            Kegiatan dan program yang sedang berlangsung saat ini
          </p>
          {loadingActiveProker ? (
            <HomeProkerSkeleton />
          ) : dataActiveProker && dataActiveProker.length > 0 ? (
            <div className="relative overflow-visible">
              <div className="relative group overflow-visible">
                <div
                  ref={carouselRef}
                  className="overflow-x-auto scrollbar-hide scroll-smooth overflow-y-visible px-5"
                  style={{ scrollBehavior: 'smooth' }}
                >
                  <div className="flex gap-8 py-6">
                    {dataActiveProker.map((proker) => (
                      <Link
                        key={proker.id}
                        to={`/proker/${proker.slug}`}
                        className={`group/card relative overflow-visible rounded-2xl transition-all duration-500 shadow-md hover:shadow-md hover:-translate-y-2 flex-shrink-0 w-full max-w-2xl backdrop-blur-lg border ${isDark
                          ? "bg-gradient-to-br from-white/[0.08] to-white/[0.02] border-emerald-500/20 hover:border-emerald-500/40"
                          : "bg-white/70 border-emerald-200/50 hover:border-emerald-300"
                          }`}
                      >
                        <div
                          className={`absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 rounded-2xl ${isDark ? "bg-gradient-to-br from-emerald-500/5 to-transparent" : "bg-gradient-to-br from-emerald-50/20 to-transparent"}`}
                        ></div>

                        {proker.logo && (
                          <div className="relative h-48 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 flex items-center justify-center overflow-hidden rounded-t-2xl">
                            <div className="absolute top-3 right-3 z-10">
                              <span
                                className={`text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md border ${proker.status === "active"
                                  ? isDark
                                    ? "bg-emerald-600/70 text-emerald-100 border-emerald-400/70"
                                    : "bg-emerald-500/80 text-white border-emerald-300/70"
                                  : isDark
                                    ? "bg-gray-600/70 text-gray-100 border-gray-400/70"
                                    : "bg-gray-500/80 text-white border-gray-300/70"
                                  }`}
                              >
                                {proker.status === "active" ? "Aktif" : "Selesai"}
                              </span>
                            </div>
                            <img
                              src={import.meta.env.VITE_API_BASE_URL_ASSETS + "proker/" + proker.logo}
                              className="w-36 object-contain group-hover/card:scale-110 transition-transform duration-500"
                            />
                          </div>
                        )}

                        <div className="p-6 relative">
                          <div className="flex items-center gap-2 mb-4">
                            <span
                              className={`text-xs font-semibold px-3 py-1 rounded-full ${isDark ? "bg-emerald-600/20 text-emerald-300" : "bg-emerald-100 text-emerald-700"}`}
                            >
                              {proker.division}
                            </span>
                          </div>

                          <h3
                            className={`text-xl md:text-2xl font-bold font-bricolage mb-3 line-clamp-2 transition-colors duration-500 ${isDark ? "text-white group-hover/card:text-emerald-300" : "text-gray-900 group-hover/card:text-emerald-600"}`}
                          >
                            {proker.name}
                          </h3>

                          <p
                            className={`text-sm md:text-base line-clamp-3 transition-colors duration-500 mb-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}
                          >
                            {proker.description ? proker.description.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').trim().substring(0, 300) : "Program kerja menarik untuk diikuti"}
                          </p>

                          <div className="flex items-center text-emerald-500 group-hover/card:text-emerald-600 transition-colors duration-500 font-semibold">
                            <span className="text-sm">Lihat detail</span>
                            <svg
                              className="w-4 h-4 ml-2 group-hover/card:translate-x-1 transition-transform"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {dataActiveProker.length > 1 && (
                  <>
                    <button
                      onClick={() => handleScroll('left')}
                      className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 p-2 rounded-full transition-all duration-300 ${isDark
                        ? "bg-emerald-600/80 hover:bg-emerald-600 text-white border border-emerald-400/70"
                        : "bg-emerald-500/80 hover:bg-emerald-500 text-white border border-emerald-300/70"
                        } hover:shadow-lg hover:scale-110 active:scale-95`}
                      title="Slide kiri"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>

                    <button
                      onClick={() => handleScroll('right')}
                      className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 p-2 rounded-full transition-all duration-300 ${isDark
                        ? "bg-emerald-600/80 hover:bg-emerald-600 text-white border border-emerald-400/70"
                        : "bg-emerald-500/80 hover:bg-emerald-500 text-white border border-emerald-300/70"
                        } hover:shadow-lg hover:scale-110 active:scale-95`}
                      title="Slide kanan"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
              </div>

              {dataActiveProker.length > 1 && (
                <div className="text-center mt-8">
                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    Gunakan tombol atau gestur untuk melihat program kerja lainnya
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                Tidak ada program kerja aktif saat ini
              </p>
            </div>
          )}
        </div>
      </section>

      <section
        className={`py-12 transition-colors duration-500 ${isDark ? "bg-gray-800" : "bg-gray-50"}`}
      >
        <div className="container px-4 mx-auto">
          <div className="mb-3 flex items-center gap-3">
            <h2
              className={`text-3xl md:text-4xl font-black font-bricolage transition-colors duration-500 ${isDark ? "text-white" : "text-gray-800"}`}
            >
              BLOG
            </h2>
            <div className={`flex-grow h-0.5 transition-colors duration-500 ${isDark ? "bg-gradient-to-r from-emerald-500/50 to-transparent" : "bg-gradient-to-r from-emerald-400/50 to-transparent"}`}></div>
          </div>
          <p
            className={`mb-5 text-lg transition-colors duration-500 max-w-4xl pl-4 border-l-2 ${isDark ? "text-gray-300 border-emerald-500/50" : "text-gray-600 border-emerald-400/50"}`}
          >
            Jelajahi kumpulan artikel dan panduan teknologi terkini dari HMIF. Mulai dari tips
            praktis hingga penjelasan mendalam tentang tren digital, semua tersedia untuk dibaca
            kapan saja dan di mana saja.
          </p>
          {loadingPosts ? (
            <HomeBlogSkeleton />
          ) : topPosts && topPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {topPosts.slice(0, 6).map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className={`group relative rounded-2xl transition-all duration-500 shadow-lg hover:shadow-2xl hover:-translate-y-2 overflow-hidden flex flex-col ${isDark
                    ? "bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-emerald-500/20 hover:border-emerald-500/50 backdrop-blur-xl"
                    : "bg-white border border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50"
                    }`}
                >
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isDark ? "bg-gradient-to-br from-emerald-500/5 to-transparent" : "bg-gradient-to-br from-emerald-100/30 to-transparent"}`}
                  ></div>

                  {post.thumbnail && (
                    <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-emerald-500/10 to-teal-500/10">
                      <img
                        src={import.meta.env.VITE_API_BASE_URL_ASSETS + "post/" + post.thumbnail}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  <div className="relative p-6 flex-1 flex flex-col">
                    <div className="flex items-start justify-between gap-2 mb-2 flex-wrap">
                      <div className="flex gap-2 flex-wrap">
                        {post.tags && post.tags.length > 0 ? (
                          post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag.id}
                              className="text-xs font-semibold px-2 py-1 rounded-full text-white"
                              style={{
                                backgroundColor: tag.color_code + "40",
                                borderLeft: `3px solid ${tag.color_code}`,
                              }}
                            >
                              {tag.name}
                            </span>
                          ))
                        ) : (
                          <span
                            className={`text-xs font-semibold px-3 py-1 rounded-full ${isDark ? "bg-emerald-500/20 text-emerald-300" : "bg-emerald-100 text-emerald-700"}`}
                          >
                            {post.category || "Artikel"}
                          </span>
                        )}
                      </div>
                      <span
                        className={`text-xs whitespace-nowrap ${isDark ? "text-gray-400" : "text-gray-500"}`}
                      >
                        {new Date(post.created_at).toLocaleDateString("id-ID", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>

                    <h3
                      className={`text-base font-bold font-bricolage mb-2 line-clamp-2 transition-colors duration-500 ${isDark ? "text-white group-hover:text-emerald-300" : "text-gray-900 group-hover:text-emerald-600"}`}
                    >
                      {post.title}
                    </h3>

                    <p
                      className={`text-sm line-clamp-3 transition-colors duration-500 mb-4 flex-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}
                    >
                      {post.description
                        ? post.description.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').trim().substring(0, 300)
                        : "Artikel menarik untuk dibaca"}
                    </p>

                    <div className="flex items-center text-emerald-500 group-hover:text-emerald-600 transition-colors duration-500">
                      <span className="text-sm font-semibold">Baca selengkapnya</span>
                      <svg
                        className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                Tidak ada artikel tersedia
              </p>
            </div>
          )}
        </div>
      </section>

      <section
        className={`py-12 transition-colors duration-500 relative overflow-hidden ${isDark ? "bg-gray-900" : "bg-white"}`}
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-20 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-5 transition-colors duration-500 ${isDark ? "bg-emerald-500" : "bg-emerald-400"}`}></div>
          <div className={`absolute bottom-20 left-1/4 w-80 h-80 rounded-full blur-3xl opacity-5 transition-colors duration-500 ${isDark ? "bg-emerald-500" : "bg-emerald-400"}`}></div>
        </div>

        <div className="container px-4 mx-auto relative z-10 flex justify-center">
          <div className={`absolute top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full blur-2xl opacity-30 transition-colors duration-500 ${isDark ? "bg-emerald-500" : "bg-emerald-400"}`}></div>
          <div
            className={`w-full max-w-2xl p-8 rounded-2xl transition-all duration-500 shadow-xl overflow-hidden relative z-10 ${isDark
              ? "bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-emerald-500/20 hover:border-emerald-500/50 backdrop-blur-xl"
              : "bg-white border border-emerald-300 hover:border-emerald-400"
              }`}
          >
            <div
              className={`absolute inset-0 opacity-0 transition-opacity duration-500 ${isDark ? "bg-gradient-to-br from-emerald-500/5 to-transparent" : "bg-gradient-to-br from-emerald-100/20 to-transparent"}`}
            ></div>
            <div className="relative">
              <div className="mb-3 flex items-center gap-3 justify-center">
                <div className={`w-1 h-6 transition-colors duration-500 ${isDark ? "bg-emerald-500" : "bg-emerald-500"}`}></div>
                <h2
                  className={`text-3xl md:text-4xl font-black font-bricolage transition-colors duration-500 ${isDark ? "text-white" : "text-gray-800"}`}
                >
                  Kritik & Saran
                </h2>
                <div className={`w-1 h-6 transition-colors duration-500 ${isDark ? "bg-emerald-500" : "bg-emerald-500"}`}></div>
              </div>
              <p
                className={`mb-6 text-center text-lg transition-colors duration-500 max-w-2xl mx-auto ${isDark ? "text-gray-300" : "text-gray-600"}`}
              >
                Kami sangat menghargai masukan Anda untuk terus berkembang menjadi organisasi yang
                lebih baik
              </p>
              <form className="space-y-6" onSubmit={handleFormSubmit}>
                <div>
                  <label
                    className={`block text-sm font-semibold mb-2 transition-colors duration-500 ${isDark ? "text-gray-200" : "text-gray-700"}`}
                  >
                    Nama
                  </label>
                  <input
                    type="text"
                    name="nama"
                    placeholder="Nama Anda"
                    className={`w-full px-4 py-3 rounded-lg transition-all duration-300 ${isDark
                      ? "bg-white/[0.05] border border-white/[0.1] text-white placeholder-gray-500 focus:border-emerald-500"
                      : "bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:bg-white"
                      } focus:outline-none focus:ring-2 focus:ring-emerald-500/50`}
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-semibold mb-2 transition-colors duration-500 ${isDark ? "text-gray-200" : "text-gray-700"}`}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Anda"
                    className={`w-full px-4 py-3 rounded-lg transition-all duration-300 ${isDark
                      ? "bg-white/[0.05] border border-white/[0.1] text-white placeholder-gray-500 focus:border-emerald-500"
                      : "bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:bg-white"
                      } focus:outline-none focus:ring-2 focus:ring-emerald-500/50`}
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-semibold mb-2 transition-colors duration-500 ${isDark ? "text-gray-200" : "text-gray-700"}`}
                  >
                    Pesan Anda
                  </label>
                  <textarea
                    name="pesan"
                    placeholder="Tuliskan kritik dan saran Anda..."
                    rows="5"
                    className={`w-full px-4 py-3 rounded-lg transition-all duration-300 ${isDark
                      ? "bg-white/[0.05] border border-white/[0.1] text-white placeholder-gray-500 focus:border-emerald-500"
                      : "bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:bg-white"
                      } focus:outline-none focus:ring-2 focus:ring-emerald-500/50`}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full px-8 py-3 font-semibold text-white transition-all duration-300 bg-emerald-500 rounded-lg hover:bg-emerald-600 hover:shadow-xl active:scale-95"
                >
                  Kirim Pesan
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <ValidationAlert
        isDark={isDark}
        validationAlert={validationAlert}
        isValidationExiting={isValidationExiting}
      />
      <SuccessToast isDark={isDark} showToast={showToast} isExiting={isExiting} />
    </div>
  );
}

export default Home;
