
// "use client";

// import { useState, useEffect, useRef } from "react";
// import { supabase } from "@/lib/supabase";

// export default function AdminPage() {
//   const [images, setImages] = useState<any[]>([]);
//   const [uploading, setUploading] = useState(false);
//   const [password, setPassword] = useState("");
//   const [loggedIn, setLoggedIn] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null); // ref to file input

//   // Fetch images
//   const fetchImages = async () => {
//     const { data, error } = await supabase
//       .from("images")
//       .select("*")
//       .order("created_at", { ascending: false });
//     if (error) console.error(error);
//     else setImages(data);
//   };

//   useEffect(() => {
//     if (loggedIn) fetchImages();
//   }, [loggedIn]);

//   // Simple password login
//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (password === "admin") setLoggedIn(true);
//     else alert("Incorrect password");
//   };

//   const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files) return;
//     setUploading(true);

//     const files = Array.from(e.target.files);
//     for (const file of files) {
//       const filePath = `gallery/${Date.now()}-${file.name}`;
//       const { error: uploadError } = await supabase.storage
//         .from("gallery")
//         .upload(filePath, file);

//       if (uploadError) console.error(uploadError);
//       const { data } = supabase.storage.from("gallery").getPublicUrl(filePath);

//       await supabase.from("images").insert([{ url: data.publicUrl, file_path: filePath }]);
//     }

//     setUploading(false);
//     fetchImages();
//   };

//   const handleDelete = async (img: any) => {
//     if (!confirm("Delete this image?")) return;

//     const res = await fetch("/api/admin/actions", {
//       method: "POST",
//       body: JSON.stringify({ action: "delete", filePath: img.file_path, url: img.url }),
//       headers: { "Content-Type": "application/json" },
//     });

//     const result = await res.json();
//     if (result.error) alert(result.error);
//     else setImages(images.filter((i) => i.url !== img.url));
//   };

//   // Trigger hidden file input
//   const handleAddClick = () => {
//     fileInputRef.current?.click();
//   };

//   if (!loggedIn) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <form onSubmit={handleLogin} className="text-center space-y-4">
//           <input
//             type="password"
//             placeholder="Enter password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="border-b pb-1 outline-none"
//             required
//           />
//           <button className="px-4 py-2 bg-black text-white">Login</button>
//         </form>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen px-6 py-16">
//       <h1 className="text-3xl mb-6">Admin Panel</h1>

//       {/* Hidden file input */}
//       <input
//         type="file"
//         multiple
//         accept="image/*"
//         ref={fileInputRef}
//         onChange={handleUpload}
//         className="hidden"
//       />

//       {/* Add Image button */}
//       <button
//         onClick={handleAddClick}
//         className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//       >
//         Add Image
//       </button>

//       {uploading && <p>Uploading...</p>}

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
//         {images.map((img) => (
//           <div key={img.id} className="relative">
//             <img src={img.url} alt="uploaded" className="w-full h-auto object-cover" />
//             <button
//               onClick={() => handleDelete(img)}
//               className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-sm rounded"
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
// "use client";

// import { useState, useEffect, useRef } from "react";
// import { supabase } from "@/lib/supabase";

// export default function AdminPage() {
//   const [images, setImages] = useState<any[]>([]);
//   const [uploading, setUploading] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [position, setPosition] = useState<string>("");

//   // Fetch images ordered by position
//   const fetchImages = async () => {
//     const { data, error } = await supabase
//       .from("images")
//       .select("*")
//       .order("position", { ascending: true });
//     if (error) console.error(error);
//     else setImages(data);
//   };

//   useEffect(() => {
//     fetchImages();
//   }, []);

//   // Trigger hidden file input
//   const handleAddClick = () => fileInputRef.current?.click();

//   // Upload images with position handling
//   // const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   if (!e.target.files) return;
//   //   setUploading(true);

//   //   const files = Array.from(e.target.files);

//   //   for (const file of files) {
//   //     const filePath = `gallery/${Date.now()}-${file.name}`;
//   //     const { error: uploadError } = await supabase.storage
//   //       .from("gallery")
//   //       .upload(filePath, file);
//   //     if (uploadError) {
//   //       console.error(uploadError);
//   //       continue;
//   //     }

//   //     const { data } = supabase.storage.from("gallery").getPublicUrl(filePath);

//   //     // Determine position
//   //     let newPosition: number;
//   //     if (position) {
//   //       newPosition = Number(position);

//   //       // Shift existing images down
//   //       await supabase
//   //         .from("images")
//   //         .update({ position: supabase.raw("position + 1") })
//   //         .gte("position", newPosition);
//   //     } else {
//   //       // Add at the end
//   //       newPosition = images.length > 0 ? images[images.length - 1].position + 1 : 1;
//   //     }

//   //     // Insert new image
//   //     await supabase.from("images").insert([{
//   //       url: data.publicUrl,
//   //       file_path: filePath,
//   //       position: newPosition
//   //     }]);
//   //   }

//   //   setUploading(false);
//   //   setPosition(""); // reset input
//   //   fetchImages();
//   // };
// const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//   if (!e.target.files) return;
//   setUploading(true);

//   const files = Array.from(e.target.files);

//   for (const file of files) {
//     const filePath = `gallery/${Date.now()}-${file.name}`;
//     const { error: uploadError } = await supabase.storage
//       .from("gallery")
//       .upload(filePath, file);

//     if (uploadError) {
//       console.error(uploadError);
//       continue;
//     }

//     const { data } = supabase.storage.from("gallery").getPublicUrl(filePath);

//     // 1️⃣ Fetch all images from DB, ordered by position
//     const { data: allImages, error: fetchError } = await supabase
//       .from("images")
//       .select("*")
//       .order("position", { ascending: true });

//     if (fetchError) console.error(fetchError);

//     let newPosition: number;
//     const desiredPosition = position ? Number(position) : null;

//     if (desiredPosition && allImages) {
//       // If desiredPosition is greater than last position, append at end
//       newPosition =
//         desiredPosition > allImages.length ? allImages.length + 1 : desiredPosition;

//       // Shift existing images at >= newPosition, from largest to smallest
//       const imagesToShift = allImages.filter((img) => img.position >= newPosition)
//         .sort((a, b) => b.position - a.position);

//       for (const img of imagesToShift) {
//         await supabase
//           .from("images")
//           .update({ position: img.position + 1 })
//           .eq("id", img.id);
//       }
//     } else {
//       // No position specified, append at end
//       newPosition = allImages && allImages.length > 0
//         ? allImages[allImages.length - 1].position + 1
//         : 1;
//     }

//     // 2️⃣ Insert new image
//     await supabase.from("images").insert([{
//       url: data.publicUrl,
//       file_path: filePath,
//       position: newPosition
//     }]);
//   }

//   setUploading(false);
//   setPosition(""); // reset input
//   fetchImages();   // reload images
// };
//   // Delete image
//   const handleDelete = async (img: any) => {
//     if (!confirm("Delete this image?")) return;

//     const res = await fetch("/api/admin/actions", {
//       method: "POST",
//       body: JSON.stringify({ action: "delete", filePath: img.file_path, url: img.url }),
//       headers: { "Content-Type": "application/json" },
//     });

//     const result = await res.json();
//     if (result.error) alert(result.error);
//     else fetchImages();
//   };

//   return (
//     <div className="min-h-screen px-6 py-16">
//       <h1 className="text-3xl mb-6">Admin Panel</h1>

//       <input
//         type="file"
//         multiple
//         accept="image/*"
//         ref={fileInputRef}
//         onChange={handleUpload}
//         className="hidden"
//       />

//       <input
//         type="number"
//         placeholder="Position (optional)"
//         value={position}
//         onChange={(e) => setPosition(e.target.value)}
//         className="border-b pb-1 outline-none w-24 mb-2"
//       />

//       <button
//         onClick={handleAddClick}
//         className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//       >
//         Add Image
//       </button>

//       {uploading && <p>Uploading...</p>}

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
//         {images.map((img) => (
//           <div key={img.id} className="relative">
//             <img src={img.url} alt="uploaded" className="w-full h-auto object-cover" />
//             <button
//               onClick={() => handleDelete(img)}
//               className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-sm rounded"
//             >
//               Delete
//             </button>
//             <span className="absolute bottom-2 left-2 bg-black text-white px-2 text-xs rounded">
//               Pos: {img.position}
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
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
    }
  }, [loggedIn]);

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

        const imagesToShift = allImages
          .filter((img) => img.position >= newPosition)
          .sort((a, b) => b.position - a.position);

        for (const img of imagesToShift) {
          await supabase
            .from(table)
            .update({ position: img.position + 1 })
            .eq("id", img.id);
        }
      } else {
        newPosition = maxPosition + 1;
      }

      await supabase.from(table).insert([{
        url: data.publicUrl,
        file_path: filePath,
        position: newPosition
      }]);
    }

    setUploading(false);
    setPosition("");
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

      {/* ------------------- HERO IMAGE UPLOAD ------------------- */}
      <h2 className="text-xl mb-2 font-semibold">Hero Images</h2>
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
// "use client";

// import { useState, useEffect, useRef } from "react";
// import { supabase } from "@/lib/supabase";

// export default function AdminPage() {
//   const [images, setImages] = useState<any[]>([]);
//   const [uploading, setUploading] = useState(false);
//   const [password, setPassword] = useState("");
//   const [loggedIn, setLoggedIn] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [position, setPosition] = useState<string>("");

//   // Fetch images ordered by position
//   const fetchImages = async () => {
//     const { data, error } = await supabase
//       .from("images")
//       .select("*")
//       .order("position", { ascending: true });
//     if (error) console.error(error);
//     else setImages(data);
//   };

//   useEffect(() => {
//     if (loggedIn) fetchImages();
//   }, [loggedIn]);

//   // Simple password login
//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (password === "admin") setLoggedIn(true);
//     else alert("Incorrect password");
//   };

//   // Trigger hidden file input
//   const handleAddClick = () => fileInputRef.current?.click();

//   // Upload images with position handling
//   // const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   if (!e.target.files) return;
//   //   setUploading(true);

//   //   const files = Array.from(e.target.files);

//   //   for (const file of files) {
//   //     const filePath = `gallery/${Date.now()}-${file.name}`;
//   //     const { error: uploadError } = await supabase.storage
//   //       .from("gallery")
//   //       .upload(filePath, file);

//   //     if (uploadError) {
//   //       console.error(uploadError);
//   //       continue;
//   //     }

//   //     const { data } = supabase.storage.from("gallery").getPublicUrl(filePath);

//   //     // Fetch current images from DB
//   //     const { data: allImages, error: fetchError } = await supabase
//   //       .from("images")
//   //       .select("*")
//   //       .order("position", { ascending: true });

//   //     if (fetchError) console.error(fetchError);

//   //     let newPosition: number;
//   //     const desiredPosition = position ? Number(position) : null;

//   //     if (desiredPosition && allImages) {
//   //       // If desiredPosition > last position, append at end
//   //       newPosition = desiredPosition > allImages.length ? allImages.length + 1 : desiredPosition;

//   //       // Shift images >= newPosition (from highest to lowest)
//   //       const imagesToShift = allImages.filter((img) => img.position >= newPosition)
//   //         .sort((a, b) => b.position - a.position);

//   //       for (const img of imagesToShift) {
//   //         await supabase
//   //           .from("images")
//   //           .update({ position: img.position + 1 })
//   //           .eq("id", img.id);
//   //       }
//   //     } else {
//   //       // No position specified, append at end
//   //       newPosition = allImages && allImages.length > 0
//   //         ? allImages[allImages.length - 1].position + 1
//   //         : 1;
//   //     }

//   //     // Insert new image
//   //     await supabase.from("images").insert([{
//   //       url: data.publicUrl,
//   //       file_path: filePath,
//   //       position: newPosition
//   //     }]);
//   //   }

//   //   setUploading(false);
//   //   setPosition(""); // reset input
//   //   fetchImages();   // reload images
//   // };
// const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//   if (!e.target.files) return;
//   setUploading(true);

//   const files = Array.from(e.target.files);

//   for (const file of files) {
//     const filePath = `gallery/${Date.now()}-${file.name}`;
//     const { error: uploadError } = await supabase.storage
//       .from("gallery")
//       .upload(filePath, file);

//     if (uploadError) {
//       console.error(uploadError);
//       continue;
//     }

//     const { data } = supabase.storage.from("gallery").getPublicUrl(filePath);

//     // 1️⃣ Fetch latest images from DB
//     const { data: allImages, error: fetchError } = await supabase
//       .from("images")
//       .select("*")
//       .order("position", { ascending: true });

//     if (fetchError) {
//       console.error(fetchError);
//       continue;
//     }

//     // 2️⃣ Determine the new position
//     const desiredPosition = position ? Number(position) : null;

//     let newPosition: number;

//     const maxPosition = allImages && allImages.length > 0
//       ? Math.max(...allImages.map((img) => img.position))
//       : 0;

//     if (desiredPosition) {
//       // If desired position is higher than max, append at end
//       newPosition = desiredPosition > maxPosition ? maxPosition + 1 : desiredPosition;

//       // Shift images with position >= newPosition, descending
//       const imagesToShift = allImages
//         .filter((img) => img.position >= newPosition)
//         .sort((a, b) => b.position - a.position);

//       for (const img of imagesToShift) {
//         await supabase
//           .from("images")
//           .update({ position: img.position + 1 })
//           .eq("id", img.id);
//       }
//     } else {
//       // No position specified, append at end
//       newPosition = maxPosition + 1;
//     }

//     // 3️⃣ Insert the new image
//     await supabase.from("images").insert([{
//       url: data.publicUrl,
//       file_path: filePath,
//       position: newPosition
//     }]);
//   }

//   setUploading(false);
//   setPosition(""); // reset input
//   fetchImages();   // reload images
// };
//   // Delete image
//   const handleDelete = async (img: any) => {
//     if (!confirm("Delete this image?")) return;

//     const res = await fetch("/api/admin/actions", {
//       method: "POST",
//       body: JSON.stringify({ action: "delete", filePath: img.file_path, url: img.url }),
//       headers: { "Content-Type": "application/json" },
//     });

//     const result = await res.json();
//     if (result.error) alert(result.error);
//     else fetchImages();
//   };

//   // 🔒 Show login if not logged in
//   if (!loggedIn) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <form onSubmit={handleLogin} className="text-center space-y-4">
//           <input
//             type="password"
//             placeholder="Enter admin password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="border-b pb-1 outline-none"
//             required
//           />
//           <button className="px-4 py-2 bg-black text-white rounded">Login</button>
//         </form>
//       </div>
//     );
//   }

//   // 🖼 Admin Panel
//   return (
//     <div className="min-h-screen px-6 py-16">
//       <h1 className="text-3xl mb-6">Admin Panel</h1>

//       <input
//         type="file"
//         multiple
//         accept="image/*"
//         ref={fileInputRef}
//         onChange={handleUpload}
//         className="hidden"
//       />

//       <input
//         type="number"
//         placeholder="Position (optional)"
//         value={position}
//         onChange={(e) => setPosition(e.target.value)}
//         className="border-b pb-1 outline-none w-24 mb-2"
//       />

//       <button
//         onClick={handleAddClick}
//         className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//       >
//         Add Image
//       </button>

//       {uploading && <p>Uploading...</p>}

//       <div className="grid grid-cols-2 md:grid-cols-6 gap-6 mt-6">
//         {images.map((img) => (
//           <div key={img.id} className="relative">
//             <img src={img.url} alt="uploaded" className="w-full h-auto object-cover" />
//             <button
//               onClick={() => handleDelete(img)}
//               className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-sm rounded"
//             >
//               Delete
//             </button>
//             <span className="absolute bottom-2 left-2 bg-black text-white px-2 text-xs rounded">
//               Pos: {img.position}
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }