import { Link } from "react-router-dom";
import SpotlightCard from "./SpotlightCard";

export const NavigationCard = ({ to, icon, title, description, isDark, colorClass }) => {
    const colorConfig = {
        emerald: {
            dark: "border-emerald-500/20 hover:border-emerald-500/50",
            light: "border border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50",
            bgDark: "bg-gradient-to-br from-emerald-500/5 to-transparent",
            bgLight: "bg-gradient-to-br from-emerald-100/30 to-transparent",
            iconBgDark: "bg-emerald-500/20 group-hover:bg-emerald-600",
            iconBgLight: "bg-emerald-100 group-hover:bg-emerald-600",
            titleDark: "text-emerald-300 group-hover:text-emerald-400",
            titleLight: "text-emerald-700 group-hover:text-emerald-800",
            spotlight: "rgba(16, 185, 129, 0.25)"
        },
        teal: {
            dark: "border-teal-500/20 hover:border-teal-500/50",
            light: "border border-teal-200 hover:border-teal-400 hover:bg-teal-50",
            bgDark: "bg-gradient-to-br from-teal-500/5 to-transparent",
            bgLight: "bg-gradient-to-br from-teal-100/30 to-transparent",
            iconBgDark: "bg-teal-500/20 group-hover:bg-teal-600",
            iconBgLight: "bg-teal-100 group-hover:bg-teal-600",
            titleDark: "text-teal-300 group-hover:text-teal-400",
            titleLight: "text-teal-700 group-hover:text-teal-800",
            spotlight: "rgba(20, 184, 166, 0.25)"
        },
        cyan: {
            dark: "border-cyan-500/20 hover:border-cyan-500/50",
            light: "border border-cyan-200 hover:border-cyan-400 hover:bg-cyan-50",
            bgDark: "bg-gradient-to-br from-cyan-500/5 to-transparent",
            bgLight: "bg-gradient-to-br from-cyan-100/30 to-transparent",
            iconBgDark: "bg-cyan-600/20 group-hover:bg-cyan-700",
            iconBgLight: "bg-cyan-200 group-hover:bg-cyan-700",
            titleDark: "text-cyan-300 group-hover:text-cyan-400",
            titleLight: "text-cyan-700 group-hover:text-cyan-800",
            spotlight: "rgba(34, 211, 238, 0.25)"
        },
        blue: {
            dark: "border-blue-500/20 hover:border-blue-500/50",
            light: "border border-blue-200 hover:border-blue-400 hover:bg-blue-50",
            bgDark: "bg-gradient-to-br from-blue-500/5 to-transparent",
            bgLight: "bg-gradient-to-br from-blue-100/30 to-transparent",
            iconBgDark: "bg-blue-500/20 group-hover:bg-blue-600",
            iconBgLight: "bg-blue-100 group-hover:bg-blue-600",
            titleDark: "text-blue-300 group-hover:text-blue-400",
            titleLight: "text-blue-700 group-hover:text-blue-800",
            spotlight: "rgba(59, 130, 246, 0.25)"
        },
    };

    const colors = colorConfig[colorClass] || colorConfig.emerald;

    return (
        <SpotlightCard
            className={`group relative p-8 transition-all duration-500 shadow-xl hover:shadow-2xl hover:-translate-y-3 cursor-pointer w-full ${isDark
                ? `bg-gradient-to-br from-white/[0.08] to-white/[0.02] ${colors.dark} backdrop-blur-xl`
                : `bg-white ${colors.light}`
                }`}
            spotlightColor={isDark ? "rgba(255, 255, 255, 0.25)" : colors.spotlight}
        >
            <Link to={to} className="relative block">
                <div className="relative">
                    <div
                        className={`flex items-center justify-center w-12 h-12 mb-4 transition-colors rounded-lg ${isDark
                            ? colors.iconBgDark
                            : colors.iconBgLight
                            }`}
                    >
                        <span className="text-2xl group-hover:text-white">{icon}</span>
                    </div>
                    <h3
                        className={`mb-2 text-lg font-bold font-bricolage transition-colors duration-500 ${isDark
                            ? colors.titleDark
                            : colors.titleLight
                            }`}
                    >
                        {title}
                    </h3>
                    <p
                        className={`transition-colors duration-500 ${isDark ? "text-gray-400" : "text-gray-600"
                            }`}
                    >
                        {description}
                    </p>
                </div>
            </Link>
        </SpotlightCard>
    );
};

export default NavigationCard;
