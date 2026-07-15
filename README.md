# Wanderly Frontend (Next.js + TypeScript)

The Wanderly UI, built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**.
This app has **no backend logic of its own** — all data and auth live in a separate
**Node.js + Express** API (see the sibling `wanderly-backend` project) and this app calls it over HTTP.

## Getting Started
1. Start the backend first (in the `wanderly-backend` folder): `npm install && npm start` (runs on :5000)
2. Then, in this folder:
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Environment Variables (`.env.local`)
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```
Points the frontend at the Express backend. Change this if you deploy the backend elsewhere.

## Demo Login
- Email: `demo@wanderly.com`
- Password: `demo1234`
(Or click "Use Demo Login" on the /login page to auto-fill.)

## How it talks to the backend
- `src/lib/api.ts` — shared `API_URL` + `apiFetch()` client-side helper (sends cookies with `credentials: "include"`)
- `src/lib/db.ts` — server-side helpers (`getTours`, `getTourById`) that `fetch()` the Express API from Server Components
- `src/lib/auth.ts` — reads the JWT cookie from the incoming request and calls the backend's `/api/auth/me` to check who's logged in (used to protect `/items/add`, `/items/manage`, `/dashboard`)

## Pages
- `/` — Home with hero + 8 sections
- `/explore` — Search, filter, sort, pagination, skeleton loaders
- `/tours/[id]` — Tour details
- `/login`, `/register` — Auth
- `/items/add`, `/items/manage` — Protected (redirect to /login if logged out)
- `/dashboard` — Protected, stats + chart
- `/about`, `/contact`, `/blog`, `/help`, `/privacy` — Static pages

## Note
Because auth now lives on a separate Express server, **both apps must be running** for
login, adding tours, and protected pages to work. The homepage and tour listings will still
render (empty) if only the frontend is running, since `getTours()` will fail gracefully.
