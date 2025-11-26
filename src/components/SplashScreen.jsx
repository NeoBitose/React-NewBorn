import { PerspectiveCamera, useGLTF } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import React, { Suspense, useEffect, useRef, useState } from 'react';

function Model() {
    const { scene } = useGLTF('/hmiffsf.glb');
    const meshRef = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.y = time * 0.5;
        }
    });

    return <primitive ref={meshRef} object={scene} scale={0.75} />;
}

function Scene() {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 1.5, 8]} />
            <ambientLight intensity={1} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <Suspense fallback={null}>
                <Model />
            </Suspense>
        </>
    );
}

const SplashScreen = ({ onFinish }) => {
    const [progress, setProgress] = React.useState(0);
    const [startProgress, setStartProgress] = React.useState(false);
    const [canvasError, setCanvasError] = useState(false);

    useEffect(() => {
        const delayTimer = setTimeout(() => {
            setStartProgress(true);
        }, 1000);

        return () => clearTimeout(delayTimer);
    }, []);

    useEffect(() => {
        if (!startProgress) return;

        const interval = setInterval(() => {
            setProgress((prev) => {
                let increment = 1.5;

                // Simulate realistic loading with delays
                if (prev < 30) {
                    increment = 2.5; // Start
                } else if (prev < 60) {
                    increment = 2; // Moderate
                } else if (prev < 80) {
                    increment = 1.2; // Slower
                } else if (prev < 95) {
                    increment = 0.8; // Very slow near end
                } else {
                    increment = 0.3; // Almost frozen at end
                }

                const newProgress = prev + increment;

                if (newProgress >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        onFinish();
                    }, 300);
                    return 100;
                }
                return newProgress;
            });
        }, 40);

        return () => clearInterval(interval);
    }, [startProgress, onFinish]);

    const circumference = 2 * Math.PI * 45;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    const handleCanvasError = () => {
        setCanvasError(true);
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-slate-950 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />

            <div className="absolute top-10 right-10 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-emerald-200/20 dark:bg-emerald-900/20 rounded-full blur-3xl" style={{ animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
            <div className="absolute bottom-20 left-10 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-blue-200/20 dark:bg-blue-900/20 rounded-full blur-3xl" style={{ animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite 2s' }} />

            <div className="absolute inset-0 flex items-center justify-center px-4">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40">
                    <div className="absolute inset-0 rounded-full border-2 border-slate-300/40 dark:border-slate-600/40" />

                    <div className="absolute inset-0 rounded-full border border-emerald-300/30 dark:border-emerald-600/30" style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />

                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            className="text-slate-200 dark:text-slate-800"
                            opacity="0.5"
                        />
                        <defs>
                            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="currentColor" className="text-emerald-500" />
                                <stop offset="100%" stopColor="currentColor" className="text-emerald-400" />
                            </linearGradient>
                        </defs>
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="url(#progressGradient)"
                            strokeWidth="2.5"
                            className="text-emerald-600 dark:text-emerald-500 transition-all duration-75"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            transform="rotate(-90 50 50)"
                        />
                    </svg>

                    <div className="absolute w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        {!canvasError ? (
                            <Canvas
                                gl={{ alpha: true, precision: 'highp', failIfMajorPerformanceCaveat: false }}
                                dpr={2}
                                onError={handleCanvasError}
                            >
                                <Scene />
                            </Canvas>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full" />
                        )}
                    </div>
                </div>
            </div>

            <div className="absolute bottom-8 sm:bottom-12 md:bottom-16 flex flex-col items-center gap-2">
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 tracking-widest uppercase">Loading</p>
                <div className="flex gap-1 sm:gap-1.5">
                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-emerald-500 rounded-full animate-bounce" />
                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-emerald-500 rounded-full animate-bounce delay-100" />
                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-emerald-500 rounded-full animate-bounce delay-200" />
                </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/5 dark:to-slate-900/5 pointer-events-none" />
        </div>
    );
};

export default SplashScreen;
