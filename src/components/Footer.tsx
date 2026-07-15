import Link from "next/link";
import { Compass, Mail, Phone, MapPin } from "lucide-react";

function SocialIcon({ path }: { path: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

const ICONS = {
  facebook: "M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z",
  instagram: "M12 2c-2.7 0-3.1 0-4.1.1-1.1.1-1.8.2-2.5.5-.7.3-1.3.6-1.9 1.2-.6.6-.9 1.2-1.2 1.9-.3.7-.4 1.4-.5 2.5C1.7 9.2 1.7 9.6 1.7 12.3s0 3.1.1 4.1c.1 1.1.2 1.8.5 2.5.3.7.6 1.3 1.2 1.9.6.6 1.2.9 1.9 1.2.7.3 1.4.4 2.5.5 1 .1 1.4.1 4.1.1s3.1 0 4.1-.1c1.1-.1 1.8-.2 2.5-.5.7-.3 1.3-.6 1.9-1.2.6-.6.9-1.2 1.2-1.9.3-.7.4-1.4.5-2.5.1-1 .1-1.4.1-4.1s0-3.1-.1-4.1c-.1-1.1-.2-1.8-.5-2.5a5 5 0 0 0-1.2-1.9 5 5 0 0 0-1.9-1.2c-.7-.3-1.4-.4-2.5-.5C15.1 2 14.7 2 12 2zm0 5.4a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8zm0 8a3.2 3.2 0 1 0 0-6.3 3.2 3.2 0 0 0 0 6.3zm6.2-8.2a1.1 1.1 0 1 1-2.3 0 1.1 1.1 0 0 1 2.3 0z",
  twitter: "M18.9 2H22l-7.6 8.7L23.3 22h-7l-5.5-7.2L4.5 22H1.4l8.1-9.3L1 2h7.2l5 6.6L18.9 2zm-1.2 18h1.7L7.4 4h-1.8l12.1 16z",
  youtube: "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.5V8.5l6.3 3.5-6.3 3.5z",
};

export default function Footer() {
  return (
    <footer className="bg-[#12131a] text-gray-300 mt-24">
      <div className="container-app py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <Link href="/" className="flex items-center gap-2 font-extrabold text-lg text-white mb-3">
            <Compass size={22} /> Wanderly
          </Link>
          <p className="text-sm text-gray-400 leading-relaxed">
            Curated adventures and cultural journeys, handpicked from local guides across six continents.
          </p>
          <div className="flex gap-3 mt-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-white">
              <SocialIcon path={ICONS.facebook} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white">
              <SocialIcon path={ICONS.instagram} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-white">
              <SocialIcon path={ICONS.twitter} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-white">
              <SocialIcon path={ICONS.youtube} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 text-sm tracking-wide">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/explore" className="hover:text-white">All Tours</Link></li>
            <li><Link href="/explore?category=Mountain" className="hover:text-white">Mountain Treks</Link></li>
            <li><Link href="/explore?category=Beach" className="hover:text-white">Beach Escapes</Link></li>
            <li><Link href="/blog" className="hover:text-white">Travel Blog</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 text-sm tracking-wide">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white">About Us</Link></li>
            <li><Link href="/help" className="hover:text-white">Help / Support</Link></li>
            <li><Link href="/privacy" className="hover:text-white">Privacy &amp; Terms</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 text-sm tracking-wide">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2"><Mail size={15} /> support@wanderly.com</li>
            <li className="flex items-center gap-2"><Phone size={15} /> +1 (555) 019-2837</li>
            <li className="flex items-center gap-2"><MapPin size={15} /> 48 Harbor Street, Lisbon, Portugal</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <p className="container-app text-xs text-gray-500 text-center">
          © {new Date().getFullYear()} Wanderly Travel Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
