export interface Tour {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  date: string; // next available departure date, ISO
  rating: number; // 0-5
  location: string;
  category: "Mountain" | "Beach" | "City" | "Forest" | "Desert" | "Cultural";
  duration: string; // e.g. "5 days / 4 nights"
  groupSize: string; // e.g. "Up to 12 people"
  images: string[];
  highlights: string[];
  itinerary: { day: number; title: string; detail: string }[];
  createdBy: string; // user id
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

export interface PublicUser {
  id: string;
  name: string;
  email: string;
}

export interface JwtPayload {
  userId: string;
  email: string;
  name: string;
}
