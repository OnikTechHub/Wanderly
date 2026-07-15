"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { JwtPayload } from "@/lib/types";

export default function RequireAuth({
  children,
}: {
  children: (user: JwtPayload) => React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<JwtPayload | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let active = true;
    apiFetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        if (!active) return;
        if (d.user) {
          setUser(d.user);
          setChecked(true);
        } else {
          router.replace("/login");
        }
      })
      .catch(() => router.replace("/login"));
    return () => {
      active = false;
    };
  }, [router]);

  if (!checked || !user) {
    return (
      <div className="container-app py-24 text-center text-gray-400 text-sm">
        Checking your session...
      </div>
    );
  }

  return <>{children(user)}</>;
}