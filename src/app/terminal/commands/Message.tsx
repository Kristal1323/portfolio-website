"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

export default function Message() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        form,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setSent(true);
    } catch (err) {
      console.error(err);
      setError("❌ Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-mono text-green-300 space-y-3"
      >
        <p>✅ Message sent successfully!</p>
        <p className="text-green-400/80 text-sm">
          Kristal will get back to you soon. Thank you!
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="font-mono text-green-300 space-y-4"
    >
      <p className="text-green-400 font-semibold">Opening message prompt...</p>
      <p className="text-green-500/70 text-sm">
        You can send Kristal a message or question directly from here.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
        <div className="flex gap-2">
          <input
            required
            type="text"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            className="bg-transparent border border-green-500/40 rounded px-2 py-1 w-1/2 text-green-100 placeholder-green-500/40 focus:outline-none focus:border-green-400"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            className="bg-transparent border border-green-500/40 rounded px-2 py-1 w-1/2 text-green-100 placeholder-green-500/40 focus:outline-none focus:border-green-400"
          />
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email (optional)"
          value={form.email}
          onChange={handleChange}
          className="bg-transparent border border-green-500/40 rounded px-2 py-1 w-full text-green-100 placeholder-green-500/40 focus:outline-none focus:border-green-400"
        />

        <textarea
          required
          name="message"
          placeholder="Your message or question..."
          rows={4}
          value={form.message}
          onChange={handleChange}
          className="bg-transparent border border-green-500/40 rounded px-2 py-1 w-full text-green-100 placeholder-green-500/40 focus:outline-none focus:border-green-400"
        ></textarea>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`border border-green-400/60 rounded px-3 py-1 hover:bg-green-500/10 transition ${
            loading ? "opacity-70 cursor-wait" : ""
          }`}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </motion.div>
  );
}
