"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import RequireAuth from "@/components/RequireAuth";
import { apiFetch } from "@/lib/api";
import { Tour } from "@/lib/types";
import DashboardCharts from "./DashboardCharts";

export default function DashboardPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/api/tours")
      .then((r) => r.json())
      .then((d) => setTours(d.tours || []))
      .finally(() => setLoading(false));
  }, []);

  const byCategory = ["Mountain", "Beach", "City", "Forest", "Desert", "Cultural"].map((c) => ({
    name: c,
    value: tours.filter((t) => t.category === c).length,
  }));

  return (
    <RequireAuth>
      {(user) => {
        const myTours = tours.filter((t) => t.createdBy === user.userId);
        return (
          <div className="container-app py-10">
            <h1 className="text-2xl font-extrabold mb-1">Welcome back, {user.name.split(" ")[0]}</h1>
            <p className="text-gray-500 mb-8 text-sm">Here&apos;s a snapshot of the Wanderly catalog.</p>

            {loading ? (
              <div className="card-base p-10 text-center text-gray-400 text-sm">Loading dashboard...</div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                  {[
                    { label: "Total Tours", value: tours.length },
                    { label: "Your Listings", value: myTours.length },
                    { label: "Avg. Price", value: `$${Math.round(tours.reduce((s, t) => s + t.price, 0) / (tours.length || 1))}` },
                    { label: "Avg. Rating", value: (tours.reduce((s, t) => s + t.rating, 0) / (tours.length || 1)).toFixed(1) },
                  ].map((s) => (
                    <div key={s.label} className="card-base p-5">
                      <div className="text-2xl font-extrabold text-[var(--color-primary)]">{s.value}</div>
                      <div className="text-xs text-gray-500 mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>

                <DashboardCharts byCategory={byCategory} />
              </>
            )}

            <div className="flex gap-3 mt-10">
              <Link href="/items/add" className="btn-primary">Add a Tour</Link>
              <Link href="/items/manage" className="btn-outline">Manage Tours</Link>
            </div>
          </div>
        );
      }}
    </RequireAuth>
  );
}