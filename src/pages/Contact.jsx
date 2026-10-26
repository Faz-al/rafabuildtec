import React from "react";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  Building2,
  Check,
  Clock3,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { Navbar, Footer } from "../components/Layout";

/*
CONTACT PAGE — PREMIUM INSTITUTIONAL
Warm architectural stone palette · responsive · restrained motion

Before publishing:
- Replace the placeholder phone number with the official business number.
- Connect the form to your backend / email service. This page currently validates
  required fields in the browser but does not send enquiries to a server.
*/

const contactDetails = [
  {
    number: "01",
    label: "Project enquiries",
    value: "projects@rafabuildtec.com",
    href: "mailto:projects@rafabuildtec.com",
    note: "Project scope, proposals and delivery discussions",
    Icon: Mail,
  },
  {
    number: "02",
    label: "Institutional discussions",
    value: "info@rafabuildtec.com",
    href: "mailto:info@rafabuildtec.com",
    note: "Partnerships, organisations and general enquiries",
    Icon: Building2,
  },
  {
    number: "03",
    label: "Telephone",
    value: "+91 XXX XXX XXXX",
    href: null,
    note: "Replace with the official contact number",
    Icon: Phone,
  },
  {
    number: "04",
    label: "Office",
    value: "Udupi, Karnataka, India",
    href: null,
    note: "Serving project stakeholders with clarity and accountability",
    Icon: MapPin,
  },
];

const projectTypes = [
  "Healthcare / Institutional",
  "Educational Campus",
  "Industrial / Logistics",
  "Public Infrastructure",
  "Commercial Development",
  "Residential Development",
  "Other",
];

const inputClass =
  "mt-3 w-full rounded-xl border border-[#D9D5CE] bg-[#FAF9F6] px-4 py-4 text-[14px] text-[#202A30] outline-none transition placeholder:text-[#9A9A94] hover:border-[#B9A78F] focus:border-[#8A6F4E] focus:ring-4 focus:ring-[#8A6F4E]/10 md:px-5";

export default function Contact() {
  return (
    <main className="overflow-hidden bg-[#F3F1EC] text-[#202A30]">
      <Navbar />
      <Hero />
      <ContactGrid />
      <EnquiryForm />
      <ClosingNote />
      <Footer />
    </main>
  );
}

/* ================= HERO ================= */
function Hero() {
  return (
    <section className="relative isolate pt-32 pb-16 sm:pt-40 sm:pb-20 md:pt-52 md:pb-28">
      <div className="pointer-events-none absolute right-[-7rem] top-28 -z-10 h-64 w-64 rounded-full border border-[#8A6F4E]/15 sm:right-[-4rem] sm:h-96 sm:w-96 md:right-[5%] md:top-36 md:h-[30rem] md:w-[30rem]" />
      <div className="pointer-events-none absolute right-[-3rem] top-40 -z-10 h-44 w-44 rounded-full border border-[#8A6F4E]/10 sm:right-8 sm:top-52 sm:h-64 sm:w-64 md:right-[11%] md:top-48 md:h-[20rem] md:w-[20rem]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="max-w-5xl"
        >
          <div className="mb-6 flex items-center gap-3 sm:mb-8">
            <span className="h-px w-8 bg-[#8A6F4E]" />
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#8A6F4E] sm:text-[11px] sm:tracking-[0.38em]">
              Contact · RafaBuildTec
            </p>
          </div>

          <h1 className="max-w-5xl text-[clamp(2.5rem,8vw,5.7rem)] font-light leading-[1.06] tracking-[-0.055em]">
            Good projects begin
            <br className="hidden sm:block" /> with{" "}
            <span className="font-medium text-[#8A6F4E]">a clear conversation.</span>
          </h1>

          <div className="mt-8 grid gap-7 sm:mt-10 md:grid-cols-12 md:items-end md:gap-10">
            <p className="max-w-2xl text-[15px] leading-7 text-[#5D6467] sm:text-base sm:leading-8 md:col-span-7">
              RafaBuildTec engages with institutions, enterprises and project
              stakeholders where execution certainty, governance and long-term
              performance matter.
            </p>
            <div className="flex items-center gap-3 md:col-span-5 md:justify-end">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#8A6F4E]/30 text-[#8A6F4E]">
                <ArrowDownRight size={19} strokeWidth={1.4} />
              </div>
              <p className="max-w-[14rem] text-xs leading-5 text-[#6D716F]">
                Start with your scope, your priorities and the outcome you need.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="mt-12 border-t border-[#D8D4CC] pt-4 sm:mt-16 md:mt-20">
          <div className="flex flex-wrap items-center justify-between gap-3 text-[9px] font-medium uppercase tracking-[0.22em] text-[#7B7D78] sm:text-[10px] sm:tracking-[0.28em]">
            <span>Project discussions</span>
            <span>Institutional partnerships</span>
            <span>Udupi · Karnataka · India</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= CONTACT DETAILS ================= */
function ContactGrid() {
  return (
    <section className="border-y border-[#D8D4CC] bg-[#E9E6DF] py-14 sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 md:px-12">
        <div className="mb-9 flex items-end justify-between gap-5 sm:mb-12">
          <div>
            <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.3em] text-[#8A6F4E]">
              Reach the right team
            </p>
            <h2 className="text-2xl font-light tracking-tight sm:text-3xl md:text-4xl">
              A direct line to <span className="font-medium">RafaBuildTec.</span>
            </h2>
          </div>
          <p className="hidden max-w-xs text-right text-sm leading-6 text-[#70736F] md:block">
            Clear communication from the first discussion.
          </p>
        </div>

        <div className="grid grid-cols-1 border-l border-t border-[#D3CEC5] sm:grid-cols-2 lg:grid-cols-4">
          {contactDetails.map(({ number, label, value, href, note, Icon }, index) => {
            const content = (
              <>
                <div className="mb-9 flex items-center justify-between">
                  <span className="text-[10px] tracking-[0.22em] text-[#8A6F4E]">
                    {number}
                  </span>
                  <Icon size={18} strokeWidth={1.4} className="text-[#8A6F4E]" />
                </div>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#777A75]">
                  {label}
                </p>
                <p className="mt-3 break-words text-base font-medium leading-6 text-[#202A30] sm:text-[17px]">
                  {value}
                </p>
                <p className="mt-3 text-xs leading-5 text-[#777A75]">{note}</p>
                {href && (
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-[#8A6F4E]">
                    Send an email <ArrowRight size={13} />
                  </span>
                )}
              </>
            );

            return (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                viewport={{ once: true, amount: 0.2 }}
                className="border-b border-r border-[#D3CEC5] p-5 sm:p-7 md:p-8"
              >
                {href ? (
                  <a
                    href={href}
                    className="group block h-full rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-[#8A6F4E] focus-visible:ring-offset-4"
                  >
                    {content}
                  </a>
                ) : (
                  <div className="h-full">{content}</div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ================= ENQUIRY FORM ================= */
function EnquiryForm() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const organisation = String(data.get("organisation") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const projectType = String(data.get("projectType") || "").trim();
    const overview = String(data.get("overview") || "").trim();

    const subject = encodeURIComponent(`Project enquiry — ${name}`);
    const body = encodeURIComponent(
      [
        "New project enquiry for RafaBuildTec",
        "",
        `Name: ${name}`,
        `Organisation: ${organisation || "Not provided"}`,
        `Email: ${email}`,
        `Phone: ${phone || "Not provided"}`,
        `Project type: ${projectType}`,
        "",
        "Project overview:",
        overview,
      ].join("\n")
    );

    // Opens the visitor's email application; it does not submit to a server.
    window.location.href = `mailto:projects@rafabuildtec.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="enquiry" className="py-16 sm:py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 sm:px-8 md:grid-cols-12 md:gap-16 md:px-12 lg:gap-24">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          viewport={{ once: true, amount: 0.2 }}
          className="md:col-span-5 md:pt-5"
        >
          <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.32em] text-[#8A6F4E] sm:mb-6 sm:text-[11px]">
            Project enquiry
          </p>
          <h2 className="max-w-md text-[2rem] font-light leading-[1.12] tracking-[-0.04em] sm:text-4xl md:text-[3.1rem]">
            Tell us what you’re planning.
          </h2>
          <p className="mt-6 max-w-md text-sm leading-7 text-[#626966] sm:mt-8 sm:text-base sm:leading-8">
            Share the essentials. Our team can use them to understand your
            project’s scope, location, feasibility, timelines and execution
            priorities.
          </p>

          <div className="mt-9 space-y-4 border-t border-[#D8D4CC] pt-6 sm:mt-12 sm:pt-8">
            {[
              "Scope and project requirements",
              "Location and delivery timelines",
              "Execution priorities and constraints",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#8A6F4E]/40 text-[#8A6F4E]">
                  <Check size={11} strokeWidth={1.8} />
                </span>
                <p className="text-sm leading-6 text-[#626966]">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-3 rounded-xl border border-[#D8D4CC] bg-[#EAE7E0]/70 p-4 sm:mt-10 sm:p-5">
            <ShieldCheck className="shrink-0 text-[#8A6F4E]" size={21} strokeWidth={1.4} />
            <p className="text-xs leading-5 text-[#626966]">
              Enquiry details are intended for project discussion and will be
              handled with discretion.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08 }}
          viewport={{ once: true, amount: 0.15 }}
          className="md:col-span-7"
        >
          <div className="relative rounded-2xl border border-[#E0DCD4] bg-[#FBFAF7] p-5 shadow-[0_18px_60px_rgba(32,42,48,0.07)] sm:rounded-3xl sm:p-8 md:p-10 lg:p-12">
            <div className="mb-8 flex items-start justify-between gap-4 border-b border-[#E5E1D9] pb-6 sm:mb-10 sm:pb-8">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#8A6F4E]">
                  Start a conversation
                </p>
                <h3 className="mt-2 text-xl font-light tracking-tight sm:text-2xl">
                  Project details
                </h3>
              </div>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D8D4CC] text-[#8A6F4E] sm:h-12 sm:w-12">
                <ArrowDownRight size={20} strokeWidth={1.4} />
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
                <Field label="Full name" htmlFor="contact-name">
                  <input
                    id="contact-name"
                    name="name"
                    autoComplete="name"
                    required
                    maxLength={100}
                    placeholder="Your full name"
                    className={inputClass}
                  />
                </Field>
                <Field label="Organisation" htmlFor="contact-organisation">
                  <input
                    id="contact-organisation"
                    name="organisation"
                    autoComplete="organization"
                    maxLength={150}
                    placeholder="Company or institution"
                    className={inputClass}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
                <Field label="Work email" htmlFor="contact-email">
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={254}
                    placeholder="you@company.com"
                    className={inputClass}
                  />
                </Field>
                <Field label="Phone number" htmlFor="contact-phone">
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    maxLength={30}
                    placeholder="+91"
                    className={inputClass}
                  />
                </Field>
              </div>

              <Field label="Project type" htmlFor="contact-project-type">
                <select
                  id="contact-project-type"
                  name="projectType"
                  required
                  defaultValue=""
                  className={`${inputClass} appearance-none`}
                >
                  <option value="" disabled>
                    Select a project category
                  </option>
                  {projectTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Project overview" htmlFor="contact-overview">
                <textarea
                  id="contact-overview"
                  name="overview"
                  required
                  minLength={10}
                  maxLength={5000}
                  rows={5}
                  placeholder="Project scope, location, approximate size, timeline and key requirements..."
                  className={`${inputClass} min-h-36 resize-y rounded-2xl leading-7`}
                />
              </Field>

              <div className="border-t border-[#E5E1D9] pt-6 sm:pt-7">
                <button
                  type="submit"
                  className="group flex w-full items-center justify-between gap-4 rounded-full bg-[#202A30] px-6 py-4 text-left text-sm font-medium text-white transition duration-300 hover:bg-[#8A6F4E] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#8A6F4E]/25 sm:w-auto sm:min-w-56 sm:px-7"
                >
                  <span>Prepare enquiry email</span>
                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
                <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-[#777A75]">
                  <Clock3 size={14} className="mt-0.5 shrink-0" />
                  Your email app will open with the enquiry details ready to
                  review and send.
                </p>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Field({ label, htmlFor, children }) {
  return (
    <div className="min-w-0">
      <label
        htmlFor={htmlFor}
        className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#696E6B] sm:text-[11px]"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

/* ================= CLOSING NOTE ================= */
function ClosingNote() {
  return (
    <section className="px-5 pb-16 sm:px-8 sm:pb-24 md:px-12 md:pb-32">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl bg-[#202A30] px-6 py-10 text-white sm:rounded-3xl sm:px-10 sm:py-14 md:px-16 md:py-16">
        <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full border border-white/10 sm:-right-10 sm:-top-28 sm:h-80 sm:w-80" />
        <div className="pointer-events-none absolute -right-2 -top-7 h-40 w-40 rounded-full border border-white/10 sm:right-12 sm:top-2 sm:h-52 sm:w-52" />

        <div className="relative flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.3em] text-[#C2A27C]">
              The next step
            </p>
            <h2 className="text-2xl font-light leading-tight tracking-tight sm:text-3xl md:text-4xl">
              Clear scope. Thoughtful planning.{" "}
              <span className="text-[#C2A27C]">Accountable execution.</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/65 sm:mt-5 sm:text-base">
              Start a discussion about your requirements and the outcomes that
              matter to your organisation.
            </p>
          </div>
          <a
            href="#enquiry"
            className="group inline-flex min-h-12 w-full items-center justify-between gap-6 rounded-full border border-white/25 px-6 py-3 text-sm text-white transition hover:border-[#C2A27C] hover:bg-white/5 sm:w-auto sm:min-w-48"
          >
            Discuss a project
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
