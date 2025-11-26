import { NavLink } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

export default function NotFound() {
    const isDark = useTheme();

    return (
        <div className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${isDark ? "bg-gray-900" : "bg-white"}`}>
            <div className={`absolute inset-0 overflow-hidden pointer-events-none ${isDark
                ? "bg-gradient-to-br from-emerald-600/20 via-slate-900 to-purple-600/20"
                : "bg-gradient-to-br from-emerald-300/40 via-white to-teal-300/40"
                }`}></div>

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className={`absolute top-10 left-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob ${isDark ? "bg-emerald-500" : "bg-emerald-300"}`}></div>
                <div className={`absolute top-40 right-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 ${isDark ? "bg-purple-500" : "bg-purple-300"}`}></div>
                <div className={`absolute -bottom-8 left-20 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000 ${isDark ? "bg-teal-500" : "bg-teal-300"}`}></div>
            </div>

            <div className="relative z-10 max-w-3xl w-full mx-4">
                <div className={`rounded-3xl backdrop-blur-2xl transition-all duration-300 ${isDark
                    ? "bg-white/5 border border-white/10 shadow-2xl shadow-emerald-500/5"
                    : "bg-white/30 border border-white/50 shadow-2xl shadow-emerald-400/10"
                    }`}>
                    <div className="flex flex-col lg:flex-row items-center gap-8 p-8 lg:p-12">
                        <div className="flex-1 flex justify-center lg:min-w-0">
                            <div className="relative w-full">
                                <div className={`absolute inset-0 rounded-full blur-2xl ${isDark ? "bg-emerald-500/20" : "bg-emerald-400/30"}`}></div>
                                <img
                                    src="/cogito-404.webp"
                                    alt="404 Not Found"
                                    className="relative w-full h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        </div>

                        {/* Right - Text */}
                        <div className="flex-1 text-left">
                            <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${isDark
                                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                : "bg-emerald-200/50 text-emerald-700 border border-emerald-300/50"
                                }`}>
                                Oops!
                            </div>
                            <h1 className={`text-7xl lg:text-8xl font-black leading-none mb-1 ${isDark
                                ? "text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400"
                                : "text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600"
                                }`}>
                                404
                            </h1>
                            <h2 className={`text-2xl lg:text-3xl font-bold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                                Halaman Tidak Ditemukan
                            </h2>
                            <p className={`text-sm lg:text-base mb-5 leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                                Maaf, halaman yang Anda cari tidak dapat ditemukan. Silakan kembali ke beranda.
                            </p>
                            <NavLink
                                to="/"
                                className={`inline-block px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 ${isDark
                                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-lg hover:shadow-emerald-500/30"
                                    : "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-lg hover:shadow-emerald-400/30"
                                    }`}
                            >
                                Kembali ke Beranda
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes blob {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    );
}
