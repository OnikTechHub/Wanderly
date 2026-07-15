"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Compass, Eye, EyeOff, AlertCircle } from "lucide-react";

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
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
    <div className="container-app py-16 max-w-md mx-auto">
      <div className="text-center mb-8">
        <Compass className="mx-auto text-[var(--color-primary)] mb-2" size={32} />
        <h1 className="text-2xl font-extrabold">Welcome back</h1>
        <p className="text-gray-500 text-sm mt-1">Log in to book and manage your tours.</p>
      </div>

      <form onSubmit={submit} className="card-base p-6 space-y-4">
        {error && (
          <div className="flex items-center gap-2 bg-red-50 text-red-600 text-sm p-3 rounded-lg">
            <AlertCircle size={16} /> {error}
          </div>
        )}
        <div>
          <label className="text-xs font-semibold text-gray-500 block mb-1.5">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[var(--color-primary)]"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 block mb-1.5">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[var(--color-primary)] pr-10"
              placeholder="••••••••"
            />
            <button type="button" onClick={() => setShowPassword((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
          {loading ? "Logging in..." : "Log in"}
        </button>

        <button type="button" onClick={useDemo} className="btn-outline w-full text-sm">
          Use Demo Login
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Don&apos;t have an account? <Link href="/register" className="text-[var(--color-primary)] font-semibold">Sign up</Link>
      </p>
    </div>
  );
}
