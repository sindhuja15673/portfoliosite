// import { NextRequest, NextResponse } from "next/server";
// import { createClient } from "@supabase/supabase-js";

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_ROLE_KEY! // server-side only
// );

// export async function POST(req: NextRequest) {
//   const { action, filePath, file, url } = await req.json();

//   try {
//     if (action === "delete") {
//       // 1️⃣ Delete from Storage
//       const { error: storageError } = await supabase.storage
//         .from("gallery")
//         .remove([filePath]);

//       if (storageError) return NextResponse.json({ error: storageError.message });

//       // 2️⃣ Delete from Database
//       const { error: dbError } = await supabase
//         .from("images")
//         .delete()
//         .eq("url", url);

//       if (dbError) return NextResponse.json({ error: dbError.message });

//       return NextResponse.json({ success: true });
//     }

//     return NextResponse.json({ error: "Invalid action" });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message });
//   }
// }
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const { action, filePath, url, table } = await req.json();

  try {
    if (action === "delete") {
      // Determine storage folder based on table
      const folder = table === "hero_images" ? "hero" : "gallery";

      // Delete from Storage
      const { error: storageError } = await supabase.storage
        .from(folder)
        .remove([filePath]);

      if (storageError) return NextResponse.json({ error: storageError.message });

      // Delete from Database
      const { error: dbError } = await supabase
        .from(table)
        .delete()
        .eq("url", url);

      if (dbError) return NextResponse.json({ error: dbError.message });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
// import { NextRequest, NextResponse } from "next/server";
// import { createClient } from "@supabase/supabase-js";

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_ROLE_KEY!
// );

// export async function POST(req: NextRequest) {
//   const { action, filePath, url } = await req.json();

//   try {
//     if (action === "delete") {
//       // Delete from Storage
//       const { error: storageError } = await supabase.storage
//         .from("gallery")
//         .remove([filePath]);
//       if (storageError) return NextResponse.json({ error: storageError.message });

//       // Delete from DB
//       const { error: dbError } = await supabase
//         .from("images")
//         .delete()
//         .eq("url", url);
//       if (dbError) return NextResponse.json({ error: dbError.message });

//       return NextResponse.json({ success: true });
//     }

//     return NextResponse.json({ error: "Invalid action" });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message });
//   }
// }