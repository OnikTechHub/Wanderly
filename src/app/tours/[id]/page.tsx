import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Star, CalendarDays, Users, Clock, CheckCircle2 } from "lucide-react";
import { getTourById, getTours } from "@/lib/db";
import TourCard from "@/components/TourCard";

export default async function TourDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tour = getTourById(id);
  if (!tour) notFound();

  const related = getTours()
    .filter((t) => t.category === tour.category && t.id !== tour.id)
    .slice(0, 4);

  return (
    <div className="container-app py-10">
      {/* Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        <div className="relative sm:col-span-2 h-72 sm:h-96 rounded-2xl overflow-hidden bg-gray-100">
          <Image src={tour.images[0]} alt={tour.title} fill className="object-cover" priority />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-1 gap-3">
          {(tour.images[1] ? [tour.images[1]] : []).concat(tour.images[2] ? [tour.images[2]] : []).map((img, i) => (
            <div key={i} className="relative h-32 sm:h-[11.5rem] rounded-2xl overflow-hidden bg-gray-100">
              <Image src={img} alt={`${tour.title} photo ${i + 2}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main content */}
        <div className="lg:col-span-2">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 text-[var(--color-primary)]">
            {tour.category}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-3">{tour.title}</h1>
          <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">
            <span className="flex items-center gap-1"><MapPin size={15} /> {tour.location}</span>
            <span className="flex items-center gap-1 text-amber-500 font-medium">
              <Star size={15} fill="currentColor" /> {tour.rating > 0 ? tour.rating.toFixed(1) : "New tour"}
            </span>
            <span className="flex items-center gap-1"><Clock size={15} /> {tour.duration}</span>
            <span className="flex items-center gap-1"><Users size={15} /> {tour.groupSize}</span>
          </div>

          {/* Overview */}
          <section className="mt-8">
            <h2 className="font-bold text-lg mb-2">Overview</h2>
            <p className="text-gray-600 leading-relaxed text-sm">{tour.fullDescription}</p>
          </section>

          {/* Highlights */}
          {tour.highlights.length > 0 && (
            <section className="mt-8">
              <h2 className="font-bold text-lg mb-3">Trip Highlights</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {tour.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle2 size={16} className="text-[var(--color-secondary)] mt-0.5 shrink-0" /> {h}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Key info / specs */}
          <section className="mt-8">
            <h2 className="font-bold text-lg mb-3">Key Information</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Price", value: `$${tour.price}` },
                { label: "Next Departure", value: new Date(tour.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) },
                { label: "Duration", value: tour.duration },
                { label: "Group Size", value: tour.groupSize },
              ].map((k) => (
                <div key={k.label} className="card-base p-4">
                  <div className="text-xs text-gray-400">{k.label}</div>
                  <div className="font-semibold text-sm mt-1">{k.value}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Itinerary as reviews/spec substitute */}
          {tour.itinerary.length > 0 && (
            <section className="mt-8">
              <h2 className="font-bold text-lg mb-3">Itinerary</h2>
              <div className="space-y-4">
                {tour.itinerary.map((it) => (
                  <div key={it.day} className="flex gap-4">
                    <div className="w-9 h-9 rounded-full bg-indigo-50 text-[var(--color-primary)] text-sm font-bold flex items-center justify-center shrink-0">
                      {it.day}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{it.title}</div>
                      <div className="text-sm text-gray-500">{it.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Booking sidebar */}
        <aside className="lg:col-span-1">
          <div className="card-base p-6 sticky top-24">
            <div className="text-sm text-gray-400">Starting from</div>
            <div className="text-3xl font-extrabold text-[var(--color-primary)]">${tour.price}</div>
            <div className="text-xs text-gray-400 mb-5">per person</div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <CalendarDays size={15} /> Next departure: {new Date(tour.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-5">
              <Users size={15} /> {tour.groupSize}
            </div>
            <button className="btn-primary w-full">Reserve This Trip</button>
            <Link href="/contact" className="btn-outline w-full mt-3 text-center block">
              Ask a Question
            </Link>
          </div>
        </aside>
      </div>

      {/* Related tours */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-bold mb-6">More {tour.category} Tours</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((t) => <TourCard key={t.id} tour={t} />)}
          </div>
        </section>
      )}
    </div>
  );
}
