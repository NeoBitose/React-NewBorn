import { FiInstagram, FiLinkedin, FiMail, FiMusic, FiYoutube } from "react-icons/fi";
import { useTheme } from "../hooks/useTheme";

export default function Footer() {

    const isDark = useTheme();

    return (
        <footer className={`${isDark ? "bg-gray-900" : "bg-white"}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="pt-8 border-t border-slate-800">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-slate-400 text-sm text-center md:text-left">
                            © 2025 HMIF UNEJ. All rights reserved.
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-slate-400 text-sm">Ikuti Kami:</span>
                            <div className="flex gap-3">
                                <a
                                    href="https://linkedin.com/company/hmifunej"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-emerald-900/30 hover:border-emerald-700 transition-colors"
                                    aria-label="LinkedIn"
                                >
                                    <FiLinkedin className="w-5 h-5 text-slate-400" />
                                </a>
                                <a
                                    href="https://instagram.com/hmifunej"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-emerald-900/30 hover:border-emerald-700 transition-colors"
                                    aria-label="Instagram"
                                >
                                    <FiInstagram className="w-5 h-5 text-slate-400" />
                                </a>

                                <a
                                    href="https://instagram.com/hmifunej"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-emerald-900/30 hover:border-emerald-700 transition-colors"
                                    aria-label="Tiktok"
                                >
                                    <FiMusic className="w-5 h-5 text-slate-400" />
                                </a>
                                <a
                                    href="https://instagram.com/hmifunej"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-emerald-900/30 hover:border-emerald-700 transition-colors"
                                    aria-label="Youtube"
                                >
                                    <FiYoutube className="w-5 h-5 text-slate-400" />
                                </a>
                                <a
                                    href="https://instagram.com/hmifunej"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-emerald-900/30 hover:border-emerald-700 transition-colors"
                                    aria-label="Mail"
                                >
                                    <FiMail className="w-5 h-5 text-slate-400" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
