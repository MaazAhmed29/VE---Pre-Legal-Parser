"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

interface HeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  actions?: React.ReactNode;
}

export default function Header({ title, subtitle, showBack, onBack, actions }: HeaderProps) {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <header className="bg-white border-b border-zinc-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBack && (
            <button
              onClick={onBack}
              className="p-1.5 -ml-1.5 hover:bg-zinc-100 rounded-md transition-colors"
            >
              <svg className="w-4 h-4 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <div className="flex items-center gap-2.5">
            {!showBack && (
              <span className="font-signika text-base font-bold text-zinc-900 tracking-tight">
                Document Legalizer
              </span>
            )}
            <div>
              {showBack && (
                <h1 className="text-sm font-semibold text-zinc-900 leading-none">{title}</h1>
              )}
              {subtitle && (
                <p className="text-xs text-zinc-500 mt-0.5">{subtitle}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {actions}
          {user && (
            <>
              <span className="text-xs text-zinc-500 hidden sm:inline">{user.email ?? ""}</span>
              <div className="w-7 h-7 rounded-full bg-zinc-100 flex items-center justify-center text-xs font-medium text-zinc-600">
                {(user.email ?? "").charAt(0).toUpperCase()}
              </div>
              <button
                onClick={handleLogout}
                className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors"
              >
                Sign out
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
