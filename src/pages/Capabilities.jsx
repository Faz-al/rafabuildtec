import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar, Footer } from "../components/Layout";
import { useRef } from "react";

/*
CAPABILITIES PAGE — EXECUTION LED · INSTITUTIONAL · PREMIUM
DESKTOP LOCKED — MOBILE POLISH ONLY
*/

export default function Capabilities() {
  return (
    <div className="bg-[#EDEEF0] text-[#1F2933] overflow-x-hidden">
      <Navbar />

      <Hero />
      <CapabilityIntro />
      <CapabilityDomains />
      <ExecutionFramework />
      <ControlsSection />
      <ClosingStatement />

      <Footer />
    </div>
  );
}

/* ================= HERO ================= */
function Hero() {
  return (
    <section className="pt-40 md:pt-60 pb-24 md:pb-44">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] md:tracking-[0.4em] text-[#8A6F4E] mb-6 md:mb-8"
        >
          Capabilities
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-[34px] md:text-[72px] font-light leading-tight md:leading-[1.05] max-w-5xl"
        >
          Delivery capabilities
          <br />
          <span className="font-medium">engineered for certainty</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-8 md:mt-12 text-[#4B5563] leading-relaxed md:leading-loose max-w-xl md:max-w-2xl"
        >
          RafaBuildTec’s capabilities are structured around execution control,
          regulatory compliance, and predictable outcomes across complex
          institutional environments.
        </motion.p>
      </div>
    </section>
  );
}

/* ================= INTRO ================= */
/* ================= INTRO ================= */
/* ================= INTRO ================= */
function CapabilityIntro() {
  return (
    <section className="py-24 md:py-40 bg-[#E6E8EB]">
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* ================= MOBILE ================= */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="md:hidden text-center"
        >
          <h2 className="text-[24px] font-light leading-snug max-w-[22rem] mx-auto">
            Capabilities are not service lists.
            <br />
            They are delivery systems.
          </h2>

          <p className="mt-6 text-[14px] text-[#4B5563] leading-relaxed max-w-[24rem] mx-auto">
            Each capability reflects how we plan, control, and execute projects
            where regulatory oversight, safety, coordination complexity, and
            long-term performance are critical.
          </p>
        </motion.div>

        {/* ================= DESKTOP (LOCKED) ================= */}
        <div className="hidden md:block">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-[42px] font-light leading-snug max-w-4xl mb-10"
          >
            Capabilities are not service lists.
            <br />
            They are delivery systems.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            viewport={{ once: true }}
            className="text-[#4B5563] leading-loose max-w-3xl"
          >
            Each capability reflects how we plan, control, and execute projects
            where regulatory oversight, safety, coordination complexity, and
            long-term performance are critical.
          </motion.p>
        </div>

      </div>
    </section>
  );
}



/* ================= DOMAINS ================= */
/* ================= DOMAINS ================= */
function CapabilityDomains() {
  const domains = [
    {
      title: "Healthcare & Institutional",
      summary:
        "Hospitals, medical colleges, diagnostic centres with strict regulatory oversight and complex MEP coordination.",
    },
    {
      title: "Educational Campuses",
      summary:
        "Academic and residential campuses delivered under live-environment constraints and phased execution.",
    },
    {
      title: "Industrial & Logistics",
      summary:
        "Manufacturing plants and logistics facilities with heavy civil, structural, and safety-led execution.",
    },
    {
      title: "Public Infrastructure & EPC",
      summary:
        "Government and public-sector works executed with audit-ready documentation and EPC governance.",
    },
  ];

  return (
    <section className="py-20 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-[30px] md:text-[44px] font-light mb-10 md:mb-24"
        >
          Capability domains
        </motion.h3>

        {/* ================= MOBILE ================= */}
        <div className="space-y-6 md:hidden">
          {domains.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              viewport={{ once: true }}
              className="relative pl-5"
            >
              {/* Vertical Accent */}
              <span className="absolute left-0 top-0 h-full w-[2px] bg-[#8A6F4E]/40" />

              <h4 className="text-[17px] font-light mb-1">
                {d.title}
              </h4>

              <p className="text-[13px] text-[#4B5563] leading-relaxed max-w-md">
                {d.summary}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ================= DESKTOP (LOCKED) ================= */}
        <div className="hidden md:grid md:grid-cols-2 gap-x-24 gap-y-20">
          {domains.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="relative bg-[#F7F8FA] rounded-[24px] px-12 py-10 shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
            >
              <span className="absolute left-0 top-0 h-full w-[2px] bg-[#8A6F4E]/40 rounded-l-[24px]" />

              <h4 className="text-[24px] font-light mb-4">
                {d.title}
              </h4>

              <p className="text-[#4B5563] leading-relaxed text-sm max-w-lg">
                {d.summary}
              </p>

              <div className="mt-6 h-[2px] w-14 bg-[#8A6F4E]/40" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ================= EXECUTION ================= */
function ExecutionFramework() {
  const steps = [
    {
      index: "01",
      title: "Pre-Construction",
      desc: "Feasibility, statutory planning, budgeting, sequencing and risk identification.",
    },
    {
      index: "02",
      title: "Engineering & Controls",
      desc: "Design coordination, BOQs, procurement strategy, and programme control.",
    },
    {
      index: "03",
      title: "Execution & Safety",
      desc: "Site execution systems, safety leadership, inspections and progress governance.",
    },
    {
      index: "04",
      title: "Handover & Lifecycle",
      desc: "Testing, commissioning, documentation, and long-term asset readiness.",
    },
  ];

  const railRef = useRef(null);

  // 🔹 Track horizontal scroll of the rail (mobile)
  const { scrollXProgress } = useScroll({
    container: railRef,
  });

  // 🔹 Convert scroll progress → line width
  const mobileLineWidth = useTransform(
    scrollXProgress,
    [0, 1],
    ["0%", "100%"]
  );

  return (
    <section className="py-28 md:py-44 bg-[#E6E8EB] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* ---------- HEADER ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-16 md:mb-28"
        >
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-[#8A6F4E] mb-4 md:mb-6">
            Execution Framework
          </p>
          <h3 className="text-[30px] md:text-[44px] font-light leading-tight">
            How projects move
            <br />
            from intent to delivery
          </h3>
        </motion.div>

        {/* ---------- TIMELINE ---------- */}
        <div className="relative">

          {/* Base line */}
          <div className="absolute top-[22px] left-0 right-0 h-[2px] bg-[#8A6F4E]/25" />

          {/* 🔹 DESKTOP animated line */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 2.6, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="absolute top-[22px] left-0 h-[2px] bg-[#8A6F4E] hidden md:block"
          />

          {/* 🔹 MOBILE scroll-driven line */}
          <motion.div
            style={{ width: mobileLineWidth }}
            className="absolute top-[22px] left-0 h-[2px] bg-[#8A6F4E] md:hidden"
          />

          {/* ---------- STEPS ---------- */}
          <div
            ref={railRef}
            className="
              relative flex gap-16
              overflow-x-auto
              pb-6
              snap-x snap-mandatory
              scrollbar-none
              md:grid md:grid-cols-4 md:gap-24 md:overflow-visible
            "
          >
            {steps.map((s, i) => (
              <div
                key={s.index}
                className="
                  snap-start
                  min-w-[260px]
                  md:min-w-0
                "
              >
                {/* Dot */}
                <span className="absolute top-[15px] h-4 w-4 rounded-full bg-[#8A6F4E]" />

                {/* Content */}
                <div className="mt-14">
                  <p className="text-[26px] md:text-[36px] font-light text-[#8A6F4E]/40 mb-2 md:mb-4">
                    {s.index}
                  </p>
                  <h4 className="text-[18px] md:text-[22px] font-light mb-3">
                    {s.title}
                  </h4>
                  <p className="text-[#4B5563] text-[14px] md:text-sm leading-relaxed md:leading-loose">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}


/* ================= CONTROLS ================= */
function ControlsSection() {
  const items = [
    "Regulatory approvals & statutory compliance",
    "Risk registers & audit-ready documentation",
    "Quality assurance & inspection systems",
    "Health, safety & workforce governance",
  ];

  return (
    <section className="py-28 md:py-44">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <h3 className="text-[30px] md:text-[42px] font-light mb-12 md:mb-20">
          Control systems embedded
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {items.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="relative pl-8 md:pl-12"
            >
              <span className="absolute left-0 top-1 h-full w-[2px] bg-[#8A6F4E]/40" />
              <p className="text-[#4B5563] leading-relaxed md:leading-loose">
                {item}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= CLOSE ================= */
/* ================= CLOSE ================= */
function ClosingStatement() {
  return (
    <section className="py-28 md:py-40 bg-[#1F2933] text-white">
      <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">

        {/* Eyebrow (very subtle authority cue) */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-[10px] uppercase tracking-[0.35em] text-white/50 mb-6"
        >
          Execution Philosophy
        </motion.p>

        {/* Statement */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          viewport={{ once: true }}
          className="
            text-[30px] md:text-[44px]
            font-light
            leading-tight md:leading-snug
            max-w-[22rem] md:max-w-none
            mx-auto
          "
        >
          Capability is not what we promise.
          <br />
          <span className="text-white/80">It’s what we control.</span>
        </motion.h3>

        {/* Subtle baseline divider */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: "64px", opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          viewport={{ once: true }}
          className="mx-auto mt-10 h-[1px] bg-white/30"
        />

      </div>
    </section>
  );
}

