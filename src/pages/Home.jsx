import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Mail,
} from "lucide-react";
import { Link } from "react-router-dom";
import { sanityClient } from "../lib/sanity";
import logo from "../assets/logo.png";

/* =========================================================
   DESIGN SYSTEM
========================================================= */

const COLORS = {
  ivory: "#F4F2ED",
  paper: "#FAF9F6",
  stone: "#E8E6E0",
  concrete: "#D9D8D2",
  ink: "#171918",
  graphite: "#303432",
  body: "#4F5551",
  muted: "#737874",
  bronze: "#967A54",
  bronzeDark: "#7C6240",
};

const ease = [0.22, 1, 0.36, 1];

const reveal = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease },
  },
};

const revealLeft = {
  hidden: { opacity: 0, x: -28 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease },
  },
};

const revealRight = {
  hidden: { opacity: 0, x: 28 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease },
  },
};

const viewport = {
  once: true,
  margin: "-100px",
};

/* =========================================================
   SHARED
========================================================= */

function SectionLabel({ children, number }) {
  return (
    <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.32em] text-[#967A54]">
      {number && (
        <span className="text-[#737874] tracking-[0.15em]">{number}</span>
      )}
      <span className="h-px w-8 bg-[#967A54]/50" />
      <span>{children}</span>
    </div>
  );
}

function TechnicalCorner({ className = "" }) {
  return (
    <div
      className={`pointer-events-none absolute w-7 h-7 border-l border-t border-[#967A54]/30 ${className}`}
    />
  );
}

function GridTexture({ opacity = 0.035, size = 120 }) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0"
      animate={{ backgroundPosition: ["0px 0px", `${size}px ${size}px`] }}
      transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      style={{
        opacity,
        backgroundImage: `
          linear-gradient(to right, rgba(48,52,50,.65) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(48,52,50,.65) 1px, transparent 1px)
        `,
        backgroundSize: `${size}px ${size}px`,
      }}
    />
  );
}

/* =========================================================
   ARCHITECTURAL SVG SYSTEM
========================================================= */

function HeroDrawing() {
  return (
    <svg
      viewBox="0 0 800 650"
      className="w-full h-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="heroFade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#967A54" stopOpacity=".45" />
          <stop offset="1" stopColor="#967A54" stopOpacity="0" />
        </linearGradient>
      </defs>

      <g stroke="#303432" strokeOpacity=".18">
        <path d="M80 530H730" />
        <path d="M80 490H730" />
        <path d="M80 450H730" />
        <path d="M80 410H730" />
        <path d="M80 370H730" />
        <path d="M80 330H730" />
        <path d="M80 290H730" />
        <path d="M80 250H730" />
        <path d="M80 210H730" />
      </g>

      <g stroke="#303432" strokeOpacity=".25">
        <path d="M130 190V530" />
        <path d="M190 160V530" />
        <path d="M250 125V530" />
        <path d="M310 160V530" />
        <path d="M370 105V530" />
        <path d="M430 135V530" />
        <path d="M490 175V530" />
        <path d="M550 145V530" />
        <path d="M610 195V530" />
        <path d="M670 170V530" />
      </g>

      <g stroke="#967A54">
        <path d="M125 530V235L255 150L375 210L495 115L675 205V530" />
        <path d="M125 235L255 275L375 210L495 250L675 205" />
        <path d="M125 330L255 365L375 310L495 350L675 300" />
      </g>

      <g stroke="#303432" strokeOpacity=".55">
        <path d="M255 150V530" />
        <path d="M375 210V530" />
        <path d="M495 115V530" />
      </g>

      <g stroke="#967A54" strokeOpacity=".45">
        <path d="M105 560H695" />
        <path d="M105 570H695" />
        <path d="M255 575V592" />
        <path d="M495 575V592" />
      </g>

      <path
        d="M95 560H705"
        stroke="url(#heroFade)"
        strokeWidth="2"
        strokeDasharray="6 10"
      />

      <g fill="#737874" fontSize="10" fontFamily="sans-serif">
        <text x="105" y="602">STRUCTURAL AXIS</text>
        <text x="515" y="602">PROJECT / 01</text>
        <text x="610" y="185">DATUM +12.40</text>
        <text x="390" y="202">GRID B</text>
      </g>

      <circle cx="495" cy="115" r="5" fill="#967A54" />
      <circle cx="255" cy="150" r="4" fill="#967A54" />
    </svg>
  );
}

function CapabilityCampusSVG() {
  return (
    <svg viewBox="0 0 500 300" className="w-full h-full" fill="none">
      <g stroke="#303432" strokeWidth="1">
        <path d="M40 240H460" />
        <path d="M70 220H430" />
        <path d="M70 220V145H190V220" />
        <path d="M205 220V110H330V220" />
        <path d="M345 220V150H430V220" />
      </g>

      <g stroke="#967A54">
        <path d="M55 145L130 95L205 145" />
        <path d="M190 110L267 55L345 110" />
        <path d="M330 150L388 112L445 150" />
      </g>

      <g stroke="#303432" strokeOpacity=".28">
        <path d="M95 145V220M125 145V220M155 145V220" />
        <path d="M230 110V220M260 110V220M290 110V220M320 110V220" />
        <path d="M365 150V220M395 150V220M425 150V220" />
      </g>

      <g stroke="#967A54" strokeOpacity=".35" strokeDasharray="4 7">
        <path d="M55 260H445" />
        <path d="M130 75V260" />
        <path d="M267 40V260" />
        <path d="M388 95V260" />
      </g>

      <circle cx="267" cy="55" r="4" fill="#967A54" />
    </svg>
  );
}

function CapabilityTowerSVG() {
  return (
    <svg viewBox="0 0 500 300" className="w-full h-full" fill="none">
      <g stroke="#303432">
        <path d="M145 245V70L205 35L270 70V245" />
        <path d="M285 245V95L340 62L395 95V245" />
      </g>

      <g stroke="#967A54">
        <path d="M205 35V245" />
        <path d="M340 62V245" />
        <path d="M110 245H430" />
      </g>

      <g stroke="#303432" strokeOpacity=".25">
        <path d="M145 100H270M145 130H270M145 160H270M145 190H270M145 220H270" />
        <path d="M285 125H395M285 155H395M285 185H395M285 215H395" />
      </g>

      <g stroke="#967A54" strokeOpacity=".4" strokeDasharray="5 8">
        <path d="M125 35V255" />
        <path d="M415 55V255" />
      </g>

      <g fill="#737874" fontSize="9" fontFamily="sans-serif">
        <text x="105" y="25">HEIGHT DATUM</text>
        <text x="355" y="280">MIXED-USE MASSING</text>
      </g>
    </svg>
  );
}

function CapabilityIndustrialSVG() {
  return (
    <svg viewBox="0 0 500 300" className="w-full h-full" fill="none">
      <g stroke="#303432">
        <path d="M45 235H455" />
        <path d="M70 235V145L145 105L220 145V235" />
        <path d="M235 235V135L315 90L395 135V235" />
      </g>

      <g stroke="#967A54">
        <path d="M70 145L145 105L220 145" />
        <path d="M235 135L315 90L395 135" />
        <path d="M95 235V170M125 235V150M155 235V170M185 235V150" />
        <path d="M265 235V155M295 235V140M325 235V155M355 235V140" />
      </g>

      <g stroke="#303432" strokeOpacity=".25">
        <path d="M70 205H220M235 205H395" />
        <path d="M70 180H220M235 180H395" />
      </g>

      <g stroke="#967A54" strokeOpacity=".35" strokeDasharray="3 7">
        <path d="M55 260H445" />
        <path d="M55 75V260" />
        <path d="M445 75V260" />
      </g>

      <g fill="#737874" fontSize="9" fontFamily="sans-serif">
        <text x="70" y="65">LONG-SPAN STRUCTURE</text>
        <text x="330" y="275">LOGISTICS GRID</text>
      </g>
    </svg>
  );
}

function CapabilityInfrastructureSVG() {
  return (
    <svg viewBox="0 0 500 300" className="w-full h-full" fill="none">
      <g stroke="#303432">
        <path d="M40 220H460" />
        <path d="M65 220L145 125L225 220" />
        <path d="M275 220L355 125L435 220" />
      </g>

      <g stroke="#967A54">
        <path d="M65 220H435" />
        <path d="M145 125V220" />
        <path d="M355 125V220" />
        <path d="M145 125H355" />
      </g>

      <g stroke="#303432" strokeOpacity=".25">
        <path d="M95 220L145 160L195 220" />
        <path d="M305 220L355 160L405 220" />
      </g>

      <g stroke="#967A54" strokeOpacity=".4" strokeDasharray="4 8">
        <path d="M40 255H460" />
        <path d="M85 110H415" />
        <path d="M85 110V255" />
        <path d="M415 110V255" />
      </g>

      <g fill="#737874" fontSize="9" fontFamily="sans-serif">
        <text x="80" y="95">INFRASTRUCTURE NETWORK</text>
        <text x="345" y="275">EPC / DELIVERY</text>
      </g>
    </svg>
  );
}

/* =========================================================
   NAVBAR
========================================================= */

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 24);
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const links = [
    ["Company", "/company"],
    ["Capabilities", "/capabilities"],
    ["Projects", "/projects"],
    ["Leadership", "/leadership"],
    ["Contact", "/contact"],
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-[100]">
      <div
        className={`transition-all duration-300 ${
          open || scrolled
            ? "border-b border-[#303432]/10 bg-[#F4F2ED]/95 text-[#252925] shadow-[0_8px_30px_rgba(23,25,24,0.04)] backdrop-blur-xl"
            : "border-b border-white/20 bg-transparent text-white"
        }`}
      >
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
          <div className="flex h-[62px] items-center justify-between sm:h-[68px]">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="flex min-w-0 items-center"
              aria-label="RafaBuildTec LLP — Home"
            >
              <img
                src={logo}
                alt="RafaBuildTec LLP"
                className="h-10 w-auto max-w-[220px] shrink-0 object-contain sm:h-11 lg:h-12"
                draggable="false"
              />
            </Link>

            <nav aria-label="Primary navigation" className="hidden items-center gap-6 md:flex lg:gap-9">
              {links.map(([label, href]) => (
                <Link
                  key={label}
                  to={href}
                  className={`group relative py-2 text-[11px] transition-colors duration-300 ${
                    open || scrolled
                      ? "text-[#4F5551] hover:text-[#171918]"
                      : "text-white/85 hover:text-white"
                  }`}
                >
                  {label}
                  <span className={`absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${open || scrolled ? "bg-[#967A54]" : "bg-[#D5BB98]"}`} />
                </Link>
              ))}
            </nav>

            <button
              type="button"
              className={`relative flex h-10 w-10 shrink-0 items-center justify-center border transition-colors duration-300 md:hidden ${
                open || scrolled ? "border-[#303432]/20" : "border-white/40"
              }`}
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? "Close navigation" : "Open navigation"}
              aria-expanded={open}
              aria-controls="mobile-navigation"
            >
              <span className={`absolute h-px w-[18px] transition-all duration-300 ${open || scrolled ? "bg-[#303432]" : "bg-white"} ${open ? "translate-y-0 rotate-45" : "-translate-y-[4px]"}`} />
              <span className={`absolute h-px w-[18px] transition-all duration-300 ${open || scrolled ? "bg-[#303432]" : "bg-white"} ${open ? "translate-y-0 -rotate-45" : "translate-y-[4px]"}`} />
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-navigation"
        aria-hidden={!open}
        className={`overflow-hidden border-b border-[#303432]/10 bg-[#FAF9F6] text-[#303432] shadow-xl shadow-black/5 transition-[max-height,opacity] duration-300 md:hidden ${
          open ? "max-h-[calc(100svh-62px)] overflow-y-auto opacity-100" : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <nav aria-label="Mobile navigation" className="mx-auto max-w-[1600px] px-5 pb-5 sm:px-8">
          <p className="pb-4 pt-6 text-[9px] font-semibold uppercase tracking-[0.28em] text-[#967A54]">Navigation</p>
          <div className="border-t border-[#303432]/10">
            {links.map(([label, href], index) => (
              <Link
                key={label}
                to={href}
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
                className={`flex min-h-14 items-center justify-between py-3 text-[14px] transition-colors duration-200 hover:text-[#967A54] ${index !== links.length - 1 ? "border-b border-[#303432]/[0.08]" : ""}`}
              >
                {label}
                <ArrowRight size={15} strokeWidth={1.4} aria-hidden="true" />
              </Link>
            ))}
          </div>
          <Link
            to="/contact"
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
            className="group mt-5 flex min-h-[50px] items-center justify-between bg-[#252925] px-5 text-[#FAF9F6] transition-colors hover:bg-[#7C6240]"
          >
            <span className="text-[9px] font-semibold uppercase tracking-[0.2em]">Start a project</span>
            <ArrowUpRight size={16} strokeWidth={1.4} />
          </Link>
          <div className="mt-6 border-t border-[#303432]/10 pt-5">
            <p className="text-[8px] font-semibold uppercase tracking-[0.24em] text-[#967A54]">Construction & Infrastructure</p>
            <p className="mt-2 max-w-[270px] text-[11px] leading-relaxed text-[#737874]">Engineering, execution and accountability at every stage.</p>
          </div>
        </nav>
      </div>
    </header>
  );
}

/* =========================================================
   HERO
========================================================= */




function ArchitecturalHero() {
  return (
    <section className="relative isolate min-h-[min(760px,100svh)] overflow-hidden bg-[#252925] text-white sm:min-h-[min(820px,100svh)] lg:min-h-[760px]">
      {/* Full-bleed architectural image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=2400&q=90"
          alt="Contemporary architectural project"
          fetchPriority="high"
          className="h-full w-full object-cover object-[55%_center] lg:object-center"
        />
      </div>

      {/* Image treatment: darker at bottom and behind the copy */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-black/75 sm:from-black/35 sm:via-black/10 sm:to-black/70"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent"
      />

      {/* Fine frame */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-3 border border-white/15 sm:inset-5 lg:inset-7"
      />

      <div className="relative mx-auto flex min-h-[min(760px,100svh)] max-w-[1600px] flex-col px-7 pb-7 pt-24 sm:min-h-[min(820px,100svh)] sm:px-12 sm:pb-10 sm:pt-32 lg:min-h-[760px] lg:px-16 lg:pb-12 lg:pt-36">
        {/* Minimal brand line */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-7 bg-[#C3A47B] sm:w-10" />
            <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/90 sm:text-[10px] sm:tracking-[0.28em]">
              RafaBuildTec LLP
            </span>
          </div>

          <span className="hidden text-[9px] uppercase tracking-[0.24em] text-white/65 sm:block">
            Construction & Infrastructure
          </span>
        </motion.div>

        {/* Hero message */}
        <div className="flex flex-1 flex-col justify-end pb-9 pt-16 sm:pb-16 sm:pt-20 lg:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease }}
            className="max-w-[1050px]"
          >
            <p className="mb-5 text-[9px] font-medium uppercase tracking-[0.25em] text-[#D5BB98] sm:mb-7 sm:text-[10px] sm:tracking-[0.32em]">
              Built with purpose
            </p>

            <h1 className="max-w-[1000px] text-[clamp(3.15rem,10.5vw,9rem)] font-light leading-[0.88] tracking-[-0.075em] text-white">
              Building for
              <br />
              <span className="text-white/65">what lasts.</span>
            </h1>

            <div className="mt-6 flex max-w-[700px] flex-col gap-6 sm:mt-8 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
              <p className="max-w-[340px] text-[12px] leading-6 text-white/80 sm:text-[13px] sm:leading-7">
                Thoughtfully planned. Precisely engineered. Built with
                accountability at every stage.
              </p>

              <Link
                to="/projects"
                className="group inline-flex min-h-[48px] w-fit shrink-0 items-center gap-6 border border-white/45 px-4 text-[10px] font-medium text-white transition-colors duration-300 hover:border-[#C3A47B] hover:bg-[#C3A47B] hover:text-[#20241F] sm:px-5"
              >
                Explore our projects
                <ArrowUpRight
                  size={16}
                  strokeWidth={1.5}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Bottom signature */}
        <div className="flex items-center justify-between gap-3 border-t border-white/25 pt-4">
          <p className="text-[8px] uppercase tracking-[0.12em] text-white/65 sm:text-[9px] sm:tracking-[0.2em]">
            Engineering
            <span className="mx-1.5 text-[#C3A47B]">/</span>
            Execution
            <span className="mx-1.5 text-[#C3A47B]">/</span>
            Integrity
          </p>

          <Link
            to="/contact"
            className="group flex shrink-0 items-center gap-2 text-[9px] uppercase tracking-[0.12em] text-white/85 transition-colors hover:text-[#D5BB98] sm:text-[10px] sm:tracking-[0.18em]"
          >
            Start a conversation
            <ArrowUpRight
              size={13}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}


/* =========================================================
   MANIFESTO
========================================================= */


function Manifesto() {
  return (
    <section className="relative overflow-hidden bg-[#FAF9F6] py-14 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <div className="grid gap-9 lg:grid-cols-12 lg:gap-10">
          {/* Section identifier */}
          <motion.div
            initial="hidden"
            whileInView="show"
            variants={reveal}
            viewport={viewport}
            className="lg:col-span-3"
          >
            <SectionLabel number="">
              Our Philosophy
            </SectionLabel>
          </motion.div>

          {/* Main content */}
          <motion.div
            initial="hidden"
            whileInView="show"
            variants={reveal}
            viewport={viewport}
            className="min-w-0 lg:col-span-8 lg:col-start-5"
          >
            <h2 className="max-w-[900px] text-[clamp(2rem,4.2vw,4.25rem)] font-light leading-[1.13] tracking-[-0.045em] text-[#171918]">
              Architecture sets direction.
              <span className="mt-1 block text-[#737874]">
                Engineering ensures performance.
              </span>
              <span className="mt-1 block">
                Execution delivers certainty.
              </span>
            </h2>

            {/* Supporting information */}
            <div className="mt-10 grid gap-8 border-t border-[#303432]/15 pt-7 sm:mt-12 sm:grid-cols-2 sm:gap-10 sm:pt-9 lg:mt-14">
              <div>
                <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.18em] text-[#967A54]">
                  Our Approach
                </p>

                <p className="max-w-[390px] text-[14px] leading-[1.85] text-[#4F5551] sm:text-[15px]">
                  We focus on buildability, compliance and long-term
                  asset performance across Indian regulatory and
                  operational environments.
                </p>
              </div>

              <div className="sm:border-l sm:border-[#303432]/15 sm:pl-8 lg:pl-10">
                <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.18em] text-[#967A54]">
                  Operating Principle
                </p>

                <p className="max-w-[350px] text-[20px] font-light leading-[1.35] tracking-[-0.025em] text-[#303432] sm:text-[23px]">
                  Control complexity before it reaches the site.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


/* =========================================================
   PROJECTS
========================================================= */

function ProjectsShowcase() {
  const [projects, setProjects] = useState([]);
  const [active, setActive] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    let mounted = true;

    async function loadProjects() {
      try {
        const data = await sanityClient.fetch(`
          *[
            _type == "project" &&
            published == true &&
            projectType == "main"
          ]
          | order(order asc)[0...3] {
            title,
            location,
            category,
            scale,
            description,
            "images": images[].asset->url
          }
        `);

        if (mounted) {
          setProjects(Array.isArray(data) ? data : []);
          setLoadError(false);
        }
      } catch (error) {
        console.error("Failed to load homepage projects:", error);
        if (mounted) setLoadError(true);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadProjects();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    setImageIndex(0);
  }, [active]);

  useEffect(() => {
    const imageCount = projects[active]?.images?.length || 0;
    if (prefersReducedMotion || imageCount < 2) return undefined;

    const timer = setInterval(() => {
      setImageIndex((current) => (current + 1) % imageCount);
    }, 4800);

    return () => clearInterval(timer);
  }, [active, projects, prefersReducedMotion]);

  const project = projects[active];

  


return (
  <section className="overflow-hidden bg-[#F7F6F2] py-10 sm:py-12 lg:py-14">
    <div className="mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-10">
      {/* Section heading */}
      <div className="mb-6 flex flex-col gap-3 sm:mb-7 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <SectionLabel number="">Selected Projects</SectionLabel>

          <h2 className="mt-3 text-[clamp(2rem,4vw,3.5rem)] font-light leading-[1.05] tracking-[-0.05em] text-[#202421]">
            A record of work.
            <span className="block text-[#858982]">
              Built to last.
            </span>
          </h2>
        </div>

        <Link
          to="/projects"
          className="group inline-flex min-h-10 items-center gap-3 self-start text-[10px] uppercase tracking-[0.15em] text-[#303630] transition-colors hover:text-[#967A54] sm:self-auto"
        >
          View all projects
          <ArrowRight
            size={15}
            strokeWidth={1.3}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>

      {projects.length > 0 && project ? (
        <div>
          {/* Featured project */}
          <div className="grid min-w-0 gap-0 lg:grid-cols-[minmax(0,1fr)_270px] xl:grid-cols-[minmax(0,1fr)_300px]">
            {/* Project image and navigation */}
            <div className="min-w-0">
              <div
                className="group relative aspect-[4/3] overflow-hidden bg-[#E5E3DC] sm:aspect-[16/9] lg:h-[340px] lg:aspect-auto xl:h-[390px]"
                onTouchStart={(event) => {
                  event.currentTarget.dataset.touchStartX = String(
                    event.touches[0].clientX
                  );
                  event.currentTarget.dataset.touchStartY = String(
                    event.touches[0].clientY
                  );
                }}
                onTouchEnd={(event) => {
                  const startX = Number(
                    event.currentTarget.dataset.touchStartX
                  );
                  const startY = Number(
                    event.currentTarget.dataset.touchStartY
                  );

                  const endX = event.changedTouches[0].clientX;
                  const endY = event.changedTouches[0].clientY;

                  const deltaX = endX - startX;
                  const deltaY = endY - startY;

                  if (
                    Math.abs(deltaX) > 55 &&
                    Math.abs(deltaX) > Math.abs(deltaY) * 1.2 &&
                    projects.length > 1
                  ) {
                    setActive((current) =>
                      deltaX < 0
                        ? (current + 1) % projects.length
                        : (current - 1 + projects.length) %
                          projects.length
                    );
                    setImageIndex(0);
                  }
                }}
              >
                {/* Image with blended background */}
                {project.images?.length > 0 ? (
                  <>
                    {/* Blurred image fills the surrounding space */}
                    <img
                      src={project.images[imageIndex]}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      className="pointer-events-none absolute inset-0 h-full w-full scale-110 select-none object-cover blur-2xl opacity-60"
                    />

                    {/* Soft overlay blends the background with the site */}
                    <div className="pointer-events-none absolute inset-0 bg-[#F7F6F2]/10" />

                    {/* Full photograph remains sharp and uncropped */}
                    <motion.img
                      key={`${active}-${imageIndex}`}
                      initial={{ opacity: 0.65 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.35, ease }}
                      src={project.images[imageIndex]}
                      alt={project.title || "RafaBuildTec project"}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      className="absolute inset-0 z-[1] h-full w-full select-none object-contain"
                    />
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <HeroDrawing />
                  </div>
                )}

                {/* Subtle overlay for text readability */}
                <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-[#111512]/65 via-transparent to-[#111512]/10" />

                {/* Category label */}
                <div className="absolute left-4 top-4 z-[3] flex items-center gap-2 sm:left-6 sm:top-6">
                  <span className="h-px w-5 bg-[#C5AD87]" />
                  <span className="text-[8px] uppercase tracking-[0.18em] text-white sm:text-[9px]">
                    {project.category || "Selected Work"}
                  </span>
                </div>

                {/* Project title */}
                <div className="pointer-events-none absolute bottom-5 left-5 right-24 z-[3] text-white sm:bottom-7 sm:left-7 sm:right-28 lg:bottom-6 lg:left-6">
                  {project.scale && (
                    <p className="mb-2 text-[8px] uppercase tracking-[0.15em] text-white/85">
                      {project.scale}
                    </p>
                  )}

                  <h3 className="max-w-xl text-[clamp(1.45rem,3vw,2.5rem)] font-light leading-[1.1] tracking-[-0.04em]">
                    {project.title}
                  </h3>

                  {project.location && (
                    <p className="mt-2 text-[10px] text-white/90">
                      {project.location}
                    </p>
                  )}
                </div>

                {/* Mobile arrows: change images within this project */}
                {project.images?.length > 1 && (
                  <div className="absolute bottom-5 right-4 z-[4] flex items-center gap-2 sm:bottom-7 sm:right-6 lg:hidden">
                    <button
                      type="button"
                      onClick={() =>
                        setImageIndex((current) => {
                          const length = project.images.length;
                          return (current - 1 + length) % length;
                        })
                      }
                      aria-label="Previous project image"
                      className="flex h-10 w-10 items-center justify-center border border-white/60 bg-[#202421]/35 text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-[#202421]"
                    >
                      <ChevronLeft size={18} strokeWidth={1.4} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setImageIndex(
                          (current) =>
                            (current + 1) % project.images.length
                        )
                      }
                      aria-label="Next project image"
                      className="flex h-10 w-10 items-center justify-center border border-white/60 bg-[#202421]/35 text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-[#202421]"
                    >
                      <ChevronRight size={18} strokeWidth={1.4} />
                    </button>
                  </div>
                )}

                {/* Desktop arrows: change images within this project */}
                {project.images?.length > 1 && (
                  <div className="absolute right-5 top-5 z-[4] hidden items-center gap-2 lg:flex">
                    <button
                      type="button"
                      onClick={() =>
                        setImageIndex((current) => {
                          const length = project.images.length;
                          return (current - 1 + length) % length;
                        })
                      }
                      aria-label="Previous project image"
                      className="flex h-9 w-9 items-center justify-center border border-white/60 bg-[#202421]/30 text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-[#202421]"
                    >
                      <ChevronLeft size={16} strokeWidth={1.3} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setImageIndex(
                          (current) =>
                            (current + 1) % project.images.length
                        )
                      }
                      aria-label="Next project image"
                      className="flex h-9 w-9 items-center justify-center border border-white/60 bg-[#202421]/30 text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-[#202421]"
                    >
                      <ChevronRight size={16} strokeWidth={1.3} />
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile image indicators */}
              {project.images?.length > 1 && (
                <div className="flex items-center justify-between border-b border-[#252A26]/15 py-3 lg:hidden">
                  <div className="flex items-center gap-2">
                    {project.images.map((image, index) => (
                      <button
                        key={`${project.title}-image-${index}`}
                        type="button"
                        onClick={() => setImageIndex(index)}
                        aria-label={`View image ${index + 1}`}
                        aria-pressed={imageIndex === index}
                        className={`h-1.5 transition-all duration-300 ${
                          imageIndex === index
                            ? "w-7 bg-[#967A54]"
                            : "w-1.5 rounded-full bg-[#252A26]/25"
                        }`}
                      />
                    ))}
                  </div>

                  <span className="text-[9px] tabular-nums tracking-[0.12em] text-[#777C75]">
                    {String(imageIndex + 1).padStart(2, "0")}
                    <span className="mx-1.5 text-[#B0B2AA]">/</span>
                    {String(project.images.length).padStart(2, "0")}
                  </span>
                </div>
              )}

              {/* Clear mobile project navigation */}
              {projects.length > 1 && (
                <div className="flex items-center justify-between gap-2 border-b border-[#252A26]/15 py-3 lg:hidden">
                  <button
                    type="button"
                    onClick={() => {
                      setActive(
                        (current) =>
                          (current - 1 + projects.length) %
                          projects.length
                      );
                      setImageIndex(0);
                    }}
                    aria-label="View previous project"
                    className="group inline-flex min-h-10 items-center gap-1.5 text-[9px] uppercase tracking-[0.08em] text-[#555C55] transition-colors hover:text-[#967A54]"
                  >
                    <ChevronLeft size={17} strokeWidth={1.4} />
                    <span>Previous</span>
                  </button>

                  <span className="shrink-0 text-[9px] uppercase tracking-[0.1em] text-[#777C75]">
                    Project {active + 1} of {projects.length}
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      setActive(
                        (current) => (current + 1) % projects.length
                      );
                      setImageIndex(0);
                    }}
                    aria-label="View next project"
                    className="group inline-flex min-h-10 items-center gap-1.5 text-[9px] uppercase tracking-[0.08em] text-[#252A26] transition-colors hover:text-[#967A54]"
                  >
                    <span>Next</span>
                    <ChevronRight size={17} strokeWidth={1.4} />
                  </button>
                </div>
              )}
            </div>

            {/* Compact project information */}
            <aside className="flex min-w-0 flex-col border border-t-0 border-[#252A26]/15 bg-[#F1F0EA] p-5 sm:p-6 lg:border-l-0 lg:border-t lg:p-5 xl:p-6">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[9px] uppercase tracking-[0.15em] text-[#777C75]">
                  Project overview
                </span>

                <span className="text-[10px] tabular-nums text-[#967A54]">
                  {String(active + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="my-4 h-px bg-[#252A26]/15" />

              <p className="mb-2 text-[9px] uppercase tracking-[0.14em] text-[#967A54]">
                About the project
              </p>

              <p className="text-[12px] leading-[1.8] text-[#565D56] sm:text-[13px]">
                {project.description ||
                  "A considered approach to construction, technical coordination and long-term project performance."}
              </p>

              <div className="my-4 h-px bg-[#252A26]/15" />

              <div className="grid grid-cols-[70px_minmax(0,1fr)] gap-3 py-1">
                <p className="text-[9px] uppercase tracking-[0.1em] text-[#777C75]">
                  Location
                </p>

                <p className="text-[12px] leading-5 text-[#252A26]">
                  {project.location || "India"}
                </p>
              </div>

              <div className="mt-3 grid grid-cols-[70px_minmax(0,1fr)] gap-3 py-1">
                <p className="text-[9px] uppercase tracking-[0.1em] text-[#777C75]">
                  Sector
                </p>

                <p className="text-[12px] leading-5 text-[#252A26]">
                  {project.category || "Construction"}
                </p>
              </div>

              {project.scale && (
                <div className="mt-3 grid grid-cols-[70px_minmax(0,1fr)] gap-3 py-1">
                  <p className="text-[9px] uppercase tracking-[0.1em] text-[#777C75]">
                    Scale
                  </p>

                  <p className="text-[12px] leading-5 text-[#252A26]">
                    {project.scale}
                  </p>
                </div>
              )}

              <Link
                to="/projects"
                className="group mt-5 flex min-h-10 items-center justify-between gap-3 border-t border-[#252A26]/15 pt-4 text-[9px] uppercase tracking-[0.12em] text-[#252A26] transition-colors hover:text-[#967A54] lg:mt-auto"
              >
                Explore portfolio

                <ArrowRight
                  size={15}
                  strokeWidth={1.3}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </aside>
          </div>

          {/* Desktop project selector */}
          {projects.length > 1 && (
            <div className="mt-5 hidden border-t border-[#252A26]/15 lg:grid lg:grid-cols-3">
              {projects.map((item, index) => (
                <button
                  key={`${item.title}-${index}`}
                  type="button"
                  onClick={() => {
                    setActive(index);
                    setImageIndex(0);
                  }}
                  aria-pressed={active === index}
                  className={`group flex min-w-0 items-start gap-3 border-b border-[#252A26]/15 py-3 pr-4 text-left transition-colors ${
                    index > 0
                      ? "border-l border-[#252A26]/15 pl-4"
                      : ""
                  } ${
                    active === index
                      ? "bg-[#F1F0EA]"
                      : "hover:bg-[#F1F0EA]/70"
                  }`}
                >
                  <span
                    className={`mt-0.5 text-[10px] ${
                      active === index
                        ? "text-[#967A54]"
                        : "text-[#92968E]"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[12px] text-[#252A26]">
                      {item.title}
                    </span>

                    <span className="mt-1 block truncate text-[9px] uppercase tracking-[0.1em] text-[#777C75]">
                      {item.location || item.category || "Project"}
                    </span>
                  </span>

                  <ArrowRight
                    size={14}
                    className={`mt-1 shrink-0 transition-transform ${
                      active === index
                        ? "text-[#967A54]"
                        : "text-[#92968E] group-hover:translate-x-1"
                    }`}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div
          className="border-y border-[#252A26]/15 py-10 sm:py-12"
          role="status"
          aria-live="polite"
        >
          <p className="text-[13px] leading-6 text-[#777C75]">
            {loading
              ? "Loading selected projects…"
              : loadError
                ? "Selected projects are temporarily unavailable. Please visit our project archive."
                : "Our project portfolio is being updated. Please visit the project archive to explore our work."}
          </p>

          {!loading && (
            <Link
              to="/projects"
              className="mt-4 inline-flex min-h-10 items-center gap-3 text-[10px] uppercase tracking-[0.14em] text-[#252A26] hover:text-[#967A54]"
            >
              Explore project archive
              <ArrowRight size={15} strokeWidth={1.3} />
            </Link>
          )}
        </div>
      )}

      {/* Section footer */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#252A26]/15 pt-4">
        <p className="text-[9px] uppercase tracking-[0.13em] text-[#777C75]">
          RafaBuildTec LLP
        </p>

        <p className="text-[9px] text-[#777C75]">
          Engineering · Execution · Integrity
        </p>
      </div>
    </div>
  </section>
);


}

/* =========================================================
   CAPABILITIES
========================================================= */



/* =========================================================
   CAPABILITY ILLUSTRATIONS
   Custom architectural line drawings — no external images
========================================================= */

function CapabilityIllustration({ type }) {
  const stroke = "#8B8B80";
  const light = "#D2D0C7";
  const accent = "#A18A68";

  return (
    <svg
      viewBox="0 0 520 300"
      className="h-full w-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Architectural technical illustration"
    >
      <defs>
        <pattern
          id={`cap-grid-${type}`}
          width="12"
          height="12"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M12 0H0V12"
            stroke={light}
            strokeWidth=".45"
            opacity=".5"
          />
        </pattern>
      </defs>

      <rect x="1" y="1" width="518" height="298" fill={`url(#cap-grid-${type})`} />

      {/* Shared architectural baseline */}
      <path d="M34 254H486" stroke={stroke} strokeWidth="1.1" />
      <path d="M34 262H486" stroke={light} strokeWidth="1" />
      <path d="M54 274H466" stroke={light} strokeWidth=".8" strokeDasharray="3 5" />

      {type === "commercial" && (
        <g>
          {/* Main institutional building */}
          <path d="M104 103L260 37L416 103" stroke={stroke} strokeWidth="1.5" />
          <path d="M121 103H399V254H121V103Z" stroke={stroke} strokeWidth="1.5" />
          <path d="M145 126H375V254H145V126Z" stroke={light} strokeWidth="1" />

          {/* Repeated facade bays */}
          {Array.from({ length: 8 }).map((_, i) => (
            <g key={i}>
              <rect
                x={155 + i * 27}
                y="137"
                width="17"
                height="40"
                stroke={stroke}
                strokeWidth=".9"
              />
              <rect
                x={155 + i * 27}
                y="188"
                width="17"
                height="40"
                stroke={stroke}
                strokeWidth=".9"
              />
            </g>
          ))}

          {/* Central entrance */}
          <path d="M230 254V204Q260 172 290 204V254" stroke={accent} strokeWidth="1.5" />
          <path d="M260 196V254" stroke={accent} strokeWidth="1" />
          <path d="M95 103H425" stroke={light} strokeWidth=".9" strokeDasharray="4 5" />
          <circle cx="260" cy="37" r="3" fill={accent} />
          <path d="M260 24V12M249 12H271" stroke={light} strokeWidth="1" />
        </g>
      )}

      {type === "highrise" && (
        <g>
          {/* Tower A */}
          <path d="M112 254V79L190 46L268 79V254" stroke={stroke} strokeWidth="1.5" />
          <path d="M112 79H268M190 46V254" stroke={light} strokeWidth="1" />

          {Array.from({ length: 7 }).map((_, i) => (
            <g key={i}>
              <path d={`M119 ${96 + i * 21}H261`} stroke={light} strokeWidth=".9" />
              <path d={`M128 ${86 + i * 21}V${101 + i * 21}`} stroke={stroke} strokeWidth=".8" />
              <path d={`M151 ${86 + i * 21}V${101 + i * 21}`} stroke={stroke} strokeWidth=".8" />
              <path d={`M229 ${86 + i * 21}V${101 + i * 21}`} stroke={stroke} strokeWidth=".8" />
              <path d={`M252 ${86 + i * 21}V${101 + i * 21}`} stroke={stroke} strokeWidth=".8" />
            </g>
          ))}

          {/* Secondary tower */}
          <path d="M302 254V119L355 94L408 119V254" stroke={stroke} strokeWidth="1.3" />
          <path d="M302 119H408M355 94V254" stroke={light} strokeWidth="1" />

          {Array.from({ length: 5 }).map((_, i) => (
            <g key={i}>
              <path d={`M309 ${137 + i * 21}H401`} stroke={light} strokeWidth=".9" />
              <path d={`M324 ${127 + i * 21}V${143 + i * 21}`} stroke={stroke} strokeWidth=".8" />
              <path d={`M385 ${127 + i * 21}V${143 + i * 21}`} stroke={stroke} strokeWidth=".8" />
            </g>
          ))}

          <path d="M90 254H430" stroke={accent} strokeWidth="1.2" />
          <path d="M190 34V18M182 18H198" stroke={light} strokeWidth="1" />
          <circle cx="190" cy="46" r="3" fill={accent} />
        </g>
      )}

      {type === "industrial" && (
        <g>
          {/* Warehouse roof and structure */}
          <path d="M64 139L168 75L272 139V254H64V139Z" stroke={stroke} strokeWidth="1.5" />
          <path d="M64 139H272M168 75V254" stroke={light} strokeWidth="1" />
          <path d="M79 149H257V239H79V149Z" stroke={light} strokeWidth="1" />

          {/* Loading bays */}
          {[91, 136, 181, 226].map((x, i) => (
            <g key={x}>
              <rect x={x} y="166" width="31" height="73" stroke={stroke} strokeWidth="1" />
              <path d={`M${x + 5} 177H${x + 26}M${x + 5} 185H${x + 26}`} stroke={light} strokeWidth="1" />
              {i === 1 && <path d={`M${x + 15} 166V239`} stroke={light} strokeWidth=".8" />}
            </g>
          ))}

          {/* Logistics tower / chimney */}
          <path d="M326 254V80H390V254" stroke={stroke} strokeWidth="1.4" />
          <path d="M326 104H390M326 129H390M326 154H390M326 179H390M326 204H390M326 229H390" stroke={light} strokeWidth="1" />
          <path d="M344 80V254M372 80V254" stroke={light} strokeWidth=".8" />

          {/* Ground circulation */}
          <path d="M48 254H447" stroke={accent} strokeWidth="1.2" />
          <path d="M286 254L305 222H410L430 254" stroke={light} strokeWidth="1" />
          <path d="M302 235H412" stroke={light} strokeWidth="1" strokeDasharray="4 4" />
        </g>
      )}

      {type === "infrastructure" && (
        <g>
          {/* Bridge deck */}
          <path d="M48 173H472" stroke={stroke} strokeWidth="2" />
          <path d="M48 182H472" stroke={light} strokeWidth="1" />
          <path d="M72 173V254M448 173V254" stroke={stroke} strokeWidth="1.5" />

          {/* Structural piers */}
          <path d="M144 173V254M176 173V254M344 173V254M376 173V254" stroke={stroke} strokeWidth="1.5" />
          <path d="M135 254H185M335 254H385" stroke={stroke} strokeWidth="1.3" />

          {/* Cable-stayed structure */}
          <path d="M260 48V173" stroke={accent} strokeWidth="2" />
          <path d="M224 173L260 48L296 173" stroke={stroke} strokeWidth="1.5" />

          {Array.from({ length: 5 }).map((_, i) => (
            <g key={i}>
              <path d={`M${224 + i * 9} ${173 - i * 25}L${260 + i * 10} 65`} stroke={light} strokeWidth=".9" />
              <path d={`M${296 - i * 9} ${173 - i * 25}L${260 - i * 10} 65`} stroke={light} strokeWidth=".9" />
            </g>
          ))}

          {/* Approach roads */}
          <path d="M48 194L116 194L144 254M472 194L404 194L376 254" stroke={light} strokeWidth="1" />
          <path d="M48 213H100M420 213H472" stroke={light} strokeWidth="1" strokeDasharray="4 5" />
          <circle cx="260" cy="48" r="3" fill={accent} />
        </g>
      )}
    </svg>
  );
}


/* =========================================================
   CAPABILITY CARD
========================================================= */

function CapabilityCard({ item, index }) {
  return (
    <motion.article
      initial="hidden"
      whileInView="show"
      variants={reveal}
      viewport={viewport}
      transition={{ delay: index * 0.07 }}
      className="group min-w-0 snap-start"
    >
      {/* Architectural drawing panel */}
      <div className="relative overflow-hidden border border-[#DCD9D1] bg-[#F8F7F3]">
        <div className="relative aspect-[1.65] overflow-hidden p-4 sm:aspect-[1.72] sm:p-5">
          <div className="absolute inset-3 border border-[#DCD9D1]/80 sm:inset-4" />

          <div className="absolute inset-5 transition-transform duration-700 ease-out group-hover:scale-[1.025] sm:inset-7">
            <CapabilityIllustration type={item.type} />
          </div>

          <span className="absolute left-5 top-5 font-mono text-[9px] tracking-[0.16em] text-[#777970] sm:left-6 sm:top-6">
            RB / {String(index + 1).padStart(2, "0")}
          </span>

          <span className="absolute bottom-5 right-5 text-[8px] uppercase tracking-[0.14em] text-[#777970] sm:bottom-6 sm:right-6">
            Built environment
          </span>
        </div>
      </div>

      {/* Capability information */}
      <div className="border-b border-[#D9D7D0] pb-5 pt-5 sm:pb-6 sm:pt-6">
        <div className="flex items-start">
          <h3 className="max-w-[360px] text-[17px] font-medium leading-[1.32] tracking-[-0.035em] text-[#202320] transition-colors duration-300 group-hover:text-[#806746] sm:text-[19px]">
            {item.title}
          </h3>
        </div>

        <p className="mt-2.5 max-w-[390px] text-[12px] leading-[1.8] text-[#686D67] sm:text-[13px]">
          {item.desc}
        </p>

        <div className="mt-5 flex items-center gap-2">
          <span className="h-px w-5 bg-[#967A54]" />
          <span className="text-[9px] uppercase tracking-[0.15em] text-[#777970]">
            Engineered delivery
          </span>
        </div>
      </div>
    </motion.article>
  );
}


/* =========================================================
   CORE CAPABILITIES
========================================================= */

function CapabilityBands() {
  const items = useMemo(
    () => [
      {
        type: "commercial",
        title: "Commercial & Institutional Campuses",
        desc: "Corporate offices, hospitals, educational and institutional facilities.",
      },
      {
        type: "highrise",
        title: "High-Rise & Mixed-Use Developments",
        desc: "Urban residential towers and integrated mixed-use developments.",
      },
      {
        type: "industrial",
        title: "Industrial, Logistics & Manufacturing",
        desc: "Factories, warehouses, logistics parks and industrial infrastructure.",
      },
      {
        type: "infrastructure",
        title: "Public Infrastructure & EPC Delivery",
        desc: "Government, public-sector and EPC-led infrastructure projects.",
      },
    ],
    []
  );

  return (
    <section
      id="capabilities"
      className="relative overflow-hidden bg-[#F4F2ED] py-14 sm:py-20 lg:py-24"
    >
      <TechnicalCorner className="right-8 top-8 hidden sm:block lg:right-10 lg:top-10" />

      <div className="mx-auto max-w-[1160px] px-5 sm:px-8 lg:px-10">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="show"
          variants={reveal}
          viewport={viewport}
          className="mb-9 flex flex-col gap-5 sm:mb-12 lg:mb-14 lg:flex-row lg:items-end lg:justify-between lg:gap-12"
        >
          <div className="max-w-[620px]">
            <SectionLabel number="">Core Capabilities</SectionLabel>

            <h2 className="mt-5 max-w-[560px] text-[32px] font-medium leading-[1.12] tracking-[-0.045em] text-[#202320] sm:text-[38px] lg:text-[43px]">
              Different assets.
              <br />
              <span className="text-[#777970]">
                One standard of delivery.
              </span>
            </h2>
          </div>

          <p className="max-w-[340px] text-[13px] leading-[1.85] text-[#686D67] lg:pb-1">
            From complex buildings to critical infrastructure, every project
            is guided by buildability, technical coordination and lasting
            quality.
          </p>
        </motion.div>

        {/* Mobile swipe gallery / Desktop grid */}
        <div
          className="
            flex snap-x snap-mandatory gap-4 overflow-x-auto
            overscroll-x-contain pb-3
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
            sm:gap-5
            md:grid md:grid-cols-2 md:gap-x-7 md:gap-y-10
            md:overflow-visible md:pb-0
            lg:gap-x-9 lg:gap-y-12
          "
        >
          {items.map((item, index) => (
            <div
              key={item.type}
              className="
                w-[88%] min-w-0 max-w-[390px] shrink-0 snap-start
                sm:w-[62%]
                md:w-auto md:max-w-none md:shrink
              "
            >
              <CapabilityCard item={item} index={index} />
            </div>
          ))}
        </div>

        {/* Mobile swipe hint */}
        <div className="mt-4 flex items-center justify-between md:hidden">
          <span className="text-[9px] uppercase tracking-[0.15em] text-[#777970]">
            Explore capabilities
          </span>
          <span className="text-[10px] tracking-[0.06em] text-[#777970]">
            Swipe to explore →
          </span>
        </div>

        {/* Desktop footer */}
        <div className="mt-10 hidden items-center justify-between border-t border-[#D9D7D0] pt-4 md:flex">
          <span className="text-[9px] uppercase tracking-[0.16em] text-[#777970]">
            RafaBuildTec LLP
          </span>

          <span className="text-[9px] uppercase tracking-[0.14em] text-[#777970]">
            Planning · Engineering · Execution
          </span>
        </div>
      </div>
    </section>
  );
}




function GovernanceDiagram() {
  const stages = [
    { n: "01", title: "PLAN", detail: "Identify project risks" },
    { n: "02", title: "CONTROL", detail: "Manage execution" },
    { n: "03", title: "VERIFY", detail: "Check quality and safety" },
    { n: "04", title: "DELIVER", detail: "Document outcomes" },
  ];

  return (
    <div className="w-full min-w-0 border border-[#303432]/15 bg-[#F4F2ED] p-4 sm:p-5 lg:p-6">
      <div className="flex items-center justify-between gap-3 border-b border-[#303432]/15 pb-3">
        <div>
          <p className="text-[8px] uppercase tracking-[0.22em] text-[#967A54]">
            Delivery Control
          </p>
          <p className="mt-1 text-[13px] text-[#303432] sm:text-sm">
            A connected process
          </p>
        </div>

        <span className="shrink-0 text-[9px] tracking-[0.15em] text-[#967A54]">
          RB / 05
        </span>
      </div>

      {/* Desktop process diagram */}
      <svg
        viewBox="0 0 560 330"
        className="mt-4 hidden w-full md:block"
        role="img"
        aria-label="Project delivery process: plan, control, verify and deliver"
      >
        <defs>
          <marker
            id="gov-arrow-desktop"
            markerWidth="7"
            markerHeight="7"
            refX="5"
            refY="3"
            orient="auto"
          >
            <path d="M0 0 L6 3 L0 6" fill="#967A54" />
          </marker>
        </defs>

        <g
          fill="none"
          stroke="#967A54"
          strokeWidth="1.2"
          markerEnd="url(#gov-arrow-desktop)"
        >
          <path d="M255 90 H295" />
          <path d="M435 130 V174 H125 V190" />
          <path d="M255 232 H295" />
        </g>

        {stages.map((stage, index) => {
          const positions = [
            [34, 48],
            [310, 48],
            [34, 208],
            [310, 208],
          ];
          const [x, y] = positions[index];

          return (
            <g key={stage.n} transform={`translate(${x}, ${y})`}>
              <rect
                width="216"
                height="82"
                fill="#FAF9F6"
                stroke="#303432"
                strokeOpacity=".19"
              />
              <rect width="3" height="82" fill="#967A54" />

              <text
                x="17"
                y="23"
                fill="#967A54"
                fontSize="10"
                letterSpacing="1.5"
              >
                {stage.n}
              </text>

              <text
                x="17"
                y="47"
                fill="#303432"
                fontSize="15"
                letterSpacing=".6"
              >
                {stage.title}
              </text>

              <text
                x="17"
                y="66"
                fill="#737874"
                fontSize="11"
              >
                {stage.detail}
              </text>
            </g>
          );
        })}

        <text
          x="280"
          y="315"
          fill="#737874"
          fontSize="10"
          textAnchor="middle"
          letterSpacing="1.5"
        >
          REVIEW · DOCUMENT · IMPROVE
        </text>
      </svg>

      {/* Mobile process diagram: readable vertical flow */}
      <svg
        viewBox="0 0 320 294"
        className="mt-4 block w-full md:hidden"
        role="img"
        aria-label="Four project delivery stages, from planning through delivery"
      >
        <defs>
          <marker
            id="gov-arrow-mobile"
            markerWidth="6"
            markerHeight="6"
            refX="4"
            refY="3"
            orient="auto"
          >
            <path d="M0 0 L5 3 L0 6" fill="#967A54" />
          </marker>
        </defs>

        {stages.map((stage, index) => {
          const y = 8 + index * 68;

          return (
            <g key={stage.n} transform={`translate(8, ${y})`}>
              <rect
                width="304"
                height="52"
                fill="#FAF9F6"
                stroke="#303432"
                strokeOpacity=".2"
              />
              <rect width="3" height="52" fill="#967A54" />

              <text
                x="15"
                y="19"
                fill="#967A54"
                fontSize="9"
                letterSpacing="1"
              >
                {stage.n}
              </text>

              <text
                x="45"
                y="21"
                fill="#303432"
                fontSize="12"
                letterSpacing=".5"
              >
                {stage.title}
              </text>

              <text
                x="45"
                y="37"
                fill="#737874"
                fontSize="10"
              >
                {stage.detail}
              </text>

              {index < stages.length - 1 && (
                <path
                  d="M152 52 V64"
                  fill="none"
                  stroke="#967A54"
                  strokeWidth="1.1"
                  markerEnd="url(#gov-arrow-mobile)"
                />
              )}
            </g>
          );
        })}
      </svg>

      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-t border-[#303432]/15 pt-3">
        <span className="text-[8px] uppercase tracking-[0.12em] text-[#737874]">
          Project Oversight
        </span>
        <span className="text-[8px] uppercase tracking-[0.12em] text-[#967A54]">
          Continuous Review
        </span>
      </div>
    </div>
  );
}

function GovernanceSafety() {
  const pillars = [
    {
      number: "01",
      title: "Risk & Compliance",
      desc: "Identify project risks, coordinate approvals and maintain relevant compliance records.",
      tags: ["Risk", "Approvals"],
    },
    {
      number: "02",
      title: "Health & Safety",
      desc: "Prioritise safe site practices, workforce awareness and consistent safety checks.",
      tags: ["Site Safety", "Prevention"],
    },
    {
      number: "03",
      title: "Quality Assurance",
      desc: "Use inspections, material checks and documented reviews to support quality delivery.",
      tags: ["Inspection", "Quality"],
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#E8E6E0] py-14 sm:py-20 lg:py-24">
      <GridTexture opacity={0.018} size={140} />

      <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        {/* Introduction and diagram */}
        <div className="grid min-w-0 items-start gap-7 lg:grid-cols-12 lg:gap-12">
          <motion.div
            initial="hidden"
            whileInView="show"
            variants={revealLeft}
            viewport={viewport}
            className="min-w-0 lg:col-span-5 lg:pt-1"
          >
            <SectionLabel number="">
              Governance Framework
            </SectionLabel>

            <h2 className="mt-6 max-w-xl text-[clamp(2rem,3.6vw,3.65rem)] font-light leading-[1.06] tracking-[-0.04em] text-[#171918]">
              Built on control.
              <br />
              <span className="text-[#737874]">
                Delivered with care.
              </span>
            </h2>

            <p className="mt-5 max-w-md text-[13px] leading-[1.8] text-[#4F5551] sm:text-sm">
              Responsible project delivery depends on clear oversight,
              safe working practices and consistent quality checks
              throughout the construction process.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <span className="h-px w-8 shrink-0 bg-[#967A54]" />
              <span className="text-[8px] uppercase tracking-[0.19em] text-[#737874] sm:text-[9px]">
                Our Approach to Delivery
              </span>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            variants={revealRight}
            viewport={viewport}
            className="min-w-0 lg:col-span-6 lg:col-start-7"
          >
            <GovernanceDiagram />
          </motion.div>
        </div>

        {/* Governance pillars */}
        <div className="mt-9 border-t border-[#303432]/20 sm:mt-12 lg:mt-16">
          <div className="grid min-w-0 md:grid-cols-3">
            {pillars.map((pillar, index) => (
              <motion.article
                key={pillar.number}
                initial="hidden"
                whileInView="show"
                variants={reveal}
                viewport={viewport}
                className={[
                  "min-w-0 py-6 sm:py-7 md:pr-6 lg:pr-9",
                  index !== 0
                    ? "border-t border-[#303432]/15 md:border-l md:border-t-0 md:pl-6 lg:pl-9"
                    : "",
                ].join(" ")}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[9px] tracking-[0.18em] text-[#967A54]">
                    {pillar.number}
                  </span>
                  <span className="h-px w-7 shrink-0 bg-[#967A54]/60" />
                </div>

                <h3 className="mt-4 text-[18px] font-normal tracking-[-0.025em] text-[#303432] sm:text-xl">
                  {pillar.title}
                </h3>

                <p className="mt-3 max-w-sm text-[12px] leading-[1.8] text-[#737874] sm:text-[13px]">
                  {pillar.desc}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {pillar.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-[#303432]/15 px-2 py-1 text-[8px] uppercase tracking-[0.1em] text-[#737874]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Closing line */}
        <div className="flex flex-col gap-2 border-t border-[#303432]/20 pt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <p className="text-[10px] leading-relaxed text-[#4F5551] sm:text-[11px]">
            Clear processes. Accountable execution. Measured outcomes.
          </p>

          <span className="text-[8px] tracking-[0.17em] text-[#967A54]">
            RAFA BUILDTEC LLP
          </span>
        </div>
      </div>
    </section>
  );
}


/* =========================================================
   DELIVERY FRAMEWORK
========================================================= */



function DeliveryFramework() {
  const [activeStep, setActiveStep] = useState(0);
  const mobileTrackRef = useRef(null);

  const steps = [
    {
      number: "01",
      title: "Pre-Construction",
      desc: "Establish project feasibility, define budgets, coordinate planning and progress the required statutory approvals.",
      shortDesc:
        "Planning, feasibility, budgeting and statutory approvals.",
      detail: "PLAN & PREPARE",
      items: ["Feasibility", "Budgeting", "Approvals"],
    },
    {
      number: "02",
      title: "Engineering & Controls",
      desc: "Coordinate design, bills of quantities, procurement and project schedules to maintain control over delivery.",
      shortDesc:
        "Design coordination, BOQs, schedules and procurement.",
      detail: "COORDINATE & CONTROL",
      items: ["Design", "Scheduling", "Procurement"],
    },
    {
      number: "03",
      title: "Execution & Handover",
      desc: "Manage site execution, inspections, testing and project documentation through to handover.",
      shortDesc:
        "Site execution, inspections, testing and project handover.",
      detail: "EXECUTE & DELIVER",
      items: ["Execution", "Inspection", "Handover"],
    },
  ];

  const goToStep = (index) => {
    const nextIndex = Math.max(0, Math.min(steps.length - 1, index));

    setActiveStep(nextIndex);

    const track = mobileTrackRef.current;
    const card = track?.children?.[nextIndex];

    if (track && card) {
      track.scrollTo({
        left: card.offsetLeft - track.offsetLeft,
        behavior: "smooth",
      });
    }
  };

  const handleMobileScroll = () => {
    const track = mobileTrackRef.current;
    if (!track) return;

    const cards = Array.from(track.children);
    if (!cards.length) return;

    const trackCenter = track.scrollLeft + track.clientWidth / 2;

    let nearestIndex = 0;
    let nearestDistance = Infinity;

    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(cardCenter - trackCenter);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    setActiveStep(nearestIndex);
  };

  return (
    <section className="relative overflow-hidden bg-[#FAF9F6] py-14 sm:py-20 lg:py-24">
      <TechnicalCorner className="right-6 top-8 sm:right-10 sm:top-10" />

      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        {/* Section heading */}
        <motion.div
          initial="hidden"
          whileInView="show"
          variants={reveal}
          viewport={viewport}
          className="grid gap-5 lg:grid-cols-12 lg:gap-12"
        >
          <div className="lg:col-span-4">
            <SectionLabel number="">
              Execution Architecture
            </SectionLabel>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <h2 className="text-[clamp(2.1rem,4vw,3.8rem)] font-light leading-[1.04] tracking-[-0.04em] text-[#171918]">
              From planning
              <br />
              <span className="text-[#737874]">
                to project delivery.
              </span>
            </h2>

            <p className="mt-4 max-w-lg text-[13px] leading-[1.8] text-[#4F5551] sm:text-sm">
              A structured approach connecting early planning,
              engineering coordination and site execution through
              to project handover.
            </p>
          </div>
        </motion.div>

        {/* MOBILE: interactive horizontal timeline */}
        <div className="mt-8 md:hidden">
          {/* Progress navigation */}
          <div className="mb-5 flex items-center justify-between gap-4">
            <span className="text-[9px] uppercase tracking-[0.18em] text-[#737874]">
              Delivery stages
            </span>

            <span
              className="text-[10px] tracking-[0.14em] text-[#967A54]"
              aria-live="polite"
              aria-atomic="true"
            >
              {steps[activeStep].number} / 03
            </span>
          </div>

          <div className="mb-5 grid grid-cols-3 gap-2">
            {steps.map((step, index) => (
              <button
                key={step.number}
                type="button"
                onClick={() => goToStep(index)}
                aria-label={`Show stage ${step.number}: ${step.title}`}
                aria-current={activeStep === index ? "step" : undefined}
                className="group min-w-0 py-1 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#967A54]"
              >
                <span
                  className={`mb-2 block h-[2px] transition-colors duration-300 ${
                    activeStep === index
                      ? "bg-[#967A54]"
                      : "bg-[#303432]/15"
                  }`}
                />

                <span
                  className={`block text-[9px] tracking-[0.12em] transition-colors ${
                    activeStep === index
                      ? "text-[#967A54]"
                      : "text-[#737874]"
                  }`}
                >
                  {step.number}
                </span>
              </button>
            ))}
          </div>

          {/* Swipeable cards */}
          <div
            ref={mobileTrackRef}
            onScroll={handleMobileScroll}
            className="flex snap-x snap-mandatory gap-3 overflow-x-auto scrollbar-none"
            style={{ scrollbarWidth: "none" }}
            aria-label="Delivery framework stages. Swipe horizontally to explore."
          >
            {steps.map((step, index) => (
              <article
                key={step.number}
                className="w-full min-w-full snap-center"
                aria-label={`Stage ${step.number}: ${step.title}`}
              >
                <div
                  className={`flex min-h-[270px] flex-col border p-5 transition-colors duration-300 ${
                    activeStep === index
                      ? "border-[#967A54]/50 bg-[#F4F2ED]"
                      : "border-[#303432]/15 bg-[#F4F2ED]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-10 w-10 items-center justify-center border border-[#967A54]">
                      <span className="text-[10px] tracking-[0.14em] text-[#967A54]">
                        {step.number}
                      </span>
                    </div>

                    <span className="pt-1 text-[8px] uppercase tracking-[0.17em] text-[#967A54]">
                      {step.detail}
                    </span>
                  </div>

                  <h3 className="mt-6 max-w-sm text-[23px] font-light leading-tight tracking-[-0.03em] text-[#303432]">
                    {step.title}
                  </h3>

                  <p className="mt-3 max-w-md text-[12px] leading-[1.8] text-[#737874]">
                    {step.shortDesc}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-2 pt-6">
                    {step.items.map((item) => (
                      <span
                        key={item}
                        className="border border-[#303432]/15 px-2 py-1 text-[8px] uppercase tracking-[0.1em] text-[#737874]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Controls */}
          <div className="mt-4 flex items-center justify-between gap-4">
            <p className="text-[8px] uppercase tracking-[0.14em] text-[#737874]">
              Swipe to explore
            </p>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => goToStep(activeStep - 1)}
                disabled={activeStep === 0}
                aria-label="Previous delivery stage"
                className="flex h-10 w-10 items-center justify-center border border-[#303432]/20 text-[#303432] transition-colors hover:border-[#967A54] disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronLeft size={16} strokeWidth={1.3} />
              </button>

              <button
                type="button"
                onClick={() => goToStep(activeStep + 1)}
                disabled={activeStep === steps.length - 1}
                aria-label="Next delivery stage"
                className="flex h-10 w-10 items-center justify-center border border-[#303432]/20 text-[#303432] transition-colors hover:border-[#967A54] disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronRight size={16} strokeWidth={1.3} />
              </button>
            </div>
          </div>
        </div>

        {/* DESKTOP: original three-column timeline */}
        <div className="relative mt-14 hidden md:block lg:mt-16">
          <div className="absolute left-[16.666%] right-[16.666%] top-6 h-px bg-[#303432]/20" />

          <div className="grid grid-cols-3">
            {steps.map((step, index) => (
              <motion.article
                key={step.number}
                initial="hidden"
                whileInView="show"
                variants={reveal}
                viewport={viewport}
                className={[
                  "relative min-w-0 border-t border-[#303432]/15 pt-7",
                  index === 0 ? "pr-6 lg:pr-9" : "px-6 lg:px-9",
                  index === 2 ? "pr-0" : "",
                  index === 0 ? "pl-0" : "",
                  index !== 0
                    ? "border-l border-[#303432]/15"
                    : "",
                ].join(" ")}
              >
                <div className="relative z-10 flex h-12 w-12 items-center justify-center border border-[#967A54] bg-[#FAF9F6]">
                  <span className="text-[10px] tracking-[0.14em] text-[#967A54]">
                    {step.number}
                  </span>
                </div>

                <p className="mt-7 text-[8px] uppercase tracking-[0.18em] text-[#967A54]">
                  {step.detail}
                </p>

                <h3 className="mt-3 max-w-sm text-[22px] font-light leading-snug tracking-[-0.025em] text-[#303432] lg:text-[25px]">
                  {step.title}
                </h3>

                <p className="mt-3 max-w-sm text-[13px] leading-[1.8] text-[#737874]">
                  {step.desc}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {step.items.map((item) => (
                    <span
                      key={item}
                      className="border border-[#303432]/15 px-2 py-1 text-[8px] uppercase tracking-[0.1em] text-[#737874]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Closing statement */}
        <div className="mt-8 flex flex-col gap-2 border-t border-[#303432]/15 pt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 md:mt-12">
          <p className="text-[10px] leading-[1.8] text-[#4F5551] sm:text-[11px]">
            Clear phases. Coordinated decisions. Controlled execution.
          </p>

          <span className="text-[8px] uppercase tracking-[0.17em] text-[#967A54]">
            RafaBuildTec LLP
          </span>
        </div>
      </div>
    </section>
  );
}


/* =========================================================
   GEOGRAPHIC MAP
========================================================= */


/* =========================================================
   SECTION 07 — GEOGRAPHIC PRESENCE
   Replace the existing locations, KarnatakaMap and
   GeographicPresence definitions with this entire section.
   Requires existing: React useState, motion, GridTexture,
   SectionLabel, reveal, viewport.
========================================================= */

const locations = [
  { name: "Udupi", code: "UD", x: 270, y: 300, type: "Head office", note: "Project coordination and centralised controls.", icon: "headquarters" },
  { name: "Mangalore", code: "ML", x: 245, y: 365, type: "Coastal region", note: "Commercial and institutional project delivery.", icon: "coastal" },
  { name: "Hubli", code: "HB", x: 365, y: 220, type: "North Karnataka", note: "Industrial and logistics infrastructure.", icon: "industrial" },
  { name: "Belgaum", code: "BG", x: 390, y: 135, type: "North-west region", note: "Regional infrastructure and development works.", icon: "infrastructure" },
  { name: "Bangalore", code: "BL", x: 450, y: 405, type: "Southern region", note: "Urban and mixed-use developments.", icon: "urban" },
  { name: "Goa", code: "GA", x: 190, y: 205, type: "West coast", note: "Healthcare and hospitality project delivery.", icon: "hospitality" },
];

/* Architectural line icons used in the mobile location directory */
function LocationIcon({ type, active = false }) {
  const stroke = active ? "#967A54" : "#B5A58E";
  const line = {
    stroke,
    strokeWidth: 1.25,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    fill: "none",
  };

  return (
    <svg viewBox="0 0 64 64" className="h-11 w-11 sm:h-14 sm:w-14" fill="none" aria-hidden="true">
      {type === "headquarters" && <>
        <path d="M13 54V21L32 7L51 21V54" {...line} />
        <path d="M23 54V28H41V54M8 54H56M28 36H36M28 42H36" {...line} />
      </>}
      {type === "coastal" && <>
        <path d="M7 34H57M15 25V43M26 25V43M37 25V43M48 25V43" {...line} />
        <path d="M7 47C16 43 23 43 32 47C41 51 48 51 57 47" {...line} />
      </>}
      {type === "industrial" && <>
        <path d="M9 54V29H23V54M25 54V13H39V54M41 54V25H55V54M6 54H58" {...line} />
        <path d="M29 21H35M29 28H35M29 35H35" {...line} />
      </>}
      {type === "infrastructure" && <>
        <path d="M10 53V25L32 9L54 25V53M18 53V30L32 20L46 30V53M26 53V38H38V53M6 53H58" {...line} />
      </>}
      {type === "urban" && <>
        <path d="M9 54V32H22V54M25 54V15H40V54M43 54V25H55V54M6 54H58" {...line} />
        <path d="M30 23H35M30 30H35M30 37H35M14 39H18M47 32H51" {...line} />
      </>}
      {type === "hospitality" && <>
        <path d="M32 54V19M32 19L13 10M32 19L51 10M8 40C15 35 23 33 32 33C41 33 49 35 56 40M14 48H50" {...line} />
      </>}
    </svg>
  );
}

/* Schematic map: deliberately no information panel inside the map */
function KarnatakaMap({ active, setActive }) {
  const connections = [
    ["Udupi", "Mangalore"],
    ["Udupi", "Hubli"],
    ["Hubli", "Belgaum"],
    ["Hubli", "Bangalore"],
    ["Goa", "Udupi"],
    ["Mangalore", "Bangalore"],
  ];

  return (
    <div className="w-full">
      <svg
        viewBox="0 0 700 520"
        className="block h-auto w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="group"
        aria-label="Schematic regional network showing locations in Karnataka and Goa"
      >
        <defs>
          <pattern id="rafa-regional-grid" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M28 0H0V28" stroke="#303432" strokeOpacity=".045" strokeWidth=".7" />
          </pattern>
          <linearGradient id="rafa-regional-land" x1="180" y1="70" x2="520" y2="450" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F7F5F0" />
            <stop offset="1" stopColor="#DCD9D0" />
          </linearGradient>
        </defs>

        <rect width="700" height="520" fill="url(#rafa-regional-grid)" />
        <g stroke="#303432" strokeOpacity=".1" strokeDasharray="3 7">
          <path d="M100 130H600M100 250H600M100 370H600" />
          <path d="M230 70V450M370 70V450M510 70V450" />
        </g>

        {/* Stylised regional outline, not a surveyed boundary */}
        <path
          d="M274 64 C310 52 348 66 381 77 L435 91 C467 103 493 126 507 155 L522 188 L512 218 L530 248 L521 280 L539 309 L526 339 L508 365 L482 389 L466 416 L437 438 L411 448 L386 433 L357 417 L333 392 L309 370 L289 339 L276 310 L258 280 L247 247 L250 216 L258 184 L263 151 L257 121 Z"
          fill="url(#rafa-regional-land)"
          stroke="#303432"
          strokeOpacity=".4"
          strokeWidth="1.3"
        />
        <path d="M274 64C263 100 263 126 258 151L250 216L247 247L258 280L276 310L289 339L309 370L333 392" stroke="#967A54" strokeOpacity=".65" strokeWidth="1.5" />
        <path d="M184 153L209 147L227 160L233 184L222 207L200 215L184 196L179 174Z" fill="#E2DFD6" stroke="#303432" strokeOpacity=".3" />

        <g stroke="#303432" strokeOpacity=".12" strokeWidth="1">
          <path d="M265 147L484 203M252 224L510 273M275 301L511 332M306 366L468 389M348 79L331 392M424 94L437 438" />
        </g>

        <g stroke="#967A54" strokeWidth="1.4">
          {connections.map(([from, to]) => {
            const start = locations.find((item) => item.name === from);
            const end = locations.find((item) => item.name === to);
            const highlighted = active === from || active === to;
            return (
              <path
                key={`${from}-${to}`}
                d={`M${start.x} ${start.y}L${end.x} ${end.y}`}
                strokeOpacity={highlighted ? ".9" : ".3"}
                strokeWidth={highlighted ? "2" : "1"}
              />
            );
          })}
        </g>

        {locations.map((location) => {
          const isActive = active === location.name;
          return (
            <g
              key={location.name}
              role="button"
              tabIndex={0}
              aria-label={`Select ${location.name}`}
              aria-pressed={isActive}
              className="cursor-pointer outline-none"
              onClick={() => setActive(location.name)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setActive(location.name);
                }
              }}
            >
              <circle cx={location.x} cy={location.y} r="19" fill="transparent" />
              {isActive && <circle cx={location.x} cy={location.y} r="12" stroke="#967A54" strokeWidth="1.2" strokeOpacity=".7" />}
              <circle cx={location.x} cy={location.y} r={isActive ? 5.5 : 4} fill={isActive ? "#967A54" : "#303432"} stroke="#F7F5F0" strokeWidth="2" />
              <text x={location.x + 12} y={location.y - 10} fill={isActive ? "#303432" : "#737874"} fontSize="10" fontWeight={isActive ? "600" : "400"} letterSpacing=".5">
                {location.name.toUpperCase()}
              </text>
            </g>
          );
        })}

        <g fill="#737874" fontSize="8" letterSpacing="1.5">
          <text x="28" y="32">REGIONAL NETWORK</text>
          <text x="28" y="47">KARNATAKA / GOA</text>
          <text x="672" y="32" textAnchor="end">RB / 07</text>
          <text x="28" y="492">SCHEMATIC VIEW</text>
          <text x="672" y="492" textAnchor="end">06 LOCATIONS</text>
        </g>
        <g transform="translate(642 75)">
          <path d="M0 18V0M-4 5L0 0L4 5" stroke="#737874" strokeWidth="1" />
          <text x="0" y="31" textAnchor="middle" fill="#737874" fontSize="8">N</text>
        </g>
      </svg>
    </div>
  );
}

/* Main section */
function GeographicPresence() {
  const [active, setActive] = useState("Udupi");
  const activeLocation = locations.find((location) => location.name === active) || locations[0];
  const activeIndex = locations.findIndex((location) => location.name === active);

  return (
    <section id="regional-presence" className="relative overflow-hidden bg-[#E8E6E0] py-14 sm:py-20 lg:py-28">
      <GridTexture opacity={0.018} size={170} />

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="show"
          variants={reveal}
          viewport={viewport}
          className="grid gap-5 border-b border-[#303432]/15 pb-7 sm:pb-10 lg:grid-cols-12 lg:gap-8"
        >
          <div className="lg:col-span-4">
            <SectionLabel number="">Regional Footprint</SectionLabel>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <h2 className="text-[clamp(2.4rem,5.3vw,5rem)] font-light leading-[0.98] tracking-[-0.055em] text-[#303432]">
              Built around<br />
              <span className="text-[#737874]">regional understanding.</span>
            </h2>
            <p className="mt-4 max-w-xl text-[13px] leading-7 text-[#555B56] sm:mt-6 sm:text-sm">
              Local understanding, coordinated execution and consistent project controls across our regional network.
            </p>
          </div>
        </motion.div>

        {/* MOBILE: map with a compact floating location detail */}
        <div className="pt-7 lg:hidden">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[9px] uppercase tracking-[.19em] text-[#737874]">Explore our network</span>
            <span className="text-[10px] tabular-nums text-[#737874]">
              {String(activeIndex + 1).padStart(2, "0")} / {String(locations.length).padStart(2, "0")}
            </span>
          </div>

          

{/* Map with dedicated compact location strip */}
<div className="border border-[#303432]/12 bg-[#F2F0EA]/70 p-3 sm:p-5">
  <KarnatakaMap active={active} setActive={setActive} />

  {/* Compact details below map — never covers markers */}
  <motion.div
    key={activeLocation.name}
    initial={{ opacity: 0, y: 3 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.18 }}
    className="mt-2 flex items-center justify-between gap-3 border-t border-[#303432]/12 bg-[#F8F6F1]/80 px-3 py-3 sm:mt-3 sm:px-4 sm:py-4"
  >
    <div className="min-w-0 flex-1">
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <h3 className="text-base font-light leading-tight tracking-[-.03em] text-[#303432] sm:text-lg">
          {activeLocation.name}
        </h3>

        <span className="text-[8px] uppercase tracking-[.13em] text-[#967A54] sm:text-[9px]">
          {activeLocation.type}
        </span>
      </div>

      <p className="mt-1 line-clamp-1 text-[10px] leading-4 text-[#737874] sm:text-xs">
        {activeLocation.note}
      </p>
    </div>

    <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-[#967A54]/45 text-[8px] text-[#967A54] sm:h-8 sm:w-8 sm:text-[9px]">
      {activeLocation.code}
    </span>
  </motion.div>
</div>



          {/* Architectural SVG location selector */}
          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[9px] uppercase tracking-[.19em] text-[#737874]">Locations</span>
              <span className="text-[9px] uppercase tracking-[.12em] text-[#967A54]">Select to explore</span>
            </div>

            <div className="grid grid-cols-3 border-t border-[#303432]/15">
              {locations.map((location) => {
                const isActive = active === location.name;
                return (
                  <button
                    key={location.name}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActive(location.name)}
                    className={`flex min-h-[112px] flex-col items-center justify-center border-b border-r border-[#303432]/12 px-1.5 py-3 text-center transition-colors duration-200 ${isActive ? "bg-[#F2F0EA]/90" : "bg-transparent active:bg-[#F2F0EA]/60"}`}
                  >
                    <LocationIcon type={location.icon} active={isActive} />
                    <span className={`mt-2 text-[11px] tracking-[-.02em] ${isActive ? "font-medium text-[#303432]" : "font-normal text-[#454A46]"}`}>
                      {location.name}
                    </span>
                    <span className={`mt-1 h-px transition-all duration-200 ${isActive ? "w-7 bg-[#967A54]" : "w-3 bg-[#303432]/20"}`} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* DESKTOP: preserve the map-and-directory layout */}
        <div className="hidden gap-12 pt-12 lg:grid lg:grid-cols-12 lg:pt-14">
          <motion.div initial="hidden" whileInView="show" variants={reveal} viewport={viewport} className="min-w-0 lg:col-span-7">
            <div className="border border-[#303432]/12 bg-[#F2F0EA]/70 p-6 xl:p-7">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[9px] uppercase tracking-[.2em] text-[#737874]">Operational network</p>
                <span className="flex items-center gap-2 text-[9px] uppercase tracking-[.12em] text-[#737874]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#967A54]" /> Interactive map
                </span>
              </div>
              <KarnatakaMap active={active} setActive={setActive} />
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" variants={reveal} viewport={viewport} className="min-w-0 lg:col-span-5">
            <div className="flex items-end justify-between border-b border-[#303432]/15 pb-4">
              <div>
                <p className="text-[9px] uppercase tracking-[.2em] text-[#967A54]">Explore locations</p>
                <h3 className="mt-2 text-2xl font-light tracking-[-.04em] text-[#303432] xl:text-3xl">Our regional network</h3>
              </div>
              <span className="pb-1 text-[10px] text-[#737874]">01 — 06</span>
            </div>

            <div className="divide-y divide-[#303432]/12">
              {locations.map((location, index) => {
                const isActive = active === location.name;
                return (
                  <button
                    key={location.name}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActive(location.name)}
                    className={`group flex w-full items-start gap-4 py-4 text-left transition-colors xl:py-5 ${isActive ? "bg-[#F2F0EA]/70 px-3" : "px-1 hover:bg-[#F2F0EA]/40"}`}
                  >
                    <span className={`mt-1 w-7 shrink-0 text-[10px] ${isActive ? "text-[#967A54]" : "text-[#92958F]"}`}>{String(index + 1).padStart(2, "0")}</span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-3">
                        <span className="text-base text-[#303432] xl:text-lg">{location.name}</span>
                        {isActive && <span className="text-[8px] uppercase tracking-[.15em] text-[#967A54]">Selected</span>}
                      </span>
                      <span className="mt-1 block text-[10px] uppercase tracking-[.12em] text-[#737874]">{location.type}</span>
                      <span className={`block overflow-hidden text-xs leading-6 text-[#737874] transition-all ${isActive ? "mt-2 max-h-16 opacity-100" : "mt-0 max-h-0 opacity-0"}`}>{location.note}</span>
                    </span>
                    <span className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center border ${isActive ? "border-[#967A54] text-[#967A54]" : "border-[#303432]/15 text-[#737874]"}`}>
                      <svg viewBox="0 0 16 16" className={`h-3.5 w-3.5 transition-transform ${isActive ? "rotate-45" : ""}`} fill="none" aria-hidden="true">
                        <path d="M8 2.5V13.5M2.5 8H13.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="mt-6 border-t border-[#303432]/15 pt-5 text-xs leading-6 text-[#737874]">
              Local understanding. Centralised coordination. Consistent project controls.
            </p>
          </motion.div>
        </div>

        <div className="mt-8 border-t border-[#303432]/15 pt-5 sm:mt-12 lg:hidden">
          <p className="text-xs leading-6 text-[#737874]">Local understanding. Centralised coordination. Consistent project controls.</p>
        </div>
      </div>
    </section>
  );
}



/* =========================================================
   SECTION 08 — OUR JOURNEY
========================================================= */


/* =========================================================
   SECTION 08 — OUR JOURNEY
   Architectural timeline / Responsive redesign
========================================================= */

function Timeline() {
  const history = [
    {
      year: "2016",
      title: "Foundation",
      desc: "Establishing strong execution systems, site controls and compliance discipline.",
      label: "The beginning",
      number: "01",
    },
    {
      year: "2020",
      title: "Regional Scale",
      desc: "Expanding delivery across Karnataka and the west coast with multi-sector capability.",
      label: "Regional growth",
      number: "02",
    },
    {
      year: "2024",
      title: "Institutional Delivery",
      desc: "Undertaking complex, governance-driven project requirements for enterprises and institutions.",
      label: "Greater complexity",
      number: "03",
    },
    {
      year: "2026",
      title: "The Next Chapter",
      desc: "Building on established systems to strengthen project coordination, delivery standards and regional capabilities.",
      label: "Current direction",
      number: "04",
      current: true,
    },
  ];

  const MilestoneMark = ({ current = false, mobile = false }) => (
    <svg
      viewBox="0 0 48 48"
      className={`block ${mobile ? "h-9 w-9" : "h-12 w-12"}`}
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="1"
        y="1"
        width="46"
        height="46"
        stroke={current ? "#967A54" : "#303432"}
        strokeOpacity={current ? "1" : ".28"}
        strokeWidth="1"
      />

      <path
        d="M12 24H36M24 12V36"
        stroke={current ? "#967A54" : "#303432"}
        strokeOpacity={current ? ".6" : ".2"}
        strokeWidth=".8"
      />

      <circle
        cx="24"
        cy="24"
        r={current ? "6" : "4"}
        fill={current ? "#967A54" : "#F4F2ED"}
        stroke="#967A54"
        strokeWidth="1.2"
      />

      {current && (
        <circle
          cx="24"
          cy="24"
          r="10"
          stroke="#967A54"
          strokeOpacity=".45"
          strokeWidth=".8"
        />
      )}
    </svg>
  );

  return (
    <section
      id="our-journey"
      className="relative overflow-hidden bg-[#F4F2ED] py-14 sm:py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Section heading */}
        <motion.div
          initial="hidden"
          whileInView="show"
          variants={reveal}
          viewport={viewport}
          className="grid gap-6 border-b border-[#303432]/15 pb-8 sm:pb-10 lg:grid-cols-12 lg:gap-8"
        >
          <div className="lg:col-span-4">
            <SectionLabel number="">Our Journey</SectionLabel>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <h2 className="text-[clamp(2.4rem,5vw,5rem)] font-light leading-[0.98] tracking-[-0.055em] text-[#303432]">
              Built over time.
              <br />
              <span className="text-[#737874]">
                Moving forward with purpose.
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-[13px] leading-7 text-[#737874] sm:text-sm">
              From foundational execution systems to evolving delivery
              capabilities, every stage builds on the experience before it.
            </p>
          </div>
        </motion.div>

        {/* MOBILE — Compact vertical timeline */}
        <div className="pt-9 sm:pt-12 md:hidden">
          <div className="relative">
            {/* Continuous timeline rail */}
            <div className="absolute bottom-8 left-[17px] top-5 w-px bg-[#303432]/15" />

            <div className="space-y-7">
              {history.map((item, index) => (
                <motion.article
                  key={item.year}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                  }}
                  className="relative grid grid-cols-[36px_minmax(0,1fr)] gap-4"
                >
                  {/* Milestone marker */}
                  <div className="relative z-10 flex h-9 w-9 items-center justify-center bg-[#F4F2ED]">
                    <MilestoneMark current={item.current} mobile />
                  </div>

                  {/* Milestone content */}
                  <div
                    className={`min-w-0 border-b pb-6 ${
                      item.current
                        ? "border-[#967A54]/40"
                        : "border-[#303432]/12"
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span
                        className={`text-[11px] font-medium tracking-[.18em] ${
                          item.current
                            ? "text-[#967A54]"
                            : "text-[#737874]"
                        }`}
                      >
                        {item.year}
                      </span>

                      <span className="text-[8px] uppercase tracking-[.15em] text-[#92958F]">
                        {item.label}
                      </span>

                      {item.current && (
                        <span className="border border-[#967A54]/40 px-2 py-1 text-[7px] uppercase tracking-[.13em] text-[#967A54]">
                          Current
                        </span>
                      )}
                    </div>

                    <h3
                      className={`mt-3 font-light leading-tight tracking-[-.04em] text-[#303432] ${
                        item.current ? "text-[25px]" : "text-[22px]"
                      }`}
                    >
                      {item.title}
                    </h3>

                    <p className="mt-2 max-w-md text-[12px] leading-[1.8] text-[#737874]">
                      {item.desc}
                    </p>

                    <div className="mt-4 flex items-center gap-2">
                      <span
                        className={`h-px ${
                          item.current
                            ? "w-8 bg-[#967A54]"
                            : "w-5 bg-[#303432]/20"
                        }`}
                      />
                      <span className="text-[8px] uppercase tracking-[.17em] text-[#92958F]">
                        Milestone {item.number}
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>

        {/* DESKTOP — Four-stage architectural timeline */}
        <div className="relative hidden pt-14 md:block lg:pt-16">
          {/* Horizontal connecting line */}
          <div className="absolute left-[6.25%] right-[6.25%] top-[37px] h-px bg-[#303432]/15 lg:top-[39px]" />

          <div className="grid grid-cols-4 gap-5 lg:gap-8">
            {history.map((item, index) => (
              <motion.article
                key={item.year}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.08,
                }}
                className={`relative min-w-0 ${
                  item.current
                    ? "border-t border-[#967A54]/50 bg-[#ECE8DF]/65 px-4 pb-5 pt-4 lg:px-5"
                    : "pt-4"
                }`}
              >
                <div className="relative z-10 flex h-12 items-center">
                  <MilestoneMark current={item.current} />
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-x-2 gap-y-2">
                  <span
                    className={`text-[12px] tracking-[.2em] ${
                      item.current
                        ? "text-[#967A54]"
                        : "text-[#737874]"
                    }`}
                  >
                    {item.year}
                  </span>

                  {item.current && (
                    <span className="border border-[#967A54]/40 px-2 py-1 text-[7px] uppercase tracking-[.12em] text-[#967A54]">
                      Current
                    </span>
                  )}
                </div>

                <p className="mt-2 text-[8px] uppercase tracking-[.16em] text-[#92958F]">
                  {item.label}
                </p>

                <h3 className="mt-4 text-[23px] font-light leading-tight tracking-[-.04em] text-[#303432] lg:text-[26px]">
                  {item.title}
                </h3>

                <p className="mt-4 max-w-xs text-[12px] leading-[1.85] text-[#737874] lg:text-[13px]">
                  {item.desc}
                </p>

                <div className="mt-7 flex items-center gap-2">
                  <span
                    className={`h-px ${
                      item.current
                        ? "w-9 bg-[#967A54]"
                        : "w-5 bg-[#303432]/20"
                    }`}
                  />
                  <span className="text-[8px] uppercase tracking-[.16em] text-[#92958F]">
                    Milestone {item.number}
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Closing statement */}
        <div className="mt-8 flex flex-col gap-3 border-t border-[#303432]/15 pt-5 sm:mt-12 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-lg text-xs leading-6 text-[#737874]">
            Experience informs every decision. Discipline guides every
            stage of delivery.
          </p>

          <span className="text-[9px] uppercase tracking-[.18em] text-[#967A54]">
            2016 — 2026
          </span>
        </div>
      </div>
    </section>
  );
}


/* =========================================================
   TRUST
========================================================= */

/* =========================================================
   SECTION 09 — WHO WE WORK WITH
   Institutional trust / Editorial layout
========================================================= */

function TrustSection() {
  const groups = [
    {
      number: "01",
      title: "Global Developers",
      desc: "Long-term delivery partnerships",
      detail: "Development & delivery",
      type: "global",
    },
    {
      number: "02",
      title: "Industrial Leaders",
      desc: "Manufacturing & logistics environments",
      detail: "Industrial infrastructure",
      type: "industrial",
    },
    {
      number: "03",
      title: "Government Bodies",
      desc: "Public-sector & institutional works",
      detail: "Institutional projects",
      type: "government",
    },
    {
      number: "04",
      title: "Private Enterprises",
      desc: "Commercial & mixed-use developments",
      detail: "Commercial development",
      type: "enterprise",
    },
  ];

  const TrustIllustration = ({ type }) => {
    const line = {
      stroke: "#967A54",
      strokeWidth: 1.1,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      fill: "none",
    };

    return (
      <svg
        viewBox="0 0 240 160"
        className="h-full w-full"
        fill="none"
        aria-hidden="true"
      >
        {/* Drawing grid */}
        <g stroke="#303432" strokeOpacity=".08" strokeWidth=".7">
          <path d="M12 32H228M12 64H228M12 96H228M12 128H228" />
          <path d="M44 12V148M92 12V148M140 12V148M188 12V148" />
        </g>

        {type === "global" && (
          <>
            {/* Layered building massing */}
            <path
              d="M46 124V74L78 56L110 74V124"
              {...line}
            />
            <path
              d="M78 56V124M46 74L78 92L110 74"
              {...line}
            />
            <path
              d="M110 124V45L145 27L180 45V124"
              {...line}
            />
            <path
              d="M145 27V124M110 45L145 64L180 45"
              {...line}
            />
            <path d="M35 124H193" stroke="#303432" strokeOpacity=".45" />
            <path d="M125 78H136M125 90H136M125 102H136" {...line} />
            <circle cx="192" cy="36" r="13" {...line} />
            <path d="M192 28V44M184 36H200" {...line} />
          </>
        )}

        {type === "industrial" && (
          <>
            {/* Warehouse / logistics elevation */}
            <path
              d="M30 66L80 39L130 66V124H30Z"
              {...line}
            />
            <path d="M30 66H130M80 39V124" {...line} />
            <path d="M44 79H68V108H44ZM91 79H116V108H91Z" {...line} />
            <path
              d="M145 124V82L171 65L197 82V124"
              {...line}
            />
            <path d="M145 82H197M171 65V124" {...line} />
            <path d="M18 124H215" stroke="#303432" strokeOpacity=".45" />
            <path d="M154 94H165M178 94H189" {...line} />
          </>
        )}

        {type === "government" && (
          <>
            {/* Institutional portico */}
            <path d="M40 53L120 23L200 53Z" {...line} />
            <path d="M48 60H192M40 119H200" {...line} />
            <path d="M58 60V119M86 60V119M114 60V119M142 60V119M170 60V119" {...line} />
            <path d="M33 127H207" stroke="#303432" strokeOpacity=".45" />
            <circle cx="120" cy="43" r="5" {...line} />
            <path d="M120 37V49M114 43H126" {...line} />
          </>
        )}

        {type === "enterprise" && (
          <>
            {/* Contemporary commercial development */}
            <path d="M37 124V77H78V124" {...line} />
            <path d="M86 124V38H139V124" {...line} />
            <path d="M147 124V59H194V124" {...line} />
            <path d="M37 77L57 61L78 77" {...line} />
            <path d="M86 38L112 23L139 38" {...line} />
            <path d="M147 59L170 43L194 59" {...line} />
            <g stroke="#967A54" strokeOpacity=".7">
              <path d="M98 52H108M117 52H127M98 67H108M117 67H127M98 82H108M117 82H127" />
              <path d="M49 91H65M49 103H65M160 74H179M160 87H179M160 100H179" />
            </g>
            <path d="M24 124H210" stroke="#303432" strokeOpacity=".45" />
          </>
        )}

        {/* Baseline / drawing reference */}
        <path
          d="M12 141H228"
          stroke="#303432"
          strokeOpacity=".18"
          strokeWidth=".8"
        />
        <circle cx="12" cy="141" r="2" fill="#967A54" />
        <circle cx="228" cy="141" r="2" fill="#967A54" />
      </svg>
    );
  };

  return (
    <section
      id="who-we-work-with"
      className="relative overflow-hidden border-t border-[#303432]/10 bg-[#FAF9F6] py-14 sm:py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Editorial heading */}
        <motion.div
          initial="hidden"
          whileInView="show"
          variants={reveal}
          viewport={viewport}
          className="grid gap-6 border-b border-[#303432]/15 pb-8 sm:pb-12 lg:grid-cols-12 lg:gap-8"
        >
          <div className="lg:col-span-4">
            <SectionLabel number="">Who We Work With</SectionLabel>

            <p className="mt-5 max-w-[240px] text-[11px] leading-6 text-[#737874] sm:text-xs">
              Different sectors. Distinct requirements. A consistent
              approach to project delivery.
            </p>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <h2 className="text-[clamp(2.4rem,5vw,5rem)] font-light leading-[0.98] tracking-[-0.055em] text-[#303432]">
              Trusted where
              <br />
              <span className="text-[#737874]">
                complexity matters.
              </span>
            </h2>
          </div>
        </motion.div>

        {/* Sector panels */}
        <div className="mt-8 grid grid-cols-2 border-l border-t border-[#303432]/15 sm:mt-12 lg:grid-cols-4">
          {groups.map((group, index) => (
            <motion.article
              key={group.number}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.45,
                delay: index * 0.07,
              }}
              className="group relative flex min-w-0 flex-col border-b border-r border-[#303432]/15 bg-transparent p-4 transition-colors duration-300 hover:bg-[#F2F0EA]/65 sm:p-6 lg:min-h-[365px] lg:p-7 xl:p-8"
            >
              {/* Number and index */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] tracking-[0.18em] text-[#967A54]">
                  {group.number}
                </span>

                <svg
                  viewBox="0 0 16 16"
                  className="h-3.5 w-3.5 text-[#92958F] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#967A54]"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 13L13 3M5 3H13V11"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Architectural illustration */}
              <div className="mt-5 aspect-[1.5] w-full sm:mt-7 lg:mt-9">
                <TrustIllustration type={group.type} />
              </div>

              {/* Content */}
              <div className="mt-5 sm:mt-7 lg:mt-auto lg:pt-8">
                <h3 className="text-[17px] font-light leading-[1.2] tracking-[-0.035em] text-[#303432] sm:text-[21px] lg:text-[23px]">
                  {group.title}
                </h3>

                <p className="mt-2 text-[10px] leading-[1.7] text-[#737874] sm:text-xs">
                  {group.desc}
                </p>

                <div className="mt-4 flex items-center gap-2">
                  <span className="h-px w-5 bg-[#967A54] transition-all duration-300 group-hover:w-9" />
                  <span className="text-[8px] uppercase tracking-[0.14em] text-[#92958F]">
                    {group.detail}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Closing statement */}
        <div className="mt-8 flex flex-col gap-3 border-t border-[#303432]/15 pt-5 sm:mt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-xs leading-6 text-[#737874]">
            We approach each engagement with a focus on coordination,
            accountability and disciplined execution.
          </p>

          <span className="text-[9px] uppercase tracking-[0.18em] text-[#967A54]">
            Built on collaboration
          </span>
        </div>
      </div>
    </section>
  );
}


/* =========================================================
   ENQUIRY
========================================================= */


/* =========================================================
   SECTION 10 — PROJECT ENQUIRIES
========================================================= */

function EnquirySection() {
  return (
    <section
      id="project-enquiries"
      className="relative overflow-hidden bg-[#E8E6E0] py-14 sm:py-20 lg:py-28"
    >
      <GridTexture opacity={0.025} size={140} />

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
          {/* Left — editorial heading */}
          <motion.div
            initial="hidden"
            whileInView="show"
            variants={revealLeft}
            viewport={viewport}
            className="lg:col-span-7"
          >
            <SectionLabel number="">Next Steps</SectionLabel>

            <div className="mt-7 flex items-start gap-4 sm:mt-10 sm:gap-6">
              <div className="hidden pt-3 sm:block">
                <svg
                  viewBox="0 0 42 42"
                  className="h-9 w-9 text-[#967A54]"
                  fill="none"
                  aria-hidden="true"
                >
                  <rect
                    x="1"
                    y="1"
                    width="40"
                    height="40"
                    stroke="currentColor"
                    strokeOpacity=".6"
                  />
                  <path
                    d="M10 21H32M21 10V32"
                    stroke="currentColor"
                    strokeOpacity=".5"
                  />
                  <circle cx="21" cy="21" r="4" fill="currentColor" />
                </svg>
              </div>

              <div className="min-w-0">
                <h2 className="text-[clamp(3.2rem,7vw,7rem)] font-light leading-[0.9] tracking-[-0.065em] text-[#303432]">
                  Let's discuss
                  <br />
                  your
                  <br />
                  <span className="text-[#737874]">next project.</span>
                </h2>

                <p className="mt-6 max-w-xl text-[13px] leading-7 text-[#555B56] sm:mt-8 sm:text-sm">
                  Engage with our team to discuss project scope,
                  feasibility, timelines and execution strategy.
                  Every engagement begins with understanding the
                  requirements and the outcomes that matter.
                </p>
              </div>
            </div>

            {/* Supporting details */}
            <div className="mt-8 grid grid-cols-2 gap-5 border-t border-[#303432]/15 pt-5 sm:mt-10 sm:gap-8">
              <div>
                <p className="text-[9px] uppercase tracking-[.18em] text-[#967A54]">
                  Approach
                </p>
                <p className="mt-2 text-xs leading-6 text-[#555B56] sm:text-sm">
                  Considered planning.
                  <br />
                  Disciplined execution.
                </p>
              </div>

              <div>
                <p className="text-[9px] uppercase tracking-[.18em] text-[#967A54]">
                  Engagement
                </p>
                <p className="mt-2 text-xs leading-6 text-[#555B56] sm:text-sm">
                  Project discussions.
                  <br />
                  Partnership enquiries.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right — contact panel */}
          <motion.div
            initial="hidden"
            whileInView="show"
            variants={revealRight}
            viewport={viewport}
            className="min-w-0 lg:col-span-5"
          >
            <div className="border border-[#303432]/12 bg-[#FAF9F6] p-5 sm:p-8 lg:p-9">
              <div className="flex items-start justify-between gap-4 border-b border-[#303432]/12 pb-5 sm:pb-6">
                <div>
                  <p className="text-[9px] uppercase tracking-[.22em] text-[#967A54]">
                    Project Enquiries
                  </p>

                  <h3 className="mt-3 text-2xl font-light tracking-[-.04em] text-[#303432] sm:text-3xl">
                    Start a conversation.
                  </h3>
                </div>

                <svg
                  viewBox="0 0 42 42"
                  className="h-9 w-9 shrink-0 text-[#967A54]"
                  fill="none"
                  aria-hidden="true"
                >
                  <rect
                    x="1"
                    y="1"
                    width="40"
                    height="40"
                    stroke="currentColor"
                    strokeOpacity=".5"
                  />
                  <path
                    d="M11 14H31V28H11Z"
                    stroke="currentColor"
                    strokeWidth="1.1"
                  />
                  <path
                    d="M11 15L21 23L31 15"
                    stroke="currentColor"
                    strokeWidth="1.1"
                  />
                </svg>
              </div>

              {/* Email */}
              <a
                href="mailto:projects@rafabuildtec.com"
                className="group flex items-center justify-between gap-4 border-b border-[#303432]/12 py-5 sm:py-6"
              >
                <div className="min-w-0">
                  <p className="text-[9px] uppercase tracking-[.17em] text-[#737874]">
                    Email
                  </p>

                  <p className="mt-2 break-all text-[14px] font-light tracking-[-.02em] text-[#303432] transition-colors group-hover:text-[#967A54] sm:text-base">
                    projects@rafabuildtec.com
                  </p>
                </div>

                <svg
                  viewBox="0 0 20 20"
                  className="h-5 w-5 shrink-0 text-[#967A54] transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 10H16M10 4L16 10L10 16"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>

              {/* Telephone — replace placeholder when confirmed */}
              <div className="flex items-center justify-between gap-4 border-b border-[#303432]/12 py-5 sm:py-6">
                <div>
                  <p className="text-[9px] uppercase tracking-[.17em] text-[#737874]">
                    Telephone
                  </p>

                  <p className="mt-2 text-sm font-light text-[#737874] sm:text-base">
                    Contact via email
                  </p>
                </div>

                <svg
                  viewBox="0 0 20 20"
                  className="h-5 w-5 shrink-0 text-[#967A54]"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M5 3H8L10 7L7.8 8.8C9 11.2 10.8 13 13.2 14.2L15 12L19 14V17C19 18 18 19 17 19C8.7 18.5 1.5 11.3 1 3C1 2 2 1 3 1H5V3Z"
                    stroke="currentColor"
                    strokeWidth="1.1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    transform="translate(0 0) scale(.9)"
                  />
                </svg>
              </div>

              {/* Primary action */}
              <Link
                to="/contact"
                className="group mt-6 flex min-h-[54px] w-full items-center justify-between gap-4 bg-[#967A54] px-5 py-4 text-[#FAF9F6] transition-colors duration-300 hover:bg-[#7C6240] sm:mt-7"
              >
                <span className="text-[9px] uppercase tracking-[.19em] sm:text-[10px]">
                  Discuss a project
                </span>

                <svg
                  viewBox="0 0 20 20"
                  className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 10H17M11 4L17 10L11 16"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              <p className="mt-4 text-[10px] leading-5 text-[#737874]">
                For project enquiries, institutional discussions
                and potential partnerships.
              </p>

              <div className="mt-5 flex items-center gap-2 border-t border-[#303432]/10 pt-4">
                <span className="h-1.5 w-1.5 bg-[#967A54]" />
                <span className="text-[8px] uppercase tracking-[.16em] text-[#92958F]">
                  RafaBuildTec LLP
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   FOOTER
========================================================= */


function EnterpriseFooter() {
  const columns = [
    {
      title: "Company",
      links: [
        ["About", "/company"],
        ["Leadership", "/leadership"],
        ["Contact", "/contact"],
      ],
    },
    {
      title: "Capabilities",
      links: [
        ["Commercial", "/capabilities"],
        ["Industrial", "/capabilities"],
        ["Infrastructure", "/capabilities"],
      ],
    },
    {
      title: "Projects",
      links: [["Project Archive", "/projects"]],
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-[#303432]/15 bg-[#F4F2ED] text-[#252A26]">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        {/* Main footer */}
        <div className="grid gap-12 py-14 sm:py-16 lg:grid-cols-12 lg:gap-10 lg:py-20">
          {/* Brand */}
          <div className="lg:col-span-5">
            <Link
              to="/"
              aria-label="RafaBuildTec home"
              className="inline-flex items-center"
            >
              <img
  src={logo}
  alt="RafaBuildTec LLP"
  className="h-12 w-auto max-w-[220px] object-contain object-left sm:h-14"
/>
            </Link>

            <p className="mt-7 max-w-sm text-[13px] leading-[1.9] text-[#737874] sm:text-[14px]">
              Construction and infrastructure delivery built around
              engineering precision, responsible execution and
              long-term performance.
            </p>

            <div className="mt-9 flex items-center gap-3">
              <span className="h-px w-8 bg-[#967A54]" />
              <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#967A54]">
                Engineered for permanence.
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:col-span-6 lg:col-start-7 lg:gap-x-6">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#967A54]">
                  {column.title}
                </h3>

                <ul className="mt-5 space-y-4">
                  {column.links.map(([label, href]) => (
                    <li key={label}>
                      <Link
                        to={href}
                        className="group inline-flex items-center text-[12px] text-[#555B56] transition-colors duration-200 hover:text-[#171918] sm:text-[13px]"
                      >
                        <span>{label}</span>
                        <span
                          aria-hidden="true"
                          className="ml-1.5 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-60"
                        >
                          ↗
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Closing statement */}
        <div className="border-y border-[#303432]/15 py-8 sm:py-10 lg:py-12">
          <p className="max-w-4xl text-[clamp(1.8rem,4.5vw,3.6rem)] font-normal leading-[1.08] tracking-[-0.045em] text-[#252A26]">
            Built with purpose.
            <span className="text-[#898A80]"> Delivered with discipline.</span>
          </p>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <p className="text-[9px] uppercase tracking-[0.13em] text-[#737874]">
            © {new Date().getFullYear()} RafaBuildTec LLP. All rights reserved.
          </p>

          <p className="text-[9px] uppercase tracking-[0.15em] text-[#737874]">
            Udupi · Karnataka · India
          </p>

          <p className="text-[9px] uppercase tracking-[0.13em] text-[#737874]">
            Construction &amp; Infrastructure
          </p>
        </div>
      </div>
    </footer>
  );
}


/* =========================================================
   HOME
========================================================= */

export default function Home() {
  return (
    <div
      className="min-h-screen overflow-x-clip bg-[#F4F2ED] text-[#171918]"
      style={{
        fontFamily:
          "Manrope, DM Sans, Inter, ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <Navbar />

      <main>
        <ArchitecturalHero />
        <Manifesto />
        <ProjectsShowcase />
        <CapabilityBands />
        <GovernanceSafety />
        <DeliveryFramework />
        <GeographicPresence />
        <Timeline />
        <TrustSection />
        <EnquirySection />
      </main>

      <EnterpriseFooter />
    </div>
  );
}