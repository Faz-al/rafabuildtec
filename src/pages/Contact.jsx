import React from "react";
import { motion } from "framer-motion";
import { Navbar, Footer } from "../components/Layout";

/*
CONTACT PAGE — INSTITUTIONAL & BOARDROOM GRADE
DESKTOP LOCKED · MOBILE POLISHED
*/

export default function Contact() {
  return (
    <div className="bg-[#EDEEF0] text-[#1F2933] overflow-x-hidden">
      <Navbar />

      <Hero />
      <ContactGrid />
      <EnquiryForm />

      <Footer />
    </div>
  );
}

/* ================= HERO ================= */
function Hero() {
  return (
    <section className="pt-40 md:pt-60 pb-24 md:pb-44">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <p className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] md:tracking-[0.4em] text-[#8A6F4E] mb-6 md:mb-8">
          Contact
        </p>

        <h1 className="text-[32px] md:text-[72px] font-light leading-tight md:leading-[1.05] max-w-5xl">
          Begin a conversation
          <br />
          <span className="font-medium">with clarity and discretion</span>
        </h1>

        <p className="mt-8 md:mt-12 text-[#4B5563] leading-relaxed md:leading-loose max-w-xl md:max-w-2xl">
          RafaBuildTec engages with institutions, enterprises, and project
          stakeholders where execution certainty, governance, and long-term
          performance are critical.
        </p>
      </div>
    </section>
  );
}

/* ================= CONTACT INFO ================= */
function ContactGrid() {
  const items = [
    { label: "Project Enquiries", value: "projects@rafabuildtec.com" },
    { label: "Institutional Discussions", value: "info@rafabuildtec.com" },
    { label: "Phone", value: "+91 XXX XXX XXXX" },
    { label: "Office", value: "Udupi · Karnataka · India" },
  ];

  return (
    <section className="py-24 md:py-36 bg-[#E6E8EB]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-24">
        {items.map((i, idx) => (
          <motion.div
            key={i.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="relative pl-8 md:pl-12"
          >
            <span className="absolute left-0 top-1 h-full w-[2px] bg-[#8A6F4E]/40" />
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#8A6F4E] mb-3 md:mb-4">
              {i.label}
            </p>
            <p className="text-[16px] md:text-[18px] font-light">
              {i.value}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ================= ENQUIRY FORM ================= */
function EnquiryForm() {
  return (
    <section className="py-28 md:py-48">
      <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24 items-start">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="md:col-span-5"
        >
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-[#8A6F4E] mb-4 md:mb-6">
            Enquiry
          </p>

          <h2 className="text-[28px] md:text-[42px] font-light leading-tight mb-6 md:mb-10">
            Discuss your project
            <br />
            requirements
          </h2>

          <p className="text-[#4B5563] leading-relaxed md:leading-loose max-w-md">
            Share your project details. Our leadership and engineering team will
            review scope, feasibility, timelines, and execution strategy before
            responding.
          </p>

          {/* accent only on desktop */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
            className="hidden md:flex mt-16 w-24 h-24 rounded-full border border-[#8A6F4E]/40 items-center justify-center"
          >
            <div className="w-10 h-10 rounded-full bg-[#8A6F4E]/40 animate-pulse" />
          </motion.div>
        </motion.div>

        {/* FORM */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="md:col-span-7 bg-white rounded-[24px] md:rounded-[36px] p-8 md:p-20 shadow-[0_20px_60px_rgba(0,0,0,0.12)] md:shadow-[0_40px_90px_rgba(0,0,0,0.18)]"
        >
          <form className="space-y-8 md:space-y-10">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <Input label="Full Name" placeholder="Your name" />
              <Input label="Organisation" placeholder="Company / Institution" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <Input label="Email" placeholder="you@email.com" type="email" />
              <Input label="Phone" placeholder="+91" />
            </div>

            <div>
              <Label>Project Type</Label>
              <select className="w-full mt-3 px-6 py-4 rounded-full border border-black/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#8A6F4E]/30">
                <option>Healthcare / Institutional</option>
                <option>Educational Campus</option>
                <option>Industrial / Logistics</option>
                <option>Public Infrastructure</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <Label>Project Overview</Label>
              <textarea
                rows="4"
                placeholder="Brief scope, location, size, timelines..."
                className="w-full mt-3 px-6 py-4 rounded-[20px] md:rounded-[24px] border border-black/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#8A6F4E]/30"
              />
            </div>

            <div className="pt-4 flex flex-col gap-4">
              <button
                type="submit"
                className="w-full sm:w-auto px-10 py-4 rounded-full bg-[#1F2933] text-white text-sm hover:bg-black transition"
              >
                Submit Enquiry
              </button>

              <p className="text-xs text-[#6B7280]">
                All enquiries are handled confidentially.
              </p>
            </div>

          </form>
        </motion.div>
      </div>
    </section>
  );
}

/* ================= FORM PARTS ================= */
function Label({ children }) {
  return (
    <label className="text-xs uppercase tracking-[0.35em] text-[#6B7280]">
      {children}
    </label>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        {...props}
        className="w-full mt-3 px-6 py-4 rounded-full border border-black/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#8A6F4E]/30"
      />
    </div>
  );
}
