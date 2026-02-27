// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

// Initialize Supabase client with service role key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, message } = body;

    // 1️⃣ Validate fields
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // 2️⃣ Save to Supabase
    const { error } = await supabase.from("leads").insert([
      {
        first_name: firstName,
        last_name: lastName,
        email,
        message,
      },
    ]);

    if (error) {
      console.error("Supabase insert error:", error.message);
      return NextResponse.json(
        { error: "Failed to save data. Check table name!" },
        { status: 500 }
      );
    }

    // 3️⃣ Send email to Admin
    await resend.emails.send({
      from: "Website <onboarding@resend.dev>", // Change after verifying domain
      to: process.env.ADMIN_EMAIL!,
      subject: "New Contact Form Submission",
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    // 4️⃣ Optional: Send confirmation email to user
    await resend.emails.send({
      from: "Your Company <onboarding@resend.dev>",
      to: email,
      subject: "We Received Your Message",
      html: `
        <h2>Hi ${firstName},</h2>
        <p>Thank you for contacting us. We received your message and will respond soon.</p>
        <p><strong>Your Message:</strong></p>
        <p>${message}</p>
        <br/>
        <p>Best regards,<br/>Your Company Team</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Email/API error:", err);
    return NextResponse.json(
      { error: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}