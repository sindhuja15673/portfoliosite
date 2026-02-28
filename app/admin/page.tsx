
"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [heroImages, setHeroImages] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const galleryFileRef = useRef<HTMLInputElement>(null);
  const heroFileRef = useRef<HTMLInputElement>(null);

  const [position, setPosition] = useState<string>("");
const [headline, setHeadline] = useState("");
const [subtext, setSubtext] = useState("");
const [ctaText, setCtaText] = useState("");
const [banners, setBanners] = useState<any[]>([]);
const [newBannerText, setNewBannerText] = useState("");


const fetchBanners = async () => {
  const { data, error } = await supabase
    .from("banners")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) console.error(error);
  else setBanners(data || []);
};
  /** -------------------
   * FETCH GALLERY IMAGES
   * ------------------- */
  const fetchGalleryImages = async () => {
    const { data, error } = await supabase
      .from("images")
      .select("*")
      .order("position", { ascending: true });
    if (error) console.error(error);
    else setGalleryImages(data);
  };

  /** -------------------
   * FETCH HERO IMAGES
   * ------------------- */
  const fetchHeroImages = async () => {
    const { data, error } = await supabase
      .from("hero_images")
      .select("*")
      .order("position", { ascending: true });
    if (error) console.error(error);
    else setHeroImages(data);
  };

  useEffect(() => {
    if (loggedIn) {
      fetchGalleryImages();
      fetchHeroImages();
      fetchBanners();
    }
  }, [loggedIn]);


  const handleAddBanner = async () => {
  if (!newBannerText.trim()) return alert("Enter banner text");

  const { error } = await supabase
    .from("banners")
    .insert([{ text: newBannerText }]);

  if (error) console.error(error);
  else {
    setNewBannerText("");
    fetchBanners();
  }
};
const handleDeleteBanner = async (id: number) => {
  if (!confirm("Delete this banner?")) return;

  const { error } = await supabase
    .from("banners")
    .delete()
    .eq("id", id);

  if (error) console.error(error);
  else fetchBanners();
};
  /** -------------------
   * PASSWORD LOGIN
   * ------------------- */
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin") setLoggedIn(true);
    else alert("Incorrect password");
  };

  /** -------------------
   * UPLOAD FUNCTION (Generic)
   * ------------------- */
  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    table: "images" | "hero_images"
  ) => {
    if (!e.target.files) return;
    setUploading(true);

    const files = Array.from(e.target.files);

    for (const file of files) {
      // const filePath = `${table}/${Date.now()}-${file.name}`;
      const folder = table === "hero_images" ? "hero_images" : "gallery";
const filePath = `${folder}/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("gallery")
        .upload(filePath, file);

      if (uploadError) {
        console.error(uploadError);
        continue;
      }

      const { data } = supabase.storage.from("gallery").getPublicUrl(filePath);

      // Fetch latest images
      const { data: allImages, error: fetchError } = await supabase
        .from(table)
        .select("*")
        .order("position", { ascending: true });

      if (fetchError) console.error(fetchError);

      const desiredPosition = position ? Number(position) : null;
      const maxPosition = allImages && allImages.length > 0
        ? Math.max(...allImages.map((img) => img.position))
        : 0;

      let newPosition: number;
      if (desiredPosition) {
        newPosition = desiredPosition > maxPosition ? maxPosition + 1 : desiredPosition;
const safeAllImages = allImages || []; // never null
const imagesToShift = safeAllImages
  .filter((img) => img.position >= newPosition)
  .sort((a, b) => b.position - a.position);
        // const imagesToShift = allImages
        //   .filter((img) => img.position >= newPosition)
        //   .sort((a, b) => b.position - a.position);

        for (const img of imagesToShift) {
          await supabase
            .from(table)
            .update({ position: img.position + 1 })
            .eq("id", img.id);
        }
      } else {
        newPosition = maxPosition + 1;
      }

      // await supabase.from(table).insert([{
      //   url: data.publicUrl,
      //   file_path: filePath,
      //   position: newPosition
      // }]);

//       await supabase.from(table).insert([{
//   url: data.publicUrl,
//   file_path: filePath,
//   position: newPosition,
//   headline: headline,
//   subtext: subtext,
//   cta_text: ctaText
// }]);

if (table === "hero_images") {
  await supabase.from("hero_images").insert([{
    url: data.publicUrl,
    file_path: filePath,
    position: newPosition,
    headline,
    subtext,
    cta_text: ctaText
  }]);
} else {
  await supabase.from("images").insert([{
    url: data.publicUrl,
    file_path: filePath,
    position: newPosition
  }]);
}
    }

    setUploading(false);
    setPosition("");
    setHeadline("");
setSubtext("");
setCtaText("");
    table === "images" ? fetchGalleryImages() : fetchHeroImages();
  };

  /** -------------------
   * DELETE FUNCTION (Generic)
   * ------------------- */
  // const handleDelete = async (img: any, table: "images" | "hero_images") => {
  //   if (!confirm("Delete this image?")) return;

  //   const res = await fetch("/api/admin/actions", {
  //     method: "POST",
  //     body: JSON.stringify({ action: "delete", filePath: img.file_path, url: img.url }),
  //     headers: { "Content-Type": "application/json" },
  //   });

  //   const result = await res.json();
  //   if (result.error) alert(result.error);
  //   else table === "images" ? fetchGalleryImages() : fetchHeroImages();
  // };
  const handleDelete = async (img: any, table: "images" | "hero_images") => {
  if (!confirm("Delete this image?")) return;

  const res = await fetch("/api/admin/actions", {
    method: "POST",
    body: JSON.stringify({ action: "delete", filePath: img.file_path, url: img.url, table }),
    headers: { "Content-Type": "application/json" },
  });

  const result = await res.json();
  if (result.error) alert(result.error);
  else table === "images" ? fetchGalleryImages() : fetchHeroImages();
};

  /** -------------------
   * LOGIN FORM
   * ------------------- */
  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <form onSubmit={handleLogin} className="text-center space-y-4">
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-b pb-1 outline-none"
            required
          />
          <button className="px-4 py-2 bg-black text-white rounded">Login</button>
        </form>
      </div>
    );
  }

  /** -------------------
   * ADMIN PANEL
   * ------------------- */
  return (
    <div className="min-h-screen px-6 py-16">
      <h1 className="text-3xl mb-6">Admin Panel</h1>
      {/* ------------------- BANNERS SECTION ------------------- */}
<h2 className="text-xl mb-2 font-semibold">Current Coverage Banner</h2>

<div className="mb-4">
  <input
    type="text"
    placeholder="Enter banner text..."
    value={newBannerText}
    onChange={(e) => setNewBannerText(e.target.value)}
    className="border-b pb-1 outline-none w-full mb-2"
  />
  <button
    onClick={handleAddBanner}
    className="px-4 py-2 bg-yellow-500 text-black rounded"
  >
    Add Banner
  </button>
</div>

<div className="space-y-2 mb-8">
  {banners.map((banner) => (
    <div
      key={banner.id}
      className="flex justify-between items-center bg-gray-100 p-2 rounded"
    >
      <span>{banner.text}</span>
      <button
        onClick={() => handleDeleteBanner(banner.id)}
        className="bg-red-600 text-white px-2 py-1 text-sm rounded"
      >
        Delete
      </button>
    </div>
  ))}
</div>

      {/* ------------------- HERO IMAGE UPLOAD ------------------- */}
      {/* <h2 className="text-xl mb-2 font-semibold">Hero Images</h2>
      <input
        type="file"
        multiple
        accept="image/*"
        ref={heroFileRef}
        onChange={(e) => handleUpload(e, "hero_images")}
        className="hidden"
      />
      <button
        onClick={() => heroFileRef.current?.click()}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Upload Hero Image
      </button> */}
      {/* ------------------- HERO IMAGE UPLOAD ------------------- */}
<h2 className="text-xl mb-2 font-semibold">Hero Images</h2>

<input
  type="text"
  placeholder="Headline"
  value={headline}
  onChange={(e) => setHeadline(e.target.value)}
  className="border-b pb-1 outline-none mb-2 w-full"
/>

<input
  type="text"
  placeholder="Subtext"
  value={subtext}
  onChange={(e) => setSubtext(e.target.value)}
  className="border-b pb-1 outline-none mb-2 w-full"
/>

{/* <input
  type="text"
  placeholder="CTA Text"
  value={ctaText}
  onChange={(e) => setCtaText(e.target.value)}
  className="border-b pb-1 outline-none mb-2 w-full"
/> */}

<input
  type="file"
  multiple
  accept="image/*"
  ref={heroFileRef}
  onChange={(e) => handleUpload(e, "hero_images")}
  className="hidden"
/>

<button
  onClick={() => heroFileRef.current?.click()}
  className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
>
  Upload Hero Image
</button>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {heroImages.map((img) => (
          <div key={img.id} className="relative">
            <img src={img.url} alt="hero" className="w-full h-64 object-cover rounded" />
            <button
              onClick={() => handleDelete(img, "hero_images")}
              className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-sm rounded"
            >
              Delete
            </button>
            <span className="absolute bottom-2 left-2 bg-black text-white px-2 text-xs rounded">
              Pos: {img.position}
            </span>
          </div>
        ))}
      </div>

      {/* ------------------- GALLERY IMAGE UPLOAD ------------------- */}
      <h2 className="text-xl mb-2 font-semibold">Gallery Images</h2>
      <input
        type="file"
        multiple
        accept="image/*"
        ref={galleryFileRef}
        onChange={(e) => handleUpload(e, "images")}
        className="hidden"
      />
      <input
        type="number"
        placeholder="Position (optional)"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        className="border-b pb-1 outline-none w-24 mb-2"
      />
      <button
        onClick={() => galleryFileRef.current?.click()}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Upload Gallery Image
      </button>
      {uploading && <p>Uploading...</p>}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-6 mt-6">
        {galleryImages.map((img) => (
          <div key={img.id} className="relative">
            <img src={img.url} alt="uploaded" className="w-full h-auto object-cover" />
            <button
              onClick={() => handleDelete(img, "images")}
              className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-sm rounded"
            >
              Delete
            </button>
            <span className="absolute bottom-2 left-2 bg-black text-white px-2 text-xs rounded">
              Pos: {img.position}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
