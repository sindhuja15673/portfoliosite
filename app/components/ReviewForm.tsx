"use client";

import { useState } from "react";

export default function ReviewForm({ onSuccess }: any) {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quote, author }),
    });

    if (res.ok) {
      setSubmitted(true);
      setQuote("");
      setAuthor("");
      if (onSuccess) onSuccess();
    }
  };

  if (submitted) {
    return (
      <p className="text-center text-sm text-gray-500">
        Thank you! Your review will appear after approval.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-12 max-w-md mx-auto">
      <input
        type="text"
        placeholder="Your Name"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
        className="w-full border-b border-black pb-1 outline-none"
      />

      <textarea
        placeholder="Write your review..."
        value={quote}
        onChange={(e) => setQuote(e.target.value)}
        required
        className="w-full border-b border-black pb-1 outline-none resize-none"
      />

      <button
        type="submit"
        className="bg-black text-white px-6 py-2 text-sm"
      >
        Submit Review
      </button>
    </form>
  );
}