import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerTitle
} from "./ui/drawer";

export const DivisionDrawer = ({ isOpen, onClose, division, isDark, colorClass }) => {
    useEffect(() => {
        if (isOpen) {
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.documentElement.style.overflow = '';
        }
        return () => {
            document.documentElement.style.overflow = '';
        };
    }, [isOpen]);

    const getColorClasses = () => {
        const colorMap = {
            emerald: { text: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
            teal: { text: "text-teal-600", bg: "bg-teal-50", border: "border-teal-200" },
            cyan: { text: "text-cyan-600", bg: "bg-cyan-50", border: "border-cyan-200" },
            blue: { text: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
            purple: { text: "text-purple-600", bg: "bg-purple-50", border: "border-purple-200" },
            rose: { text: "text-rose-600", bg: "bg-rose-50", border: "border-rose-200" },
        };
        return colorMap[colorClass] || colorMap.emerald;
    };

    const colors = getColorClasses();

    return (
        <Drawer open={isOpen} onOpenChange={onClose} direction="bottom">
            <DrawerContent className={`backdrop-blur-2xl transition-all duration-500 ${isDark
                ? "bg-gradient-to-br from-white/[0.08] to-white/[0.02] border-t border-white/[0.2] shadow-2xl"
                : "bg-white border-t border-gray-200 shadow-2xl"
                }`}>
                <DrawerHeader className={`border-b backdrop-blur-md transition-colors duration-500 ${isDark
                    ? "border-white/[0.15] bg-gradient-to-b from-white/[0.1] to-white/[0.05]"
                    : "border-gray-200 bg-gray-50"
                    }`}>
                    <div className="flex items-center justify-between">
                        <DrawerTitle className={`text-2xl font-bold font-bricolage ${isDark ? "text-white" : colors.text}`}>
                            {division?.name}
                        </DrawerTitle>
                        <DrawerClose className={`p-2 rounded-lg transition-all duration-200 ${isDark
                            ? "hover:bg-gray-700 text-gray-400 hover:text-gray-200"
                            : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                            }`}>
                            <FaTimes size={20} />
                        </DrawerClose>
                    </div>
                </DrawerHeader>

                <div className="flex-1 overflow-y-auto flex items-center justify-center backdrop-blur-sm">
                    <div className="w-full max-w-full px-6 md:px-8 py-8">
                        <div className="grid grid-cols-1 gap-8 md:gap-16 md:grid-cols-3 items-center">
                            <div className="flex items-center justify-center order-2 md:order-1 md:col-span-1">
                                <div className={`flex justify-center items-center w-40 h-40 md:w-48 md:h-48 rounded-2xl`}>
                                    <img
                                        src={`/icon-divisi/${division?.image}`}
                                        alt={division?.name}
                                        className="w-32 h-32 md:w-40 md:h-40 object-contain"
                                    />
                                </div>
                            </div>

                            <div className="space-y-6 order-1 md:order-2 md:col-span-2">
                                <div className="space-y-4">
                                    <h3 className={`text-3xl md:text-4xl font-bold font-bricolage ${isDark ? "text-gray-100" : "text-gray-900"}`}>
                                        Divisi {division?.fullName}
                                    </h3>
                                    <p className={`text-md md:text-lg leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                                        {division?.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default DivisionDrawer;
