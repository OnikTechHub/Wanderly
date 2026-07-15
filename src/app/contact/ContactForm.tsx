"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function update(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in your name, email, and message.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <div className="card-base p-8 text-center">
        <CheckCircle2 className="mx-auto text-[var(--color-secondary)] mb-3" size={32} />
        <h2 className="font-bold text-lg mb-1">Message sent</h2>
        <p className="text-sm text-gray-500">Thanks, {form.name.split(" ")[0]}! We&apos;ll get back to you at {form.email} soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card-base p-6 space-y-4">
      {error && (
        <div className="flex items-center gap-2 bg-red-50 text-red-600 text-sm p-3 rounded-lg">
          <AlertCircle size={16} /> {error}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-gray-500 block mb-1.5">Name</label>
          <input value={form.name} onChange={(e) => update("name", e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none" placeholder="Your name" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 block mb-1.5">Email</label>
          <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none" placeholder="you@example.com" />
        </div>
      </div>
      <div>
        <label className="text-xs font-semibold text-gray-500 block mb-1.5">Subject</label>
        <input value={form.subject} onChange={(e) => update("subject", e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none" placeholder="What's this about?" />
      </div>
      <div>
        <label className="text-xs font-semibold text-gray-500 block mb-1.5">Message</label>
        <textarea value={form.message} onChange={(e) => update("message", e.target.value)} rows={5} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none" placeholder="Tell us how we can help" />
      </div>
      <button type="submit" className="btn-primary w-full">Send Message</button>
    </form>
  );
}
