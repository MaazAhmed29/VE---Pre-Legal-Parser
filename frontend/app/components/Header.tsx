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
    router.push("/auth");
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
              <div className="w-7 h-7 rounded-md bg-zinc-900 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
            )}
            <div>
              <h1 className="text-sm font-semibold text-zinc-900 leading-none">{title}</h1>
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
