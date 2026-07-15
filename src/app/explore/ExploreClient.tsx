"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import { Tour } from "@/lib/types";
import TourCard from "@/components/TourCard";
import SkeletonCard from "@/components/SkeletonCard";

const CATEGORIES = ["All", "Mountain", "Beach", "City", "Forest", "Desert", "Cultural"];
const PAGE_SIZE = 8;

export default function ExploreClient({ tours }: { tours: Tour[] }) {
  const params = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(params.get("category") || "All");
  const [maxPrice, setMaxPrice] = useState(1500);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState("recommended");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    let list = tours.filter((t) => {
      const matchesQuery =
        t.title.toLowerCase().includes(query.toLowerCase()) ||
        t.location.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "All" || t.category === category;
      const matchesPrice = t.price <= maxPrice;
      const matchesRating = t.rating >= minRating;
      return matchesQuery && matchesCategory && matchesPrice && matchesRating;
    });

    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    else if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    else if (sort === "date") list = [...list].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return list;
  }, [tours, query, category, maxPrice, minRating, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function resetPage() {
    setPage(1);
  }

  return (
    <div className="container-app py-10">
      <h1 className="text-2xl sm:text-3xl font-extrabold mb-1">Explore Tours</h1>
      <p className="text-gray-500 mb-6">{filtered.length} tours match your search</p>

      {/* Search bar */}
      <div className="relative mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); resetPage(); }}
          placeholder="Search by tour name or destination..."
          className="w-full card-base pl-10 pr-4 py-3 text-sm outline-none"
        />
      </div>

      {/* Filters */}
      <div className="card-base p-5 mb-8">
        <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-gray-700">
          <SlidersHorizontal size={16} /> Filter &amp; Sort
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div>
            <label className="text-xs font-semibold text-gray-500 block mb-1.5">Category</label>
            <select
              value={category}
              onChange={(e) => { setCategory(e.target.value); resetPage(); }}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none"
            >
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 block mb-1.5">Max Price: ${maxPrice}</label>
            <input
              type="range" min={50} max={1500} step={25}
              value={maxPrice}
              onChange={(e) => { setMaxPrice(Number(e.target.value)); resetPage(); }}
              className="w-full accent-[var(--color-primary)]"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 block mb-1.5">Min Rating: {minRating}+</label>
            <input
              type="range" min={0} max={5} step={0.5}
              value={minRating}
              onChange={(e) => { setMinRating(Number(e.target.value)); resetPage(); }}
              className="w-full accent-[var(--color-primary)]"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 block mb-1.5">Sort by</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none"
            >
              <option value="recommended">Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="date">Soonest Departure</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : paged.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          No tours match your filters. Try widening your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {paged.map((t) => <TourCard key={t.id} tour={t} />)}
        </div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-9 h-9 rounded-lg text-sm font-semibold ${
                page === i + 1 ? "bg-[var(--color-primary)] text-white" : "border border-gray-200 text-gray-600"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
