
// "use client";

// import { useState, useEffect } from "react";
// import { supabase } from "@/lib/supabase";

// export default function AdminPage() {
//   const [images, setImages] = useState<any[]>([]);
//   const [uploading, setUploading] = useState(false);
//   const [password, setPassword] = useState("");
//   const [loggedIn, setLoggedIn] = useState(false);

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

//       // Save to DB
//       await supabase.from("images").insert([{ url: data.publicUrl, file_path: filePath }]);
//     }

//     setUploading(false);
//     fetchImages();
//   };

//   const handleDelete = async (img: any) => {
//     if (!confirm("Delete this image?")) return;

//     // Call server API to delete
//     const res = await fetch("/api/admin/actions", {
//       method: "POST",
//       body: JSON.stringify({ action: "delete", filePath: img.file_path, url: img.url }),
//       headers: { "Content-Type": "application/json" },
//     });

//     const result = await res.json();
//     if (result.error) alert(result.error);
//     else setImages(images.filter((i) => i.url !== img.url));
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
//       <h1 className="text-3xl mb-10">Admin Panel</h1>

//       <input type="file" multiple accept="image/*" onChange={handleUpload} />
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
"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const [images, setImages] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null); // ref to file input

  // Fetch images
  const fetchImages = async () => {
    const { data, error } = await supabase
      .from("images")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) console.error(error);
    else setImages(data);
  };

  useEffect(() => {
    if (loggedIn) fetchImages();
  }, [loggedIn]);

  // Simple password login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin") setLoggedIn(true);
    else alert("Incorrect password");
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setUploading(true);

    const files = Array.from(e.target.files);
    for (const file of files) {
      const filePath = `gallery/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("gallery")
        .upload(filePath, file);

      if (uploadError) console.error(uploadError);
      const { data } = supabase.storage.from("gallery").getPublicUrl(filePath);

      await supabase.from("images").insert([{ url: data.publicUrl, file_path: filePath }]);
    }

    setUploading(false);
    fetchImages();
  };

  const handleDelete = async (img: any) => {
    if (!confirm("Delete this image?")) return;

    const res = await fetch("/api/admin/actions", {
      method: "POST",
      body: JSON.stringify({ action: "delete", filePath: img.file_path, url: img.url }),
      headers: { "Content-Type": "application/json" },
    });

    const result = await res.json();
    if (result.error) alert(result.error);
    else setImages(images.filter((i) => i.url !== img.url));
  };

  // Trigger hidden file input
  const handleAddClick = () => {
    fileInputRef.current?.click();
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <form onSubmit={handleLogin} className="text-center space-y-4">
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-b pb-1 outline-none"
            required
          />
          <button className="px-4 py-2 bg-black text-white">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-16">
      <h1 className="text-3xl mb-6">Admin Panel</h1>

      {/* Hidden file input */}
      <input
        type="file"
        multiple
        accept="image/*"
        ref={fileInputRef}
        onChange={handleUpload}
        className="hidden"
      />

      {/* Add Image button */}
      <button
        onClick={handleAddClick}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add Image
      </button>

      {uploading && <p>Uploading...</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
        {images.map((img) => (
          <div key={img.id} className="relative">
            <img src={img.url} alt="uploaded" className="w-full h-auto object-cover" />
            <button
              onClick={() => handleDelete(img)}
              className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-sm rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}