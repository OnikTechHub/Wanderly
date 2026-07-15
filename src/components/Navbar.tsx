"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Compass, Menu, X, User as UserIcon } from "lucide-react";
import { apiFetch } from "@/lib/api";

interface CurrentUser {
  userId: string;
  name: string;
  email: string;
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<CurrentUser | null | undefined>(undefined);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    apiFetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => setUser(d.user))
      .catch(() => setUser(null));
  }, [pathname]);

  async function handleLogout() {
    await apiFetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setOpen(false);
    router.push("/");
    router.refresh();
  }

  const loggedOutLinks = [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Explore Tours" },
    { href: "/about", label: "About" },
  ];

  const loggedInLinks = [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Explore Tours" },
    { href: "/items/add", label: "Add Tour" },
    { href: "/items/manage", label: "Manage Tours" },
    { href: "/dashboard", label: "Dashboard" },
  ];

  const links = user ? loggedInLinks : loggedOutLinks;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur border-b border-gray-100">
      <nav className="container-app flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 font-extrabold text-lg" style={{ color: "var(--color-primary)" }}>
          <Compass size={26} />
          Wanderly
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors hover:text-[var(--color-primary)] ${
                pathname === l.href ? "text-[var(--color-primary)]" : "text-gray-700"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {user === undefined ? null : user ? (
            <>
              <span className="flex items-center gap-1.5 text-sm text-gray-600">
                <UserIcon size={16} /> {user.name.split(" ")[0]}
              </span>
              <button onClick={handleLogout} className="btn-outline text-sm">
                Log out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="btn-outline text-sm">
                Log in
              </Link>
              <Link href="/register" className="btn-primary text-sm">
                Sign up
              </Link>
            </>
          )}
        </div>

        <button className="md:hidden" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-5 pb-4">
          <div className="flex flex-col gap-3 pt-3">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm font-medium text-gray-700">
                {l.label}
              </Link>
            ))}
            <hr className="my-1 border-gray-100" />
            {user ? (
              <button onClick={handleLogout} className="btn-outline text-sm text-left w-fit">
                Log out
              </button>
            ) : (
              <div className="flex gap-3">
                <Link href="/login" onClick={() => setOpen(false)} className="btn-outline text-sm">
                  Log in
                </Link>
                <Link href="/register" onClick={() => setOpen(false)} className="btn-primary text-sm">
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
