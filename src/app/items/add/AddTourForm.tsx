"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { apiFetch } from "@/lib/api";

const CATEGORIES = ["Mountain", "Beach", "City", "Forest", "Desert", "Cultural"];

export default function AddTourForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "", shortDescription: "", fullDescription: "",
    price: "", date: "", location: "", category: "Mountain",
    duration: "", groupSize: "", imageUrl: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  function update(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!form.title || !form.shortDescription || !form.fullDescription || !form.price || !form.date || !form.location) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await apiFetch("/api/tours", {
        method: "POST",
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to add tour.");
        setLoading(false);
        return;
      }
      setSuccess(true);
      setTimeout(() => router.push(`/tours/${data.tour.id}`), 900);
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="card-base p-6 space-y-4">
      {error && (
        <div className="flex items-center gap-2 bg-red-50 text-red-600 text-sm p-3 rounded-lg">
          <AlertCircle size={16} /> {error}
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 text-sm p-3 rounded-lg">
          <CheckCircle2 size={16} /> Tour added! Redirecting...
        </div>
      )}

      <div>
        <label className="text-xs font-semibold text-gray-500 block mb-1.5">Title *</label>
        <input value={form.title} onChange={(e) => update("title", e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none" placeholder="e.g. Coastal Cliffs Hiking Weekend" />
      </div>
      <div>
        <label className="text-xs font-semibold text-gray-500 block mb-1.5">Short Description *</label>
        <input value={form.shortDescription} onChange={(e) => update("shortDescription", e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none" placeholder="One sentence summary shown on cards" />
      </div>
      <div>
        <label className="text-xs font-semibold text-gray-500 block mb-1.5">Full Description *</label>
        <textarea value={form.fullDescription} onChange={(e) => update("fullDescription", e.target.value)} rows={4} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none" placeholder="Detailed overview of the tour experience" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-gray-500 block mb-1.5">Price (USD) *</label>
          <input type="number" min={0} value={form.price} onChange={(e) => update("price", e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none" placeholder="150" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 block mb-1.5">Departure Date *</label>
          <input type="date" value={form.date} onChange={(e) => update("date", e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-gray-500 block mb-1.5">Location *</label>
          <input value={form.location} onChange={(e) => update("location", e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none" placeholder="City, Country" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 block mb-1.5">Category *</label>
          <select value={form.category} onChange={(e) => update("category", e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none">
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-gray-500 block mb-1.5">Duration</label>
          <input value={form.duration} onChange={(e) => update("duration", e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none" placeholder="e.g. 3 days / 2 nights" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 block mb-1.5">Group Size</label>
          <input value={form.groupSize} onChange={(e) => update("groupSize", e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none" placeholder="e.g. Up to 10 people" />
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-gray-500 block mb-1.5">Image URL (optional)</label>
        <input value={form.imageUrl} onChange={(e) => update("imageUrl", e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none" placeholder="https://..." />
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
        {loading ? "Publishing..." : "Submit Tour"}
      </button>
    </form>
  );
}
