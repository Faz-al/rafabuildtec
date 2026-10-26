
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
} from "lucide-react";
import logo from "../assets/logo.png";

/* =========================================================
   NAVIGATION DATA
========================================================= */

const navigation = [
  { label: "Company", path: "/company" },
  { label: "Capabilities", path: "/capabilities" },
  { label: "Projects", path: "/projects" },
  { label: "Leadership", path: "/leadership" },
  { label: "Contact", path: "/contact" },
];

/* =========================================================
   SHARED NAVBAR — HOMEPAGE DESIGN
========================================================= */

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  React.useEffect(() => {
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

  return (
    <header className="fixed inset-x-0 top-0 z-[100]">
      {/* Main navigation bar */}
      <div className="border-b border-[#303432]/10 bg-[#F4F2ED]/95 backdrop-blur-md">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="flex h-[62px] items-center justify-between sm:h-[68px]">
            {/* Logo */}
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="flex min-w-0 items-center"
              aria-label="RafaBuildTec LLP — Home"
            >
              <img
                src={logo}
                alt="RafaBuildTec LLP"
                className="h-11 w-auto max-w-[240px] shrink-0 object-contain sm:h-12 lg:h-[52px]"
                draggable="false"
              />
            </Link>

            {/* Desktop navigation */}
            <nav
              className="hidden items-center gap-6 md:flex lg:gap-9"
              aria-label="Primary navigation"
            >
              {navigation.map((item) => {
                const active = location.pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    aria-current={active ? "page" : undefined}
                    className={`group relative py-2 text-[11px] transition-colors ${
                      active
                        ? "text-[#171918]"
                        : "text-[#4F5551] hover:text-[#171918]"
                    }`}
                  >
                    {item.label}

                    <span
                      className={`absolute inset-x-0 bottom-0 h-px origin-left bg-[#967A54] transition-transform duration-300 ${
                        active
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Mobile menu button */}
            <button
              type="button"
              className="relative flex h-10 w-10 shrink-0 items-center justify-center border border-[#303432]/15 md:hidden"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? "Close navigation" : "Open navigation"}
              aria-expanded={open}
              aria-controls="mobile-navigation"
            >
              <span
                className={`absolute h-px w-[18px] bg-[#303432] transition-transform duration-300 ${
                  open
                    ? "translate-y-0 rotate-45"
                    : "-translate-y-[4px]"
                }`}
              />
              <span
                className={`absolute h-px w-[18px] bg-[#303432] transition-transform duration-300 ${
                  open
                    ? "translate-y-0 -rotate-45"
                    : "translate-y-[4px]"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="mobile-navigation"
            key="mobile-navigation"
            initial={{
              opacity: 0,
              clipPath: "inset(0 0 100% 0)",
            }}
            animate={{
              opacity: 1,
              clipPath: "inset(0 0 0% 0)",
            }}
            exit={{
              opacity: 0,
              clipPath: "inset(0 0 100% 0)",
            }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute inset-x-0 top-full max-h-[calc(100svh-62px)] overflow-y-auto border-b border-[#303432]/10 bg-[#FAF9F6] md:hidden"
          >
            <nav
              className="mx-auto max-w-[1440px] px-4 pb-5 sm:px-6"
              aria-label="Mobile navigation"
            >
              <p className="pb-4 pt-6 text-[9px] font-semibold uppercase tracking-[0.28em] text-[#967A54]">
                Navigation
              </p>

              <div className="border-t border-[#303432]/10">
                {navigation.map((item, index) => {
                  const active = location.pathname === item.path;

                  return (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: index * 0.045,
                        duration: 0.3,
                      }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={`flex min-h-14 items-center justify-between border-b border-[#303432]/[0.08] py-3 text-[15px] transition-colors ${
                          active
                            ? "text-[#967A54]"
                            : "text-[#303432] hover:text-[#967A54]"
                        }`}
                      >
                        {item.label}

                        <ArrowRight
                          size={15}
                          strokeWidth={1.4}
                          aria-hidden="true"
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-5 flex min-h-[50px] items-center justify-between bg-[#171918] px-5 text-[#FAF9F6] transition-colors hover:bg-[#303432]"
              >
                <span className="text-[9px] font-semibold uppercase tracking-[0.2em]">
                  Start a Project
                </span>

                <ArrowUpRight size={16} strokeWidth={1.4} />
              </Link>

              <div className="mt-6 border-t border-[#303432]/10 pt-5">
                <p className="text-[8px] font-semibold uppercase tracking-[0.24em] text-[#967A54]">
                  Construction & Infrastructure
                </p>

                <p className="mt-2 max-w-[250px] text-[11px] leading-relaxed text-[#737874]">
                  Engineered systems. Governance discipline.
                  Execution certainty.
                </p>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* =========================================================
   SHARED FOOTER
========================================================= */

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#171918] text-[#FAF9F6]">
      {/* Architectural grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              rgba(255,255,255,0.8) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(255,255,255,0.8) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "72px 72px",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-5 py-14 sm:px-7 sm:py-16 md:px-10 md:py-20 lg:px-14 lg:py-24">
        {/* Footer top */}
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link
              to="/"
              className="group inline-flex items-center gap-3"
              aria-label="RafaBuildTec home"
            >
              <span className="flex h-10 w-10 items-center justify-center border border-white/15 text-[#967A54] transition-colors duration-300 group-hover:border-[#967A54]/50">
                <Building2
                  size={19}
                  strokeWidth={1.4}
                  aria-hidden="true"
                />
              </span>

              <span>
                <span className="block text-[17px] font-medium tracking-[-0.02em]">
                  RafaBuildTec
                </span>

                <span className="mt-1 block text-[7px] font-semibold uppercase tracking-[0.25em] text-white/45">
                  LLP
                </span>
              </span>
            </Link>

            <p className="mt-7 max-w-md text-[13px] leading-[1.8] text-white/55">
              Construction and infrastructure delivery built
              around engineered systems, governance discipline,
              and long-term asset performance.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 md:col-start-7">
            <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#967A54]">
              Explore
            </p>

            <div className="mt-5 grid gap-3">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="group inline-flex w-fit items-center gap-2 text-[11px] text-white/55 transition-colors duration-300 hover:text-white"
                >
                  {item.label}

                  <ArrowUpRight
                    size={11}
                    strokeWidth={1.3}
                    className="opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Presence */}
          <div className="md:col-span-3">
            <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#967A54]">
              Presence
            </p>

            <p className="mt-5 max-w-xs text-[11px] leading-[1.9] text-white/55">
              Udupi
              <span className="mx-2 text-white/20">/</span>
              Mangalore
              <span className="mx-2 text-white/20">/</span>
              Bangalore
              <span className="mx-2 text-white/20">/</span>
              Goa
              <span className="mx-2 text-white/20">/</span>
              Hubli
              <span className="mx-2 text-white/20">/</span>
              Belgaum
            </p>
          </div>
        </div>

        {/* Large statement */}
        <div className="mt-16 border-y border-white/[0.1] py-10 sm:mt-20 sm:py-12 md:mt-28 md:py-16">
          <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#967A54]">
            Operating Principle
          </p>

          <p className="mt-5 max-w-5xl text-[clamp(2.25rem,7vw,6rem)] font-light leading-[0.98] tracking-[-0.045em] text-white">
            Engineered for permanence.
          </p>
        </div>

        {/* Footer bottom */}
        <div className="flex flex-col gap-4 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[9px] uppercase tracking-[0.18em] text-white/35">
            © {new Date().getFullYear()} RafaBuildTec LLP
          </p>

          <p className="text-[9px] uppercase tracking-[0.18em] text-white/35">
            Construction & Infrastructure Delivery
          </p>
        </div>
      </div>
    </footer>
  );
}

/* =========================================================
   OPTIONAL LAYOUT WRAPPER
========================================================= */

export default function Layout({ children }) {
  return <>{children}</>;
}
