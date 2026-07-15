"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Compass, AlertCircle } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!name || !email || !password || !confirm) {
      setError("Please fill in all fields.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Registration failed.");
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

  return (
    <div className="container-app py-16 max-w-md mx-auto">
      <div className="text-center mb-8">
        <Compass className="mx-auto text-[var(--color-primary)] mb-2" size={32} />
        <h1 className="text-2xl font-extrabold">Create your account</h1>
        <p className="text-gray-500 text-sm mt-1">Join Wanderly to book and list tours.</p>
      </div>

      <form onSubmit={submit} className="card-base p-6 space-y-4">
        {error && (
          <div className="flex items-center gap-2 bg-red-50 text-red-600 text-sm p-3 rounded-lg">
            <AlertCircle size={16} /> {error}
          </div>
        )}
        <div>
          <label className="text-xs font-semibold text-gray-500 block mb-1.5">Full Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[var(--color-primary)]" placeholder="Jane Traveler" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 block mb-1.5">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[var(--color-primary)]" placeholder="you@example.com" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 block mb-1.5">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[var(--color-primary)]" placeholder="At least 6 characters" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 block mb-1.5">Confirm Password</label>
          <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[var(--color-primary)]" placeholder="Repeat password" />
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
          {loading ? "Creating account..." : "Sign up"}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Already have an account? <Link href="/login" className="text-[var(--color-primary)] font-semibold">Log in</Link>
      </p>
    </div>
  );
}
