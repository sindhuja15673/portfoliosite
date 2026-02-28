"use client";

import { useState } from "react";


export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);

  const form = e.currentTarget;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.error || "Failed to send email");

    setSubmitted(true);
    form.reset();
  } catch (err: any) {
    console.error("Email send error:", err.message);
    alert("Failed to send message: " + err.message);
  } finally {
    setLoading(false);
  }
};
  return (
    <>
      {/* <Navbar /> */}

      {/* About Section */}
    

      {/* Contact Section */}
      <section id="contact" className="px-6 py-[6.6vmax]">
          <div className="w-full border-t border-black/20 pt-16 max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-10 md:p-14">
          {/* <section
  id="booking"
  className="px-6 py-24 bg-green-50"
>
  <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-10 md:p-14"> */}
        <div className="max-w-2xl mx-auto">

            <h2
              className="
                text-center
                font-['Helvetica_Neue',Arial,sans-serif]
                font-normal
                tracking-[-0.04em]
                leading-[1.4]
                text-[clamp(36px,4.5vw,57px)]
                mb-1
              "
            >
              {/* Book Match Coverage */}
              Reserve your game-day photography.
            </h2>
            <p className="text-center text-black/60 mb-10">
  Reserve your match date below. Limited availability per day.
</p>
{/* <div className="text-sm text-center text-black/50 mb-8 space-y-1">
  <p>✔ 25 high-resolution images</p>
  <p>✔ Delivered within 48 hours</p>
  <p>✔ Private download link</p>
</div> */}
            {submitted ? (
              <div className="text-center space-y-4">
                <h3 className="text-2xl tracking-[-0.04em]">
                  Thank you.
                </h3>
                <p className="text-black/70">
                  Your message has been sent successfully.
                </p>
              </div>
            ) : (

              <form
                name="contact"
                method="POST"
                data-netlify="true"
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* Required hidden input for Netlify */}
                <input type="hidden" name="form-name" value="contact" />

                {/* Name Section */}
                <div className="space-y-4">
                  <p className="text-sm uppercase tracking-[0.08em] text-black/60">
                    Name
                  </p>

                  <div className="flex flex-col sm:flex-row gap-[10px]">
                    <div className="w-full space-y-1">
                      <label className="text-sm">
                        First Name <span className="text-black/40">(required)</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        className="w-full border-b border-black pb-1 outline-none bg-transparent"
                      />
                    </div>

                    <div className="w-full space-y-1">
                      <label className="text-sm">
                        Last Name <span className="text-black/40">(required)</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        className="w-full border-b border-black pb-1 outline-none bg-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col sm:flex-row gap-[10px]">
                <div className="space-y-1">
                  <label className="text-sm">
                    Email <span className="text-black/40">(required)</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full border-b border-black pb-1 outline-none bg-transparent"
                  />
                  
                </div>
                <div className="space-y-1">
                 
                  <label className="text-sm">
                    Phone <span className="text-black/40">(required)</span>
                  </label>
                  <input
                    type="phone"
                    name="phone"
                    required
                    className="w-full border-b border-black pb-1 outline-none bg-transparent"
                  />
                </div>
                </div>
                {/* Match Details */}
<div className="space-y-6 pt-6">
  <p className="text-sm uppercase tracking-[0.08em] text-black/60">
    Match Details
  </p>

  {/* Date & Time */}
  <div className="flex flex-col sm:flex-row gap-6">
    <div className="w-full space-y-1">
      <label className="text-sm">
        Match Date <span className="text-black/40">(required)</span>
      </label>
      <input
        type="date"
        name="matchDate"
        required
        className="w-full border-b border-black pb-1 outline-none bg-transparent"
      />
    </div>

    <div className="w-full space-y-1">
      <label className="text-sm">
        Match Time <span className="text-black/40">(required)</span>
      </label>
      <input
        type="time"
        name="matchTime"
        required
        className="w-full border-b border-black pb-1 outline-none bg-transparent"
      />
    </div>
  </div>

  {/* School & Opponent */}
  <div className="flex flex-col sm:flex-row gap-6">
    <div className="w-full space-y-1">
      <label className="text-sm">
        School Name <span className="text-black/40">(required)</span>
      </label>
      <input
        type="text"
        name="schoolName"
        required
        className="w-full border-b border-black pb-1 outline-none bg-transparent"
      />
    </div>

    <div className="w-full space-y-1">
      <label className="text-sm">
        Opponent <span className="text-black/40">(required)</span>
      </label>
      <input
        type="text"
        name="opponent"
        required
        className="w-full border-b border-black pb-1 outline-none bg-transparent"
      />
    </div>
  </div>
{/* Number of Photos */}
<div className="space-y-1">
  <label className="text-sm">
    How many photos do you want?{" "}
    <span className="text-black/40">(required)</span>
  </label>
  {/* <input
    type="number"
    name="photoCount"
    min="1"
    required
    className="w-full border-b border-black pb-1 outline-none bg-transparent"
  /> */}
  <select
  name="photoCount"
  required
  className="w-full border-b border-black pb-1 outline-none bg-transparent"
>
  <option value="">Select package</option>
  <option value="25">25 Photos – $20</option>
  <option value="40">40 Photos – $30</option>
</select>
</div>

{/* Game Address */}
<div className="space-y-1">
  <label className="text-sm">
    Game Address (Street, City, State, Zipcode){" "}
    <span className="text-black/40">(required)</span>
  </label>
  <textarea
    name="gameAddress"
    rows={2}
    required
    className="w-full border-b border-black pb-1 outline-none resize-none bg-transparent"
  />
</div>
  {/* Court Number */}
  <div className="space-y-1">
    <label className="text-sm">
      Court Number <span className="text-black/40">(optional)</span>
    </label>
    <input
      type="text"
      name="courtNumber"
      className="w-full border-b border-black pb-1 outline-none bg-transparent"
    />
  </div>
</div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="text-sm">
                    Message <span className="text-black/40">(required)</span>
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    className="w-full border-b border-black pb-1 outline-none resize-none bg-transparent"
                  />
                </div>

                {/* Button */}
                <div className="pt-6 text-center">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-black text-white px-12 py-3 text-sm tracking-wide transition hover:opacity-80 disabled:opacity-50"
                    // className="bg-green-600 hover:bg-green-700 text-white px-14 py-4 text-base font-semibold rounded-lg transition disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Reserve Match Coverage"}
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      </section>

    </>
  );
}