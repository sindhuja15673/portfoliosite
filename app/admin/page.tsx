"use client";

import { useState } from "react";

export default function AdminPage() {
  const [images, setImages] = useState<string[]>([]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));

    setImages((prev) => [...prev, ...imageUrls]);
  };

  return (
    <div className="min-h-screen px-6 py-16">
      <h1 className="text-3xl mb-10 tracking-[-0.04em]">
        Admin Panel
      </h1>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleUpload}
        className="mb-10"
      />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt="uploaded"
            className="w-full h-auto object-cover"
          />
        ))}
      </div>
    </div>
  );
}