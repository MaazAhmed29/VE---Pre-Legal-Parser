"use client";

import Link from "next/link";

function FloatingDoc({
  className,
  animClass,
  delayClass,
  width,
  height,
  lines = 4,
}: {
  className: string;
  animClass: string;
  delayClass: string;
  width: string;
  height: string;
  lines?: number;
}) {
  return (
    <div
      className={`absolute ${className} ${animClass} ${delayClass}`}
    >
      <div
        className={`${width} ${height} rounded-lg border border-zinc-900/[0.15] bg-white p-3 space-y-2 shadow-sm`}
      >
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className="h-[3px] rounded-full bg-zinc-900/[0.15]"
            style={{ width: `${60 + Math.random() * 40}%` }}
          />
        ))}
      </div>
    </div>
  );
}

export default function HeroPage() {
  return (
    <div className="relative min-h-screen bg-zinc-50 flex flex-col overflow-hidden">
      {/* Floating documents background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Doc 1 - top left, small */}
        <FloatingDoc
          className="top-[12%] left-[8%] opacity-50 -rotate-6"
          animClass="animate-doc-1"
          delayClass="animation-delay-0s"
          width="w-24"
          height="h-32"
          lines={4}
        />

        {/* Doc 2 - top right, medium */}
        <FloatingDoc
          className="top-[8%] right-[12%] opacity-55 rotate-3"
          animClass="animate-doc-2"
          delayClass="animation-delay-2s"
          width="w-28"
          height="h-36"
          lines={5}
        />

        {/* Doc 3 - mid left, large */}
        <FloatingDoc
          className="top-[35%] left-[5%] opacity-50 -rotate-3"
          animClass="animate-doc-3"
          delayClass="animation-delay-4s"
          width="w-32"
          height="h-44"
          lines={6}
        />

        {/* Doc 4 - mid right, small */}
        <FloatingDoc
          className="top-[45%] right-[6%] opacity-60 rotate-6"
          animClass="animate-doc-4"
          delayClass="animation-delay-6s"
          width="w-20"
          height="h-28"
          lines={3}
        />

        {/* Doc 5 - bottom left, medium */}
        <FloatingDoc
          className="bottom-[18%] left-[15%] opacity-50 rotate-2"
          animClass="animate-doc-5"
          delayClass="animation-delay-8s"
          width="w-26"
          height="h-36"
          lines={5}
        />

        {/* Doc 6 - bottom right, small */}
        <FloatingDoc
          className="bottom-[15%] right-[10%] opacity-65 -rotate-4"
          animClass="animate-doc-6"
          delayClass="animation-delay-10s"
          width="w-22"
          height="h-30"
          lines={4}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 w-full px-6 py-5 flex items-center justify-between max-w-6xl mx-auto animate-fade-in">
        <span className="font-signika text-lg font-bold text-zinc-900 tracking-tight">
          Document Legalizer
        </span>
        <Link
          href="/auth"
          className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
        >
          Sign in
        </Link>
      </nav>

      {/* Hero content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6">
        <div className="max-w-2xl text-center">
          <h1 className="font-signika text-5xl sm:text-6xl font-bold text-zinc-900 tracking-tight leading-tight animate-fade-in-up">
            Document Legalizer
          </h1>

          <p className="mt-5 text-lg text-zinc-500 leading-relaxed animate-fade-in-up animation-delay-200">
            Draft legal agreements with confidence. Professional templates for NDAs,
            software licenses, service agreements, and more.
          </p>

          <div className="mt-10 animate-fade-in-up animation-delay-400">
            <Link
              href="/auth"
              className="inline-block px-8 py-3 bg-zinc-900 text-white text-sm font-medium rounded-lg hover:bg-zinc-800 transition-colors"
            >
              Get started
            </Link>
          </div>

          <div className="mt-16 flex items-center justify-center gap-8 text-xs text-zinc-400 animate-fade-in animation-delay-600">
            <span>NDAs</span>
            <span className="w-1 h-1 rounded-full bg-zinc-300"></span>
            <span>License Agreements</span>
            <span className="w-1 h-1 rounded-full bg-zinc-300"></span>
            <span>Service Contracts</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center animate-fade-in animation-delay-600">
        <p className="text-[11px] text-zinc-400">
          Document Legalizer provides templates for informational purposes only.
        </p>
      </footer>
    </div>
  );
}
