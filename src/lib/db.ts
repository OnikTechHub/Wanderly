import fs from "fs";
import path from "path";
import { Tour, User } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const TOURS_FILE = path.join(DATA_DIR, "tours.json");
const USERS_FILE = path.join(DATA_DIR, "users.json");

function readJson<T>(file: string): T {
  const raw = fs.readFileSync(file, "utf-8");
  return JSON.parse(raw) as T;
}

function writeJson<T>(file: string, data: T) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf-8");
}

export function getTours(): Tour[] {
  return readJson<Tour[]>(TOURS_FILE);
}

export function getTourById(id: string): Tour | undefined {
  return getTours().find((t) => t.id === id);
}

export function addTour(tour: Tour): Tour {
  const tours = getTours();
  tours.unshift(tour);
  writeJson(TOURS_FILE, tours);
  return tour;
}

export function deleteTour(id: string): boolean {
  const tours = getTours();
  const next = tours.filter((t) => t.id !== id);
  const changed = next.length !== tours.length;
  if (changed) writeJson(TOURS_FILE, next);
  return changed;
}

export function getUsers(): User[] {
  return readJson<User[]>(USERS_FILE);
}

export function getUserByEmail(email: string): User | undefined {
  return getUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function getUserById(id: string): User | undefined {
  return getUsers().find((u) => u.id === id);
}

export function addUser(user: User): User {
  const users = getUsers();
  users.push(user);
  writeJson(USERS_FILE, users);
  return user;
}
