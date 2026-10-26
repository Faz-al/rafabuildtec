import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, ArrowRight, Check } from "lucide-react";
import { Navbar, Footer } from "../components/Layout";

const ease = [0.22, 1, 0.36, 1];

const reveal = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease } },
};

const domains = [
  {
    number: "01",
    title: "Healthcare & Institutional",
    summary:
      "Hospitals, medical colleges and diagnostic centres requiring careful coordination, regulatory awareness and dependable delivery.",
    descriptor: "Complex environments",
  },
  {
    number: "02",
    title: "Educational Campuses",
    summary:
      "Academic and residential campuses planned around operational continuity, phased construction and the needs of active environments.",
    descriptor: "Phased delivery",
  },
  {
    number: "03",
    title: "Industrial & Logistics",
    summary:
      "Manufacturing and logistics facilities supported by coordinated civil, structural and safety-led execution.",
    descriptor: "Performance-led spaces",
  },
  {
    number: "04",
    title: "Public Infrastructure & EPC",
    summary:
      "Government and public-sector works managed with structured documentation, accountability and project governance.",
    descriptor: "Governed execution",
  },
];

const executionSteps = [
  {
    number: "01",
    title: "Pre-construction",
    desc: "Feasibility, statutory planning, budgeting, sequencing and early risk identification.",
    detail: "Plan with clarity",
  },
  {
    number: "02",
    title: "Engineering & controls",
    desc: "Design coordination, BOQs, procurement strategy and programme control.",
    detail: "Coordinate the details",
  },
  {
    number: "03",
    title: "Execution & safety",
    desc: "Site execution systems, safety leadership, inspections and progress governance.",
    detail: "Manage delivery",
  },
  {
    number: "04",
    title: "Handover & lifecycle",
    desc: "Testing, commissioning, documentation and long-term asset readiness.",
    detail: "Close with confidence",
  },
];

const controlItems = [
  "Regulatory approvals & statutory compliance",
  "Risk registers & audit-ready documentation",
  "Quality assurance & inspection systems",
  "Health, safety & workforce governance",
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

export default function Capabilities() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#F4F2ED] text-[#252A26]">
      <Navbar />
      <Hero />
      <CapabilityIntro />
      <CapabilityDomains />
      <ExecutionFramework />
      <ControlsSection />
      <ClosingStatement />
      <Footer />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative px-5 pb-16 pt-32 sm:px-8 sm:pt-36 md:px-12 md:pb-24 md:pt-44 lg:pt-48">
      <div className="mx-auto max-w-[1440px]">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.13 } } }}
          className="grid gap-10 md:grid-cols-12 md:items-end md:gap-8"
        >
          <motion.div variants={reveal} className="md:col-span-8">
            <Eyebrow>Capabilities / Delivery approach</Eyebrow>
            <h1 className="max-w-5xl text-[clamp(2.55rem,6.2vw,5.9rem)] font-normal leading-[0.98] tracking-[-0.055em]">
              The capability to build.
              <br />
              <span className="text-[#8C8B80]">The discipline to deliver.</span>
            </h1>
          </motion.div>
          <motion.div variants={reveal} className="md:col-span-4 md:pb-2 md:pl-5">
            <p className="max-w-md text-[14px] leading-7 text-[#5C625D] sm:text-[15px] sm:leading-8">
              RafaBuildTec brings planning, engineering coordination and site execution
              together in a structured approach to complex construction environments.
            </p>
            <a
              href="#capability-domains"
              className="mt-6 inline-flex items-center gap-3 border-b border-[#947650]/60 pb-2 text-[10px] font-medium uppercase tracking-[0.19em] transition-colors hover:text-[#947650]"
            >
              Explore capabilities <ArrowDownRight size={14} strokeWidth={1.5} />
            </a>
          </motion.div>
        </motion.div>

        <div className="mt-12 flex items-center gap-4 border-t border-[#303432]/15 pt-4 md:mt-20">
          <span className="h-1.5 w-1.5 rounded-full bg-[#947650]" />
          <p className="text-[9px] uppercase tracking-[0.2em] text-[#77766F] sm:text-[10px] sm:tracking-[0.24em]">
            Planning · Engineering · Execution · Governance
          </p>
          <span className="ml-auto font-mono text-[10px] text-[#77766F]">RBT / 02</span>
        </div>
      </div>
    </section>
  );
}

function CapabilityIntro() {
  return (
    <section className="bg-[#EAE7DF] px-5 py-16 sm:px-8 md:px-12 md:py-24">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.14 } } }}
        className="mx-auto grid max-w-[1440px] gap-8 md:grid-cols-12 md:items-start md:gap-12"
      >
        <motion.div variants={reveal} className="md:col-span-7">
          <Eyebrow>Our approach</Eyebrow>
          <h2 className="max-w-3xl text-[clamp(1.95rem,4vw,3.7rem)] leading-[1.04] tracking-[-0.045em]">
            Capabilities are not service lists.
            <br />
            <span className="text-[#8C8B80]">They are delivery systems.</span>
          </h2>
        </motion.div>
        <motion.div variants={reveal} className="md:col-span-5 md:pt-9">
          <p className="text-[13px] leading-7 text-[#5C625D] sm:text-[14px] sm:leading-8">
            Each capability reflects how we plan, coordinate and execute work where
            regulatory oversight, safety, multiple stakeholders and long-term performance
            matter. The focus is on bringing structure to complexity—from early planning
            through to handover.
          </p>
          <div className="mt-7 h-px w-14 bg-[#947650]" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function CapabilityDomains() {
  return (
    <section id="capability-domains" className="px-5 py-16 sm:px-8 md:px-12 md:py-28">
      <div className="mx-auto max-w-[1440px]">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          className="mb-9 grid gap-5 md:mb-14 md:grid-cols-12 md:items-end"
        >
          <motion.div variants={reveal} className="md:col-span-7">
            <Eyebrow>01 / Sectors</Eyebrow>
            <h2 className="text-[clamp(1.9rem,3.9vw,3.5rem)] leading-[1.04] tracking-[-0.045em]">
              Built around the
              <br className="hidden sm:block" /> demands of each sector.
            </h2>
          </motion.div>
          <motion.p variants={reveal} className="max-w-md text-[13px] leading-7 text-[#5C625D] md:col-span-5 md:justify-self-end">
            Different environments require different priorities. Our delivery approach
            adapts to the operating, coordination and compliance needs of each project.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 border-t border-[#303432]/20 sm:grid-cols-2">
          {domains.map((domain, index) => (
            <motion.article
              key={domain.number}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              variants={reveal}
              className={`group relative flex min-h-[230px] flex-col justify-between border-b border-[#303432]/20 py-7 sm:min-h-[255px] sm:px-6 sm:py-8 md:min-h-[285px] md:px-8 md:py-10 ${
                index % 2 === 0 ? "sm:border-r sm:border-[#303432]/20 sm:pl-0" : "sm:pr-0"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-[10px] tracking-wide text-[#947650]">
                  {domain.number}
                </span>
                <span className="text-[9px] uppercase tracking-[0.16em] text-[#8C8B80]">
                  {domain.descriptor}
                </span>
              </div>
              <div className="mt-8">
                <h3 className="max-w-sm text-[22px] leading-tight tracking-[-0.03em] text-[#252A26] transition-colors group-hover:text-[#947650] sm:text-[24px]">
                  {domain.title}
                </h3>
                <p className="mt-3 max-w-lg text-[13px] leading-7 text-[#5C625D]">
                  {domain.summary}
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <span className="h-px w-9 bg-[#947650]/60 transition-all duration-300 group-hover:w-16" />
                <ArrowDownRight size={16} className="text-[#947650] opacity-70 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExecutionFramework() {
  const railRef = useRef(null);
  const { scrollXProgress } = useScroll({ container: railRef });
  const mobileLineWidth = useTransform(scrollXProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="overflow-hidden bg-[#EAE7DF] px-5 py-16 sm:px-8 md:px-12 md:py-28">
      <div className="mx-auto max-w-[1440px]">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          className="mb-10 grid gap-5 md:mb-16 md:grid-cols-12 md:items-end"
        >
          <motion.div variants={reveal} className="md:col-span-7">
            <Eyebrow>02 / Execution framework</Eyebrow>
            <h2 className="max-w-3xl text-[clamp(1.9rem,4vw,3.6rem)] leading-[1.04] tracking-[-0.045em]">
              From intent
              <br /> to considered delivery.
            </h2>
          </motion.div>
          <motion.p variants={reveal} className="max-w-md text-[13px] leading-7 text-[#5C625D] md:col-span-5 md:justify-self-end">
            A connected sequence of planning, coordination, execution and close-out helps
            keep project priorities visible throughout delivery.
          </motion.p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-0 right-0 top-[17px] h-px bg-[#947650]/25" />
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="absolute left-0 top-[17px] hidden h-px bg-[#947650] md:block"
          />
          <motion.div
            style={{ width: mobileLineWidth }}
            className="absolute left-0 top-[17px] h-px bg-[#947650] md:hidden"
          />

          <div
            ref={railRef}
            className="relative -mr-5 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-5 pr-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mr-8 sm:pr-8 md:mr-0 md:grid md:grid-cols-4 md:gap-8 md:overflow-visible md:pr-0"
          >
            {executionSteps.map((step) => (
              <article key={step.number} className="w-[78vw] max-w-[300px] shrink-0 snap-start md:w-auto md:max-w-none">
                <span className="relative z-[1] block h-[9px] w-[9px] rounded-full border-2 border-[#EAE7DF] bg-[#947650] ring-1 ring-[#947650]/60" />
                <div className="mt-8 border-t border-[#303432]/15 pt-5 md:border-t-0 md:pt-0">
                  <p className="font-mono text-[11px] text-[#947650]">{step.number}</p>
                  <h3 className="mt-3 max-w-[220px] text-[20px] leading-tight tracking-[-0.025em] text-[#252A26]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[13px] leading-7 text-[#5C625D]">{step.desc}</p>
                  <p className="mt-5 text-[9px] uppercase tracking-[0.18em] text-[#8C8B80]">
                    {step.detail}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <p className="mt-3 text-[9px] uppercase tracking-[0.18em] text-[#8C8B80] md:hidden">
          Swipe to explore each stage
        </p>
      </div>
    </section>
  );
}

function ControlsSection() {
  return (
    <section className="px-5 py-16 sm:px-8 md:px-12 md:py-28">
      <div className="mx-auto grid max-w-[1440px] gap-10 md:grid-cols-12 md:gap-12">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={reveal}
          className="md:col-span-5"
        >
          <Eyebrow>03 / Project governance</Eyebrow>
          <h2 className="max-w-lg text-[clamp(1.9rem,3.7vw,3.35rem)] leading-[1.04] tracking-[-0.045em]">
            Control is built into the process.
          </h2>
          <p className="mt-5 max-w-md text-[13px] leading-7 text-[#5C625D]">
            Clear controls help teams maintain visibility, address risk and support
            consistent standards from site activity to project documentation.
          </p>
        </motion.div>

        <div className="md:col-span-7">
          {controlItems.map((item, index) => (
            <motion.div
              key={item}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-30px" }}
              variants={reveal}
              className="flex gap-4 border-t border-[#303432]/15 py-5 sm:gap-6 sm:py-6"
            >
              <span className="pt-1 font-mono text-[10px] text-[#947650]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="flex-1 text-[14px] leading-6 text-[#3D443E] sm:text-[15px]">{item}</p>
              <Check size={15} strokeWidth={1.4} className="mt-1 shrink-0 text-[#947650]" />
            </motion.div>
          ))}
          <div className="border-t border-[#303432]/15" />
        </div>
      </div>
    </section>
  );
}

function ClosingStatement() {
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
            <Eyebrow light>Execution philosophy</Eyebrow>
            <h2 className="max-w-4xl text-[clamp(2rem,5vw,4.7rem)] leading-[1] tracking-[-0.05em]">
              Capability is not what we promise.
              <br />
              <span className="text-[#A7A79B]">It is what we control.</span>
            </h2>
          </div>
          <div className="md:col-span-4 md:flex md:justify-end">
            <a
              href="/contact"
              className="inline-flex min-h-12 items-center justify-between gap-8 border border-white/25 px-5 text-[10px] uppercase tracking-[0.18em] transition-colors hover:border-[#C5A77D] hover:bg-[#C5A77D] hover:text-[#242925]"
            >
              Discuss a project <ArrowRight size={15} />
            </a>
          </div>
        </motion.div>
        <motion.div variants={reveal} className="mt-10 flex items-center gap-4 border-t border-white/15 pt-4">
          <span className="h-1.5 w-1.5 rounded-full bg-[#C5A77D]" />
          <p className="text-[9px] uppercase tracking-[0.2em] text-white/50 sm:text-[10px] sm:tracking-[0.24em]">
            Structured planning. Responsible execution.
          </p>
          <span className="ml-auto font-mono text-[10px] text-white/45">RBT / 03</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
