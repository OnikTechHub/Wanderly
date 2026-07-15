# Wanderly — Full-Stack Tour Booking Platform

A production-ready full-stack TypeScript app built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**, satisfying the SCIC-13 Assignment 3 requirements.

## Tech Stack
- Frontend: Next.js 16, React 19, TypeScript, Tailwind CSS v4, Recharts, lucide-react
- Backend: Next.js API Routes (Node runtime), TypeScript
- Data: Local JSON files (`data/tours.json`, `data/users.json`) acting as a lightweight "static data" store — no external DB/network service required, works fully offline
- Auth: JWT stored in an HTTP-only cookie, passwords hashed with bcrypt

## Getting Started
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Demo Login
- Email: `demo@wanderly.com`
- Password: `demo1234`
(Or click "Use Demo Login" on the /login page to auto-fill.)

## Pages
- `/` — Home with hero + 8 sections (features, categories, popular tours, stats, testimonials, blog, FAQ, newsletter)
- `/explore` — Search, filter (category/price/rating), sort, pagination, skeleton loaders
- `/tours/[id]` — Tour details with gallery, itinerary, related tours
- `/login`, `/register` — Auth with validation
- `/items/add` — Protected: add a tour (redirects to /login if logged out)
- `/items/manage` — Protected: table of all tours with View/Delete actions
- `/dashboard` — Protected: stats + chart
- `/about`, `/contact`, `/blog`, `/help`, `/privacy` — Additional pages

## Notes
- Data persists to the JSON files on disk while the dev/prod server runs.
- To reset demo data, restore `data/tours.json` and `data/users.json` from git history.
