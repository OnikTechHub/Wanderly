"use client";

import RequireAuth from "@/components/RequireAuth";
import AddTourForm from "./AddTourForm";

export default function AddItemPage() {
  return (
    <RequireAuth>
      {() => (
        <div className="container-app py-10 max-w-2xl mx-auto">
          <h1 className="text-2xl font-extrabold mb-1">Add a New Tour</h1>
          <p className="text-gray-500 mb-8 text-sm">Publish a new tour listing for travelers to discover.</p>
          <AddTourForm />
        </div>
      )}
    </RequireAuth>
  );
}