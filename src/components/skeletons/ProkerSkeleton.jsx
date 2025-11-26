import { useTheme } from "../../hooks/useTheme";

export default function ProkerSkeleton() {
    const isDark = useTheme();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
                <div
                    key={i}
                    className={`rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-300 backdrop-blur-md border ${isDark
                            ? 'bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-cyan-500/10 border-emerald-500/30'
                            : 'bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-cyan-500/20 border-emerald-400/40'
                        }`}
                >
                    {/* Image Skeleton */}
                    <div className={`w-full h-40 ${isDark ? 'bg-gray-700' : 'bg-gray-300'} animate-pulse`}></div>

                    {/* Content Skeleton */}
                    <div className="p-5 flex flex-col flex-grow">
                        {/* Title */}
                        <div className="mb-3 space-y-2">
                            <div
                                className={`h-5 ${isDark ? 'bg-gray-700' : 'bg-gray-300'} rounded animate-pulse w-full`}
                            ></div>
                            <div
                                className={`h-5 ${isDark ? 'bg-gray-700' : 'bg-gray-300'} rounded animate-pulse w-2/3`}
                            ></div>
                        </div>

                        {/* Description */}
                        <div className="mb-4 space-y-2 flex-grow">
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

                        {/* Date Range */}
                        <div
                            className={`h-3 w-32 ${isDark ? 'bg-gray-700' : 'bg-gray-300'
                                } rounded animate-pulse`}
                        ></div>
                    </div>
                </div>
            ))}
        </div>
    );
}
