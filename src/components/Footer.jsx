import { FaTiktok } from "react-icons/fa";
import { FiInstagram, FiLinkedin, FiMail, FiYoutube } from "react-icons/fi";
import { useTheme } from "../hooks/useTheme";

export default function Footer() {

    const isDark = useTheme();

    return (
        <footer className={`relative transition-colors duration-500 ${isDark ? "bg-gradient-to-b from-gray-900 via-gray-800 to-black" : "bg-gradient-to-b from-white via-gray-50 to-white"}`}>
            <div className="container relative w-full mx-auto px-6 lg:px-8 py-16">
                {/* Main content sections */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 ">
                    {/* Brand section */}
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <img
                                src={isDark ? "/hmif.svg" : "/hmif-gelap.svg"}
                                alt="HMIF"
                                className="w-auto h-5 transition-all duration-500"
                            />
                        </div>
                        <h3 className={`mb-2 font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                            Himpunan Mahasiswa Informatika
                        </h3>
                        <p className={`text-gray-500 text-sm mb-6 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                            Wadah Aspirasi dan Inovasi Mahasiswa Informatika.
                        </p>
                        <p className="text-emerald-500 text-sm mb-6 font-semibold">
                            "Jayalah Himpunanku".
                        </p>
                    </div>

                    {/* Quick links */}
                    <div className="md:col-span-1">
                        <h4 className={`font-semibold mb-4 transition-colors duration-500 ${isDark ? "text-white" : "text-gray-900"}`}>
                            Navigasi
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="/about" className={`text-sm transition-colors duration-300 hover:text-emerald-500 ${isDark ? "text-gray-400 hover:text-emerald-400" : "text-gray-600 hover:text-emerald-600"}`}>
                                    Tentang HMIF
                                </a>
                            </li>
                            <li>
                                <a href="/staf" className={`text-sm transition-colors duration-300 hover:text-emerald-500 ${isDark ? "text-gray-400 hover:text-emerald-400" : "text-gray-600 hover:text-emerald-600"}`}>
                                    Struktur Organisasi
                                </a>
                            </li>
                            <li>
                                <a href="/blog" className={`text-sm transition-colors duration-300 hover:text-emerald-500 ${isDark ? "text-gray-400 hover:text-emerald-400" : "text-gray-600 hover:text-emerald-600"}`}>
                                    Info Berita
                                </a>
                            </li>
                            <li>
                                <a href="/proker" className={`text-sm transition-colors duration-300 hover:text-emerald-500 ${isDark ? "text-gray-400 hover:text-emerald-400" : "text-gray-600 hover:text-emerald-600"}`}>
                                    Program Kerja
                                </a>
                            </li>
                            <li>
                                <a href="/portfolio" className={`text-sm transition-colors duration-300 hover:text-emerald-500 ${isDark ? "text-gray-400 hover:text-emerald-400" : "text-gray-600 hover:text-emerald-600"}`}>
                                    Katalog Portofolio
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="md:col-span-1">
                        <h4 className={`font-semibold mb-4 transition-colors duration-500 ${isDark ? "text-white" : "text-gray-900"}`}>
                            Program & Sumber Daya
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="https://hajarif.hmifunej.id/" target="_blank" className={`text-sm transition-colors duration-300 hover:text-emerald-500 ${isDark ? "text-gray-400 hover:text-emerald-400" : "text-gray-600 hover:text-emerald-600"}`}>
                                    Informasi Mata Kuliah
                                </a>
                            </li>
                            <li>
                                <a href="https://ifmerch.hmifunej.id/" target="_blank" className={`text-sm transition-colors duration-300 hover:text-emerald-500 ${isDark ? "text-gray-400 hover:text-emerald-400" : "text-gray-600 hover:text-emerald-600"}`}>
                                    Merchandise Kami
                                </a>
                            </li>
                            <li>
                                <a href="https://create-it.hmifunej.id/" target="_blank" className={`text-sm transition-colors duration-300 hover:text-emerald-500 ${isDark ? "text-gray-400 hover:text-emerald-400" : "text-gray-600 hover:text-emerald-600"}`}>
                                    Jasa IT & Creative
                                </a>
                            </li>
                            <li>
                                <a href="https://s.hmifunej.id/" target="_blank" className={`text-sm transition-colors duration-300 hover:text-emerald-500 ${isDark ? "text-gray-400 hover:text-emerald-400" : "text-gray-600 hover:text-emerald-600"}`}>
                                    HMIF ShortLink
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="md:col-span-1">
                        <h4 className={`font-semibold mb-4 transition-colors duration-500 ${isDark ? "text-white" : "text-gray-900"}`}>
                            Ikuti Kami
                        </h4>
                        <div className="flex w-fit gap-2">
                            <a
                                href="https://linkedin.com/company/hmifunej"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-all duration-300 hover:scale-110 ${isDark ? "bg-slate-800/50 border-slate-700 hover:bg-emerald-900/40 hover:border-emerald-600 text-slate-400" : "bg-gray-200/50 border-gray-300 hover:bg-emerald-100 hover:border-emerald-400 text-gray-600"}`}
                                aria-label="LinkedIn"
                                title="LinkedIn"
                            >
                                <FiLinkedin className="w-5 h-5" />
                            </a>
                            <a
                                href="https://instagram.com/hmifunej"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-all duration-300 hover:scale-110 ${isDark ? "bg-slate-800/50 border-slate-700 hover:bg-emerald-900/40 hover:border-emerald-600 text-slate-400" : "bg-gray-200/50 border-gray-300 hover:bg-emerald-100 hover:border-emerald-400 text-gray-600"}`}
                                aria-label="Instagram"
                                title="Instagram"
                            >
                                <FiInstagram className="w-5 h-5" />
                            </a>
                            <a
                                href="https://tiktok.com/@hmifunej"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-all duration-300 hover:scale-110 ${isDark ? "bg-slate-800/50 border-slate-700 hover:bg-emerald-900/40 hover:border-emerald-600 text-slate-400" : "bg-gray-200/50 border-gray-300 hover:bg-emerald-100 hover:border-emerald-400 text-gray-600"}`}
                                aria-label="TikTok"
                                title="TikTok"
                            >
                                <FaTiktok className="w-5 h-5" />
                            </a>
                            <a
                                href="https://youtube.com/@hmifunej"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-all duration-300 hover:scale-110 ${isDark ? "bg-slate-800/50 border-slate-700 hover:bg-emerald-900/40 hover:border-emerald-600 text-slate-400" : "bg-gray-200/50 border-gray-300 hover:bg-emerald-100 hover:border-emerald-400 text-gray-600"}`}
                                aria-label="YouTube"
                                title="YouTube"
                            >
                                <FiYoutube className="w-5 h-5" />
                            </a>
                            <a
                                href="mailto:hmif@unej.ac.id"
                                className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-all duration-300 hover:scale-110 ${isDark ? "bg-slate-800/50 border-slate-700 hover:bg-emerald-900/40 hover:border-emerald-600 text-slate-400" : "bg-gray-200/50 border-gray-300 hover:bg-emerald-100 hover:border-emerald-400 text-gray-600"}`}
                                aria-label="Email"
                                title="Email"
                            >
                                <FiMail className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className={`h-px transition-colors duration-500 ${isDark ? "bg-gradient-to-r from-transparent via-slate-700 to-transparent" : "bg-gradient-to-r from-transparent via-gray-300 to-transparent"}`}></div>

                {/* Bottom section */}
                <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className={`text-sm text-center md:text-left transition-colors duration-500 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                        <p>© 2025 HMIF UNEJ. All rights reserved.</p>
                        <p className="text-xs mt-1">Dibuat dengan ❤️ oleh HMIF</p>
                    </div>

                    <div className={`text-xs transition-colors duration-500 ${isDark ? "text-slate-600" : "text-slate-500"}`}>
                        <p>Universitas Jember | Jl. Kalimantan No.37, Jember, Indonesia</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};
