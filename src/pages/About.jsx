import { useState } from "react";
import { FiGithub, FiCode, FiShield, FiUsers, FiZap, FiFlag, FiSend, FiAward, FiCalendar, FiEye, FiCheckCircle, FiMapPin, FiPhone, FiMail, FiInstagram, FiLinkedin, FiYoutube, FiMusic, FiCpu, FiTarget, FiStar } from "react-icons/fi";
import HeroSection from "../components/HeroSection";
import { useFetchMission } from '../hooks/tentang/useFetchMission';
import { useFetchVision } from '../hooks/tentang/useFetchVision';
import { useFetchContact } from '../hooks/homepage/useFetchContact';
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { colorRandom } from "../constants/colorRandom";
import { useTheme } from "../hooks/useTheme";
import { FaLightbulb } from "react-icons/fa";

export default function About() {

  useDocumentTitle("Tentang HMIF");
  const isDark = useTheme();
  const logoMeanings = [
    {
      icon: FiCode,
      title: "3 Buah Hexagon",
      description: "Melambangkan Informatika sebagai Program Studi ke-3 di Fakultas Ilmu Komputer (FASILKOM) Universitas Jember.",
      color: "emerald"
    },
    {
      icon: FiShield,
      title: "Lambang Infinity",
      description: "Diambil dari tanggal berdirinya HMIF (angka 8), melambangkan kebersamaan, gotong royong, dan ikatan kuat.",
      color: "purple"
    },
    {
      icon: FiShield,
      title: "Logo Universitas Jember",
      description: "Menggambarkan bahwa HMIF merupakan bagian dari Universitas Jember (UNEJ).",
      color: "rose"
    },
    {
      icon: FiShield,
      title: "Text HMIF",
      description: "Bentuk identitas resmi Himpunan Program Studi Informatika Universitas Jember.",
      color: "blue"
    },
    {
      icon: FiUsers,
      title: "Warna Kuning",
      description: "Melambangkan kreativitas, inovasi, dan kehangatan yang dibawa oleh generasi muda HMIF.",
      color: "cyan"
    },
    {
      icon: FiZap,
      title: "Warna Abu-abu",
      description: "Melambangkan warna identitas resmi Fakultas Ilmu Komputer (FASILKOM) Universitas Jember.",
      color: "teal"
    },
  ];

  const colorKeys = Object.keys(colorRandom);
  const milestones = [
    {
      year: "2017",
      icon: FiFlag,
      title: "Pendirian HMIF",
      description: "HMIF UNEJ resmi didirikan sebagai wadah bagi mahasiswa Informatika untuk berkembang dan berkolaborasi"
    },
    {
      year: "2018",
      icon: FiSend,
      title: "Era Digital",
      description: "Memulai transformasi digital dengan berbagai program pelatihan teknologi dan workshop"
    },
    {
      year: "2019",
      icon: FiAward,
      title: "Prestasi Nasional",
      description: "Meraih berbagai prestasi di kompetisi teknologi tingkat nasional dan regional"
    },
    {
      year: "Sekarang",
      icon: FiCalendar,
      title: "Masa Kini",
      description: "Terus berinovasi dan mengembangkan ekosistem teknologi di lingkungan kampus dan masyarakat"
    }
  ];

  const { dataMission, loadingMission } = useFetchMission()
  const { dataVision, loadingVision } = useFetchVision()
  const { dataContact, loadingContact } = useFetchContact()

  const topRowMeanings = logoMeanings.slice(0, 4);
  const bottomRowMeanings = logoMeanings.slice(4, 6);

  const MeaningCard = ({ icon: Icon, title, description, color, isDark }) => {
    const style = colorRandom[color];

    return (
      <div
        className={`group p-6 rounded-2xl transition-all shadow-sm 
        ${isDark ? style.cardDark : style.cardLight}
      `}
      >
        {/* Icon Box */}
        <div
          className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4
          transition-all
          ${isDark ? style.bgDark : style.bgLight}
        `}
        >
          <Icon className={`text-2xl ${isDark ? style.titleDark : style.titleLight}`} />
        </div>

        {/* Title */}
        <h4 className={`text-lg font-semibold mb-2 ${isDark ? "text-white" : "text-slate-900"}`}>
          {title}
        </h4>

        {/* Desc */}
        <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
          {description}
        </p>
      </div>
    );
  };


  // Classes untuk Dark/Light Mode
  const commonClasses = {
    // Colors
    textPrimary: isDark ? "text-emerald-400" : "text-emerald-600",
    textSecondary: isDark ? "text-slate-400" : "text-slate-600",
    textContrast: isDark ? "text-slate-200" : "text-slate-900",
    textLight: isDark ? "text-slate-300" : "text-slate-700",

    // Borders & Backgrounds
    borderColor: isDark ? "border-slate-800" : "border-slate-300",
    bgMuted: isDark ? "bg-slate-900/30" : "bg-slate-50",
    bgCard: isDark ? "bg-slate-900" : "bg-white",
    bgCardHover: isDark ? "hover:border-emerald-700" : "hover:border-emerald-500",
    bgBlock: isDark ? "bg-slate-900/50" : "bg-slate-100",
    bgAccentMuted: isDark ? "bg-gradient-to-r from-emerald-900/20 to-emerald-900/20 border-emerald-700/30" : "bg-emerald-50 border-emerald-300",
  };


  return (
    <div>
      <HeroSection
        title="Tentang HMIF"
        subtitle="Kenal lebih dekat mengenai Himpunan Mahasiswa Informatika Universitas Jember."
        subtitleLabel="Profil dan Identitas"
      />
      <div className={`min-h-screen transition-colors duration-500 w-full ${isDark ? "bg-gray-900" : "bg-white"}`}>
        <section className={`py-16 px-4 sm:px-6 lg:px-8 border-b ${commonClasses.borderColor}`}>
          <div className="max-w-7xl mx-auto">
            {/* Logo Display */}
            <div className="flex justify-center mb-12">
              <div className="relative">
                <div
                  className={`w-48 h-48 rounded-2xl p-1
                    ${isDark ? "bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700" : "bg-gradient-to-br from-emerald-600 via-emerald-500 to-emerald-400"}
                  `}
                >
                  <div className={`w-full h-full rounded-2xl flex items-center justify-center ${isDark ? "bg-gray-900" : "bg-white"}`}>
                    <div className="text-center">
                      <FiCode className={`w-20 h-20 mx-auto mb-2 ${commonClasses.textPrimary}`} />
                      <div className={`font-semibold ${commonClasses.textPrimary}`}>HMIF</div>
                      <div className={`text-xs ${commonClasses.textSecondary}`}>UNEJ</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Makna Logo Header */}
            <div className="text-center mb-12">
              <h2 className={`${commonClasses.textPrimary} mb-4`}>Makna Logo</h2>
              <p className={`${commonClasses.textSecondary} max-w-3xl mx-auto`}>
                Logo HMIF UNEJ menggambarkan identitas kami sebagai himpunan mahasiswa
                yang berfokus pada teknologi informatika dengan nilai-nilai yang kuat.
              </p>
            </div>
            {/* Meaning Cards */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {topRowMeanings.map((item, index) => (
                  <MeaningCard
                    key={index}
                    icon={item.icon}
                    title={item.title}
                    description={item.description}
                    color={item.color}
                    isDark={isDark}
                  />
                ))}
              </div>
              <div className="flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full lg:w-1/2">
                  {bottomRowMeanings.map((item, index) => (
                    <MeaningCard
                      key={index}
                      icon={item.icon}
                      title={item.title}
                      description={item.description}
                      color={item.color}
                      isDark={isDark}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Visi & Misi Section */}
        <section className={`py-16 px-4 sm:px-6 lg:px-8 ${commonClasses.bgMuted} border-b ${commonClasses.borderColor}`}>
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className={`${commonClasses.textPrimary} mb-4`}>Visi & Misi</h2>
              <p className={`${commonClasses.textSecondary} max-w-3xl mx-auto`}>
                Panduan kami dalam mencapai tujuan dan memberikan kontribusi terbaik
                bagi mahasiswa informatika dan masyarakat
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Vision */}
              <div
                className={`rounded-2xl p-8
                  ${isDark ? "bg-gradient-to-br from-emerald-900/30 to-emerald-900/30 border border-emerald-700/50" : "bg-emerald-50 border border-emerald-300"}
                `}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center
                      ${isDark ? "bg-emerald-700/30" : "bg-emerald-100"}
                    `}
                  >
                    <FiEye className={`w-6 h-6 ${commonClasses.textPrimary}`} />
                  </div>
                  <h3 className={commonClasses.textPrimary}>Visi</h3>
                </div>
                <p className={`${commonClasses.textLight} leading-relaxed`}>
                  {loadingVision ? (
                    <span>...</span>
                  ) : (
                    dataVision[0].description
                  )}
                </p>
              </div>
              {/* Mission */}
              <div
                className={`rounded-2xl p-8
                  ${isDark ? "bg-slate-900/50 border border-slate-800" : "bg-slate-100 border border-slate-300"}
                `}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center
                      ${isDark ? "bg-emerald-900/30" : "bg-emerald-100"}
                    `}
                  >
                    <FiCheckCircle className={`w-6 h-6 ${commonClasses.textPrimary}`} />
                  </div>
                  <h3 className={commonClasses.textPrimary}>Misi</h3>
                </div>
                <ul className="space-y-4">
                  {dataMission.map((mision, index) => (
                    <li key={index} className="flex items-start gap-3 group">
                      <div
                        className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 transition-colors
                          ${isDark ? "bg-emerald-900/30 border border-emerald-700/50 group-hover:bg-emerald-700/30" : "bg-emerald-100 border border-emerald-300 group-hover:bg-emerald-200"}
                        `}
                      >
                        <span className={`${commonClasses.textPrimary} text-xs`}>{index + 1}</span>
                      </div>
                      <p className={`${commonClasses.textLight} text-sm leading-relaxed flex-1`}>
                        {mision.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Core Values */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Profesional", "Inovatif", "Kolaboratif", "Berintegritas"].map((value, index) => (
                <div
                  key={index}
                  className={`rounded-lg p-4 text-center transition-colors
                    ${isDark ? "bg-slate-900/50 border border-slate-800 hover:border-emerald-700" : "bg-slate-100 border border-slate-300 hover:border-emerald-500"}
                  `}
                >
                  <p className={commonClasses.textPrimary}>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sejarah (History) Section */}
        <section className={`py-16 px-4 sm:px-6 lg:px-8 border-b ${commonClasses.borderColor}`}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className={`${commonClasses.textPrimary} mb-4`}>Sejarah HMIF UNEJ</h2>
              <p className={`${commonClasses.textSecondary} max-w-3xl mx-auto`}>
                Perjalanan panjang HMIF UNEJ dalam membangun komunitas teknologi
                yang solid dan berkontribusi dalam pengembangan ilmu informatika
                di Universitas Jember.
              </p>
            </div>
            <div className="relative">
              {/* Timeline Line */}
              <div
                className={`absolute left-8 top-0 bottom-0 w-0.5 hidden md:block
                  ${isDark ? "bg-gradient-to-b from-emerald-700 via-emerald-700 to-emerald-700" : "bg-gradient-to-b from-emerald-500 via-emerald-500 to-emerald-500"}
                `}
              />
              <div className="space-y-8">
                {milestones.map((milestone, index) => {
                  const color = colorKeys[index % colorKeys.length];

                  return (
                    <div key={index} className="relative flex items-start gap-6">
                      {/* Timeline Icon */}
                      <div
                        className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center border-4 relative z-10
                          ${isDark ? "bg-gradient-to-br from-emerald-700 to-emerald-700 border-gray-900" : "bg-gradient-to-br from-emerald-500 to-emerald-500 border-white"}
                        `}
                      >
                        <milestone.icon className="w-7 h-7 text-white" />
                      </div>

                      {/* Milestone Card */}
                      <div
                        className={`flex-1 rounded-xl p-6 transition-colors
                          ${isDark ? "bg-slate-900/50 border border-slate-800 hover:border-emerald-700" : "bg-slate-100 border border-slate-300 hover:border-emerald-500"}
                        `}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <span
                            className={`
                                px-3 py-1 rounded-full text-sm
                                ${isDark ? colorRandom[color].titleDark : colorRandom[color].titleLight}
                                ${isDark ? colorRandom[color].bgDark : colorRandom[color].bgLight}
                              `}
                          >
                            {milestone.year}
                          </span>

                          <h3 className={commonClasses.textContrast}>{milestone.title}</h3>
                        </div>

                        <p className={commonClasses.textSecondary}>{milestone.description}</p>
                      </div>
                    </div>
                  );
                })}


              </div>
            </div>
            {/* History Summary */}
            <div
              className={`mt-12 rounded-xl p-8
                ${commonClasses.bgAccentMuted}
              `}
            >
              <p className={`${commonClasses.textLight} text-center max-w-4xl mx-auto`}>
                Sepanjang perjalanannya, HMIF UNEJ telah menjadi rumah bagi ribuan
                mahasiswa informatika untuk mengembangkan potensi, membangun jaringan,
                dan berkontribusi dalam ekosistem teknologi Indonesia. Kami terus
                berkomitmen untuk mencetak generasi informatika yang kompeten,
                inovatif, dan berintegritas.
              </p>
            </div>
          </div>
        </section>

        {/* Maskot (Mascot) Section */}
        <section className={`py-16 px-4 sm:px-6 lg:px-8 ${commonClasses.bgMuted} border-b ${commonClasses.borderColor}`}>
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <div
                className={`inline-block px-4 py-2 rounded-full mb-4
                  ${isDark ? "bg-emerald-900/30 border border-emerald-700/50" : "bg-emerald-100 border border-emerald-300"}
                `}
              >
                <span className={commonClasses.textPrimary}>Maskot Kami</span>
              </div>
              <h2 className={`${commonClasses.textPrimary} mb-4`}>Cogito</h2>
              <p className={`${commonClasses.textSecondary} text-sm`}>Maskot HMIF UNEJ</p>
            </div>

            {/* Maskot Display */}
            <div className="flex justify-center mb-12">
              <div className="relative">
                {/* Cogito Mascot Representation */}
                <div
                  className={`w-64 h-64 rounded-3xl p-1
                    ${isDark ? "bg-gradient-to-br from-emerald-700 via-emerald-700 to-emerald-600" : "bg-gradient-to-br from-emerald-500 via-emerald-500 to-emerald-400"}
                  `}
                >
                  <div className={`w-full h-full rounded-3xl flex items-center justify-center relative overflow-hidden ${isDark ? "bg-gray-900" : "bg-white"}`}>
                    {/* Glow effect */}
                    <div className={`absolute inset-0 ${isDark ? "bg-gradient-to-t from-emerald-900/20 to-transparent" : "bg-gradient-to-t from-emerald-100/50 to-transparent"}`} />

                    {/* Mascot icon */}
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="relative">
                        <FiCpu className={`w-32 h-32 ${commonClasses.textPrimary}`} />
                        <FiZap className={`w-8 h-8 ${isDark ? "text-emerald-300" : "text-emerald-500"} absolute -top-2 -right-2 animate-pulse`} />
                      </div>
                      <div className={`${commonClasses.textPrimary} mt-4 font-semibold`}>Cogito</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Mascot Description */}
            <div
              className={`rounded-2xl p-8 mb-8
                ${commonClasses.bgAccentMuted}
              `}
            >
              <p className={`${commonClasses.textLight} leading-relaxed text-center max-w-4xl mx-auto`}>
                <strong className={commonClasses.textPrimary}>Cogito</strong> adalah maskot HMIF UNEJ yang melambangkan
                kecerdasan, kreativitas, dan semangat inovasi. Terinspirasi dari filosofi
                <em className={commonClasses.textPrimary}> "Cogito Ergo Sum"</em> (Aku berpikir, maka aku ada),
                Cogito merepresentasikan mahasiswa informatika yang selalu berpikir kritis,
                analitis, dan solutif dalam menghadapi tantangan teknologi. Dengan sosok yang
                futuristik dan ramah, Cogito menjadi simbol identitas dan kebanggaan keluarga besar HMIF UNEJ.
              </p>
            </div>

            {/* Cogito Characteristics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div
                className={`rounded-xl p-6 text-center transition-colors
                  ${isDark ? "bg-slate-900/50 border border-slate-800 hover:border-emerald-700" : "bg-slate-100 border border-slate-300 hover:border-emerald-500"}
                `}
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4
                    ${isDark ? "bg-emerald-900/30" : "bg-emerald-100"}
                  `}
                >
                  <FiCpu className={`w-8 h-8 ${commonClasses.textPrimary}`} />
                </div>
                <h3 className={`${commonClasses.textContrast} mb-3`}>Cerdas & Analitis</h3>
                <p className={`${commonClasses.textSecondary} text-sm`}>
                  Cogito merepresentasikan kemampuan berpikir logis dan sistematis
                  dalam memecahkan masalah kompleks dengan pendekatan teknologi
                </p>
              </div>

              <div
                className={`rounded-xl p-6 text-center transition-colors
                  ${isDark ? "bg-slate-900/50 border border-slate-800 hover:border-emerald-700" : "bg-slate-100 border border-slate-300 hover:border-emerald-500"}
                `}
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4
                    ${isDark ? "bg-emerald-900/30" : "bg-emerald-100"}
                  `}
                >
                  <FaLightbulb className={`w-8 h-8 ${commonClasses.textPrimary}`} />
                </div>
                <h3 className={`${commonClasses.textContrast} mb-3`}>Inovatif & Kreatif</h3>
                <p className={`${commonClasses.textSecondary} text-sm`}>
                  Selalu mencari cara baru dan solusi kreatif, Cogito mendorong
                  semangat untuk terus berinovasi dan tidak takut mencoba hal baru
                </p>
              </div>

              <div
                className={`rounded-xl p-6 text-center transition-colors
                  ${isDark ? "bg-slate-900/50 border border-slate-800 hover:border-emerald-700" : "bg-slate-100 border border-slate-300 hover:border-emerald-500"}
                `}
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4
                    ${isDark ? "bg-emerald-900/30" : "bg-emerald-100"}
                  `}
                >
                  <FiTarget className={`w-8 h-8 ${commonClasses.textPrimary}`} />
                </div>
                <h3 className={`${commonClasses.textContrast} mb-3`}>Visioner & Solutif</h3>
                <p className={`${commonClasses.textSecondary} text-sm`}>
                  Memiliki visi jauh ke depan dan fokus pada solusi nyata yang
                  memberikan dampak positif bagi teknologi dan masyarakat
                </p>
              </div>
            </div>

            {/* Cogito Quote */}
            <div className="mt-8 text-center">
              <div
                className={`inline-block rounded-xl px-8 py-4
                  ${isDark ? "bg-slate-900/50 border border-slate-800" : "bg-slate-100 border border-slate-300"}
                `}
              >
                <p className={`${commonClasses.textPrimary} italic`}>
                  "Bersama Cogito, kita berpikir, berinovasi, dan mewujudkan masa depan teknologi!"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Hubungi Kami (Contact Us) Section */}
        <section className={`py-16 border-t ${commonClasses.borderColor} ${isDark ? "bg-slate-900/50" : "bg-slate-100"}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className={`${commonClasses.textPrimary} mb-4`}>Hubungi Kami</h2>
              <p className={`${commonClasses.textSecondary} max-w-2xl mx-auto`}>
                Kami terbuka untuk kolaborasi, pertanyaan, atau sekadar berbagi
                tentang teknologi. Jangan ragu untuk menghubungi kami!
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Map */}
              <div className={`${isDark ? "bg-slate-900 border border-slate-800" : "bg-white border border-slate-300"} rounded-xl overflow-hidden`}>
                <div className="aspect-video relative">
                  {/* Google Maps Placeholder */}
                  <iframe
                    src="https://maps.google.com/maps?q=universitas%20jember&t=&z=17&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Lokasi HMIF UNEJ"
                    className="absolute inset-0"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                {/* Address */}
                <div
                  className={`rounded-xl p-6 transition-colors
                    ${isDark ? "bg-slate-900 border border-slate-800 hover:border-emerald-700" : "bg-white border border-slate-300 hover:border-emerald-500"}
                  `}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center
                        ${isDark ? "bg-emerald-900/30" : "bg-emerald-100"}
                      `}
                    >
                      <FiMapPin className={`w-6 h-6 ${commonClasses.textPrimary}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`${commonClasses.textContrast} mb-2`}>Alamat</h3>
                      <p className={`${commonClasses.textSecondary} text-sm leading-relaxed`}>
                        Gedung Fakultas Ilmu Komputer<br />
                        Jl. Kalimantan Tegalboto No.37, <br />
                        Krajan Timur, Sumbersari, Kec. Sumbersari, <br />
                        Kabupaten Jember, Jawa Timur 68121
                      </p>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div
                  className={`rounded-xl p-6 transition-colors
                    ${isDark ? "bg-slate-900 border border-slate-800 hover:border-emerald-700" : "bg-white border border-slate-300 hover:border-emerald-500"}
                  `}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center
                        ${isDark ? "bg-emerald-900/30" : "bg-emerald-100"}
                      `}
                    >
                      <FiPhone className={`w-6 h-6 ${commonClasses.textPrimary}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`${commonClasses.textContrast} mb-2`}>Telepon</h3>
                      <a
                        href="tel:+62331123456"
                        className={`${commonClasses.textPrimary} hover:text-emerald-300 transition-colors`}
                      >
                        +62 331 123 456
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div
                  className={`rounded-xl p-6 transition-colors
                    ${isDark ? "bg-slate-900 border border-slate-800 hover:border-emerald-700" : "bg-white border border-slate-300 hover:border-emerald-500"}
                  `}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center
                        ${isDark ? "bg-emerald-900/30" : "bg-emerald-100"}
                      `}
                    >
                      <FiMail className={`w-6 h-6 ${commonClasses.textPrimary}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`${commonClasses.textContrast} mb-2`}>Email</h3>
                      <a
                        href="mailto:hmif@unej.ac.id"
                        className={`${commonClasses.textPrimary} hover:text-emerald-300 transition-colors`}
                      >
                        hmif@unej.ac.id
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}