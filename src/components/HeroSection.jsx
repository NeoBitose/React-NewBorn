import { useTheme } from "../hooks/useTheme";

export default function HeroSection({
    title,
    subtitle,
    height = "py-20 md:py-24",
    alignment = "center",
    gradientFrom = "from-emerald-50",
    gradientTo = "to-teal-50",
    darkGradientFrom = "from-gray-900",
    darkGradientTo = "to-gray-900",
    showPattern = true,
    ctaButton,
    subtitleLabel = "",
}) {
    const isDark = useTheme();

    const alignmentClasses = {
        left: "md:grid-cols-3 text-left",
        center: "text-center flex justify-center",
        right: "md:grid-cols-3 text-right",
    };

    return (
        <section
            className={`pt-24 pb-12 overflow-hidden transition-colors duration-500 relative ${isDark
                ? `bg-gradient-to-b ${darkGradientFrom} via-gray-800 ${darkGradientTo}`
                : `bg-gradient-to-b ${gradientFrom} via-blue-50 ${gradientTo}`
                }`}
        >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className={`absolute -top-40 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-20 transition-colors duration-500 ${isDark ? "bg-emerald-500" : "bg-emerald-400"
                        }`}
                ></div>
                <div
                    className={`absolute -top-32 left-0 w-80 h-80 rounded-full blur-3xl opacity-15 transition-colors duration-500 ${isDark ? "bg-teal-500" : "bg-teal-300"
                        }`}
                ></div>
                <div
                    className={`absolute -top-24 right-0 w-72 h-72 rounded-full blur-3xl opacity-10 transition-colors duration-500 ${isDark ? "bg-blue-500" : "bg-blue-300"
                        }`}
                ></div>
            </div>

            {showPattern && (
                <div className="absolute inset-0 opacity-5">
                    <div className={`w-full h-full ${isDark ? "bg-white/5" : "bg-black/5"}`}></div>
                </div>
            )}

            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="space-y-2 max-w-3xl">
                    <div>
                        {subtitleLabel && (
                            <div className="flex items-center gap-3">
                                <div className={`h-px w-8 transition-colors duration-500 ${isDark ? "bg-emerald-500/60" : "bg-emerald-500"}`}></div>
                                <p
                                    className={`text-xs tracking-widest uppercase transition-colors duration-500 font-semibold ${isDark ? "text-emerald-400" : "text-emerald-600"
                                        }`}
                                    data-aos="zoom-in"
                                >
                                    {subtitleLabel}
                                </p>
                            </div>
                        )}
                        <h1
                            className={`text-4xl md:text-5xl lg:text-6xl font-extrabold font-bricolage leading-tight transition-colors duration-500 ${isDark
                                ? "text-white"
                                : "text-gray-900 drop-shadow-lg"
                                }`}
                            data-aos="fade-down"
                        >
                            {title}
                        </h1>
                    </div>
                    <div>
                        {subtitle && (
                            <p
                                className={`text-md md:text-lg leading-relaxed transition-colors duration-500 ${isDark ? "text-white/80" : "text-gray-700"
                                    }`}
                                data-aos="fade-left"
                            >
                                {subtitle}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
