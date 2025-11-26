import { useTheme } from "../../hooks/useTheme";

export default function HomeProkerSkeleton() {
    const isDark = useTheme();

    return (
        <div className="relative overflow-visible">
            <div className="relative group overflow-visible">
                <div className="overflow-x-auto scrollbar-hide scroll-smooth overflow-y-visible px-5">
                    <div className="flex gap-8 py-6">
                        {[...Array(3)].map((_, i) => (
                            <div
                                key={i}
                                className={`group/card relative overflow-visible rounded-2xl transition-all duration-500 shadow-md flex-shrink-0 w-full max-w-2xl backdrop-blur-lg border ${isDark
                                        ? 'bg-gradient-to-br from-white/[0.08] to-white/[0.02] border-emerald-500/20'
                                        : 'bg-white/70 border-emerald-200/50'
                                    }`}
                            >
                                {/* Logo Skeleton */}
                                <div className={`relative h-48 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 flex items-center justify-center overflow-hidden rounded-t-2xl ${isDark ? 'bg-gray-700' : 'bg-gray-300'
                                    } animate-pulse`}></div>

                                {/* Content Skeleton */}
                                <div className="p-6 relative">
                                    {/* Status Badge */}
                                    <div className="mb-4">
                                        <div
                                            className={`w-16 h-6 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-300'
                                                } animate-pulse`}
                                        ></div>
                                    </div>

                                    {/* Title */}
                                    <div className="mb-3 space-y-2">
                                        <div
                                            className={`h-6 ${isDark ? 'bg-gray-700' : 'bg-gray-300'} rounded animate-pulse w-full`}
                                        ></div>
                                        <div
                                            className={`h-6 ${isDark ? 'bg-gray-700' : 'bg-gray-300'} rounded animate-pulse w-2/3`}
                                        ></div>
                                    </div>

                                    {/* Description */}
                                    <div className="mb-4 space-y-2">
                                        <div
                                            className={`h-3 ${isDark ? 'bg-gray-700' : 'bg-gray-300'} rounded animate-pulse w-full`}
                                        ></div>
                                        <div
                                            className={`h-3 ${isDark ? 'bg-gray-700' : 'bg-gray-300'} rounded animate-pulse w-full`}
                                        ></div>
                                        <div
                                            className={`h-3 ${isDark ? 'bg-gray-700' : 'bg-gray-300'} rounded animate-pulse w-1/2`}
                                        ></div>
                                    </div>

                                    {/* Link Text */}
                                    <div
                                        className={`h-4 w-24 ${isDark ? 'bg-gray-700' : 'bg-gray-300'
                                            } rounded animate-pulse`}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
