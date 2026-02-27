"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Booking() {
  const [formData, setFormData] = useState({
    parent_name: "",
    email: "",
    match_date: "",
    match_time: "",
    school_name: "",
    opponent: "",
    court_number: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(formData);
    alert("Booking submitted! (connect to DB next)");
  };

  return (
    <section
      id="booking"
      className="py-20 px-6 bg-gray-100 flex justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-2xl"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          Match Booking Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="parent_name"
            placeholder="Parent Name"
            required
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="date"
            name="match_date"
            required
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="time"
            name="match_time"
            required
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="text"
            name="school_name"
            placeholder="School Name"
            required
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="text"
            name="opponent"
            placeholder="Opponent School"
            required
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="text"
            name="court_number"
            placeholder="Court Number (Optional)"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Submit Booking
          </button>
        </form>
      </motion.div>
    </section>
  );
}