
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
  const [scrolled, setScrolled] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  React.useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 24);

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });

    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

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
      <div
        className={`transition-all duration-300 ${
          open || scrolled
            ? "border-b border-[#303432]/10 bg-[#F4F2ED]/95 text-[#252925] shadow-[0_8px_30px_rgba(23,25,24,0.04)] backdrop-blur-xl"
            : "border-b border-[#303432]/10 bg-[#F4F2ED]/90 text-[#252925] backdrop-blur-md"
        }`}
      >
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
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
                className="h-10 w-auto max-w-[220px] shrink-0 object-contain sm:h-11 lg:h-12"
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
                    className={`group relative py-2 text-[11px] transition-colors duration-300 ${
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
              className="relative flex h-10 w-10 shrink-0 items-center justify-center border border-[#303432]/20 transition-colors duration-300 md:hidden"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? "Close navigation" : "Open navigation"}
              aria-expanded={open}
              aria-controls="mobile-navigation"
            >
              <span
                className={`absolute h-px w-[18px] bg-[#303432] transition-transform duration-300 ${
                  open ? "translate-y-0 rotate-45" : "-translate-y-[4px]"
                }`}
              />

              <span
                className={`absolute h-px w-[18px] bg-[#303432] transition-transform duration-300 ${
                  open ? "translate-y-0 -rotate-45" : "translate-y-[4px]"
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
            className="absolute inset-x-0 top-full max-h-[calc(100svh-62px)] overflow-y-auto border-b border-[#303432]/10 bg-[#FAF9F6] text-[#303432] shadow-xl shadow-black/5 md:hidden"
          >
            <nav
              className="mx-auto max-w-[1600px] px-5 pb-5 sm:px-8"
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
                  Construction &amp; Infrastructure
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
   SHARED FOOTER — MATCHES HOMEPAGE
========================================================= */

export function Footer() {
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
            <span className="text-[#898A80]">
              {" "}Delivered with discipline.
            </span>
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
   OPTIONAL LAYOUT WRAPPER
========================================================= */

export default function Layout({ children }) {
  return <>{children}</>;
}
