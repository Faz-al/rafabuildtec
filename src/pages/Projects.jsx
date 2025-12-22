import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Building2, ChevronLeft, ChevronRight } from "lucide-react";
import { sanityClient } from "../lib/sanity";

/*
PROJECTS PAGE
LOCKED DESIGN + SANITY CMS
*/

/*
PROJECTS PAGE
Flagship mobile version -- brat update
*/
function MobileFlagshipProjects({ projects }) {
  const [index, setIndex] = React.useState(0);

  if (!projects || projects.length === 0) return null;

  const current = projects[index];
  if (!current) return null;

  const paginate = (direction) => {
    setIndex((i) => (i + direction + projects.length) % projects.length);
  };

  return (
    <div className="md:hidden">
      {/* IMAGE — SWIPE ENABLED */}
      {current.images?.[0] && (
        <motion.div
          key={index}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.25}
          onDragEnd={(e, info) => {
            const swipePower = info.offset.x * info.velocity.x;

            if (swipePower < -600) paginate(1);
            if (swipePower > 600) paginate(-1);

          }}
          initial={{ opacity: 0.6, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0.6, x: -40 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[28px] overflow-hidden cursor-grab active:cursor-grabbing"
        >
          <img
            src={current.images[0]}
            alt={current.title}
            className="w-full h-[220px] object-contain"
          />
        </motion.div>
      )}

      {/* CONTENT */}
      <div className="mt-6">
        <p className="text-[10px] uppercase tracking-[0.35em] text-[#8A6F4E] mb-2">
          {current.location}
        </p>

        <h4 className="text-[22px] font-light mb-3">
          {current.title}
        </h4>

        <p className="text-[#6B7280] text-sm mb-4">
          {current.category}
        </p>

        <p className="text-[#4B5563] leading-relaxed text-[14px]">
          {current.description}
        </p>
      </div>

      {/* INDICATOR */}
      <div className="mt-8 flex justify-center gap-2">
        {projects.map((_, i) => (
          <span
            key={i}
            className={`h-[4px] rounded-full transition-all duration-300 ${
              i === index
                ? "w-8 bg-[#8A6F4E]"
                : "w-4 bg-[#8A6F4E]/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}






export default function Projects() {
  const [mainProjects, setMainProjects] = useState([]);
  const [otherProjects, setOtherProjects] = useState([]);
  const [active, setActive] = useState(null);

  // progressive reveal state (IMPORTANT)

    const PAGE_SIZE = 3;
const [page, setPage] = useState(0);

const totalPages = Math.ceil(otherProjects.length / PAGE_SIZE);

const visibleProjects = otherProjects.slice(
  page * PAGE_SIZE,
  page * PAGE_SIZE + PAGE_SIZE
);


  useEffect(() => {
    sanityClient
      .fetch(`
        *[_type == "project" && published == true] | order(order asc) {
          title,
          projectType,
          location,
          category,
          scale,
          description,
          "images": images[].asset->url
        }
      `)
      .then((data) => {
        setMainProjects(
          data.filter(
            (p) => p.projectType?.toLowerCase() === "main"
          )
        );

        setOtherProjects(
          data.filter(
            (p) => p.projectType?.toLowerCase() === "other"
          )
        );
      });
  }, []);





  return (
    <div className="bg-[#EDEEF0] text-[#1F2933]  overflow-x-hidden">
      <Navbar />

      {/* -------------------HERO ----------------------------*/}
<section className="pt-32 pb-24 md:pt-60 md:pb-60">
  <motion.div
    className="max-w-7xl mx-auto px-5 md:px-12"
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-100px" }}
    variants={{
      hidden: {},
      show: {
        transition: {
          staggerChildren: 0.15,
        },
      },
    }}
  >
    <motion.p
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-[#8A6F4E] mb-4 md:mb-6"
    >
      Track Record
    </motion.p>

    <motion.h1
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="text-[34px] sm:text-[42px] md:text-[64px] font-light leading-tight max-w-full md:max-w-4xl"
    >
      Projects Delivered with <br />
      <span className="font-medium">Execution Certainty</span>
    </motion.h1>

    <motion.p
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.05 }}
      className="mt-6 md:mt-8 text-[#4B5563] leading-relaxed md:leading-loose max-w-full md:max-w-2xl text-[14px] md:text-base"
    >
      Our portfolio reflects disciplined delivery across healthcare,
      institutional, industrial, and infrastructure projects.
    </motion.p>
  </motion.div>
</section>



      {/* FLAGSHIP PROJECTS — HOMEPAGE GRADE */}
{/* FLAGSHIP PROJECTS — HOMEPAGE GRADE */}
<section className="bg-[#E6E8EB] pt-14 pb-16 md:pt-20 md:pb-20">
  <motion.div
    className="max-w-[1400px] mx-auto px-5 md:px-12"
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-100px" }}
    variants={{
      hidden: {},
      show: {
        transition: {
          staggerChildren: 0.15,
        },
      },
    }}
  >
    <motion.p
      variants={{
        hidden: { opacity: 0, y: 18 },
        show: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-[#8A6F4E] mb-4 md:mb-6"
    >
      Flagship Engagements
    </motion.p>

    <motion.h3
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="text-[28px] sm:text-[34px] md:text-[48px] font-light mb-6 md:mb-4 max-w-full md:max-w-4xl"
    >
      Large-scale projects executed with discipline,
      clarity, and long-term responsibility.
    </motion.h3>

    {/* KEEP THIS UNANIMATED */}
    <div className="mt-8 md:mt-12">
  {/* MOBILE */}
  <MobileFlagshipProjects projects={mainProjects} />

  {/* DESKTOP — KEEP EXACT */}
  <div className="hidden md:block">
    <FlagshipProjectSelector projects={mainProjects} />
  </div>
</div>

  </motion.div>
</section>





{/* OTHER KEY PROJECTS — REFINED + LUXURY (STABLE) */}
{/* OTHER KEY PROJECTS — EXTENDED PORTFOLIO (ENTERPRISE-GRADE) */}
<section className="py-20 md:py-36 bg-[#EDEEF0]">
  <motion.div
    className="max-w-7xl mx-auto px-5 md:px-12"
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-100px" }}
    variants={{
      hidden: {},
      show: { transition: { staggerChildren: 0.12 } },
    }}
  >
    {/* LABEL */}
    <motion.p
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-[#8A6F4E] mb-4 md:mb-6"
    >
      Extended Portfolio
    </motion.p>

    {/* TITLE */}
    <motion.h3
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="text-[26px] sm:text-[30px] md:text-[40px] font-light mb-16 md:mb-24 max-w-full md:max-w-3xl"
    >
      Additional projects delivered with the same
      discipline, engineering rigor, and execution standards.
    </motion.h3>

    {/* PROJECT LIST */}
    <motion.div
  drag="x"
  dragConstraints={{ left: 0, right: 0 }}
  dragElastic={0.15}
  onDragEnd={(e, info) => {
    if (info.offset.x < -80 && page < totalPages - 1) {
      setPage((p) => p + 1);
    }
    if (info.offset.x > 80 && page > 0) {
      setPage((p) => p - 1);
    }
  }}
  className="space-y-6 md:space-y-24"
>
      {visibleProjects.map((p, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* MOBILE — CARD */}
          <div className="md:hidden">
            <details className="rounded-2xl bg-[#F2F3F5] px-6 py-5 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
              <summary className="list-none cursor-pointer">
                <p className="text-[10px] uppercase tracking-[0.35em] text-[#8A6F4E] mb-2">
                  {p.location}
                </p>
                <h4 className="text-[18px] font-medium mb-2">
                  {p.title}
                </h4>
                <p className="text-[#6B7280] text-[13px]">
                  {p.category}
                </p>
              </summary>

              <div className="mt-4 pt-4 border-t border-black/10">
                <p className="text-[#4B5563] leading-relaxed text-[14px]">
                  {p.description}
                </p>

                <button
                  onClick={() => setActive(p)}
                  className="mt-4 text-xs uppercase tracking-widest text-[#8A6F4E]"
                >
                  View Project
                </button>
              </div>
            </details>
          </div>

          {/* DESKTOP — ORIGINAL HOVER ROW (RESTORED) */}
          <div
            onClick={() => setActive(p)}
            className="
  hidden md:grid md:grid-cols-12 gap-16 items-center
  cursor-pointer group
  transition-all duration-500 ease-out
  hover:translate-x-[2px]
"

          >
            {/* LEFT */}
            <div className="md:col-span-7">
              <p className="text-[11px] uppercase tracking-[0.35em] text-[#8A6F4E] mb-4">
                {p.location}
              </p>

              <h4 className="text-[26px] font-medium mb-4 transition-colors duration-500 group-hover:text-black">
                {p.title}
              </h4>

              <p className="text-[#6B7280] text-sm mb-6">
                {p.category}
              </p>

              <div className="h-[2px] w-16 bg-[#8A6F4E]/30 transition-all duration-700 group-hover:w-28 group-hover:bg-[#8A6F4E]/60" />
            </div>

            {/* RIGHT */}
            <div className="md:col-span-5">
              <p className="text-[#4B5563] leading-loose max-w-md transition-opacity duration-500 group-hover:opacity-90">
                {p.description}
              </p>
            </div>
          </div>

          



        </motion.div>

        
      ))}
    </motion.div>


    
   
  </motion.div>
  {/* PAGINATION — SINGLE INSTANCE */}
<div className="mt-24 flex flex-col items-center gap-6">

  {/* PROGRESS BAR */}
  <div className="w-[320px] md:w-[420px] h-[2px] bg-black/10 rounded-full overflow-hidden">
    <motion.div
      animate={{
        width: `${((page + 1) / totalPages) * 100}%`,
      }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="h-full bg-[#8A6F4E]"
    />
  </div>

  {/* COUNT */}
  <div className="text-[10px] uppercase tracking-[0.45em] text-[#6B7280]">
    {Math.min((page + 1) * PAGE_SIZE, otherProjects.length)} of {otherProjects.length} projects
  </div>

  {/* CONTROLS */}
  <div className="flex items-center gap-16">
    <button
      onClick={() => setPage((p) => Math.max(p - 1, 0))}
      disabled={page === 0}
      className="text-xs uppercase tracking-[0.35em] text-[#8A6F4E] disabled:opacity-30"
    >
      ← Previous
    </button>

    <button
      onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
      disabled={page === totalPages - 1}
      className="text-xs uppercase tracking-[0.35em] text-[#8A6F4E] disabled:opacity-30"
    >
      Next →
    </button>
  </div>

  <p className="text-[10px] uppercase tracking-[0.4em] text-[#9CA3AF]">
    Swipe or drag to navigate
  </p>
</div>



  {active && (
    <ProjectModal
      project={active}
      onClose={() => setActive(null)}
    />
  )}
</section>





      {/* CTA — WITH EMAIL INPUT (ANIMATED, SAFE) */}
<section className="py-24 md:py-44 bg-[#F2F3F5]">
  <motion.div
    className="max-w-6xl mx-auto px-5 md:px-12 grid md:grid-cols-12 gap-16 md:gap-20 items-start md:items-center"
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-100px" }}
    variants={{
      hidden: {},
      show: { transition: { staggerChildren: 0.15 } },
    }}
  >
    {/* LEFT — TEXT */}
    <motion.div
      className="md:col-span-7"
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <p className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-[#8A6F4E] mb-4 md:mb-6">
        Next Step
      </p>

      <h3 className="text-[28px] sm:text-[32px] md:text-[42px] font-light leading-tight mb-6 md:mb-8">
        Planning a Complex Project?
      </h3>

      <p className="text-[#4B5563] leading-relaxed md:leading-loose max-w-full md:max-w-xl text-[14px] md:text-base">
        Engage our leadership and engineering team to assess scope,
        feasibility, execution strategy, and risk alignment.
      </p>
    </motion.div>

    {/* RIGHT — CONTACT CARD */}
    <motion.div
      className="md:col-span-5"
      variants={{
        hidden: { opacity: 0, y: 32 },
        show: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    >
      <div className="
        bg-white
        rounded-[24px] md:rounded-[32px]
        p-8 sm:p-10 md:p-16
        shadow-[0_24px_60px_rgba(0,0,0,0.14)]
      ">
        <p className="text-[13px] md:text-sm text-[#6B7280] mb-6 md:mb-8">
          Project enquiries & institutional discussions
        </p>

        <p className="text-[16px] md:text-[18px] mb-2">
          projects@rafabuildtec.com
        </p>
        <p className="text-[16px] md:text-[18px] mb-6 md:mb-8">
          +91 XXX XXX XXXX
        </p>

        {/* EMAIL INPUT */}
        <div className="mt-4 md:mt-6">
          <p className="text-[10px] uppercase tracking-widest text-[#6B7280] mb-3 md:mb-4">
            Or leave your email
          </p>

          <div className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="your@email.com"
              className="
                w-full px-5 py-3
                rounded-full
                border border-black/10
                text-sm
                focus:outline-none
                focus:ring-2 focus:ring-[#8A6F4E]/30
              "
            />
            <button className="
              w-full
              px-6 py-3
              rounded-full
              bg-[#1F2933]
              text-white
              text-sm
              hover:bg-black
              transition
            ">
              Submit
            </button>
          </div>
        </div>

        <div className="mt-8 md:mt-10 h-[2px] w-16 md:w-20 bg-[#8A6F4E]/40" />
      </div>
    </motion.div>
  </motion.div>
</section>



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



/* ---------------- PROJECT BLOCK ---------------- */
function FlagshipProjectSelector({ projects }) {
  const [active, setActive] = useState(0);

  return (
    <div className="grid md:grid-cols-12 gap-2 items-center">
      {/* LEFT — HOVER SELECTOR */}
      <div className="md:col-span-4 space-y-10">
        {projects.map((project, index) => (
          <div
            key={index}
            onMouseEnter={() => setActive(index)}
            onClick={() => setActive(index)}
            className={`cursor-pointer transition ${
              active === index
                ? "opacity-100"
                : "opacity-40 hover:opacity-70"
            }`}
          >
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#8A6F4E] mb-2">
              {project.location}
            </p>

            <h4 className="text-[20px] font-light leading-snug">
              {project.title}
            </h4>

            <div
              className={`mt-4 h-[2px] transition-all duration-500 ${
                active === index
                  ? "w-20 bg-[#8A6F4E]"
                  : "w-10 bg-[#8A6F4E]/30"
              }`}
            />
          </div>
        ))}
      </div>

      {/* RIGHT — VISUAL STAGE */}
      <div className="md:col-span-8 relative h-[460px]">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={false}
            animate={{
              opacity: index === active ? 1 : 0,
              y: index === active ? 0 : 16,
            }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute inset-0 grid md:grid-cols-12 gap-16 items-center"
          >
            {/* IMAGE — COMPOSED, NOT CROPPED */}
            <div className="md:col-span-7">
              {project.images?.[0] && (
                <div className="relative w-full h-[360px] overflow-hidden">
  <motion.img
    src={project.images[0]}
    alt={project.title}
    initial={{ scale: 1.03 }}
    animate={{ scale: index === active ? 1 : 1.03 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="w-full h-full object-contain rounded-[2px]
               shadow-[0_28px_70px_rgba(0,0,0,0.18)]"
  />
</div>

              )}
            </div>

            {/* CONTENT */}
            <div className="md:col-span-5">
              <p className="text-[#6B7280] text-sm mb-2">
              {project.category}
              </p>

            {project.scale && (
           <p className="text-[#6B7280] text-sm mb-6">
           {project.scale}
          </p>
          )}

              <p className="text-[#4B5563] leading-loose max-w-md">
                {project.description}
              </p>

              <div className="mt-10 h-[2px] w-20 bg-[#8A6F4E]/40" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}




/* ---------------- PREMIUM MODAL ---------------- */
function ProjectModal({ project, onClose }) {
  const [index, setIndex] = useState(0);
  const images = project.images || [];
  const total = images.length;

  return (
    <motion.div
      className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* FULLSCREEN MODAL */}
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={(e, info) => {
          if (info.offset.y > 120 || info.velocity.y > 800) {
            onClose();
          }
        }}
        initial={{ y: 120 }}
        animate={{ y: 0 }}
        exit={{ y: 120 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="
          absolute inset-0 md:inset-auto md:relative
          md:mx-auto md:my-12 md:max-w-5xl md:h-auto
          bg-white
          rounded-none md:rounded-[36px]
          overflow-hidden
          shadow-[0_50px_140px_rgba(0,0,0,0.55)]
          flex flex-col
        "
      >
        {/* DRAG HANDLE (MOBILE) */}
        <div className="md:hidden flex justify-center py-3">
          <div className="h-[4px] w-12 rounded-full bg-black/20" />
        </div>

        {/* IMAGE STAGE — MOMENTUM SWIPE */}
        <motion.div
          key={index}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={(e, info) => {
            const swipe = info.offset.x * info.velocity.x;
            if (swipe < -700) setIndex((i) => (i + 1) % total);
            if (swipe > 700) setIndex((i) => (i - 1 + total) % total);
          }}
          className="relative flex-shrink-0 h-[55vh] md:h-[420px] bg-[#ECEEF1] cursor-grab active:cursor-grabbing"
        >
          <motion.img
            src={images[index]}
            alt={project.title}
            initial={{ opacity: 0.6, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="w-full h-full object-contain"
          />

          {/* CLOSE */}
          <button
            onClick={onClose}
            className="
              absolute top-4 right-4
              bg-white/90 backdrop-blur-md
              px-3 py-1.5 rounded-full
              text-xs text-[#1F2933]
              shadow-md
            "
          >
            Close
          </button>

          {/* DESKTOP NAV */}
          {total > 1 && (
            <>
              <button
                onClick={() => setIndex((i) => (i - 1 + total) % total)}
                className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-md"
              >
                <ChevronLeft />
              </button>
              <button
                onClick={() => setIndex((i) => (i + 1) % total)}
                className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-md"
              >
                <ChevronRight />
              </button>
            </>
          )}
        </motion.div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto px-6 py-8 md:px-20 md:py-16 grid md:grid-cols-12 gap-8 md:gap-16">
          {/* LEFT */}
          <div className="md:col-span-7">
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#8A6F4E] mb-3">
              {project.location}
            </p>

            <h3 className="text-[22px] md:text-[32px] font-medium mb-4">
              {project.title}
            </h3>

            <p className="text-[#6B7280] text-sm mb-2">
              {project.category}
            </p>

            {project.scale && (
              <p className="text-[#6B7280] text-sm mb-6">
                {project.scale}
              </p>
            )}

            <div className="h-[2px] w-20 bg-[#8A6F4E]/40" />
          </div>

          {/* RIGHT */}
          <div className="md:col-span-5">
            <p className="text-[#4B5563] leading-relaxed md:leading-loose text-[14px] md:text-base">
              {project.description}
            </p>
          </div>
        </div>

        {/* MOBILE IMAGE PROGRESS */}
        {total > 1 && (
          <div className="md:hidden pb-6 flex justify-center gap-2">
            {images.map((_, i) => (
              <span
                key={i}
                className={`h-[4px] rounded-full transition-all ${
                  i === index
                    ? "w-8 bg-[#8A6F4E]"
                    : "w-4 bg-[#8A6F4E]/30"
                }`}
              />
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
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