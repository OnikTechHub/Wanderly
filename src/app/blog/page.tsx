import Image from "next/image";

export const metadata = { title: "Blog | Wanderly" };

const posts = [
  {
    title: "Packing Light for a 10-Day Trek",
    excerpt: "The exact gear list our Himalayan guides recommend, and what to leave at home to keep your pack under 10kg.",
    tag: "Gear",
    date: "June 2, 2026",
    img: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
  },
  {
    title: "Best Season to Chase the Northern Lights",
    excerpt: "A month-by-month breakdown of aurora visibility across Iceland and Norway, plus what the forecast apps don't tell you.",
    tag: "Planning",
    date: "May 18, 2026",
    img: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=800&q=80",
  },
  {
    title: "Eating Like a Local in Marrakech",
    excerpt: "Five dishes to try in the medina that most visitors walk right past, and how to find them without a guide.",
    tag: "Food",
    date: "April 30, 2026",
    img: "https://images.unsplash.com/photo-1489493887464-892be6d1daae?w=800&q=80",
  },
  {
    title: "Is the W Circuit Right for a First-Time Trekker?",
    excerpt: "What to expect from Patagonia's wind, refugio bookings, and daily distances before you commit to the full circuit.",
    tag: "Trekking",
    date: "April 9, 2026",
    img: "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=800&q=80",
  },
  {
    title: "A Beginner's Guide to Reef-Safe Sunscreen",
    excerpt: "Why some sunscreens are banned at popular snorkel sites, and which ingredients to look for instead.",
    tag: "Ocean",
    date: "March 22, 2026",
    img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
  },
  {
    title: "How Our Guides Get Certified",
    excerpt: "A look inside the vetting process every Wanderly guide goes through before leading their first group.",
    tag: "Behind the Scenes",
    date: "March 4, 2026",
    img: "https://images.unsplash.com/photo-1516939884455-1445c8652f83?w=800&q=80",
  },
];

export default function BlogPage() {
  return (
    <div className="container-app py-14">
      <h1 className="text-3xl font-extrabold mb-2">The Wanderly Journal</h1>
      <p className="text-gray-500 mb-10 max-w-lg">Field notes, planning guides, and stories from the guides we work with around the world.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((p) => (
          <article key={p.title} className="card-base overflow-hidden">
            <div className="relative h-44 bg-gray-100">
              <Image src={p.img} alt={p.title} fill className="object-cover" />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                <span className="font-semibold text-[var(--color-secondary)]">{p.tag}</span> · {p.date}
              </div>
              <h2 className="font-bold mb-1.5">{p.title}</h2>
              <p className="text-sm text-gray-500">{p.excerpt}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
