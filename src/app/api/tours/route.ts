import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import { addTour, getTours } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { Tour } from "@/lib/types";

export async function GET() {
  const tours = getTours();
  return NextResponse.json({ tours });
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "You must be logged in to add a tour." }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, shortDescription, fullDescription, price, date, location, category, duration, groupSize, imageUrl } = body;

    if (!title || !shortDescription || !fullDescription || !price || !date || !location || !category) {
      return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 });
    }

    const tour: Tour = {
      id: `t-${uuid()}`,
      title,
      shortDescription,
      fullDescription,
      price: Number(price),
      date,
      rating: 0,
      location,
      category,
      duration: duration || "Flexible",
      groupSize: groupSize || "Contact for details",
      images: imageUrl ? [imageUrl] : ["https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80"],
      highlights: [],
      itinerary: [],
      createdBy: user.userId,
      createdAt: new Date().toISOString(),
    };

    addTour(tour);
    return NextResponse.json({ tour }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
