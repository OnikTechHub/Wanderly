import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { getTours } from "@/lib/db";
import DashboardCharts from "./DashboardCharts";

export const metadata = { title: "Dashboard | Wanderly" };

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const tours = getTours();
  const myTours = tours.filter((t) => t.createdBy === user.userId);

  const byCategory = ["Mountain", "Beach", "City", "Forest", "Desert", "Cultural"].map((c) => ({
    name: c,
    value: tours.filter((t) => t.category === c).length,
  }));

  return (
    <div className="container-app py-10">
      <h1 className="text-2xl font-extrabold mb-1">Welcome back, {user.name.split(" ")[0]}</h1>
      <p className="text-gray-500 mb-8 text-sm">Here&apos;s a snapshot of the Wanderly catalog.</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Total Tours", value: tours.length },
          { label: "Your Listings", value: myTours.length },
          { label: "Avg. Price", value: `$${Math.round(tours.reduce((s, t) => s + t.price, 0) / tours.length)}` },
          { label: "Avg. Rating", value: (tours.reduce((s, t) => s + t.rating, 0) / tours.length).toFixed(1) },
        ].map((s) => (
          <div key={s.label} className="card-base p-5">
            <div className="text-2xl font-extrabold text-[var(--color-primary)]">{s.value}</div>
            <div className="text-xs text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <DashboardCharts byCategory={byCategory} />

      <div className="flex gap-3 mt-10">
        <Link href="/items/add" className="btn-primary">Add a Tour</Link>
        <Link href="/items/manage" className="btn-outline">Manage Tours</Link>
      </div>
    </div>
  );
}
