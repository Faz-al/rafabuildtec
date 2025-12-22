import React from "react";
import { motion } from "framer-motion";
import { Navbar, Footer } from "../components/Layout";


/*
COMPANY PAGE — BOARDROOM GRADE
*/

export default function Company() {
  return (
    <div className="bg-[#EDEEF0] text-[#1F2933] overflow-x-hidden">
      <Navbar />

      <Hero />
      <Identity />
      <Philosophy />
      <VisionMission />
      <OperatingModel />
      <LeadershipPrinciples />
      <div className="bg-[#1F2933]">
          <WhyRafaBuildTec />

  {/* footer separator */}
  <div className="max-w-7xl mx-auto px-12">
        <div className="h-px bg-white/10" />
    </div>

        <Footer />
  </div>

      
    </div>
  );
}

/* ================= HERO ================= */
function Hero() {
  return (
    <section className="pt-60 pb-44">
      <div className="max-w-7xl mx-auto px-12">
        <p className="text-[11px] uppercase tracking-[0.4em] text-[#8A6F4E] mb-8">
          About RafaBuildTec
        </p>

        <h1 className="text-[64px] md:text-[72px] font-light leading-[1.05] max-w-5xl">
          Building certainty
          <br />
          <span className="font-medium">into complex environments</span>
        </h1>

        <p className="mt-12 text-[#4B5563] leading-loose max-w-2xl">
          RafaBuildTec LLP is an execution-driven construction and infrastructure
          firm delivering institutional, commercial, and industrial assets with
          precision, governance, and long-term performance at the core.
        </p>
      </div>
    </section>
  );
}

/* ================= IDENTITY ================= */
function Identity() {
  const sectors = [
    "Healthcare & Institutional",
    "Educational Campuses",
    "Industrial & Logistics",
    "Public Infrastructure",
  ];

  return (
    <section className="py-44 bg-[#E6E8EB]">
      <div className="max-w-7xl mx-auto px-12 grid md:grid-cols-12 gap-28">
        
        {/* LEFT CONTENT */}
        <motion.div
          className="md:col-span-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-[44px] font-light mb-10">
            An execution-first
            <br />
            construction organisation
          </h2>

          <p className="text-[#4B5563] leading-loose mb-6">
            RafaBuildTec operates where predictability matters. Our work is
            designed to stand up to regulation, institutional scrutiny, and
            long-term operational demands.
          </p>

          <p className="text-[#4B5563] leading-loose">
            We don’t chase volume. We build controlled delivery systems that
            prioritise safety, compliance, and asset longevity.
          </p>
        </motion.div>

        {/* RIGHT BOXES */}
        <div className="md:col-span-6 grid grid-cols-2 gap-12">
          {sectors.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: index * 0.18,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="relative bg-[#F7F8FA] rounded-[32px] p-12 shadow-[0_24px_48px_rgba(0,0,0,0.12)] cursor-pointer"
            >
              {/* subtle accent line */}
              <span className="absolute left-0 top-0 h-full w-[3px] bg-[#8A6F4E]/40 rounded-l-[32px]" />

              <p className="text-[18px] font-light leading-snug">
                {item}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}


/* ================= PHILOSOPHY ================= */
function Philosophy() {
  return (
    <section className="py-44">
      <div className="max-w-6xl mx-auto px-12">
        <h3 className="text-[44px] font-light leading-snug max-w-4xl mb-12">
          Architecture defines intent.
          <br />
          Engineering ensures performance.
          <br />
          Execution delivers certainty.
        </h3>

        <p className="text-[#4B5563] leading-loose max-w-3xl">
          Our philosophy is grounded in disciplined planning, transparent
          governance, and execution frameworks that scale across complexity.
        </p>
      </div>
    </section>
  );
}

/* ================= VISION & MISSION ================= */
function VisionMission() {
  return (
    <section className="py-44 bg-[#E6E8EB]">
      <div className="max-w-6xl mx-auto px-12 grid md:grid-cols-2 gap-32">
        {[
          {
            label: "Vision",
            title: "Set the benchmark for execution-led delivery",
            desc:
              "Be recognised as a construction partner known for governance, predictability, and long-term asset value.",
          },
          {
            label: "Mission",
            title: "Deliver complex projects with confidence",
            desc:
              "Execute high-stakes projects through systems-driven planning, uncompromising safety, and quality-led outcomes.",
          },
        ].map((item) => (
          <div key={item.label}>
            <p className="uppercase tracking-widest text-xs text-[#8A6F4E] mb-4">
              {item.label}
            </p>
            <h3 className="text-[38px] font-light mb-8">
              {item.title}
            </h3>
            <p className="text-[#4B5563] leading-loose">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ================= OPERATING MODEL ================= */
function OperatingModel() {
  return (
    <section className="py-48">
      <div className="max-w-7xl mx-auto px-12">
        <h3 className="text-[44px] font-light mb-32">
          Our Operating Model
        </h3>

        <div className="grid md:grid-cols-4 gap-24">
          {[
            "Pre-construction & feasibility",
            "Engineering & controls",
            "Execution & safety systems",
            "Quality assurance & handover",
          ].map((item, i) => (
            <div key={item} className="relative pl-12">
              <span className="absolute left-0 top-0 text-[#8A6F4E] text-sm">
                0{i + 1}
              </span>
              <span className="absolute left-0 top-6 h-full w-[2px] bg-[#8A6F4E]/40" />
              <p className="text-[18px] font-light leading-relaxed mt-6">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= LEADERSHIP ================= */
function LeadershipPrinciples() {
  const principles = [
    {
      title: "Accountability",
      tag: "Ownership & Responsibility",
      desc:
        "Clear ownership at every level. Decisions are documented, reviewed, and carried through to completion without ambiguity.",
      index: "01",
    },
    {
      title: "Discipline",
      tag: "Process & Control",
      desc:
        "Processes, approvals, documentation, and checks are non-negotiable. Discipline is what protects outcomes under pressure.",
      index: "02",
    },
    {
      title: "Long-Term Value",
      tag: "Lifecycle Thinking",
      desc:
        "Every decision is evaluated against durability, compliance, operational efficiency, and life-cycle performance.",
      index: "03",
    },
  ];

  return (
    <section className="py-48 bg-[#EDEEF0]">
      <div className="max-w-7xl mx-auto px-12">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-32"
        >
          <p className="text-[11px] uppercase tracking-[0.35em] text-[#8A6F4E] mb-6">
            Leadership Principles
          </p>
          <h2 className="text-[46px] font-light leading-tight">
            How decisions are made
            <br />
            and upheld
          </h2>
        </motion.div>

        {/* PRINCIPLES */}
        <div className="space-y-28">
          {principles.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="relative grid md:grid-cols-12 gap-16 items-center"
            >
              {/* LEFT INDEX */}
              <div className="md:col-span-2">
                <p className="text-[64px] font-light text-[#8A6F4E]/30">
                  {p.index}
                </p>
              </div>

              {/* CENTER CONTENT */}
              <div className="md:col-span-7">
                <h3 className="text-[32px] font-light mb-4">
                  {p.title}
                </h3>
                <p className="uppercase text-[11px] tracking-[0.35em] text-[#8A6F4E] mb-6">
                  {p.tag}
                </p>
                <p className="text-[#4B5563] leading-loose max-w-2xl">
                  {p.desc}
                </p>
              </div>

              {/* RIGHT VISUAL BLOCK */}
              <div className="md:col-span-3">
                <motion.div
                  whileHover={{ y: -8 }}
                  className="h-[160px] rounded-[28px] bg-gradient-to-br from-[#F7F8FA] to-[#ECEEF2] shadow-[0_24px_48px_rgba(0,0,0,0.14)] flex items-center justify-center"
                >
                  {/* abstract visual */}
                  <div className="w-20 h-20 rounded-full border border-[#8A6F4E]/40 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-[#8A6F4E]/40" />
                  </div>
                </motion.div>
              </div>

              {/* DIVIDER */}
              <div className="absolute bottom-[-56px] left-0 right-0 h-[1px] bg-black/5" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ================= WHY US ================= */
function WhyRafaBuildTec() {
  const reasons = [
    {
      title: "Execution Certainty",
      desc:
        "Projects are planned backwards from delivery risk. Schedules, resources, and controls are aligned to eliminate uncertainty before construction begins.",
      index: "01",
    },
    {
      title: "Regulatory Discipline",
      desc:
        "Statutory approvals, audits, documentation, and compliance frameworks are embedded into our delivery process — not treated as afterthoughts.",
      index: "02",
    },
    {
      title: "Institutional Governance",
      desc:
        "Decision-making follows defined authority matrices, review cycles, and accountability systems suitable for enterprises and public institutions.",
      index: "03",
    },
    {
      title: "Life-Cycle Thinking",
      desc:
        "We evaluate every design and execution decision against durability, maintainability, and long-term operational performance.",
      index: "04",
    },
  ];

  return (
      <section className="pt-24 pb-16 bg-[#1F2933] text-white relative overflow-hidden">

      {/* subtle background grid */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative max-w-7xl mx-auto px-12">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-36"
        >
          <p className="text-[11px] uppercase tracking-[0.35em] text-[#C9B38C] mb-6">
            Why RafaBuildTec
          </p>
          <h2 className="text-[48px] font-light leading-tight">
            Chosen when outcomes
            <br />
            cannot be compromised
          </h2>
        </motion.div>

        {/* REASONS */}
        <div className="space-y-14">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-12 gap-16 items-center"
            >
              {/* INDEX */}
              <div className="md:col-span-2">
                <p className="text-[64px] font-light text-[#C9B38C]/30">
                  {r.index}
                </p>
              </div>

              {/* CONTENT */}
              <div className="md:col-span-7">
                <h3 className="text-[30px] font-light mb-6">
                  {r.title}
                </h3>
                <p className="text-[#CBD5E1] leading-loose max-w-2xl">
                  {r.desc}
                </p>
              </div>

              {/* INTERACTIVE VISUAL */}
              <div className="md:col-span-3">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="h-[160px] rounded-[32px] border border-white/10 bg-white/5 backdrop-blur flex items-center justify-center"
                >
                  <div className="relative w-20 h-20">
                    <div className="absolute inset-0 rounded-full border border-[#C9B38C]/40 animate-pulse" />
                    <div className="absolute inset-6 rounded-full bg-[#C9B38C]/40" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
