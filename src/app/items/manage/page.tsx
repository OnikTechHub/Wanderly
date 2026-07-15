import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getTours } from "@/lib/db";
import ManageTable from "./ManageTable";

export const metadata = { title: "Manage Tours | Wanderly" };

export default async function ManageItemsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const tours = getTours();

  return (
    <div className="container-app py-10">
      <h1 className="text-2xl font-extrabold mb-1">Manage Tours</h1>
      <p className="text-gray-500 mb-8 text-sm">View and remove tour listings across the platform.</p>
      <ManageTable initialTours={tours} />
    </div>
  );
}
