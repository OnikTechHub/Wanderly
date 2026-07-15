"use client";

import { useEffect, useState } from "react";
import RequireAuth from "@/components/RequireAuth";
import { apiFetch } from "@/lib/api";
import { Tour } from "@/lib/types";
import ManageTable from "./ManageTable";

export default function ManageItemsPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/api/tours")
      .then((r) => r.json())
      .then((d) => setTours(d.tours || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <RequireAuth>
      {() => (
        <div className="container-app py-10">
          <h1 className="text-2xl font-extrabold mb-1">Manage Tours</h1>
          <p className="text-gray-500 mb-8 text-sm">View and remove tour listings across the platform.</p>
          {loading ? (
            <div className="card-base p-10 text-center text-gray-400 text-sm">Loading tours...</div>
          ) : (
            <ManageTable initialTours={tours} />
          )}
        </div>
      )}
    </RequireAuth>
  );
}