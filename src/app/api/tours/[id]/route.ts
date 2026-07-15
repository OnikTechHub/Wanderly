import { NextRequest, NextResponse } from "next/server";
import { deleteTour, getTourById } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tour = getTourById(id);
  if (!tour) return NextResponse.json({ error: "Tour not found." }, { status: 404 });
  return NextResponse.json({ tour });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "You must be logged in." }, { status: 401 });
  }
  const { id } = await params;
  const ok = deleteTour(id);
  if (!ok) return NextResponse.json({ error: "Tour not found." }, { status: 404 });
  return NextResponse.json({ ok: true });
}
