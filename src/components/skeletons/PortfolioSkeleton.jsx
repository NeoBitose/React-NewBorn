import { useTheme } from "../../hooks/useTheme";

export default function PortfolioSkeleton() {
    const isDark = useTheme();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
                <div
                    key={i}
                    className={`rounded-2xl overflow-hidden h-full flex flex-col ${isDark
                            ? 'bg-gradient-to-br from-white/10 via-white/5 to-emerald-500/10 border border-emerald-500/20'
                            : 'bg-gradient-to-br from-white/60 via-white/40 to-emerald-200/30 border border-white/60'
                        }`}
                >
                    {/* Image Skeleton */}
                    <div className={`h-48 overflow-hidden bg-gradient-to-b ${isDark ? 'from-gray-700 to-gray-600' : 'from-gray-300 to-gray-200'} animate-pulse`}></div>

                    {/* Content Skeleton */}
                    <div className="p-4 flex flex-col flex-grow">
                        {/* Title Skeleton */}
                        <div className="mb-3 space-y-2">
                            <div
                                className={`h-4 ${isDark ? 'bg-gray-700' : 'bg-gray-300'} rounded animate-pulse w-full`}
                            ></div>
                            <div
                                className={`h-4 ${isDark ? 'bg-gray-700' : 'bg-gray-300'} rounded animate-pulse w-2/3`}
                            ></div>
                        </div>

                        {/* Description Skeleton */}
                        <div className="mb-4 space-y-2 flex-grow">
                            <div
                                className={`h-3 ${isDark ? 'bg-gray-700' : 'bg-gray-300'} rounded animate-pulse w-full`}
                            ></div>
                            <div
                                className={`h-3 ${isDark ? 'bg-gray-700' : 'bg-gray-300'} rounded animate-pulse w-5/6`}
                            ></div>
                        </div>

                        {/* Tag Skeleton */}
                        <div className="flex flex-wrap gap-2">
                            {[...Array(2)].map((_, j) => (
                                <div
                                    key={j}
                                    className={`h-6 px-3 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-300'
                                        } animate-pulse w-16`}
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
