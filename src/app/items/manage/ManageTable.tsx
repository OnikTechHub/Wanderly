"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, Trash2 } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { Tour } from "@/lib/types";

export default function ManageTable({ initialTours }: { initialTours: Tour[] }) {
  const [tours, setTours] = useState(initialTours);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm("Delete this tour permanently?")) return;
    setBusyId(id);
    const res = await apiFetch(`/api/tours/${id}`, { method: "DELETE" });
    if (res.ok) {
      setTours((t) => t.filter((tour) => tour.id !== id));
    }
    setBusyId(null);
  }

  if (tours.length === 0) {
    return <div className="card-base p-10 text-center text-gray-500">No tours yet. Add your first one from the &ldquo;Add Tour&rdquo; page.</div>;
  }

  return (
    <div className="card-base overflow-x-auto">
      <table className="w-full text-sm min-w-[640px]">
        <thead className="bg-gray-50 text-gray-500 text-left">
          <tr>
            <th className="p-4 font-semibold">Tour</th>
            <th className="p-4 font-semibold">Category</th>
            <th className="p-4 font-semibold">Price</th>
            <th className="p-4 font-semibold">Date</th>
            <th className="p-4 font-semibold">Rating</th>
            <th className="p-4 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tours.map((t) => (
            <tr key={t.id} className="border-t border-gray-100">
              <td className="p-4 flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                  <Image src={t.images[0]} alt={t.title} fill className="object-cover" />
                </div>
                <span className="font-medium line-clamp-1">{t.title}</span>
              </td>
              <td className="p-4 text-gray-500">{t.category}</td>
              <td className="p-4 font-medium">${t.price}</td>
              <td className="p-4 text-gray-500">{new Date(t.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td>
              <td className="p-4 text-gray-500">{t.rating > 0 ? t.rating.toFixed(1) : "—"}</td>
              <td className="p-4">
                <div className="flex items-center justify-end gap-3">
                  <Link href={`/tours/${t.id}`} className="text-[var(--color-primary)] flex items-center gap-1 text-xs font-semibold">
                    <Eye size={14} /> View
                  </Link>
                  <button
                    onClick={() => handleDelete(t.id)}
                    disabled={busyId === t.id}
                    className="text-red-500 flex items-center gap-1 text-xs font-semibold disabled:opacity-50"
                  >
                    <Trash2 size={14} /> {busyId === t.id ? "..." : "Delete"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
