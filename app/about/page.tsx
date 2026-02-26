
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// export default function AboutPage() {
//   return (
//     <>
//       <Navbar />

//       {/* About Section */}
//       <section className="px-6 sm:px-6 lg:px-6 py-[6.6vmax]">
//         <div className="max-w-5xl mx-auto">

//           {/* Big Paragraph */}
//           <p
//             className="
//               font-['Helvetica_Neue',Arial,sans-serif]
//               font-normal
//               tracking-[-0.04em]
//               leading-[1.4]
//               text-[clamp(30px,4.5vw,58px)]
//               mb-10
//             "
//           >
//             I'm a 16 year old sports photographer capturing emotional game
//             moments. I make athletes and teams look their best. Available for
//             games and tournaments.
//           </p>

//           {/* Small Paragraph */}
//           <p
//             className="
//               max-w-2xl
//               font-['Helvetica_Neue',Arial,sans-serif]
//               font-normal
//               leading-[1.3]
//               text-[clamp(16px,1.1vw,18px)]
//             "
//           >
//             I'm also a designer, artist, and fashion designer. I started my own
//             sportswear brand, Vaulted.
//           </p>

//         </div>
//       </section>

//       {/* Contact Section */}
//       <section className="px-6 sm:px-10 lg:px-16 py-[6.6vmax]">
//         <div className="max-w-2xl mx-auto">

//           <div className="border-t border-black/20 pt-16">

//             {/* Contact Heading */}
//             <h2
//               className="
//                 text-center
//                 font-['Helvetica_Neue',Arial,sans-serif]
//                 font-normal
//                 tracking-[-0.04em]
//                 leading-[1.4]
//                 text-[clamp(36px,4.5vw,57px)]
//                 mb-14
//               "
//             >
//               Contact
//             </h2>

            

//             <form className="space-y-5">

//               {/* Name Section */}
//               <div className="space-y-4">
//                 <p className="text-sm uppercase tracking-[0.08em] text-black/60">
//                   Name
//                 </p>

//                 <div className="flex flex-col sm:flex-row gap-[10px]">
//                   <div className="w-full space-y-1">
//                     <label className="text-sm">
//                       First Name <span className="text-black/40">(required)</span>
//                     </label>
//                     <input
//                       type="text"
//                       required
//                       className="w-full border-b border-black pb-1 outline-none bg-transparent"
//                     />
//                   </div>

//                   <div className="w-full space-y-1">
//                     <label className="text-sm">
//                       Last Name <span className="text-black/40">(required)</span>
//                     </label>
//                     <input
//                       type="text"
//                       required
//                       className="w-full border-b border-black pb-1 outline-none bg-transparent"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Email */}
//               <div className="space-y-1">
//                 <label className="text-sm">
//                   Email <span className="text-black/40">(required)</span>
//                 </label>
//                 <input
//                   type="email"
//                   required
//                   className="w-full border-b border-black pb-1 outline-none bg-transparent"
//                 />
//               </div>

//               {/* Message */}
//               <div className="space-y-1">
//                 <label className="text-sm">
//                   Message <span className="text-black/40">(required)</span>
//                 </label>
//                 <textarea
//                   rows={4}
//                   required
//                   className="w-full border-b border-black pb-1 outline-none resize-none bg-transparent"
//                 />
//               </div>

//               {/* Button */}
//               <div className="pt-6 text-center">
//                 <button className="bg-black text-white px-12 py-3 text-sm tracking-wide transition hover:opacity-80">
//                   Send
//                 </button>
//               </div>

//             </form>

//           </div>
//         </div>
//       </section>

//       <Footer />
//     </>
//   );
// }




"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AboutPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    await fetch("/", {
      method: "POST",
      body: formData,
    });

    setLoading(false);
    setSubmitted(true);
    form.reset();
  };

  return (
    <>
      <Navbar />

      {/* About Section */}
      <section className="px-6 py-[6.6vmax]">
        <div className="max-w-5xl mx-auto">
          <p
            className="
              font-['Helvetica_Neue',Arial,sans-serif]
              font-normal
              tracking-[-0.04em]
              leading-[1.4]
              text-[clamp(30px,4.5vw,58px)]
              mb-10
            "
          >
            I'm a 16 year old sports photographer capturing emotional game
            moments. I make athletes and teams look their best. Available for
            games and tournaments.
          </p>

          <p
            className="
              max-w-2xl
              font-['Helvetica_Neue',Arial,sans-serif]
              leading-[1.3]
              text-[clamp(16px,1.1vw,18px)]
            "
          >
            I'm also a designer, artist, and fashion designer. I started my own
            sportswear brand, Vaulted.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="px-6 py-[6.6vmax]">
        <div className="max-w-2xl mx-auto">
          <div className="border-t border-black/20 pt-16">

            <h2
              className="
                text-center
                font-['Helvetica_Neue',Arial,sans-serif]
                font-normal
                tracking-[-0.04em]
                leading-[1.4]
                text-[clamp(36px,4.5vw,57px)]
                mb-14
              "
            >
              Contact
            </h2>

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
                  >
                    {loading ? "Sending..." : "Send"}
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}