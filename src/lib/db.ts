import { Tour } from "./types";
import { API_URL } from "./api";


export async function getTours(): Promise<Tour[]> {
  const res = await fetch(`${API_URL}/api/tours`, { cache: "no-store" });
  if (!res.ok) return [];
  const data = await res.json();
  return data.tours as Tour[];
}

export async function getTourById(id: string): Promise<Tour | undefined> {
  const res = await fetch(`${API_URL}/api/tours/${id}`, { cache: "no-store" });
  if (!res.ok) return undefined;
  const data = await res.json();
  return data.tour as Tour;
}
