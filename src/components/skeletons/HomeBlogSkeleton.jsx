import { useTheme } from "../../hooks/useTheme";

export default function HomeBlogSkeleton() {
    const isDark = useTheme();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
                <div
                    key={i}
                    className={`group relative rounded-2xl transition-all duration-500 shadow-lg overflow-hidden flex flex-col ${isDark
                            ? 'bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-emerald-500/20 backdrop-blur-xl'
                            : 'bg-white border border-emerald-200'
                        }`}
                >
                    {/* Image Skeleton */}
                    <div className={`relative h-48 w-full overflow-hidden bg-gradient-to-br ${isDark ? 'from-gray-700 to-gray-600' : 'from-gray-300 to-gray-200'
                        } animate-pulse`}></div>

                    {/* Content Skeleton */}
                    <div className="relative p-6 flex-1 flex flex-col">
                        {/* Tags Skeleton */}
                        <div className="mb-2 flex gap-2 flex-wrap">
                            {[...Array(2)].map((_, j) => (
                                <div
                                    key={j}
                                    className={`h-5 w-16 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-300'
                                        } animate-pulse`}
                                ></div>
                            ))}
                        </div>

                        {/* Title Skeleton */}
                        <div className="mb-3 space-y-2">
                            <div
                                className={`h-5 ${isDark ? 'bg-gray-700' : 'bg-gray-300'} rounded animate-pulse w-full`}
                            ></div>
                            <div
                                className={`h-5 ${isDark ? 'bg-gray-700' : 'bg-gray-300'} rounded animate-pulse w-2/3`}
                            ></div>
                        </div>

                        {/* Description Skeleton */}
                        <div className="mb-4 space-y-2 flex-1">
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

                        {/* Date Skeleton */}
                        <div
                            className={`h-3 w-24 ${isDark ? 'bg-gray-700' : 'bg-gray-300'
                                } rounded animate-pulse`}
                        ></div>
                    </div>
                </div>
            ))}
        </div>
    );
}
