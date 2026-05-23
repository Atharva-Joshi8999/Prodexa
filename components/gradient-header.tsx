import { ReactNode } from 'react';

interface GradientHeaderProps {
    title: string;
    subtitle?: string;
    children?: ReactNode;
}

export function GradientHeader({
    title,
    subtitle,
    children
}: GradientHeaderProps) {
    return (
        <div className="relative overflow-hidden rounded-2xl mb-8">
            {/* Main gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-violet-600 to-blue-700" />

            {/* Noise/texture overlay */}
            <div
                className="absolute inset-0 opacity-[0.15]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat',
                    backgroundSize: '128px 128px',
                }}
            />

            {/* Animated orbs */}
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-violet-400/30 blur-3xl animate-pulse" />
            <div className="absolute -bottom-16 -left-10 w-64 h-64 rounded-full bg-blue-400/20 blur-3xl" />
            <div className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-indigo-300/20 blur-2xl" />

            {/* Grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Content */}
            <div className="relative z-10 px-8 py-10 md:py-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/25 text-white/90 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm mb-4">
                    <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                    Prodexa
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2 drop-shadow-sm">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-white/75 text-base md:text-lg max-w-2xl leading-relaxed">
                        {subtitle}
                    </p>
                )}
                {children && (
                    <div className="mt-5">{children}</div>
                )}
            </div>
        </div>
    );
}