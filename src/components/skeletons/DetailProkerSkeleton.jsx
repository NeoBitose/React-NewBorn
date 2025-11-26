import { useTheme } from "../../hooks/useTheme";

export default function DetailProkerSkeleton() {
    const isDark = useTheme();

    return (
        <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16`}>
            {/* Hero Image */}
            <div
                className={`w-full h-96 rounded-2xl mb-8 ${isDark ? 'bg-gray-700' : 'bg-gray-300'
                    } animate-pulse`}
            ></div>

            {/* Title and Meta */}
            <div className="mb-8">
                <div className="space-y-3 mb-4">
                    <div
                        className={`h-8 ${isDark ? 'bg-gray-700' : 'bg-gray-300'} rounded animate-pulse w-3/4`}
                    ></div>
                    <div
                        className={`h-6 ${isDark ? 'bg-gray-700' : 'bg-gray-300'} rounded animate-pulse w-1/2`}
                    ></div>
                </div>

                {/* Date and Status */}
                <div className="flex gap-4">
                    <div
                        className={`h-4 w-32 ${isDark ? 'bg-gray-700' : 'bg-gray-300'
                            } rounded animate-pulse`}
                    ></div>
                    <div
                        className={`h-6 w-20 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-300'
                            } animate-pulse`}
                    ></div>
                </div>
            </div>

            {/* Description Lines */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                <div className="lg:col-span-2 space-y-3">
                    {[...Array(10)].map((_, i) => (
                        <div
                            key={i}
                            className={`h-4 ${isDark ? 'bg-gray-700' : 'bg-gray-300'} rounded animate-pulse ${i % 4 === 3 ? 'w-2/3' : 'w-full'
                                }`}
                        ></div>
                    ))}
                </div>

                {/* Sidebar Info */}
                <div className="space-y-4">
                    <div
                        className={`h-6 w-32 ${isDark ? 'bg-gray-700' : 'bg-gray-300'
                            } rounded animate-pulse mb-3`}
                    ></div>
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="space-y-2">
                            <div
                                className={`h-4 w-20 ${isDark ? 'bg-gray-700' : 'bg-gray-300'
                                    } rounded animate-pulse`}
                            ></div>
                            <div
                                className={`h-4 w-full ${isDark ? 'bg-gray-700' : 'bg-gray-300'
                                    } rounded animate-pulse`}
                            ></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Timeline/Gallery Section */}
            <div>
                <div
                    className={`h-6 w-40 ${isDark ? 'bg-gray-700' : 'bg-gray-300'
                        } rounded animate-pulse mb-6`}
                ></div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className={`aspect-square rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-300'
                                } animate-pulse`}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
}
