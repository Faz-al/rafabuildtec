import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { sanityClient } from "../lib/sanity";


const revealContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.18,
    },
  },
};

const revealItem = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};



/*
LOCKED ENTERPRISE HOMEPAGE
NO content change
NO design change
ONLY routing fixed
*/

export default function Home() {
  return (
    <div className="bg-[#EDEEF0] text-[#1F2933] font-sans overflow-x-hidden">
      <Navbar />
      <ArchitecturalHero />
      <ManifestoTight />
      <ProjectsShowcase />
      <CapabilityBands />
      <GovernanceSafety />
      <SpatialProjects />
      <GeographicPresence />
      <Timeline />
      <TrustSection />
      <EnquirySection />
      <EnterpriseFooter />
    </div>
  );
}

/* ---------------- NAVBAR ---------------- */
function Navbar() {
  const [open, setOpen] = React.useState(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 w-full z-50"
    >
      {/* background */}
      <div className="absolute inset-0 bg-[#EDEEF0]/90 backdrop-blur-xl border-b border-black/5" />

      <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-12 py-4 flex justify-between items-center">

        
        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-2 text-[14px] md:text-[15px] font-medium whitespace-nowrap"
        >
          <Building2 size={18} className="text-[#8A6F4E]" />
          RafaBuildTec LLP
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-16 text-[11px] uppercase tracking-[0.32em] text-[#5F6C7B]">
          {[
            { label: "Company", path: "/company" },
            { label: "Capabilities", path: "/capabilities" },
            { label: "Projects", path: "/projects" },
            { label: "Leadership", path: "/leadership" },
            { label: "Contact", path: "/contact" },
          ].map((item) => (
            <Link key={item.path} to={item.path} className="relative group">
              <span className="group-hover:text-black transition">
                {item.label}
              </span>
              <span className="absolute left-1/2 -bottom-2 h-[1.5px] w-0 bg-[#8A6F4E] transition-all duration-300 group-hover:w-full group-hover:left-0" />
            </Link>
          ))}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-full border border-black/10"
        >
          <span className="sr-only">Menu</span>
          <div className="space-y-1.5">
            <span className="block w-4 h-[1.5px] bg-black" />
            <span className="block w-4 h-[1.5px] bg-black" />
            <span className="block w-4 h-[1.5px] bg-black" />
          </div>
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="md:hidden relative z-30 bg-[#EDEEF0] border-t border-black/5"
        >

          <div className="px-6 py-6 space-y-6 text-[12px] uppercase tracking-[0.35em] text-[#5F6C7B]">
            {[
              { label: "Company", path: "/company" },
              { label: "Capabilities", path: "/capabilities" },
              { label: "Projects", path: "/projects" },
              { label: "Leadership", path: "/leadership" },
              { label: "Contact", path: "/contact" },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className="block"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}


/* ---------------- HERO ---------------- */
function ArchitecturalHero() {
  return (
    <section className="relative min-h-[88vh] md:min-h-[110vh]">
      {/* sticky wrapper */}
      <div className="sticky top-0 min-h-[100svh] md:min-h-screen overflow-hidden">

        {/* base tone */}
        <div className="absolute inset-0 bg-[#EDEEF0]" />

        {/* monumental horizontal massing layers */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-[12%] left-[-20%] w-[160%] h-[160px] md:h-[220px] bg-[#D9DEE4]"
            animate={{ x: [0, 40, 0] }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute top-[34%] left-[-20%] w-[160%] h-[190px] md:h-[260px] bg-[#E3E6EA]"
            animate={{ x: [0, -50, 0] }}
            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute top-[60%] left-[-20%] w-[160%] h-[170px] md:h-[240px] bg-[#D2D7DD]"
            animate={{ x: [0, 35, 0] }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* vertical structural axis (desktop only) */}
        <div className="hidden md:block absolute inset-y-0 left-[48%] w-[1px] bg-black/10" />

        {/* fine engineering grid */}
        <motion.div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.4) 1px, transparent 1px)",
            backgroundSize: "120px 120px",
          }}
        />

        {/* depth fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#EDEEF0]" />

        {/* content */}
        <motion.div
          variants={revealContainer}
          initial="hidden"
          animate="show"
          className="relative z-10 min-h-[100svh] md:min-h-screen flex items-center"
        >
          <div className="max-w-7xl mx-auto px-5 md:px-12 grid md:grid-cols-12 gap-10 md:gap-14">

            {/* LEFT — CORE STATEMENT */}
            <motion.div variants={revealItem} className="md:col-span-7">
              <p className="text-[10px] md:text-[11px] tracking-[0.32em] text-[#8A6F4E] uppercase mb-5 md:mb-6">
                Construction & Infrastructure Delivery
              </p>

              <h1 className="text-[40px] sm:text-[52px] md:text-[78px] font-light leading-[1.08] md:leading-[1.02]">
                We Build <br />
                Large-Scale <br />
                <span className="font-medium">Assets That Endure</span>
              </h1>
            </motion.div>

            {/* RIGHT — CONTEXT */}
            <motion.div
              variants={revealItem}
              className="md:col-span-5 md:self-end"
            >
              <p className="text-[#4B5563] leading-loose text-[14px] md:text-[15px] max-w-full md:max-w-md">
                RafaBuildTec LLP delivers complex commercial, institutional, and
                infrastructure assets through engineered systems, governance
                discipline, and execution certainty at scale.
              </p>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}


/* ---------------- MANIFESTO ---------------- */
function ManifestoTight() {
  return (
    <section className="relative py-14 md:py-20">
      <motion.div
        className="max-w-6xl mx-auto px-5 md:px-12"
        variants={revealContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        <motion.p
          variants={revealItem}
          className="text-[10px] md:text-[11px] uppercase tracking-[0.32em] md:tracking-[0.35em] text-[#6B7280] mb-4"
        >
          Our Philosophy
        </motion.p>

        <motion.h2
          variants={revealItem}
          className="text-[28px] sm:text-[32px] md:text-[42px] font-light leading-snug md:leading-snug max-w-full md:max-w-5xl"
        >
          Architecture sets direction. Engineering ensures performance. Execution
          delivers certainty.
        </motion.h2>

        <motion.p
          variants={revealItem}
          className="mt-5 md:mt-6 max-w-full md:max-w-3xl text-[#4B5563] text-[14px] md:text-[15px] leading-relaxed md:leading-loose"
        >
          We focus on buildability, compliance, and long-term asset performance
          across Indian regulatory and operational environments.
        </motion.p>
      </motion.div>
    </section>
  );
}


/* ---------------- PROJECTS ---------------- */
function ProjectsShowcase() {
  const [projects, setProjects] = useState([]);
  const [active, setActive] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    sanityClient.fetch(`
      *[_type == "project" && published == true && projectType == "main"]
      | order(order asc)[0...3] {
        title,
        location,
        category,
        scale,
        description,
        "images": images[].asset->url
      }
    `).then(setProjects);
  }, []);

  const current = projects[active];

  useEffect(() => {
    setImageIndex(0);
  }, [active]);

  useEffect(() => {
    if (!current?.images || current.images.length < 2) return;
    const interval = setInterval(() => {
      setImageIndex((i) => (i + 1) % current.images.length);
    }, 4200);
    return () => clearInterval(interval);
  }, [current]);

  if (!projects.length) return null;

  return (
    <section className="relative py-16 md:py-[80px] bg-[#E6E8EB] overflow-hidden">
      {/* ambient grid */}
      <motion.div
        className="absolute inset-0 opacity-[0.025]"
        animate={{ backgroundPosition: ["0% 0%", "120% 0%"] }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.45) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.45) 1px, transparent 1px)",
          backgroundSize: "220px 220px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 md:px-12">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="max-w-full md:max-w-4xl mb-12 md:mb-20"
        >
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-[#8A6F4E] mb-5">
            Delivery Intelligence
          </p>
          <h3 className="text-[32px] md:text-[50px] font-light leading-tight">
            Selected Experience
          </h3>
          <p className="mt-6 text-[#4B5563] leading-relaxed md:leading-loose max-w-full md:max-w-3xl text-[14px] md:text-base">
            A live representation of delivery capability across regions, asset
            classes, and execution environments — governed through consistent
            systems and controls.
          </p>
        </motion.div>

        {/* ================= MOBILE VIEW ================= */}
        <div className="md:hidden">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* image */}
            <img
              src={current.images?.[imageIndex]}
              className="w-full h-[260px] object-contain rounded-[22px]"
            />

            {/* meta */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-[#8A6F4E] mb-3">
                {current.category}
              </p>
              <h4 className="text-[26px] font-light mb-3">
                {current.title}
              </h4>
              <p className="text-[13px] text-[#6B7280] mb-4">
                {current.scale}
              </p>
              <p className="text-[#4B5563] leading-relaxed text-[14px]">
                {current.description}
              </p>
            </div>

            {/* controls */}
            <div className="flex justify-between items-center pt-6">
              <button
                onClick={() =>
                  setActive((a) => (a === 0 ? projects.length - 1 : a - 1))
                }
                className="text-[11px] uppercase tracking-[0.35em] text-[#8A6F4E]"
              >
                Prev
              </button>
              <span className="text-xs text-[#6B7280]">
                {active + 1} / {projects.length}
              </span>
              <button
                onClick={() =>
                  setActive((a) => (a === projects.length - 1 ? 0 : a + 1))
                }
                className="text-[11px] uppercase tracking-[0.35em] text-[#8A6F4E]"
              >
                Next
              </button>
            </div>
          </motion.div>
        </div>

        {/* ================= DESKTOP VIEW (UNCHANGED) ================= */}
        <div className="hidden md:grid md:grid-cols-12 gap-24 items-start">
          {/* LEFT */}
          <div className="md:col-span-4">
            <div className="relative space-y-12">
              <div className="absolute left-[5px] top-0 bottom-0 w-[1px] bg-[#8A6F4E]/25" />
              {projects.map((p, i) => (
                <button
                  key={p.title}
                  onMouseEnter={() => setActive(i)}
                  className="group relative pl-10 text-left w-full"
                >
                  <span
                    className={`absolute left-0 top-[6px] h-[10px] w-[10px] rounded-full transition-all duration-500 ${
                      active === i
                        ? "bg-[#8A6F4E] scale-110"
                        : "bg-[#8A6F4E]/40"
                    }`}
                  />
                  <p
                    className={`text-[21px] font-light ${
                      active === i ? "text-black" : "text-[#6B7280]"
                    }`}
                  >
                    {p.title}
                  </p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.35em] text-[#8A6F4E]/70">
                    {p.location}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="md:col-span-8">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="grid md:grid-cols-12 gap-16 items-center"
            >
              <div className="md:col-span-7">
                <img
                  src={current.images?.[imageIndex]}
                  className="w-full h-[440px] object-contain rounded-[30px]"
                />
              </div>
              <div className="md:col-span-5">
                <p className="text-[11px] uppercase tracking-[0.4em] text-[#8A6F4E] mb-6">
                  {current.category}
                </p>
                <h4 className="text-[34px] font-light mb-6">
                  {current.title}
                </h4>
                <p className="text-sm text-[#6B7280] mb-6">
                  {current.scale}
                </p>
                <p className="text-[#4B5563] leading-loose max-w-md">
                  {current.description}
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 md:mt-20 text-center">
          <Link
            to="/projects"
            className="inline-flex items-center gap-4 text-[10px] md:text-[11px] uppercase tracking-[0.45em] text-[#8A6F4E] hover:text-black transition"
          >
            View Full Project Archive
            <span className="h-[1px] w-12 md:w-16 bg-current opacity-60" />
          </Link>
        </div>
      </div>
    </section>
  );
}







/* ---------------- REST SECTIONS ---------------- */
/* Governance, Capabilities, Journey, Trust, Enquiry, Footer */
/* NO CHANGE — keep exactly as in your locked file */

/* ---------------- CAPABILITIES ---------------- */
function CapabilityBands() {
  const items = [
    {
      title: "Commercial & Institutional Campuses",
      desc: "Corporate offices, hospitals, educational and institutional facilities.",
    },
    {
      title: "High-Rise & Mixed-Use Developments",
      desc: "Urban residential towers and integrated mixed-use developments.",
    },
    {
      title: "Industrial, Logistics & Manufacturing",
      desc: "Factories, warehouses, logistics parks, and industrial infrastructure.",
    },
    {
      title: "Public Infrastructure & EPC Delivery",
      desc: "Government, public-sector and EPC-led infrastructure projects.",
    },
  ];

  return (
    <section className="relative py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-5 md:px-12">
        {/* Header */}
        <h3 className="text-[26px] sm:text-[30px] md:text-[40px] font-light mb-10 md:mb-24">
          Core Capabilities
        </h3>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-x-10 gap-y-8 sm:gap-x-12 sm:gap-y-10 md:gap-24">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              className="relative pl-5 md:pl-12"
            >
              {/* vertical indicator */}
              <span className="absolute left-0 top-1 h-full w-[2px] bg-[#8A6F4E]/40" />

              <p className="text-[15px] sm:text-[16px] md:text-[22px] font-light mb-2 md:mb-4 leading-snug">
                {item.title}
              </p>
              <p className="text-[#4B5563] text-[13px] md:text-base leading-relaxed md:leading-loose">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* bottom transition gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none bg-gradient-to-b from-[#EDEEF0] to-[#E6E8EB]" />
    </section>
  );
}




function GovernanceSafety() {
  const pillars = [
    {
      title: "Risk & Compliance",
      desc: "Contracts, approvals, audits, and regulatory coordination across jurisdictions.",
    },
    {
      title: "Health & Safety",
      desc: "Site safety systems, workforce training, and zero-incident operating culture.",
    },
    {
      title: "Quality Assurance",
      desc: "Material testing, inspections, workmanship control and handover standards.",
    },
  ];

  return (
    <section className="relative py-16 md:py-[80px] bg-[#E6E8EB] overflow-hidden">
      {/* subtle governance grid */}
      <motion.div
        className="absolute inset-0 opacity-[0.035]"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.35) 1px, transparent 1px)",
          backgroundSize: "160px 160px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="relative max-w-full md:max-w-3xl mb-14 md:mb-36"
        >
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-[#8A6F4E] mb-5 md:mb-6">
            Governance Framework
          </p>
          <h3 className="text-[32px] md:text-[46px] font-light leading-tight">
            Governance & Safety
          </h3>
          <p className="mt-5 md:mt-6 text-[#4B5563] leading-relaxed md:leading-loose max-w-full md:max-w-3xl text-[14px] md:text-base">
            An independent governance layer that continuously monitors risk,
            safety, and quality across all projects and delivery phases.
          </p>
        </motion.div>

        {/* ================= MOBILE: HORIZONTAL RAIL ================= */}
        <div className="md:hidden overflow-x-auto">
          <div className="flex gap-10 pb-6 snap-x snap-mandatory">
            {pillars.map((p, i) => (
              <div
                key={p.title}
                className="min-w-[85%] snap-center relative"
              >
                {/* micro indicator */}
                <motion.span
                  className="absolute -top-4 left-0 h-[6px] w-[6px] rounded-full bg-[#8A6F4E]"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <h4 className="text-[24px] font-light mb-5">
                  {p.title}
                </h4>
                <p className="text-[#4B5563] leading-relaxed text-[14px] max-w-sm">
                  {p.desc}
                </p>

                <div className="mt-8 h-[1.5px] w-16 bg-[#8A6F4E]/40" />
              </div>
            ))}
          </div>
        </div>

        {/* ================= DESKTOP: UNCHANGED ================= */}
        <div className="hidden md:grid md:grid-cols-3 gap-40">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: i * 0.18,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true }}
              className="relative"
            >
              <motion.span
                className="absolute -top-6 left-0 h-[6px] w-[6px] rounded-full bg-[#8A6F4E]"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <h4 className="text-[28px] font-light mb-8">
                {p.title}
              </h4>
              <p className="text-[#4B5563] leading-loose max-w-sm">
                {p.desc}
              </p>

              <div className="mt-10 h-[1.5px] w-20 bg-[#8A6F4E]/40" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ---------------- DELIVERY (EXECUTION FRAMEWORK) ---------------- */
function SpatialProjects() {
  const steps = [
    {
      phase: "01",
      title: "Pre-Construction",
      desc: "Planning, feasibility, budgeting and statutory approvals.",
    },
    {
      phase: "02",
      title: "Engineering & Controls",
      desc: "Design coordination, BOQs, schedules and procurement.",
    },
    {
      phase: "03",
      title: "Execution & Handover",
      desc: "Safe execution, inspections, testing and delivery.",
    },
  ];

  return (
    <section className="relative py-16 md:py-[80px] overflow-hidden bg-[#F4F5F7]">
      <div className="absolute top-0 left-0 right-0 h-1 pointer-events-none bg-gradient-to-b from-[#E6E8EB] to-[#EDEEF0]" />

      {/* ambient moving grid */}
      <motion.div
        className="absolute inset-0 opacity-[0.035]"
        animate={{ backgroundPosition: ["0% 0%", "100% 0%"] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.4) 1px, transparent 1px)",
          backgroundSize: "140px 140px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="max-w-full md:max-w-3xl mb-12 md:mb-36"
        >
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-[#8A6F4E] mb-4 md:mb-6">
            Execution Architecture
          </p>
          <h3 className="text-[30px] md:text-[46px] font-light leading-tight">
            How We Deliver
          </h3>
          <p className="mt-4 md:mt-6 text-[#4B5563] leading-relaxed md:leading-loose text-[14px] md:text-base">
            A systems-driven execution model designed to control complexity,
            manage risk, and deliver certainty across every phase.
          </p>
        </motion.div>

        {/* ================= MOBILE: HORIZONTAL SCROLL (LINE ATTACHED) ================= */}
        <div className="md:hidden relative overflow-x-auto">
          {/* SCROLL TRACK */}
          <div className="relative flex gap-20 px-4 pb-10 min-w-max">
            {/* RUNWAY LINE (MOVES WITH SCROLL) */}
            <div className="absolute left-0 right-0 top-[46px] h-[2px] bg-gradient-to-r from-transparent via-[#8A6F4E]/50 to-transparent" />

            {steps.map((s, i) => (
              <div
                key={s.title}
                className="relative w-[80vw] shrink-0 text-center"
              >
                {/* docking node */}
                <div className="flex justify-center mb-12">
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.15,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    viewport={{ once: true }}
                    className="relative h-5 w-5 rounded-full bg-[#8A6F4E]"
                  >
                    <div className="absolute inset-[-14px] rounded-full border border-[#8A6F4E]/30" />
                    <div className="absolute inset-[-28px] rounded-full border border-[#8A6F4E]/10" />
                  </motion.div>
                </div>

                {/* content */}
                <motion.div
                  initial={{ y: 18, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.15 + i * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  viewport={{ once: true }}
                >
                  <p className="text-[10px] tracking-[0.4em] text-[#8A6F4E] mb-3">
                    PHASE {s.phase}
                  </p>
                  <h4 className="text-[22px] font-light mb-4">
                    {s.title}
                  </h4>
                  <p className="text-[#4B5563] leading-relaxed text-[14px] max-w-xs mx-auto">
                    {s.desc}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= DESKTOP: UNCHANGED ================= */}
        <div className="hidden md:block relative">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-transparent via-[#8A6F4E]/50 to-transparent" />

          <div className="grid md:grid-cols-3 gap-32 relative">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.25, duration: 0.8 }}
                viewport={{ once: true, margin: "-120px" }}
                className="relative"
              >
                <div className="flex justify-center mb-16">
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.15,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative h-6 w-6 rounded-full bg-[#8A6F4E]"
                  >
                    <div className="absolute inset-[-18px] rounded-full border border-[#8A6F4E]/30" />
                    <div className="absolute inset-[-36px] rounded-full border border-[#8A6F4E]/10" />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ y: 24, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.9,
                    delay: 0.2 + i * 0.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="text-center"
                >
                  <p className="text-[11px] tracking-[0.4em] text-[#8A6F4E] mb-4">
                    PHASE {s.phase}
                  </p>
                  <h4 className="text-[26px] font-light mb-6">
                    {s.title}
                  </h4>
                  <p className="text-[#4B5563] leading-loose max-w-xs mx-auto">
                    {s.desc}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}





/* ---------------- PRESENCE ---------------- */
function GeographicPresence() {
  const regions = [
    {
      name: "Udupi",
      note: "Head office & project controls",
      motif: (
        <svg viewBox="0 0 120 120" className="w-full h-full">
          <path d="M40 90 V45 L60 30 L80 45 V90" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M50 90 V55 M70 90 V55" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      name: "Mangalore",
      note: "Commercial & institutional delivery",
      motif: (
        <svg viewBox="0 0 120 120" className="w-full h-full">
          <path d="M20 70 H100" stroke="currentColor" strokeWidth="2" />
          <path d="M30 60 V80 M50 60 V80 M70 60 V80 M90 60 V80" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      name: "Bangalore",
      note: "Urban & mixed-use developments",
      motif: (
        <svg viewBox="0 0 120 120" className="w-full h-full">
          <rect x="30" y="40" width="16" height="40" fill="none" stroke="currentColor" strokeWidth="2" />
          <rect x="52" y="30" width="16" height="50" fill="none" stroke="currentColor" strokeWidth="2" />
          <rect x="74" y="45" width="16" height="35" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
    {
      name: "Goa",
      note: "Healthcare & hospitality projects",
      motif: (
        <svg viewBox="0 0 120 120" className="w-full h-full">
          <path d="M20 75 Q60 55 100 75" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M60 35 V75" stroke="currentColor" strokeWidth="2" />
          <path d="M60 35 C50 28 42 26 34 26" stroke="currentColor" strokeWidth="1.5" />
          <path d="M60 35 C70 28 78 26 86 26" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      name: "Hubli",
      note: "Industrial & logistics facilities",
      motif: (
        <svg viewBox="0 0 120 120" className="w-full h-full">
          <circle cx="60" cy="60" r="6" fill="currentColor" />
          <path d="M60 60 H20 M60 60 H100 M60 60 V20 M60 60 V100" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      name: "Belgaum",
      note: "Regional infrastructure works",
      motif: (
        <svg viewBox="0 0 120 120" className="w-full h-full">
          <rect x="30" y="30" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="2" />
          <rect x="45" y="45" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative py-16 md:py-[80px] bg-[#E6E8EB] overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="max-w-full md:max-w-3xl mb-10 md:mb-32"
        >
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-[#8A6F4E] mb-4 md:mb-6">
            Regional Footprint
          </p>
          <h3 className="text-[30px] md:text-[44px] font-light leading-tight">
            Geographic Presence
          </h3>
          <p className="mt-4 md:mt-6 text-[#4B5563] leading-relaxed md:leading-loose text-[14px] md:text-base">
            Operational presence across key regional markets, enabling local
            execution with centralised governance and controls.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-x-6 gap-y-10 md:gap-16">
          {regions.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              viewport={{ once: true }}
              className="group text-center"
            >
              {/* icon */}
              <motion.div
                className="mx-auto mb-4 flex items-center justify-center text-[#8A6F4E]/45 group-hover:text-[#8A6F4E]"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <div className="w-14 h-14 md:w-28 md:h-28">
                  {r.motif}
                </div>
              </motion.div>

              {/* text */}
              <p className="text-[14px] md:text-[20px] font-light mb-1 md:mb-3">
                {r.name}
              </p>
              <p className="text-[11px] md:text-xs text-[#6B7280] leading-snug max-w-[120px] md:max-w-[160px] mx-auto">
                {r.note}
              </p>

              <span className="block mx-auto mt-3 md:mt-6 h-[2px] w-0 bg-[#8A6F4E]/50 transition-all duration-500 group-hover:w-10 md:group-hover:w-16" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ---------------- JOURNEY ---------------- */
function Timeline() {
  const steps = [
    {
      year: "2016",
      title: "Foundation",
      desc: "Establishing strong execution systems, site controls, and compliance discipline.",
    },
    {
      year: "2020",
      title: "Regional Scale",
      desc: "Expanding delivery across Karnataka and the west coast with multi-sector capability.",
    },
    {
      year: "2024",
      title: "Institutional Delivery",
      desc: "Executing complex, governance-driven projects for enterprises and institutions.",
    },
  ];

  const scrollRef = useRef(null);

  // Scroll progress for MOBILE horizontal journey
  const { scrollXProgress } = useScroll({
    container: scrollRef,
  });

  const progressWidth = useTransform(scrollXProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-5 md:px-12">
        <h3 className="text-[28px] md:text-[40px] font-light mb-12 md:mb-28">
          Our Journey
        </h3>

        {/* ================= MOBILE: SCROLL-LINKED JOURNEY ================= */}
        <div
          ref={scrollRef}
          className="md:hidden relative overflow-x-auto"
        >
          <div className="relative flex gap-14 pb-10 min-w-max">
            {/* base timeline */}
            <div className="absolute left-0 right-0 top-[30px] h-[1px] bg-[#8A6F4E]/25" />

            {/* progress timeline */}
            <motion.div
              style={{ width: progressWidth }}
              className="absolute left-0 top-[30px] h-[1.5px] bg-[#8A6F4E]"
            />

            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                className="relative w-[75vw]"
                initial={{ opacity: 0.4 }}
                whileInView={{ opacity: 1 }}
                viewport={{ amount: 0.6 }}
                transition={{ duration: 0.4 }}
              >
                {/* node */}
                <motion.span
                  className="absolute top-[24px] left-0 h-3 w-3 rounded-full bg-[#8A6F4E]"
                  initial={{ scale: 0.6 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />

                <div className="pl-6">
                  <p className="text-[13px] font-medium text-[#8A6F4E] mb-3">
                    {s.year}
                  </p>
                  <p className="text-[11px] uppercase tracking-[0.35em] text-[#6B7280] mb-3">
                    {s.title}
                  </p>
                  <p className="text-[#4B5563] leading-relaxed text-[14px] max-w-sm">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ================= DESKTOP: ORIGINAL VERTICAL ================= */}
        <div className="hidden md:block relative pl-24 space-y-28">
          <div className="absolute left-8 top-0 bottom-0 border-l border-dashed border-[#8A6F4E]/40" />

          {steps.map((s) => (
            <motion.div
              key={s.title}
              whileHover={{ x: 10 }}
              className="relative flex gap-10"
            >
              <span className="absolute -left-[38px] top-2 h-3 w-3 rounded-full bg-[#8A6F4E]" />

              <div className="w-20 text-right shrink-0">
                <p className="text-sm font-medium text-[#8A6F4E]">
                  {s.year}
                </p>
              </div>

              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-[#6B7280] mb-3">
                  {s.title}
                </p>
                <p className="text-[#4B5563] leading-loose max-w-xl">
                  {s.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ---------------- TRUST (INSTITUTIONAL PROOF) ---------------- */
function TrustSection() {
  const trusts = [
    {
      name: "Global Developers",
      note: "Long-term delivery partnerships",
      icon: (
        <svg viewBox="0 0 120 120" className="w-full h-full">
          <circle cx="60" cy="60" r="28" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M60 32 V88 M32 60 H88" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      name: "Industrial Leaders",
      note: "Manufacturing & logistics clients",
      icon: (
        <svg viewBox="0 0 120 120" className="w-full h-full">
          <rect x="28" y="36" width="64" height="40" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M40 76 V92 M60 76 V92 M80 76 V92" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      name: "Government Bodies",
      note: "Public-sector & institutional works",
      icon: (
        <svg viewBox="0 0 120 120" className="w-full h-full">
          <path d="M30 52 L60 32 L90 52" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M38 52 V84 M52 52 V84 M68 52 V84 M82 52 V84" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      name: "Private Enterprises",
      note: "Commercial & mixed-use developers",
      icon: (
        <svg viewBox="0 0 120 120" className="w-full h-full">
          <rect x="34" y="34" width="20" height="52" fill="none" stroke="currentColor" strokeWidth="2" />
          <rect x="58" y="26" width="28" height="60" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative py-16 md:py-[80px] bg-[#E6E8EB] overflow-hidden">
      {/* subtle trust grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.35) 1px, transparent 1px)",
          backgroundSize: "240px 240px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="max-w-full md:max-w-3xl mb-10 md:mb-36"
        >
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-[#8A6F4E] mb-4 md:mb-6">
            Institutional Trust
          </p>
          <h3 className="text-[30px] md:text-[46px] font-light leading-tight">
            Who We Work With
          </h3>
          <p className="mt-4 md:mt-6 text-[#4B5563] leading-relaxed md:leading-loose text-[14px] md:text-base">
            Our work is trusted by organisations that operate at scale, under
            governance, and with long-term accountability.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 md:gap-24">
          {trusts.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              viewport={{ once: true }}
              className="group text-center"
            >
              {/* icon */}
              <motion.div
                className="mx-auto mb-4 md:mb-10 flex items-center justify-center text-[#8A6F4E]/45 group-hover:text-[#8A6F4E]"
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <div className="w-14 h-14 md:w-20 md:h-20">
                  {t.icon}
                </div>
              </motion.div>

              {/* text */}
              <p className="text-[15px] md:text-[22px] font-light mb-1 md:mb-3">
                {t.name}
              </p>
              <p className="text-[11px] md:text-sm text-[#6B7280] leading-snug max-w-[150px] md:max-w-[220px] mx-auto">
                {t.note}
              </p>

              <span className="block mx-auto mt-3 md:mt-6 h-[2px] w-0 bg-[#8A6F4E]/50 transition-all duration-500 group-hover:w-10 md:group-hover:w-16" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function EnterpriseFooter() {
  return (
    <footer className="bg-[#1F2933] py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-5 md:px-12">

        {/* TOP GRID */}
        <div className="grid gap-6 md:grid-cols-4 md:gap-14 text-[11px] text-[#CBD5E1]">

          {/* Brand */}
          <div>
            <p className="text-[13px] text-white mb-2">
              RafaBuildTec LLP
            </p>
            <p className="leading-relaxed max-w-xs">
              Construction & infrastructure delivery across India.
            </p>
          </div>

          {/* Company */}
          <div>
            <p className="uppercase tracking-widest text-[#94A3B8] mb-2">
              Company
            </p>
            <p className="leading-relaxed">
              About · Governance · Leadership
            </p>
          </div>

          {/* Capabilities */}
          <div>
            <p className="uppercase tracking-widest text-[#94A3B8] mb-2">
              Capabilities
            </p>
            <p className="leading-relaxed">
              Commercial · Institutional · Infrastructure · Industrial
            </p>
          </div>

          {/* Presence */}
          <div>
            <p className="uppercase tracking-widest text-[#94A3B8] mb-2">
              Presence
            </p>
            <p className="leading-relaxed">
              Udupi · Mangalore · Bangalore · Goa · Hubli · Belgaum
            </p>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row gap-2 sm:gap-0 sm:justify-between text-[10px] text-[#94A3B8]">
          <span>
            © {new Date().getFullYear()} RafaBuildTec LLP
          </span>
          <span className="italic">
            Engineered for permanence
          </span>
        </div>

      </div>
    </footer>
  );
}


/* ---------------- ENQUIRY / CONTACT ---------------- */
function EnquirySection() {
  return (
    <section className="relative py-16 md:py-20 bg-[#F2F3F5]">
      <div className="max-w-6xl mx-auto px-5 md:px-12">
        <div className="grid md:grid-cols-12 gap-12 md:gap-20 items-center">

          {/* LEFT CONTENT */}
          <div className="md:col-span-7">
            <p className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-[#8A6F4E] mb-4 md:mb-6">
              Next Steps
            </p>

            <h3 className="text-[30px] md:text-[42px] font-light leading-tight mb-5 md:mb-8">
              Discuss Your Project
            </h3>

            <p className="text-[#4B5563] leading-relaxed md:leading-loose max-w-full md:max-w-xl text-[14px] md:text-base">
              Engage with our leadership and engineering team to evaluate
              feasibility, scope, timelines, and execution strategy. All
              discussions are handled with discretion and professional
              diligence.
            </p>
          </div>

          {/* RIGHT ACTION CARD */}
          <div className="md:col-span-5">
            <div className="bg-white rounded-[28px] md:rounded-[32px] p-8 md:p-16 shadow-[0_24px_60px_rgba(0,0,0,0.14)]">

              <p className="text-[13px] md:text-sm text-[#6B7280] mb-6 md:mb-8">
                For project enquiries, partnerships, or institutional discussions:
              </p>

              <div className="space-y-4 md:space-y-6">
                <p className="text-[16px] md:text-[18px] font-medium">
                  projects@rafabuildtec.com
                </p>
                <p className="text-[16px] md:text-[18px] font-medium">
                  +91 XXX XXX XXXX
                </p>
              </div>

              {/* EMAIL CAPTURE */}
              <div className="mt-8 md:mt-10">
                <p className="text-[10px] uppercase tracking-widest text-[#6B7280] mb-3 md:mb-4">
                  Or leave your email
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full flex-1 px-5 py-3 rounded-full border border-black/10 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#8A6F4E]/30"
                  />
                  <button className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#1F2933] text-white text-[14px] hover:bg-black transition">
                    Submit
                  </button>
                </div>
              </div>

              <div className="mt-8 md:mt-10 h-[2px] w-16 md:w-20 bg-[#8A6F4E]/40" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}


