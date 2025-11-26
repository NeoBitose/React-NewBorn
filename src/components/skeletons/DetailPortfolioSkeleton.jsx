import { useTheme } from "../../hooks/useTheme";

export default function DetailPortfolioSkeleton() {
    const isDark = useTheme();

    return (
        <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Image Skeleton */}
                <div className="flex items-center">
                    <div
                        className={`w-full aspect-video rounded-2xl ${isDark ? 'bg-gray-700' : 'bg-gray-300'
                            } animate-pulse`}
                    ></div>
                </div>

                {/* Content Skeleton */}
                <div className="space-y-6">
                    {/* Title */}
                    <div className="space-y-2">
                        <div
                            className={`h-8 ${isDark ? 'bg-gray-700' : 'bg-gray-300'} rounded animate-pulse w-3/4`}
                        ></div>
                        <div
                            className={`h-6 ${isDark ? 'bg-gray-700' : 'bg-gray-300'} rounded animate-pulse w-1/2`}
                        ></div>
                    </div>

                    {/* Description Lines */}
                    <div className="space-y-3">
                        {[...Array(4)].map((_, i) => (
                            <div
                                key={i}
                                className={`h-4 ${isDark ? 'bg-gray-700' : 'bg-gray-300'} rounded animate-pulse ${i === 3 ? 'w-2/3' : 'w-full'
                                    }`}
                            ></div>
                        ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pt-4">
                        {[...Array(3)].map((_, i) => (
                            <div
                                key={i}
                                className={`h-8 px-4 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-300'
                                    } animate-pulse w-20`}
                            ></div>
                        ))}
                    </div>

                    {/* Button Skeleton */}
                    <div className="pt-4">
                        <div
                            className={`h-12 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-300'
                                } animate-pulse w-40`}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
