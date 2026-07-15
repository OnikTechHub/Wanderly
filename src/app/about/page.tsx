import Image from "next/image";
import { Globe2, HeartHandshake, Leaf } from "lucide-react";

export const metadata = { title: "About | Wanderly" };

export default function AboutPage() {
  return (
    <div>
      <section className="relative h-64 flex items-center">
        <Image src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=80" alt="Travelers on a mountain trail" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="container-app relative z-10 text-white">
          <h1 className="text-3xl sm:text-4xl font-extrabold">About Wanderly</h1>
          <p className="text-gray-200 mt-2 max-w-lg">Connecting curious travelers with the local guides who know a place best.</p>
        </div>
      </section>

      <section className="container-app py-14 max-w-3xl">
        <p className="text-gray-600 leading-relaxed">
          Wanderly started in 2021 with a simple idea: the best trips are led by people who actually live in the places
          you want to see. Instead of building another mass-market booking engine, we work directly with small
          operators and independent guides across 20+ countries, from Himalayan trekking outfits to family-run
          catamaran crews in the Aegean.
        </p>
        <p className="text-gray-600 leading-relaxed mt-4">
          Every tour on our platform is reviewed for safety standards, group size, and guide certification before it
          goes live. We keep groups small on purpose, because the moments that make a trip memorable rarely happen
          in a crowd of forty.
        </p>
      </section>

      <section className="bg-gray-50 py-14">
        <div className="container-app grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: Globe2, title: "20+ Countries", desc: "From the Sahara to the Southern Alps, our network spans six continents." },
            { icon: HeartHandshake, title: "Local First", desc: "Over 90% of tour revenue goes directly to the local guides and operators." },
            { icon: Leaf, title: "Responsible Travel", desc: "We cap group sizes and prioritize operators with clear environmental practices." },
          ].map((v) => (
            <div key={v.title} className="card-base p-6">
              <v.icon className="text-[var(--color-primary)] mb-3" size={26} />
              <h3 className="font-bold mb-1">{v.title}</h3>
              <p className="text-sm text-gray-500">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
