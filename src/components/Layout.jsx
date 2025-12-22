import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Building2 } from "lucide-react";

/* ================= NAVBAR ================= */
export function Navbar() {
  const [open, setOpen] = React.useState(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 w-full z-50"
    >
      {/* Background */}
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

/* ================= ENTERPRISE FOOTER ================= */
export function Footer() {
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

/* ================= OPTIONAL WRAPPER ================= */
export default function Layout({ children }) {
  return <>{children}</>;
}
