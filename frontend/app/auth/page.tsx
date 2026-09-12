"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, signup } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    const ok = isSignup
      ? await signup(email, password)
      : await login(email, password);

    if (ok) {
      router.push("/");
    } else {
      setError(isSignup ? "Email already in use" : "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Pre Legal</h1>
          <p className="text-slate-500 mt-1">
            Draft legal agreements with AI
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-6">
            {isSignup ? "Create account" : "Sign in"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter password"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              {isSignup ? "Sign up" : "Sign in"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsSignup(!isSignup);
                setError("");
              }}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              {isSignup
                ? "Already have an account? Sign in"
                : "Don't have an account? Sign up"}
            </button>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-xs text-slate-400 text-center">
              Demo credentials: admin@prelegal.com / admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
