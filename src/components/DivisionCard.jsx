import { useState } from "react";
import { colorMap } from "../constants/divisions";
import { DivisionDrawer } from "./DivisionDrawer";
import SpotlightCard from "./SpotlightCard";

export const DivisionCard = ({ division, isDark }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const palette = colorMap[division.colorClass] || colorMap.emerald;

    return (
        <>
            <SpotlightCard
                className={`group relative p-8 transition-all duration-500 shadow-xl hover:shadow-2xl hover:-translate-y-3 cursor-pointer w-full ${isDark
                    ? `bg-gradient-to-br from-white/[0.08] to-white/[0.02] ${palette.cardDark} backdrop-blur-xl`
                    : `bg-white ${palette.cardLight}`
                    }`}
                spotlightColor={isDark ? "rgba(255, 255, 255, 0.25)" : `rgba(${palette.colorClass === 'emerald' ? '16, 185, 129' : '0, 0, 0'}, 0.15)`}
            >
                <button
                    onClick={() => setIsDrawerOpen(true)}
                    className="relative w-full h-full flex flex-col items-center text-center space-y-4"
                >
                    <div className="relative flex flex-col items-center text-center space-y-4">
                        <img src={`/icon-divisi/${division.image}`} alt={division.name} className="w-20 h-20 transition-transform duration-500 group-hover:scale-110" />
                        <h3 className={`text-2xl font-bold transition-colors duration-500 ${isDark ? palette.titleDark : palette.titleLight}`}>
                            {division.name}
                        </h3>
                    </div>
                </button>
            </SpotlightCard>

            <DivisionDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                division={division}
                isDark={isDark}
                colorClass={division.colorClass}
            />
        </>
    );
};
