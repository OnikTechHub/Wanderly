import { Suspense } from "react";
import { getTours } from "@/lib/db";
import ExploreClient from "./ExploreClient";

export const metadata = { title: "Explore Tours | Wanderly" };

export default async function ExplorePage() {
  const tours = await getTours();
  return (
    <Suspense fallback={<div className="container-app py-10">Loading...</div>}>
      <ExploreClient tours={tours} />
    </Suspense>
  );
}
