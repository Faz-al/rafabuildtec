
import React from "react";
import { motion } from "framer-motion";
import { Navbar, Footer } from "../components/Layout";

const stone = "#F4F2ED";
const paper = "#FAF9F6";
const ink = "#303432";
const muted = "#737874";
const bronze = "#967A54";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

const viewport = { once: true, amount: 0.15 };

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children, number }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      {number && (
        <span className="text-[10px] tracking-[0.15em]" style={{ color: bronze }}>
          {number}
        </span>
      )}
      <span
        className="text-[10px] font-medium uppercase tracking-[0.22em]"
        style={{ color: bronze }}
      >
        {children}
      </span>
    </div>
  );
}

const sectors = [
  {
    number: "01",
    title: "Healthcare & Institutions",
    description: "Spaces designed around operational reliability and long-term use.",
  },
  {
    number: "02",
    title: "Educational Campuses",
    description: "Built environments that support learning, growth and continuity.",
  },
  {
    number: "03",
    title: "Industrial & Logistics",
    description: "Practical facilities shaped by performance and delivery requirements.",
  },
  {
    number: "04",
    title: "Public Infrastructure",
    description: "Infrastructure approached with accountability and disciplined execution.",
  },
];

const principles = [
  {
    number: "01",
    title: "Accountability",
    tag: "Ownership & responsibility",
    description:
      "Clear ownership at every level. Decisions are documented, reviewed and carried through to completion.",
  },
  {
    number: "02",
    title: "Discipline",
    tag: "Process & control",
    description:
      "Planning, approvals, documentation and checks form part of the process—not steps left until the end.",
  },
  {
    number: "03",
    title: "Long-term value",
    tag: "Lifecycle thinking",
    description:
      "Every decision is considered in terms of durability, maintainability, compliance and operational performance.",
  },
];

const reasons = [
  {
    number: "01",
    title: "Execution certainty",
    description:
      "Planning, resources and project controls are aligned around delivery requirements and potential risks.",
  },
  {
    number: "02",
    title: "Regulatory discipline",
    description:
      "Compliance, approvals and documentation are considered throughout the project lifecycle.",
  },
  {
    number: "03",
    title: "Clear governance",
    description:
      "Defined responsibilities and review processes help maintain visibility and accountability.",
  },
  {
    number: "04",
    title: "Long-term performance",
    description:
      "Durability, maintainability and operational needs remain part of the decision-making process.",
  },
];

export default function Company() {
  return (
    <div
      className="min-h-screen overflow-x-clip"
      style={{ backgroundColor: paper, color: ink }}
    >
      {/* Keep this as the SAME shared navigation component used on Home. */}
      <Navbar />

      <main>
        <Hero />
        <Identity />
        <Philosophy />
        <VisionMission />
        <OperatingModel />
        <LeadershipPrinciples />
        <WhyRafaBuildTec />
      </main>

      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section
      className="relative overflow-hidden border-b"
      style={{ backgroundColor: stone, borderColor: `${ink}12` }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.035]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, #303432 1px, transparent 1px), linear-gradient(to bottom, #303432 1px, transparent 1px)",
            backgroundSize: "76px 76px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-32 sm:px-8 sm:pb-24 sm:pt-36 lg:px-14 lg:pb-32 lg:pt-44">
        <Reveal>
          <SectionLabel>About RafaBuildTec</SectionLabel>

          <h1 className="max-w-5xl text-[clamp(2.7rem,7vw,6.4rem)] font-light leading-[1.03] tracking-[-0.055em]">
            Building certainty
            <br />
            <span style={{ color: muted }}>
              into complex environments.
            </span>
          </h1>

          <div className="mt-9 grid gap-8 border-t pt-6 sm:mt-12 sm:grid-cols-12 sm:pt-8"
            style={{ borderColor: `${ink}20` }}
          >
            <p className="text-[10px] uppercase tracking-[0.18em] sm:col-span-3"
              style={{ color: bronze }}
            >
              Our company
            </p>

            <p className="max-w-2xl text-sm leading-7 sm:col-span-7 sm:text-base sm:leading-8"
              style={{ color: muted }}
            >
              RafaBuildTec LLP is an execution-driven construction and
              infrastructure firm focused on institutional, commercial and
              industrial environments. Our approach centres on disciplined
              planning, responsible execution and lasting performance.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 flex items-center gap-4 sm:mt-20">
          <span className="h-px w-12" style={{ backgroundColor: bronze }} />
          <span className="text-[10px] uppercase tracking-[0.2em]"
            style={{ color: muted }}
          >
            Built on process. Focused on performance.
          </span>
        </div>
      </div>
    </section>
  );
}

function Identity() {
  return (
    <section className="py-16 sm:py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-20 lg:px-14">
        <Reveal className="lg:col-span-5">
          <SectionLabel number="01">Who we are</SectionLabel>

          <h2 className="max-w-xl text-3xl font-light leading-tight tracking-[-0.04em] sm:text-5xl">
            An execution-first construction organisation.
          </h2>

          <div className="mt-7 max-w-lg space-y-4 text-sm leading-7 sm:mt-9 sm:text-base sm:leading-8"
            style={{ color: muted }}
          >
            <p>
              We operate in environments where planning, coordination and
              predictability matter. Projects require more than construction
              activity; they require clear responsibilities and controlled
              delivery.
            </p>
            <p>
              Our focus is on the systems behind the build—supporting safety,
              compliance, quality and long-term asset performance.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-0 sm:grid-cols-2 lg:col-span-7">
          {sectors.map((sector, i) => (
            <Reveal key={sector.number} delay={i * 0.06}>
              <div
                className={`h-full border-t py-6 sm:px-5 sm:py-8 ${
                  i % 2 === 0 ? "sm:border-r" : ""
                }`}
                style={{ borderColor: `${ink}20` }}
              >
                <p className="mb-8 text-[10px] tracking-[0.18em]"
                  style={{ color: bronze }}
                >
                  {sector.number}
                </p>
                <h3 className="text-lg font-medium tracking-[-0.025em] sm:text-xl">
                  {sector.title}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-6"
                  style={{ color: muted }}
                >
                  {sector.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Philosophy() {
  return (
    <section className="border-y py-16 sm:py-24 lg:py-32"
      style={{ backgroundColor: stone, borderColor: `${ink}12` }}
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
        <Reveal>
          <SectionLabel number="02">Our philosophy</SectionLabel>

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <h2 className="text-3xl font-light leading-[1.2] tracking-[-0.045em] sm:text-5xl lg:col-span-8 lg:text-6xl">
              Architecture defines intent.
              <br />
              Engineering ensures performance.
              <br />
              <span style={{ color: bronze }}>Execution delivers certainty.</span>
            </h2>

            <div className="lg:col-span-4 lg:self-end">
              <p className="text-sm leading-7 sm:text-base sm:leading-8"
                style={{ color: muted }}
              >
                Our philosophy is grounded in disciplined planning,
                transparent coordination and practical systems that support
                consistent execution across complex projects.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function VisionMission() {
  const items = [
    {
      number: "01",
      label: "Our vision",
      title: "Set a clear benchmark for execution-led delivery.",
      description:
        "Build a reputation for dependable coordination, disciplined governance and a long-term approach to asset value.",
    },
    {
      number: "02",
      label: "Our mission",
      title: "Deliver complex projects with confidence.",
      description:
        "Bring together planning, safety, quality and project controls to support responsible, well-managed outcomes.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
        <Reveal>
          <SectionLabel number="03">Vision & mission</SectionLabel>
        </Reveal>

        <div className="grid gap-10 md:grid-cols-2 md:gap-14">
          {items.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.1}>
              <article className="border-t pt-6 sm:pt-8"
                style={{ borderColor: `${ink}30` }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.2em]"
                    style={{ color: bronze }}
                  >
                    {item.label}
                  </span>
                  <span className="text-xs" style={{ color: muted }}>
                    {item.number}
                  </span>
                </div>

                <h3 className="mt-8 max-w-xl text-2xl font-light leading-snug tracking-[-0.035em] sm:mt-12 sm:text-4xl">
                  {item.title}
                </h3>

                <p className="mt-5 max-w-lg text-sm leading-7 sm:text-base sm:leading-8"
                  style={{ color: muted }}
                >
                  {item.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function OperatingModel() {
  const steps = [
    {
      number: "01",
      title: "Pre-construction",
      description: "Feasibility, scope definition and early risk assessment.",
    },
    {
      number: "02",
      title: "Engineering & controls",
      description: "Coordination, technical planning and project controls.",
    },
    {
      number: "03",
      title: "Execution & safety",
      description: "Site coordination, safety procedures and progress reviews.",
    },
    {
      number: "04",
      title: "Quality & handover",
      description: "Quality checks, documentation and structured completion.",
    },
  ];

  return (
    <section className="border-y py-16 sm:py-24 lg:py-32"
      style={{ backgroundColor: stone, borderColor: `${ink}12` }}
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
        <Reveal>
          <SectionLabel number="04">How we work</SectionLabel>

          <div className="mb-10 grid gap-5 sm:mb-14 lg:grid-cols-12 lg:items-end">
            <h2 className="text-3xl font-light tracking-[-0.04em] sm:text-5xl lg:col-span-7">
              A considered approach
              <br />
              from start to handover.
            </h2>
            <p className="max-w-lg text-sm leading-7 lg:col-span-5 lg:justify-self-end"
              style={{ color: muted }}
            >
              A structured delivery process helps keep requirements,
              responsibilities and quality considerations visible throughout
              the project lifecycle.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.07}>
              <article
                className={`border-t py-6 sm:px-5 sm:py-7 ${
                  i !== 0 ? "lg:border-l" : ""
                }`}
                style={{ borderColor: `${ink}25` }}
              >
                <span className="text-xs tracking-[0.16em]"
                  style={{ color: bronze }}
                >
                  {step.number}
                </span>
                <h3 className="mt-7 text-lg font-medium">{step.title}</h3>
                <p className="mt-3 text-sm leading-6" style={{ color: muted }}>
                  {step.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function LeadershipPrinciples() {
  return (
    <section className="py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
        <Reveal>
          <SectionLabel number="05">Leadership principles</SectionLabel>

          <div className="mb-10 grid gap-5 sm:mb-14 lg:grid-cols-12">
            <h2 className="text-3xl font-light tracking-[-0.04em] sm:text-5xl lg:col-span-7">
              How decisions are made
              <br />
              and upheld.
            </h2>
            <p className="max-w-lg text-sm leading-7 lg:col-span-5 lg:justify-self-end"
              style={{ color: muted }}
            >
              Reliable execution depends on clear expectations, consistent
              processes and a commitment to responsible decision-making.
            </p>
          </div>
        </Reveal>

        <div>
          {principles.map((principle, i) => (
            <Reveal key={principle.number} delay={i * 0.06}>
              <article
                className="grid gap-4 border-t py-7 sm:grid-cols-12 sm:gap-8 sm:py-9"
                style={{ borderColor: `${ink}22` }}
              >
                <span className="text-sm sm:col-span-1"
                  style={{ color: bronze }}
                >
                  {principle.number}
                </span>

                <div className="sm:col-span-4">
                  <h3 className="text-2xl font-light tracking-[-0.03em] sm:text-3xl">
                    {principle.title}
                  </h3>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.16em]"
                    style={{ color: bronze }}
                  >
                    {principle.tag}
                  </p>
                </div>

                <p className="max-w-2xl text-sm leading-7 sm:col-span-6 sm:col-start-7 sm:text-base"
                  style={{ color: muted }}
                >
                  {principle.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyRafaBuildTec() {
  return (
    <section className="relative overflow-hidden py-16 text-white sm:py-24 lg:py-32"
      style={{ backgroundColor: ink }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "76px 76px",
        }}
      />

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
        <Reveal>
          <SectionLabel number="06">Why RafaBuildTec</SectionLabel>

          <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
            <h2 className="text-3xl font-light leading-tight tracking-[-0.04em] sm:text-5xl lg:col-span-6">
              A disciplined approach
              <br />
              to demanding projects.
            </h2>

            <p className="max-w-xl text-sm leading-7 text-white/65 sm:text-base sm:leading-8 lg:col-span-5 lg:col-start-8">
              We believe dependable outcomes are supported by the quality of
              the decisions made before, during and after construction. Our
              focus is on the processes that help projects move forward with
              clarity and purpose.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-0 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, i) => (
            <Reveal key={reason.number} delay={i * 0.07}>
              <article
                className={`border-t py-6 sm:px-5 sm:py-7 ${
                  i !== 0 ? "lg:border-l" : ""
                }`}
                style={{ borderColor: "rgba(255,255,255,0.2)" }}
              >
                <span className="text-xs tracking-[0.16em]"
                  style={{ color: "#C5AE88" }}
                >
                  {reason.number}
                </span>

                <h3 className="mt-7 text-lg font-medium">{reason.title}</h3>

                <p className="mt-3 text-sm leading-6 text-white/65">
                  {reason.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 border-t pt-6 sm:mt-16 sm:pt-8"
          style={{ borderColor: "rgba(255,255,255,0.2)" }}
        >
          <p className="max-w-3xl text-xl font-light leading-relaxed tracking-[-0.02em] sm:text-2xl">
            Good construction is not just what gets built. It is how every
            stage is planned, managed and delivered.
          </p>
        </div>
      </div>
    </section>
  );
}
