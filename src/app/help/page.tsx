import Link from "next/link";
import { LifeBuoy, Mail } from "lucide-react";

export const metadata = { title: "Help & Support | Wanderly" };

const topics = [
  {
    category: "Booking",
    items: [
      { q: "How do I reserve a tour?", a: "Open any tour's details page and select \"Reserve This Trip.\" You'll need an account to complete a booking." },
      { q: "Can I change my departure date after booking?", a: "Yes, date changes are free up to 30 days before departure, subject to availability on the new date." },
    ],
  },
  {
    category: "Account",
    items: [
      { q: "I forgot my password. What do I do?", a: "Use the demo login on the login page for testing, or contact support@wanderly.com to reset a real account." },
      { q: "How do I list my own tour?", a: "Create an account, then visit the \"Add Tour\" page from the navigation bar once logged in." },
    ],
  },
  {
    category: "Payments",
    items: [
      { q: "What payment methods are accepted?", a: "We accept all major credit cards and popular digital wallets at checkout." },
      { q: "When am I charged?", a: "A deposit is charged at booking, with the balance due 30 days before departure." },
    ],
  },
];

export default function HelpPage() {
  return (
    <div className="container-app py-14">
      <div className="text-center max-w-lg mx-auto mb-12">
        <LifeBuoy className="mx-auto text-[var(--color-primary)] mb-3" size={32} />
        <h1 className="text-3xl font-extrabold mb-2">Help &amp; Support</h1>
        <p className="text-gray-500">Answers to common questions, organized by topic.</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-8">
        {topics.map((t) => (
          <div key={t.category}>
            <h2 className="font-bold text-lg mb-3">{t.category}</h2>
            <div className="space-y-3">
              {t.items.map((item) => (
                <details key={item.q} className="card-base p-5 group">
                  <summary className="font-semibold cursor-pointer list-none flex justify-between items-center text-sm">
                    {item.q}
                    <span className="text-[var(--color-primary)] group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="text-sm text-gray-500 mt-3">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-2xl mx-auto card-base p-6 mt-10 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <Mail className="text-[var(--color-primary)]" size={20} />
          <div>
            <div className="font-semibold text-sm">Still need help?</div>
            <div className="text-sm text-gray-500">Our support team replies within one business day.</div>
          </div>
        </div>
        <Link href="/contact" className="btn-primary text-sm">Contact Us</Link>
      </div>
    </div>
  );
}
