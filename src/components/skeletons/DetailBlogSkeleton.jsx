import { useTheme } from "../../hooks/useTheme";

export default function DetailBlogSkeleton() {
    const isDark = useTheme();

    return (
        <div className={`w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16`}>
            {/* Hero Image Skeleton */}
            <div
                className={`w-full h-96 rounded-2xl mb-8 ${isDark ? 'bg-gray-700' : 'bg-gray-300'
                    } animate-pulse`}
            ></div>

            {/* Content Skeleton */}
            <div className="space-y-6">
                {/* Title */}
                <div className="space-y-3">
                    <div
                        className={`h-8 ${isDark ? 'bg-gray-700' : 'bg-gray-300'} rounded animate-pulse w-3/4`}
                    ></div>
                    <div
                        className={`h-6 ${isDark ? 'bg-gray-700' : 'bg-gray-300'} rounded animate-pulse w-1/2`}
                    ></div>
                </div>

                {/* Meta Info (Date, Author) */}
                <div className="flex gap-4">
                    <div
                        className={`h-4 w-24 ${isDark ? 'bg-gray-700' : 'bg-gray-300'
                            } rounded animate-pulse`}
                    ></div>
                    <div
                        className={`h-4 w-32 ${isDark ? 'bg-gray-700' : 'bg-gray-300'
                            } rounded animate-pulse`}
                    ></div>
                </div>

                {/* Content Lines */}
                <div className="space-y-3 pt-4">
                    {[...Array(12)].map((_, i) => (
                        <div
                            key={i}
                            className={`h-4 ${isDark ? 'bg-gray-700' : 'bg-gray-300'} rounded animate-pulse ${i % 5 === 4 ? 'w-2/3' : 'w-full'
                                }`}
                        ></div>
                    ))}
                </div>
            </div>

            {/* Related Posts Skeleton */}
            <div className="mt-16 pt-8 border-t">
                <div
                    className={`h-6 w-40 ${isDark ? 'bg-gray-700' : 'bg-gray-300'
                        } rounded animate-pulse mb-6`}
                ></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className={`rounded-lg overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                            <div
                                className={`h-40 ${isDark ? 'bg-gray-700' : 'bg-gray-300'
                                    } animate-pulse mb-3`}
                            ></div>
                            <div className="p-3 space-y-2">
                                <div
                                    className={`h-4 ${isDark ? 'bg-gray-700' : 'bg-gray-300'
                                        } rounded animate-pulse w-2/3`}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
