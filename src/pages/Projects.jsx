import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownRight, ArrowLeft, ArrowRight, X, Search, SlidersHorizontal } from "lucide-react";
import { sanityClient } from "../lib/sanity";
import { Navbar, Footer } from "../components/Layout";

const PAGE_SIZE = 3;
const ease = [0.22, 1, 0.36, 1];

const reveal = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease } },
};

function Eyebrow({ children, light = false }) {
  return (
    <p
      className={`mb-4 text-[10px] font-medium uppercase tracking-[0.28em] sm:text-[11px] sm:tracking-[0.32em] ${
        light ? "text-[#C5A77D]" : "text-[#947650]"
      }`}
    >
      {children}
    </p>
  );
}

function ProjectImage({ project, className = "", imageClassName = "" }) {
  const src = project?.images?.[0];

  if (!src) {
    return (
      <div
        className={`flex items-center justify-center bg-[#E5E1D8] ${className}`}
        aria-label={`No image available for ${project?.title || "project"}`}
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#827B70]">
          Project imagery
        </span>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden bg-[#E5E1D8] ${className}`}>
      <img
        src={src}
        alt={project?.title || "RafaBuildTec project"}
        loading="lazy"
        className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035] ${imageClassName}`}
      />
    </div>
  );
}

function MobileFlagshipProjects({ projects, onOpen }) {
  const [index, setIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
    setImageIndex(0);
  }, [projects.length]);

  if (!projects?.length) return null;

  const current = projects[index];
  const images = current?.images || [];
  const imageCount = images.length;
  const moveProject = (direction) => {
    setIndex((value) => (value + direction + projects.length) % projects.length);
    setImageIndex(0);
  };
  const moveImage = (direction) => {
    if (imageCount < 2) return;
    setImageIndex((value) => (value + direction + imageCount) % imageCount);
  };

  return (
    <div className="md:hidden">
      <div className="group relative">
        <motion.div
          key={`${current.title || index}-${imageIndex}`}
          drag={projects.length > 1 ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          onDragEnd={(_, info) => {
            if (Math.abs(info.offset.x) > 65) {
              if (imageCount > 1) moveImage(info.offset.x < 0 ? 1 : -1);
              else moveProject(info.offset.x < 0 ? 1 : -1);
            }
          }}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, ease }}
          className="relative cursor-grab active:cursor-grabbing"
        >
          <div className="relative aspect-[5/4] w-full overflow-hidden bg-[#DCD7CD]">
            {images[imageIndex] ? (
              <img
                src={images[imageIndex]}
                alt={`${current.title || "Project"} — image ${imageIndex + 1}`}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-[10px] uppercase tracking-[0.25em] text-[#827B70]">
                Project imagery
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#171A18]/35 via-transparent to-transparent" />
            <span className="absolute bottom-4 left-4 text-[9px] uppercase tracking-[0.2em] text-white/90">
              {current.location || "Selected project"}
            </span>
            {imageCount > 1 && (
              <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
                <span className="mr-1 rounded-sm bg-black/35 px-2 py-1.5 font-mono text-[10px] text-white backdrop-blur-sm">
                  {String(imageIndex + 1).padStart(2, "0")} / {String(imageCount).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  onClick={(event) => { event.stopPropagation(); moveImage(-1); }}
                  aria-label="Previous image of this project"
                  className="flex h-9 w-9 items-center justify-center border border-white/65 bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-[#252A26]"
                >
                  <ArrowLeft size={15} />
                </button>
                <button
                  type="button"
                  onClick={(event) => { event.stopPropagation(); moveImage(1); }}
                  aria-label="Next image of this project"
                  className="flex h-9 w-9 items-center justify-center border border-white/65 bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-[#252A26]"
                >
                  <ArrowRight size={15} />
                </button>
              </div>
            )}
          </div>
        </motion.div>

        <div className="mt-3 flex items-center justify-between gap-3 border-b border-[#303432]/15 pb-3">
          <span className="text-[9px] uppercase tracking-[0.16em] text-[#77766F]">
            {imageCount > 1 ? "Swipe image or use arrows" : "Featured project"}
          </span>
          <span className="font-mono text-[10px] text-[#77766F]">
            Project {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className="pt-6">
        <Eyebrow>{current.location || "Project location"}</Eyebrow>
        <h3 className="max-w-xl text-[27px] font-normal leading-[1.12] tracking-[-0.035em] text-[#222724]">
          {current.title}
        </h3>
        <p className="mt-3 text-[12px] tracking-wide text-[#77766F]">
          {current.category || "Project"}{current.scale ? `  /  ${current.scale}` : ""}
        </p>
        {current.description && (
          <p className="mt-5 text-[14px] leading-7 text-[#5C625D]">{current.description}</p>
        )}
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
          <button
            type="button"
            onClick={() => onOpen(current)}
            className="inline-flex items-center gap-3 border-b border-[#947650] pb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[#343A35] transition-colors hover:text-[#947650]"
          >
            Explore project <ArrowRight size={14} strokeWidth={1.5} />
          </button>
          {projects.length > 1 && (
            <button
              type="button"
              onClick={() => moveProject(1)}
              className="inline-flex items-center gap-2 pb-2 text-[10px] font-medium uppercase tracking-[0.16em] text-[#77766F] transition-colors hover:text-[#947650]"
            >
              Next project <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>

      {projects.length > 1 && (
        <div className="mt-7 border-t border-[#303432]/15 pt-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[9px] uppercase tracking-[0.18em] text-[#77766F]">More selected work</span>
            <span className="text-[10px] text-[#77766F]">Swipe to explore</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {projects.map((project, i) => (
              <button
                type="button"
                key={`${project.title}-${i}`}
                onClick={() => { setIndex(i); setImageIndex(0); }}
                aria-label={`View project ${project.title}`}
                aria-current={i === index ? "true" : undefined}
                className={`min-w-[132px] max-w-[170px] flex-1 border px-3 py-3 text-left transition-colors ${
                  i === index ? "border-[#947650] bg-white/60" : "border-[#303432]/15 bg-transparent"
                }`}
              >
                <span className="block font-mono text-[9px] text-[#947650]">{String(i + 1).padStart(2, "0")}</span>
                <span className="mt-2 block text-[11px] leading-snug text-[#303432]">{project.title}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function FlagshipProjectSelector({ projects, onOpen }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
    setImageIndex(0);
  }, [projects.length]);

  if (!projects?.length) return null;

  const current = projects[Math.min(activeIndex, projects.length - 1)];
  const images = current?.images || [];
  const imageCount = images.length;
  const moveImage = (direction) => {
    if (imageCount < 2) return;
    setImageIndex((value) => (value + direction + imageCount) % imageCount);
  };
  const selectProject = (index) => {
    setActiveIndex(index);
    setImageIndex(0);
  };

  return (
    <div className="hidden md:grid md:grid-cols-12 md:gap-7 lg:gap-9">
      <div className="md:col-span-4">
        <div className="border-t border-[#303432]/20">
          {projects.map((project, index) => (
            <button
              type="button"
              key={`${project.title}-${index}`}
              onMouseEnter={() => selectProject(index)}
              onFocus={() => selectProject(index)}
              onClick={() => selectProject(index)}
              className={`group flex w-full items-start gap-4 border-b border-[#303432]/15 py-4 text-left transition-opacity ${
                activeIndex === index ? "opacity-100" : "opacity-55 hover:opacity-85"
              }`}
            >
              <span className="pt-1 font-mono text-[10px] text-[#947650]">{String(index + 1).padStart(2, "0")}</span>
              <span className="min-w-0 flex-1">
                <span className="mb-2 block text-[9px] uppercase tracking-[0.2em] text-[#77766F]">{project.location || "Location"}</span>
                <span className="block text-[15px] leading-snug tracking-[-0.02em] text-[#252A26] lg:text-[16px]">{project.title}</span>
                <span className={`mt-3 block h-px transition-all duration-500 ${activeIndex === index ? "w-12 bg-[#947650]" : "w-5 bg-[#303432]/25"}`} />
              </span>
              <ArrowDownRight size={15} className={`mt-1 shrink-0 transition-transform ${activeIndex === index ? "translate-x-0.5 translate-y-0.5 text-[#947650]" : "text-[#77766F]"}`} />
            </button>
          ))}
        </div>
        <p className="mt-5 max-w-xs text-[12px] leading-6 text-[#77766F]">
          Select a project to explore its story. Use the image arrows to browse its photography.
        </p>
      </div>

      <div className="md:col-span-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${current.title || activeIndex}-${imageIndex}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease }}
            className="group"
          >
            <div className="relative">
              <button type="button" onClick={() => onOpen(current)} className="block w-full text-left" aria-label={`View details for ${current.title}`}>
                <div className="relative aspect-[1.48/1] max-h-[520px] overflow-hidden bg-[#DCD7CD]">
                  {images[imageIndex] ? (
                    <img src={images[imageIndex]} alt={`${current.title} — image ${imageIndex + 1}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-[10px] uppercase tracking-[0.25em] text-[#827B70]">Project imagery</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171A18]/40 via-transparent to-transparent" />
                  <span className="absolute bottom-5 left-5 text-[9px] uppercase tracking-[0.22em] text-white/90">{current.location || "Selected project"}</span>
                </div>
              </button>

              {imageCount > 1 && (
                <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5">
                  <span className="mr-1 bg-black/35 px-2.5 py-2 font-mono text-[10px] text-white backdrop-blur-sm">
                    Image {String(imageIndex + 1).padStart(2, "0")} / {String(imageCount).padStart(2, "0")}
                  </span>
                  <button type="button" onClick={() => moveImage(-1)} aria-label="Previous image of this project" className="flex h-9 w-9 items-center justify-center border border-white/65 bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-[#252A26]">
                    <ArrowLeft size={15} strokeWidth={1.4} />
                  </button>
                  <button type="button" onClick={() => moveImage(1)} aria-label="Next image of this project" className="flex h-9 w-9 items-center justify-center border border-white/65 bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-[#252A26]">
                    <ArrowRight size={15} strokeWidth={1.4} />
                  </button>
                </div>
              )}
            </div>

            {imageCount > 1 && (
              <div className="mt-3 flex items-center justify-between gap-4">
                <p className="text-[9px] uppercase tracking-[0.16em] text-[#77766F]">Browse project images</p>
                <div className="flex gap-1.5">
                  {images.map((image, i) => (
                    <button
                      key={`${current.title}-image-${i}`}
                      type="button"
                      onClick={() => setImageIndex(i)}
                      aria-label={`Show image ${i + 1} of ${current.title}`}
                      aria-current={i === imageIndex ? "true" : undefined}
                      className={`h-[3px] transition-all duration-300 ${i === imageIndex ? "w-8 bg-[#947650]" : "w-4 bg-[#303432]/20 hover:bg-[#947650]/60"}`}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-12 gap-4 pt-5">
              <div className="col-span-7">
                <p className="mb-2 text-[10px] uppercase tracking-[0.22em] text-[#947650]">{current.category || "Featured project"}</p>
                <h3 className="text-[21px] font-normal leading-tight tracking-[-0.035em] text-[#252A26] lg:text-[24px]">{current.title}</h3>
                {current.scale && <p className="mt-3 text-[11px] tracking-wide text-[#77766F]">{current.scale}</p>}
              </div>
              <div className="col-span-5">
                <p className="text-[13px] leading-7 text-[#5C625D]">{current.description || "A considered approach to planning, coordination and project delivery."}</p>
                <button type="button" onClick={() => onOpen(current)} className="mt-4 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[#343A35] transition-colors hover:text-[#947650]">
                  View project <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function OtherProjectRow({ project, index, onOpen }) {
  return (
    <motion.article
      variants={reveal}
      className="group border-t border-[#303432]/15 py-5 sm:py-6 md:py-7"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[150px_minmax(0,1fr)] sm:items-center sm:gap-6 md:grid-cols-12 md:gap-8">
        <button
          type="button"
          onClick={() => onOpen(project)}
          aria-label={`View details for ${project.title}`}
          className="group/image relative block aspect-[16/10] w-full overflow-hidden bg-[#E5E1D8] text-left sm:aspect-[4/3] md:col-span-3"
        >
          {project.images?.[0] ? (
            <img
              src={project.images[0]}
              alt={project.title || "RafaBuildTec project"}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/image:scale-[1.04]"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-[9px] uppercase tracking-[0.2em] text-[#827B70]">
              Project image
            </div>
          )}
          <span className="absolute left-3 top-3 bg-[#F4F2ED]/90 px-2 py-1 font-mono text-[9px] text-[#303432]">
            {String(index + 1).padStart(2, "0")}
          </span>
        </button>

        <div className="md:col-span-4">
          <p className="mb-2 text-[9px] uppercase tracking-[0.2em] text-[#947650]">
            {project.location || "Project location"}
          </p>
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="text-left text-[19px] leading-tight tracking-[-0.03em] text-[#252A26] transition-colors hover:text-[#947650] sm:text-[21px]"
          >
            {project.title}
          </button>
          <p className="mt-2 text-[10px] leading-5 text-[#77766F]">
            {project.category || "Project"}
            {project.scale ? `  /  ${project.scale}` : ""}
          </p>
        </div>

        <p className="text-[12px] leading-6 text-[#5C625D] sm:text-[13px] sm:leading-7 md:col-span-4">
          {project.description || "Planned and delivered with attention to coordination, quality and long-term performance."}
        </p>

        <div className="md:col-span-1 md:flex md:justify-end">
          <button
            type="button"
            onClick={() => onOpen(project)}
            aria-label={`View ${project.title}`}
            className="inline-flex min-h-10 items-center gap-2 border-b border-[#947650]/60 pb-1 text-[9px] uppercase tracking-[0.16em] text-[#343A35] transition-colors hover:border-[#947650] hover:text-[#947650]"
          >
            Details <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function ProjectModal({ project, onClose }) {
  const [imageIndex, setImageIndex] = useState(0);
  const images = project?.images || [];

  useEffect(() => {
    setImageIndex(0);
  }, [project]);

  useEffect(() => {
    if (!project) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight" && images.length > 1) {
        setImageIndex((value) => (value + 1) % images.length);
      }
      if (event.key === "ArrowLeft" && images.length > 1) {
        setImageIndex((value) => (value - 1 + images.length) % images.length);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [project, images.length, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="project-modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
        className="fixed inset-0 z-[100] flex items-end justify-center bg-[#171A18]/75 backdrop-blur-sm md:items-center md:p-6"
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} project details`}
      >
        <motion.div
          initial={{ y: 28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.35, ease }}
          className="relative flex max-h-[94dvh] w-full flex-col overflow-hidden border border-white/20 bg-[#F4F2ED] shadow-2xl md:max-w-6xl md:flex-row"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center border border-[#303432]/15 bg-[#F4F2ED]/90 text-[#303432] backdrop-blur transition-colors hover:bg-[#303432] hover:text-white"
          >
            <X size={17} strokeWidth={1.5} />
          </button>

          <div className="relative flex min-h-[230px] items-center justify-center bg-[#E5E1D8] md:min-h-[540px] md:w-[56%]">
            {images.length ? (
              <img
                src={images[imageIndex]}
                alt={`${project.title} — image ${imageIndex + 1}`}
                className="h-full max-h-[46dvh] w-full object-contain md:absolute md:inset-0 md:max-h-none"
              />
            ) : (
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#827B70]">Project imagery</span>
            )}

            {images.length > 1 && (
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="bg-[#F4F2ED]/90 px-3 py-2 font-mono text-[10px] text-[#303432]">
                  {String(imageIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
                </span>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => setImageIndex((value) => (value - 1 + images.length) % images.length)}
                    aria-label="Previous image"
                    className="flex h-9 w-9 items-center justify-center bg-[#F4F2ED] text-[#303432] hover:bg-[#303432] hover:text-white"
                  >
                    <ArrowLeft size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageIndex((value) => (value + 1) % images.length)}
                    aria-label="Next image"
                    className="flex h-9 w-9 items-center justify-center bg-[#F4F2ED] text-[#303432] hover:bg-[#303432] hover:text-white"
                  >
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="overflow-y-auto px-6 py-8 sm:px-9 md:w-[44%] md:px-10 md:py-14">
            <Eyebrow>{project.location || "Project details"}</Eyebrow>
            <h2 className="max-w-md text-[28px] leading-[1.08] tracking-[-0.04em] text-[#252A26] sm:text-[34px]">
              {project.title}
            </h2>
            <p className="mt-4 text-[11px] uppercase tracking-[0.12em] text-[#77766F]">
              {project.category || "Project"}
            </p>
            {project.scale && (
              <p className="mt-2 text-[11px] text-[#77766F]">{project.scale}</p>
            )}
            <div className="my-7 h-px w-12 bg-[#947650]" />
            <p className="whitespace-pre-line text-[13px] leading-7 text-[#5C625D]">
              {project.description || "Further project information will be added soon."}
            </p>
            <p className="mt-10 border-t border-[#303432]/15 pt-4 text-[9px] uppercase tracking-[0.2em] text-[#77766F]">
              RafaBuildTec LLP · Selected work
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function ProjectsLoadingState() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {[1, 2, 3].map((item) => (
        <div key={item} className="animate-pulse">
          <div className="aspect-[4/3] bg-[#E5E1D8]" />
          <div className="mt-5 h-2 w-24 bg-[#DAD5CB]" />
          <div className="mt-3 h-5 w-3/4 bg-[#DAD5CB]" />
          <div className="mt-3 h-2 w-full bg-[#DAD5CB]" />
        </div>
      ))}
    </div>
  );
}

export default function Projects() {
  const [mainProjects, setMainProjects] = useState([]);
  const [otherProjects, setOtherProjects] = useState([]);
  const [activeProject, setActiveProject] = useState(null);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let mounted = true;

    
sanityClient
  .fetch(`
    *[_type == "project" && published == true] | order(order asc) {
      _id,
      title,
      "slug": slug.current,
      projectType,
      location,
      category,
      scale,
      description,
      "images": images[].asset->url
    }
  `)

      .then((data) => {
        if (!mounted) return;
        const projects = Array.isArray(data) ? data : [];
        setMainProjects(projects.filter((project) => project.projectType?.toLowerCase() === "main"));
        setOtherProjects(projects.filter((project) => project.projectType?.toLowerCase() === "other"));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Unable to load projects from Sanity:", error);
        if (!mounted) return;
        setLoadError(true);
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const categories = ["All", ...new Set(otherProjects.map((project) => project.category).filter(Boolean))];
  const filteredProjects = otherProjects.filter((project) => {
    const query = searchTerm.trim().toLowerCase();
    const matchesSearch = !query || [
      project.title, project.location, project.category, project.scale, project.description,
    ].some((value) => String(value || "").toLowerCase().includes(query));
    const matchesCategory = activeCategory === "All" || project.category === activeCategory;
    return matchesSearch && matchesCategory;
  });
  const totalPages = Math.ceil(filteredProjects.length / PAGE_SIZE);
  const safePage = Math.min(page, Math.max(totalPages - 1, 0));
  const visibleProjects = filteredProjects.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);

  const changePage = (nextPage) => {
    setPage(Math.max(0, Math.min(nextPage, Math.max(totalPages - 1, 0))));
  };

  const updateSearch = (value) => {
    setSearchTerm(value);
    setPage(0);
  };
  const updateCategory = (value) => {
    setActiveCategory(value);
    setPage(0);
  };

  return (
    <main className="min-h-screen overflow-x-clip bg-[#F4F2ED] text-[#252A26]">
      <Navbar />

      {/* Cinematic portfolio hero */}
      <section className="relative isolate overflow-hidden bg-[#252A26] pt-[62px] text-[#F4F2ED] sm:pt-[68px]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_35%,#77786F_0%,#444943_34%,#252A26_75%)]">
          <img
            src="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=2400&q=85"
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            className="h-full w-full object-cover object-[center_48%] opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#171A18]/90 via-[#171A18]/55 to-[#171A18]/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171A18]/70 via-transparent to-[#171A18]/20" />
        </div>

        
        

        <div className="relative mx-auto flex min-h-[390px] max-w-[1320px] flex-col justify-between px-6 pb-6 pt-9 sm:min-h-[440px] sm:px-10 sm:pb-8 sm:pt-12 lg:min-h-[470px] lg:px-14 lg:pb-9 lg:pt-14">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
            className="flex items-start justify-between gap-6"
          >
            <motion.div variants={reveal}>
              <p className="flex items-center gap-3 text-[9px] font-medium uppercase tracking-[0.28em] text-[#D5BD9B] sm:text-[10px]">
                <span className="h-px w-8 bg-[#C5A77D]" />
                RafaBuildTec LLP
              </p>
            </motion.div>
            <motion.p variants={reveal} className="hidden max-w-[180px] text-right text-[9px] uppercase leading-5 tracking-[0.2em] text-white/75 sm:block">
              Construction
              <br />
              & Infrastructure
            </motion.p>
          </motion.div>

          <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-10">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease }}
              className="lg:col-span-8"
            >
              <p className="mb-4 text-[9px] font-medium uppercase tracking-[0.22em] text-[#D5BD9B] sm:mb-4 sm:text-[10px]">
                Selected work / Portfolio
              </p>
              <h1 className="max-w-[800px] text-[clamp(2.7rem,5.8vw,5.5rem)] font-light leading-[0.94] tracking-[-0.055em] text-white">
                Built with purpose.
                <br />
                <span className="text-white/65">Made to last.</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.22, ease }}
              className="max-w-sm lg:col-span-4 lg:pb-1"
            >
              <p className="text-[12px] leading-6 text-white/80 sm:text-[13px] sm:leading-7">
                A closer look at the places we help bring to life.
              </p>
              <a
                href="#selected-projects"
                className="group mt-5 inline-flex min-h-11 items-center gap-5 border border-white/45 px-4 text-[9px] font-medium uppercase tracking-[0.17em] text-white transition-colors duration-300 hover:border-[#C5A77D] hover:bg-[#C5A77D] hover:text-[#202420] sm:mt-6"
              >
                View projects
                <ArrowDownRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </a>
            </motion.div>
          </div>

          <div className="mt-10 flex items-end justify-between gap-4 border-t border-white/30 pt-4 sm:mt-12 sm:pt-5">
            <p className="text-[8px] uppercase tracking-[0.16em] text-white/75 sm:text-[9px] sm:tracking-[0.22em]">
              Planning <span className="mx-1.5 text-[#C5A77D]">/</span>
              Engineering <span className="mx-1.5 text-[#C5A77D]">/</span>
              Delivery
            </p>
            <p className="shrink-0 font-mono text-[9px] text-white/70 sm:text-[10px]">RBT / 01</p>
          </div>
        </div>
      </section>

      {/* Flagship projects */}
      <section id="selected-projects" className="relative bg-[#EAE7DF] px-5 py-12 sm:px-8 sm:py-14 md:px-12 md:py-[76px]">
        <div className="mx-auto max-w-[1240px]">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
            className="mb-8 grid gap-4 sm:mb-10 md:grid-cols-12 md:items-end"
          >
            <motion.div variants={reveal} className="md:col-span-7">
              <Eyebrow>01 / Featured projects</Eyebrow>
              <h2 className="max-w-3xl text-[clamp(1.9rem,4vw,3.65rem)] leading-[1.04] tracking-[-0.045em] text-[#252A26]">
                Work that speaks
                <br className="hidden sm:block" /> through its execution.
              </h2>
            </motion.div>
            <motion.p variants={reveal} className="max-w-md text-[13px] leading-7 text-[#5C625D] md:col-span-5 md:justify-self-end">
              A closer look at selected engagements and the thinking behind their delivery.
            </motion.p>
          </motion.div>

          {loading ? (
            <ProjectsLoadingState />
          ) : loadError ? (
            <div className="border-t border-[#303432]/15 py-10 text-[13px] leading-7 text-[#5C625D]">
              Projects are temporarily unavailable. Please revisit shortly.
            </div>
          ) : mainProjects.length ? (
            <>
              <MobileFlagshipProjects projects={mainProjects} onOpen={setActiveProject} />
              <FlagshipProjectSelector projects={mainProjects} onOpen={setActiveProject} />
            </>
          ) : (
            <div className="border-t border-[#303432]/15 py-10 text-[13px] leading-7 text-[#5C625D]">
              Featured projects will appear here as they are published.
            </div>
          )}
        </div>
      </section>

      {/* Extended portfolio */}
      <section className="px-5 py-12 sm:px-8 sm:py-14 md:px-12 md:py-[76px]">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-9 grid gap-6 md:mb-12 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <Eyebrow>02 / Extended portfolio</Eyebrow>
              <h2 className="max-w-3xl text-[clamp(1.8rem,3.6vw,3.2rem)] leading-[1.05] tracking-[-0.045em]">
                Consistency across
                <br className="hidden sm:block" /> every scale of work.
              </h2>
            </div>
            <p className="max-w-md text-[13px] leading-7 text-[#5C625D] md:col-span-5 md:justify-self-end">
              Each project brings its own requirements. Our approach remains grounded in detail,
              accountability and practical outcomes.
            </p>
          </div>

          {!loading && !loadError && otherProjects.length > 0 && (
            <div className="mb-7 space-y-4 border-y border-[#303432]/15 py-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <label className="flex min-h-12 items-center gap-3 border border-[#303432]/15 bg-white/55 px-4 sm:max-w-sm sm:flex-1">
                  <Search size={16} strokeWidth={1.5} className="shrink-0 text-[#947650]" />
                  <input
                    value={searchTerm}
                    onChange={(event) => updateSearch(event.target.value)}
                    placeholder="Search projects, locations…"
                    aria-label="Search projects and locations"
                    className="w-full bg-transparent text-[13px] text-[#252A26] outline-none placeholder:text-[#8B8A82]"
                  />
                  {searchTerm && (
                    <button type="button" onClick={() => updateSearch("")} aria-label="Clear search" className="text-[#77766F] hover:text-[#252A26]">
                      <X size={14} />
                    </button>
                  )}
                </label>
                <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.17em] text-[#77766F]">
                  <SlidersHorizontal size={13} />
                  <span>Filter by type</span>
                </div>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => updateCategory(category)}
                    aria-pressed={activeCategory === category}
                    className={`shrink-0 border px-4 py-2.5 text-[9px] uppercase tracking-[0.14em] transition-colors ${
                      activeCategory === category
                        ? "border-[#303432] bg-[#303432] text-[#F4F2ED]"
                        : "border-[#303432]/15 bg-transparent text-[#5C625D] hover:border-[#947650] hover:text-[#947650]"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}

          {loading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((item) => <div key={item} className="h-24 animate-pulse border-t border-[#303432]/15 bg-[#EAE7DF]/40" />)}
            </div>
          ) : loadError ? (
            <p className="border-t border-[#303432]/15 py-8 text-[13px] text-[#5C625D]">
              The portfolio could not be loaded at this time.
            </p>
          ) : filteredProjects.length ? (
            <>
              <div className="mb-4 flex items-center justify-between gap-4">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#77766F]">
                  {searchTerm || activeCategory !== "All" ? "Matching projects" : "Project archive"}
                </p>
                <p className="font-mono text-[10px] text-[#77766F]">
                  {String(filteredProjects.length).padStart(2, "0")} entries
                </p>
              </div>
              <motion.div
                key={page}
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
              >
                {visibleProjects.map((project, index) => (
                  <OtherProjectRow
                    key={`${project.title}-${page}-${index}`}
                    project={project}
                    index={page * PAGE_SIZE + index}
                    onOpen={setActiveProject}
                  />
                ))}
                <div className="border-t border-[#303432]/15" />
              </motion.div>

              {totalPages > 1 && (
                <div className="mt-8 flex flex-col gap-5 border-t border-[#303432]/15 pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="font-mono text-[10px] text-[#77766F]">
                    {String(safePage * PAGE_SIZE + 1).padStart(2, "0")}–{String(Math.min((safePage + 1) * PAGE_SIZE, filteredProjects.length)).padStart(2, "0")}
                    <span className="mx-2 text-[#B4ADA0]">/</span>
                    {String(otherProjects.length).padStart(2, "0")} projects
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => changePage(safePage - 1)}
                      disabled={safePage === 0}
                      className="flex h-11 items-center gap-2 border border-[#303432]/20 px-4 text-[9px] uppercase tracking-[0.16em] transition-colors hover:bg-[#303432] hover:text-white disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-[#252A26]"
                    >
                      <ArrowLeft size={13} /> Previous
                    </button>
                    <button
                      type="button"
                      onClick={() => changePage(safePage + 1)}
                      disabled={safePage >= totalPages - 1}
                      className="flex h-11 items-center gap-2 border border-[#303432]/20 px-4 text-[9px] uppercase tracking-[0.16em] transition-colors hover:bg-[#303432] hover:text-white disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-[#252A26]"
                    >
                      Next <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="border-t border-[#303432]/15 py-10">
              <p className="text-[15px] text-[#252A26]">No projects match those filters.</p>
              <p className="mt-2 text-[13px] leading-6 text-[#77766F]">Try another keyword or clear the selected category to browse the full portfolio.</p>
              <button
                type="button"
                onClick={() => { updateSearch(""); updateCategory("All"); }}
                className="mt-5 inline-flex items-center gap-2 border-b border-[#947650] pb-2 text-[9px] uppercase tracking-[0.18em] text-[#343A35]"
              >
                Clear filters <ArrowRight size={13} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Contact close */}
      <section className="relative overflow-hidden bg-[#242925] px-5 py-12 text-[#F4F2ED] sm:px-8 sm:py-14 md:px-12 md:py-[76px]">
        <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full border border-white/10" />
        <div className="relative mx-auto grid max-w-[1240px] gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Eyebrow light>03 / Start a conversation</Eyebrow>
            <h2 className="max-w-4xl text-[clamp(2rem,5vw,4.7rem)] leading-[1] tracking-[-0.05em]">
              Have a project in mind?
              <br />
              <span className="text-[#A7A79B]">Let’s discuss what’s possible.</span>
            </h2>
            <p className="mt-6 max-w-xl text-[13px] leading-7 text-[#C2C4BC]">
              Speak with our team about scope, feasibility, planning and delivery requirements.
            </p>
          </div>
          <div className="md:col-span-4 md:flex md:justify-end">
            <a
              href="/contact"
              className="inline-flex min-h-12 items-center justify-between gap-10 border border-white/25 px-5 text-[10px] uppercase tracking-[0.18em] transition-colors hover:border-[#C5A77D] hover:bg-[#C5A77D] hover:text-[#242925]"
            >
              Discuss a project <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </section>

      <Footer />

      <AnimatePresence>
        {activeProject && (
          <ProjectModal
            key={activeProject.title}
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
