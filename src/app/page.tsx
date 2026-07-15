import Link from "next/link";
import Image from "next/image";
import {
  Compass, ShieldCheck, Wallet, Users, Star, ArrowRight,
  Mountain, Waves, Building2, Trees, Sun, Landmark,
} from "lucide-react";
import { getTours } from "@/lib/db";
import TourCard from "@/components/TourCard";

export default function Home() {
  const tours = getTours();
  const popular = [...tours].sort((a, b) => b.rating - a.rating).slice(0, 4);

  const categories = [
    { name: "Mountain", icon: Mountain, count: tours.filter((t) => t.category === "Mountain").length },
    { name: "Beach", icon: Waves, count: tours.filter((t) => t.category === "Beach").length },
    { name: "City", icon: Building2, count: tours.filter((t) => t.category === "City").length },
    { name: "Forest", icon: Trees, count: tours.filter((t) => t.category === "Forest").length },
    { name: "Desert", icon: Sun, count: tours.filter((t) => t.category === "Desert").length },
    { name: "Cultural", icon: Landmark, count: tours.filter((t) => t.category === "Cultural").length },
  ];

  const stats = [
    { label: "Curated Tours", value: `${tours.length}+` },
    { label: "Countries Covered", value: "20+" },
    { label: "Happy Travelers", value: "12,400+" },
    { label: "Average Rating", value: "4.8/5" },
  ];

  const testimonials = [
    { name: "Priya Nair", trip: "Annapurna Base Camp Trek", quote: "Our guide knew every teahouse owner by name. It felt like traveling with a friend who happened to know the Himalayas inside out." },
    { name: "Daniel Osei", trip: "Sahara Desert Camel Trek", quote: "Watching the sunrise from the top of a dune after a night of stargazing is something I'll be telling people about for years." },
    { name: "Mei Lin", trip: "Kyoto Temples & Bamboo Grove", quote: "Getting to the bamboo grove before the crowds arrived made the whole day feel calm and unhurried." },
  ];

  const blogPosts = [
    { title: "Packing Light for a 10-Day Trek", excerpt: "The exact gear list our Himalayan guides recommend, and what to leave at home.", tag: "Gear" },
    { title: "Best Season to Chase the Northern Lights", excerpt: "A month-by-month breakdown of aurora visibility across Iceland and Norway.", tag: "Planning" },
    { title: "Eating Like a Local in Marrakech", excerpt: "Five dishes to try in the medina that most visitors walk right past.", tag: "Food" },
  ];

  const faqs = [
    { q: "How far in advance should I book a tour?", a: "For multi-day treks and peak-season trips, we recommend booking at least 6-8 weeks ahead. Day tours can often be booked within a few days." },
    { q: "Are flights included in the tour price?", a: "No, tour prices cover the listed itinerary, guiding, and specified meals or accommodation. International flights are booked separately." },
    { q: "What's your cancellation policy?", a: "Full refunds are available up to 14 days before departure. Between 14 and 3 days, a 50% credit is issued toward a future trip." },
    { q: "Do I need travel insurance?", a: "Yes, travel insurance with medical and trip-cancellation coverage is required for all multi-day tours." },
  ];

  return (
    <div>
      {/* HERO */}
      <section className="relative h-[62vh] min-h-[440px] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&q=80"
          alt="Mountain landscape at sunrise"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
        <div className="container-app relative z-10 text-white">
          <p className="uppercase tracking-widest text-xs font-semibold text-amber-300 mb-3">Small groups. Local guides. Real places.</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold max-w-2xl leading-tight">
            Find your next unforgettable journey
          </h1>
          <p className="mt-4 text-gray-200 max-w-lg">
            Handpicked tours across mountains, coastlines, deserts, and cities — led by guides who actually live there.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href="/explore" className="btn-primary flex items-center justify-center gap-2">
              Explore Tours <ArrowRight size={16} />
            </Link>
            <Link href="/about" className="btn-outline bg-white/90 flex items-center justify-center">
              How Wanderly Works
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="container-app py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: ShieldCheck, title: "Vetted Local Guides", desc: "Every guide is certified and reviewed by past travelers before joining Wanderly." },
            { icon: Wallet, title: "No Hidden Fees", desc: "The price you see includes guiding, permits, and the meals listed in the itinerary." },
            { icon: Users, title: "Small Group Sizes", desc: "Most tours cap at 10-16 travelers so it never feels like a tour bus crowd." },
          ].map((f) => (
            <div key={f.title} className="card-base p-6">
              <f.icon className="text-[var(--color-primary)] mb-3" size={28} />
              <h3 className="font-bold mb-1">{f.title}</h3>
              <p className="text-sm text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="bg-gray-50 py-16">
        <div className="container-app">
          <h2 className="text-2xl font-bold mb-1">Browse by Category</h2>
          <p className="text-gray-500 mb-8">Six ways to explore the world, all in one place.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((c) => (
              <Link
                key={c.name}
                href={`/explore?category=${c.name}`}
                className="card-base p-5 flex flex-col items-center text-center gap-2 hover:shadow-lg transition-shadow"
              >
                <c.icon className="text-[var(--color-secondary)]" size={26} />
                <span className="font-semibold text-sm">{c.name}</span>
                <span className="text-xs text-gray-400">{c.count} tours</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR TOURS */}
      <section className="container-app py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-1">Top-Rated Tours</h2>
            <p className="text-gray-500">Loved most by recent travelers.</p>
          </div>
          <Link href="/explore" className="text-sm font-semibold text-[var(--color-primary)] flex items-center gap-1 whitespace-nowrap">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popular.map((t) => (
            <TourCard key={t.id} tour={t} />
          ))}
        </div>
      </section>

      {/* STATISTICS */}
      <section className="py-16" style={{ background: "var(--color-primary)" }}>
        <div className="container-app grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-3xl sm:text-4xl font-extrabold">{s.value}</div>
              <div className="text-sm text-indigo-100 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container-app py-16">
        <h2 className="text-2xl font-bold mb-1">What Travelers Say</h2>
        <p className="text-gray-500 mb-8">Real reviews from real trips.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="card-base p-6 flex flex-col">
              <div className="flex gap-1 text-amber-500 mb-3">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="text-sm text-gray-600 flex-1">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-4 text-sm">
                <div className="font-semibold">{t.name}</div>
                <div className="text-gray-400 text-xs">{t.trip}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BLOG */}
      <section className="bg-gray-50 py-16">
        <div className="container-app">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-1">From the Journal</h2>
              <p className="text-gray-500">Tips and stories from our guides.</p>
            </div>
            <Link href="/blog" className="text-sm font-semibold text-[var(--color-primary)] flex items-center gap-1 whitespace-nowrap">
              Read the blog <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {blogPosts.map((b) => (
              <div key={b.title} className="card-base p-6">
                <span className="text-xs font-semibold text-[var(--color-secondary)] uppercase tracking-wide">{b.tag}</span>
                <h3 className="font-bold mt-2 mb-1.5">{b.title}</h3>
                <p className="text-sm text-gray-500">{b.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-app py-16">
        <h2 className="text-2xl font-bold mb-1">Frequently Asked Questions</h2>
        <p className="text-gray-500 mb-8">Everything you need to know before you book.</p>
        <div className="max-w-2xl space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="card-base p-5 group">
              <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                {f.q}
                <span className="text-[var(--color-primary)] group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="text-sm text-gray-500 mt-3">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* NEWSLETTER / CTA */}
      <section className="py-16" style={{ background: "var(--color-accent)" }}>
        <div className="container-app text-center text-white max-w-xl mx-auto">
          <Compass size={32} className="mx-auto mb-3" />
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">Get trip ideas in your inbox</h2>
          <p className="text-amber-50 mb-6 text-sm">One email a month. New destinations, seasonal deals, no spam.</p>
          <form className="flex flex-col sm:flex-row gap-3 justify-center" action="/contact">
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="rounded-xl px-4 py-3 text-sm text-gray-900 w-full sm:w-72 outline-none"
            />
            <button type="submit" className="bg-white text-[var(--color-primary)] font-semibold rounded-xl px-6 py-3 text-sm hover:opacity-90">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
