"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Compass, Eye, EyeOff, AlertCircle } from "lucide-react";
import { apiFetch } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setLoading(true);
    try {
      const res = await apiFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed.");
        setLoading(false);
        return;
      }
      router.push("/");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  function useDemo() {
    setEmail("demo@wanderly.com");
    setPassword("demo1234");
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-[400px]">
        <div className="text-center mb-8">
          <div className="bg-[var(--color-primary)]/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Compass className="text-[var(--color-primary)]" size={32} />
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Welcome back</h1>
          <p className="text-gray-500 text-sm mt-2">Log in to book and manage your tours.</p>
        </div>

        <form onSubmit={submit} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-5">
          {error && (
            <div className="flex items-center gap-2 bg-red-50 text-red-600 text-sm p-3 rounded-xl border border-red-100">
              <AlertCircle size={16} /> {error}
            </div>
          )}
          
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2 ml-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2 ml-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all pr-12"
                placeholder="••••••••"
              />
              <button type="button" onClick={() => setShowPassword((s) => !s)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[var(--color-primary)] transition-colors">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-[var(--color-primary)] text-white font-bold py-3.5 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-60">
            {loading ? "Logging in..." : "Log in"}
          </button>

          <button type="button" onClick={useDemo} className="w-full bg-gray-100 text-gray-700 font-semibold py-3.5 rounded-xl hover:bg-gray-200 transition-all text-sm">
            Use Demo Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-8">
          Don't have an account? <Link href="/register" className="text-[var(--color-primary)] font-bold hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}