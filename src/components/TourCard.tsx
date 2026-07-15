import Link from "next/link";
import Image from "next/image";
import { Star, MapPin, CalendarDays } from "lucide-react";
import { Tour } from "@/lib/types";

export default function TourCard({ tour }: { tour: Tour }) {
  return (
    <Link
      href={`/tours/${tour.id}`}
      className="card-base flex flex-col h-full overflow-hidden hover:shadow-lg transition-shadow group"
    >
      <div className="relative w-full h-48 overflow-hidden bg-gray-100">
        <Image
          src={tour.images[0]}
          alt={tour.title}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-3 left-3 bg-white/95 text-xs font-semibold px-2.5 py-1 rounded-full text-[var(--color-primary)]">
          {tour.category}
        </span>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-base line-clamp-1">{tour.title}</h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2 flex-1">{tour.shortDescription}</p>

        <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
          <span className="flex items-center gap-1"><MapPin size={13} /> {tour.location.split(",")[0]}</span>
          <span className="flex items-center gap-1"><CalendarDays size={13} /> {new Date(tour.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-1 text-sm font-medium text-amber-500">
            <Star size={15} fill="currentColor" />
            {tour.rating > 0 ? tour.rating.toFixed(1) : "New"}
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-400">from</div>
            <div className="font-bold text-[var(--color-primary)]">${tour.price}</div>
          </div>
        </div>

        <span className="btn-primary text-center text-sm mt-4 w-full">View Details</span>
      </div>
    </Link>
  );
}
