import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, ArrowRight, Check, ShieldCheck } from "lucide-react";
import { Navbar, Footer } from "../components/Layout";

const ease = [0.22, 1, 0.36, 1];

const reveal = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease } },
};

const roles = [
  {
    number: "01",
    title: "Managing Partner",
    scope: "Final authority on delivery, governance and strategic execution.",
    focus: "Strategic direction",
  },
  {
    number: "02",
    title: "Director — Engineering & Controls",
    scope: "Programme control, technical risk and design coordination.",
    focus: "Technical oversight",
  },
  {
    number: "03",
    title: "Head — Safety & Quality",
    scope: "Safety systems, inspections, audits and compliance assurance.",
    focus: "Quality assurance",
  },
  {
    number: "04",
    title: "Finance & Compliance Lead",
    scope: "Contracts, statutory compliance, audits and financial governance.",
    focus: "Commercial integrity",
  },
];

const decisionSteps = [
  { number: "01", title: "Risk identification", desc: "Early detection, impact assessment and clear escalation thresholds." },
  { number: "02", title: "Technical & commercial review", desc: "Cross-functional validation of scope, cost, programme and exposure." },
  { number: "03", title: "Leadership sign-off", desc: "Decisions reviewed and approved through defined authority levels." },
  { number: "04", title: "Execution monitoring", desc: "Progress reporting, audits and corrective action when required." },
];

const experienceStats = [
  { label: "Project environments", value: "High-complexity" },
  { label: "Combined leadership experience", value: "20+ years" },
  { label: "Regulatory environments", value: "Multi-state" },
  { label: "Audit & compliance readiness", value: "Enterprise-grade" },
];

function Eyebrow({ children, light = false }) {
  return (
    <p
      className={`mb-4 text-[10px] font-medium uppercase tracking-[0.26em] sm:text-[11px] sm:tracking-[0.3em] ${
        light ? "text-[#C5A77D]" : "text-[#947650]"
      }`}
    >
      {children}
    </p>
  );
}

export default function Leadership() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#F4F2ED] text-[#252A26]">
      <Navbar />
      <Hero />
      <LeadershipPhilosophy />
      <LeadershipStructure />
      <DecisionFramework />
      <ExperienceDepth />
      <GovernanceCommitment />
      <Footer />
    </main>
  );
}

function Hero() {
  return (
    <section className="px-5 pb-16 pt-32 sm:px-8 sm:pt-36 md:px-12 md:pb-24 md:pt-44 lg:pt-48">
      <div className="mx-auto max-w-[1440px]">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.13 } } }}
          className="grid gap-10 md:grid-cols-12 md:items-end md:gap-8"
        >
          <motion.div variants={reveal} className="md:col-span-8">
            <Eyebrow>Leadership / Governance</Eyebrow>
            <h1 className="max-w-5xl text-[clamp(2.45rem,6.1vw,5.8rem)] font-normal leading-[0.98] tracking-[-0.055em]">
              Clarity in decisions.
              <br />
              <span className="text-[#8C8B80]">Accountability in delivery.</span>
            </h1>
          </motion.div>
          <motion.div variants={reveal} className="md:col-span-4 md:pb-2 md:pl-5">
            <p className="max-w-md text-[14px] leading-7 text-[#5C625D] sm:text-[15px] sm:leading-8">
              RafaBuildTec’s leadership framework is designed to reduce execution risk,
              reinforce responsibility and support consistent, considered project delivery.
            </p>
            <a
              href="#leadership-structure"
              className="mt-6 inline-flex items-center gap-3 border-b border-[#947650]/60 pb-2 text-[10px] font-medium uppercase tracking-[0.19em] transition-colors hover:text-[#947650]"
            >
              Explore governance <ArrowDownRight size={14} strokeWidth={1.5} />
            </a>
          </motion.div>
        </motion.div>

        <div className="mt-12 flex items-center gap-4 border-t border-[#303432]/15 pt-4 md:mt-20">
          <span className="h-1.5 w-1.5 rounded-full bg-[#947650]" />
          <p className="text-[9px] uppercase tracking-[0.2em] text-[#77766F] sm:text-[10px] sm:tracking-[0.24em]">
            Responsibility · Oversight · Decision ownership
          </p>
          <span className="ml-auto font-mono text-[10px] text-[#77766F]">RBT / 04</span>
        </div>
      </div>
    </section>
  );
}

function LeadershipPhilosophy() {
  return (
    <section className="bg-[#EAE7DF] px-5 py-16 sm:px-8 md:px-12 md:py-24">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.13 } } }}
        className="mx-auto grid max-w-[1440px] gap-8 md:grid-cols-12 md:gap-12"
      >
        <motion.div variants={reveal} className="md:col-span-7">
          <Eyebrow>Our philosophy</Eyebrow>
          <h2 className="max-w-3xl text-[clamp(1.95rem,4vw,3.65rem)] leading-[1.04] tracking-[-0.045em]">
            Leadership is not visibility.
            <br />
            <span className="text-[#8C8B80]">It is responsibility.</span>
          </h2>
        </motion.div>
        <motion.div variants={reveal} className="md:col-span-5 md:pt-9">
          <p className="text-[13px] leading-7 text-[#5C625D] sm:text-[14px] sm:leading-8">
            Our leadership model prioritises governance over hierarchy. Decisions are
            owned, documented, reviewed and carried out within defined authority structures.
            Clear ownership helps teams understand who is responsible, how risks are
            escalated and when approval is required.
          </p>
          <div className="mt-7 h-px w-14 bg-[#947650]" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function LeadershipStructure() {
  return (
    <section id="leadership-structure" className="px-5 py-16 sm:px-8 md:px-12 md:py-28">
      <div className="mx-auto max-w-[1440px]">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={reveal}
          className="mb-9 grid gap-5 md:mb-14 md:grid-cols-12 md:items-end"
        >
          <div className="md:col-span-7">
            <Eyebrow>01 / Responsibility structure</Eyebrow>
            <h2 className="max-w-3xl text-[clamp(1.9rem,3.8vw,3.4rem)] leading-[1.04] tracking-[-0.045em]">
              Clear authority.
              <br className="hidden sm:block" /> Defined accountability.
            </h2>
          </div>
          <p className="max-w-md text-[13px] leading-7 text-[#5C625D] md:col-span-5 md:justify-self-end">
            Defined responsibilities create a clear line from strategic direction to
            technical oversight, site standards and commercial governance.
          </p>
        </motion.div>

        <div className="border-t border-[#303432]/20">
          {roles.map((role, index) => (
            <motion.article
              key={role.number}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-35px" }}
              variants={reveal}
              className="grid gap-4 border-b border-[#303432]/15 py-6 sm:py-7 md:grid-cols-12 md:items-center md:gap-8 md:py-8"
            >
              <div className="flex items-center gap-3 md:col-span-1">
                <span className="font-mono text-[10px] text-[#947650]">{role.number}</span>
                <span className="h-px w-5 bg-[#303432]/20 md:hidden" />
              </div>
              <div className="md:col-span-5">
                <h3 className="text-[20px] leading-tight tracking-[-0.025em] sm:text-[23px]">
                  {role.title}
                </h3>
                <p className="mt-2 text-[9px] uppercase tracking-[0.17em] text-[#947650]">
                  {role.focus}
                </p>
              </div>
              <p className="text-[13px] leading-7 text-[#5C625D] md:col-span-5">{role.scope}</p>
              <div className="hidden justify-end md:col-span-1 md:flex">
                <ArrowDownRight size={16} strokeWidth={1.4} className="text-[#947650]" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function DecisionFramework() {
  const railRef = useRef(null);
  const { scrollXProgress } = useScroll({ container: railRef });
  const lineWidth = useTransform(scrollXProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="overflow-hidden bg-[#EAE7DF] px-5 py-16 sm:px-8 md:px-12 md:py-28">
      <div className="mx-auto max-w-[1440px]">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={reveal}
          className="mb-10 grid gap-5 md:mb-16 md:grid-cols-12 md:items-end"
        >
          <div className="md:col-span-7">
            <Eyebrow>02 / Decision process</Eyebrow>
            <h2 className="max-w-3xl text-[clamp(1.9rem,4vw,3.5rem)] leading-[1.04] tracking-[-0.045em]">
              Decisions made with
              <br className="hidden sm:block" /> structure and context.
            </h2>
          </div>
          <p className="max-w-md text-[13px] leading-7 text-[#5C625D] md:col-span-5 md:justify-self-end">
            A defined review path helps surface risks early, align the right expertise
            and keep decisions connected to execution.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-0 right-0 top-[17px] h-px bg-[#947650]/25" />
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="absolute left-0 top-[17px] hidden h-px bg-[#947650] md:block"
          />
          <motion.div style={{ width: lineWidth }} className="absolute left-0 top-[17px] h-px bg-[#947650] md:hidden" />

          <div
            ref={railRef}
            className="relative -mr-5 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-5 pr-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mr-8 sm:pr-8 md:mr-0 md:grid md:grid-cols-4 md:gap-8 md:overflow-visible md:pr-0"
          >
            {decisionSteps.map((step) => (
              <article key={step.number} className="w-[78vw] max-w-[300px] shrink-0 snap-start md:w-auto md:max-w-none">
                <span className="relative z-[1] block h-[9px] w-[9px] rounded-full border-2 border-[#EAE7DF] bg-[#947650] ring-1 ring-[#947650]/60" />
                <div className="mt-8 border-t border-[#303432]/15 pt-5 md:border-t-0 md:pt-0">
                  <p className="font-mono text-[11px] text-[#947650]">{step.number}</p>
                  <h3 className="mt-3 max-w-[240px] text-[19px] leading-tight tracking-[-0.025em]">{step.title}</h3>
                  <p className="mt-3 text-[13px] leading-7 text-[#5C625D]">{step.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <p className="mt-3 text-[9px] uppercase tracking-[0.18em] text-[#8C8B80] md:hidden">
          Swipe to explore the decision process
        </p>
      </div>
    </section>
  );
}

function ExperienceDepth() {
  return (
    <section className="px-5 py-16 sm:px-8 md:px-12 md:py-28">
      <div className="mx-auto max-w-[1440px]">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={reveal}
          className="mb-9 grid gap-5 md:mb-14 md:grid-cols-12 md:items-end"
        >
          <div className="md:col-span-7">
            <Eyebrow>03 / Experience & operating context</Eyebrow>
            <h2 className="max-w-3xl text-[clamp(1.9rem,3.8vw,3.4rem)] leading-[1.04] tracking-[-0.045em]">
              Depth of experience.
              <br className="hidden sm:block" /> Discipline in practice.
            </h2>
          </div>
          <p className="max-w-md text-[13px] leading-7 text-[#5C625D] md:col-span-5 md:justify-self-end">
            Leadership oversight is informed by the complexity of project environments,
            regulatory requirements and the need for dependable documentation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 border-t border-[#303432]/20 sm:grid-cols-2 lg:grid-cols-4">
          {experienceStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-30px" }}
              variants={reveal}
              className={`border-b border-[#303432]/15 py-6 sm:px-5 sm:py-7 lg:border-b-0 lg:border-r lg:py-5 ${
                index === 0 ? "sm:pl-0" : ""
              } ${index === experienceStats.length - 1 ? "lg:border-r-0" : ""}`}
            >
              <p className="text-[19px] leading-snug tracking-[-0.02em] text-[#252A26] sm:text-[20px]">
                {stat.value}
              </p>
              <p className="mt-3 max-w-[220px] text-[11px] leading-6 text-[#77766F]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
        <p className="mt-4 text-[10px] leading-5 text-[#8C8B80]">
          Experience and operating descriptors are presented as supplied in the existing page content.
        </p>
      </div>
    </section>
  );
}

function GovernanceCommitment() {
  return (
    <section className="bg-[#242925] px-5 py-16 text-[#F4F2ED] sm:px-8 md:px-12 md:py-24">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.14 } } }}
        className="mx-auto max-w-[1440px]"
      >
        <motion.div variants={reveal} className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Eyebrow light>Governance commitment</Eyebrow>
            <h2 className="max-w-4xl text-[clamp(2rem,5vw,4.7rem)] leading-[1] tracking-[-0.05em]">
              Governance is not a policy.
              <br />
              <span className="text-[#A7A79B]">It is how we operate, every day.</span>
            </h2>
          </div>
          <div className="md:col-span-4 md:flex md:justify-end">
            <a
              href="/contact"
              className="inline-flex min-h-12 items-center justify-between gap-8 border border-white/25 px-5 text-[10px] uppercase tracking-[0.18em] transition-colors hover:border-[#C5A77D] hover:bg-[#C5A77D] hover:text-[#242925]"
            >
              Contact our team <ArrowRight size={15} />
            </a>
          </div>
        </motion.div>

        <motion.div variants={reveal} className="mt-10 flex items-center gap-4 border-t border-white/15 pt-4">
          <span className="h-1.5 w-1.5 rounded-full bg-[#C5A77D]" />
          <p className="text-[9px] uppercase tracking-[0.2em] text-white/50 sm:text-[10px] sm:tracking-[0.24em]">
            Responsibility · Oversight · Accountability
          </p>
          <span className="ml-auto font-mono text-[10px] text-white/45">RBT / 05</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
