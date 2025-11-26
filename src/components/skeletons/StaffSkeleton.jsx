import { useTheme } from "../../hooks/useTheme";

export default function StaffSkeleton() {
    const isDark = useTheme();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
                <div
                    key={i}
                    className={`rounded-2xl overflow-hidden backdrop-blur-md border ${isDark
                            ? 'bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-cyan-500/10 border-emerald-500/30'
                            : 'bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-cyan-500/20 border-emerald-400/40'
                        }`}
                >
                    {/* Image Skeleton */}
                    <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-emerald-500/10 to-teal-500/10">
                        <div
                            className={`w-full h-full ${isDark ? 'bg-gray-700' : 'bg-gray-300'
                                } animate-pulse`}
                        ></div>
                    </div>

                    {/* Content Skeleton */}
                    <div className="p-5">
                        {/* Name Skeleton */}
                        <div className="mb-3">
                            <div
                                className={`h-5 ${isDark ? 'bg-gray-700' : 'bg-gray-300'} rounded animate-pulse w-3/4 mx-auto`}
                            ></div>
                        </div>

                        {/* Role Skeleton */}
                        <div className="mb-4">
                            <div
                                className={`h-4 ${isDark ? 'bg-gray-700' : 'bg-gray-300'} rounded animate-pulse w-1/2 mx-auto`}
                            ></div>
                        </div>

                        {/* Social Icons Skeleton */}
                        <div className="flex justify-center gap-2 mb-4">
                            {[...Array(3)].map((_, j) => (
                                <div
                                    key={j}
                                    className={`w-9 h-9 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-300'
                                        } animate-pulse`}
                                ></div>
                            ))}
                        </div>

                        {/* Role Badge Skeleton */}
                        <div className="border-t pt-4">
                            <div
                                className={`h-8 ${isDark ? 'bg-gray-700' : 'bg-gray-300'} rounded-lg animate-pulse`}
                            ></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
