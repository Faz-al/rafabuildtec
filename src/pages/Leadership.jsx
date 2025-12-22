import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar, Footer } from "../components/Layout";

/*
LEADERSHIP PAGE — INSTITUTIONAL GOVERNANCE
DESKTOP LOCKED · MOBILE ENGINEERED
*/

export default function Leadership() {
  return (
    <div className="bg-[#EDEEF0] text-[#1F2933] overflow-x-hidden">
      <Navbar />

      <Hero />
      <LeadershipPhilosophy />
      <LeadershipStructure />
      <DecisionFramework />
      <ExperienceDepth />
      <GovernanceCommitment />

      <Footer />
    </div>
  );
}

/* ================= HERO ================= */
function Hero() {
  return (
    <section className="pt-40 md:pt-60 pb-28 md:pb-44">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* MOBILE */}
        <div className="md:hidden text-center">
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#8A6F4E] mb-6">
            Leadership & Governance
          </p>

          <h1 className="text-[32px] font-light leading-tight max-w-[22rem] mx-auto">
            Leadership that provides
            <br />
            <span className="font-medium">
              clarity, control, and accountability
            </span>
          </h1>

          <p className="mt-8 text-[#4B5563] text-[14px] leading-relaxed max-w-[24rem] mx-auto">
            RafaBuildTec’s leadership framework is designed to reduce execution
            risk and enforce institutional discipline.
          </p>
        </div>

        {/* DESKTOP */}
        <div className="hidden md:block">
          <p className="text-[11px] uppercase tracking-[0.4em] text-[#8A6F4E] mb-8">
            Leadership & Governance
          </p>

          <h1 className="text-[64px] md:text-[72px] font-light leading-[1.05] max-w-5xl">
            Leadership that provides
            <br />
            <span className="font-medium">
              clarity, control, and accountability
            </span>
          </h1>

          <p className="mt-12 text-[#4B5563] leading-loose max-w-2xl">
            RafaBuildTec’s leadership framework is designed to reduce execution
            risk, enforce discipline, and ensure institutional-grade delivery.
          </p>
        </div>

      </div>
    </section>
  );
}

/* ================= PHILOSOPHY ================= */
function LeadershipPhilosophy() {
  return (
    <section className="py-28 md:py-44 bg-[#E6E8EB]">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-[28px] md:text-[44px] font-light leading-snug max-w-4xl mb-10 md:mb-14"
        >
          Leadership is not visibility.
          <br />
          It is responsibility,
          <br />
          and decision ownership.
        </motion.h2>

        <p className="text-[#4B5563] leading-relaxed md:leading-loose max-w-3xl">
          Our leadership model prioritises governance over hierarchy. Decisions
          are owned, documented, reviewed, and executed within defined authority
          structures.
        </p>
      </div>
    </section>
  );
}

/* ================= STRUCTURE ================= */
function LeadershipStructure() {
  const roles = [
    { title: "Managing Partner", scope: "Final authority on delivery, governance, and strategic execution" },
    { title: "Director – Engineering & Controls", scope: "Programme control, technical risk, and design coordination" },
    { title: "Head – Safety & Quality", scope: "Safety systems, inspections, audits, and compliance assurance" },
    { title: "Finance & Compliance Lead", scope: "Contracts, statutory compliance, audits, and financial governance" },
  ];

  return (
    <section className="py-28 md:py-40 bg-[#F7F8FA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <h2 className="text-[30px] md:text-[46px] font-light leading-tight mb-14 md:mb-24">
          Clear authority.
          <br />
          Defined accountability.
        </h2>

        {/* MOBILE — HORIZONTAL AUTHORITY RAIL */}
        <div className="md:hidden relative">
          <div className="absolute top-[22px] left-0 right-0 h-[2px] bg-[#8A6F4E]/30" />

          <div className="flex gap-16 overflow-x-auto snap-x snap-mandatory pb-6 scrollbar-none">
            {roles.map((r) => (
              <div key={r.title} className="snap-start min-w-[260px]">
                <div className="mt-12">
                  <h3 className="text-[18px] font-light mb-3">{r.title}</h3>
                  <p className="text-[#4B5563] text-[14px] leading-relaxed">
                    {r.scope}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DESKTOP — ORIGINAL */}
        <div className="hidden md:block relative mt-24">
          <div className="absolute left-[28px] top-0 bottom-0 w-px bg-black/10" />

          <div className="space-y-20">
            {roles.map((role, i) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="relative pl-24"
              >
                <div className="absolute left-[20px] top-2 w-4 h-4 rounded-full bg-[#8A6F4E]" />

                <div className="grid md:grid-cols-12 gap-12">
                  <div className="md:col-span-4">
                    <h3 className="text-[24px] font-light">{role.title}</h3>
                  </div>
                  <div className="md:col-span-8">
                    <p className="text-[#4B5563] leading-loose max-w-2xl">
                      {role.scope}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

/* ================= DECISION FRAMEWORK ================= */
function DecisionFramework() {
  const railRef = useRef(null);
  const { scrollXProgress } = useScroll({ container: railRef });
  const lineWidth = useTransform(scrollXProgress, [0, 1], ["0%", "100%"]);

  const steps = [
    { index: "01", title: "Risk Identification", desc: "Early detection and escalation thresholds" },
    { index: "02", title: "Technical & Commercial Review", desc: "Cross-functional validation" },
    { index: "03", title: "Leadership Sign-Off", desc: "Authority-based approvals" },
    { index: "04", title: "Execution Monitoring", desc: "Reporting, audits, corrective action" },
  ];

  return (
    <section className="py-28 md:py-44 bg-[#E6E8EB] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <h3 className="text-[30px] md:text-[44px] font-light mb-16 md:mb-28">
          Decision governance framework
        </h3>

        <div className="relative">

          <div className="absolute top-[22px] left-0 right-0 h-[2px] bg-[#8A6F4E]/25" />

          {/* DESKTOP */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 3 }}
            viewport={{ once: true }}
            className="absolute top-[22px] left-0 h-[2px] bg-[#8A6F4E] hidden md:block"
          />

          {/* MOBILE SCROLL-BOUND */}
          <motion.div
            style={{ width: lineWidth }}
            className="absolute top-[22px] left-0 h-[2px] bg-[#8A6F4E] md:hidden"
          />

          <div
            ref={railRef}
            className="flex md:grid md:grid-cols-4 gap-16 md:gap-20 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-6 scrollbar-none"
          >
            {steps.map((s) => (
              <div key={s.title} className="snap-start min-w-[240px] md:min-w-0 mt-14">
                <p className="text-[26px] md:text-[36px] font-light text-[#8A6F4E]/40 mb-2">
                  {s.index}
                </p>
                <h4 className="text-[18px] md:text-[20px] font-light mb-3">
                  {s.title}
                </h4>
                <p className="text-[#6B7280] text-[14px] md:text-sm leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

/* ================= EXPERIENCE ================= */
function ExperienceDepth() {
  const stats = [
    { label: "Institutional & Healthcare Projects", value: "High-complexity" },
    { label: "Combined Leadership Experience", value: "20+ years" },
    { label: "Regulatory Environments Managed", value: "Multi-state" },
    { label: "Audit & Compliance Readiness", value: "Enterprise-grade" },
  ];

  return (
    <section className="py-28 md:py-44">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h3 className="text-[30px] md:text-[44px] font-light mb-16 md:mb-28">
          Depth of experience
        </h3>

        <div className="grid md:grid-cols-4 gap-12 md:gap-24">
          {stats.map((s) => (
            <div key={s.label} className="relative pl-10">
              <span className="absolute left-0 top-1 h-full w-[2px] bg-[#8A6F4E]/40" />
              <p className="text-[18px] md:text-[20px] font-light mb-2">{s.value}</p>
              <p className="text-[#6B7280] text-sm leading-relaxed">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= COMMITMENT ================= */
function GovernanceCommitment() {
  return (
    <section className="py-28 md:py-44 bg-[#1F2933] text-white">
      <div className="max-w-6xl mx-auto px-6 md:px-12 text-center">

        <p className="text-[10px] uppercase tracking-[0.35em] text-white/50 mb-6">
          Governance Commitment
        </p>

        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="text-[30px] md:text-[42px] font-light leading-tight max-w-[24rem] md:max-w-none mx-auto"
        >
          Governance is not a policy.
          <br />
          <span className="text-white/80">
            It is how we operate, every day.
          </span>
        </motion.h3>

        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "64px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mx-auto mt-10 h-[1px] bg-white/30"
        />
      </div>
    </section>
  );
}
