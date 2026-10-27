
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Maximize2,
  Images,
} from "lucide-react";
import { sanityClient } from "../lib/sanity";
import { Navbar, Footer } from "../components/Layout";

const ease = [0.22, 1, 0.36, 1];

function Eyebrow({ children, light = false }) {
  return (
    <p
      className={`flex items-center gap-3 text-[9px] font-medium uppercase tracking-[0.22em] sm:text-[10px] sm:tracking-[0.28em] ${
        light ? "text-[#D0B38A]" : "text-[#947650]"
      }`}
    >
      <span
        className={`h-px w-6 shrink-0 ${
          light ? "bg-[#C5A77D]" : "bg-[#947650]"
        }`}
      />
      {children}
    </p>
  );
}

function ProjectImage({ src, alt, className = "", priority = false }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className={`flex items-center justify-center bg-[#E5E1D8] ${className}`}
      >
        <span className="text-[9px] uppercase tracking-[0.2em] text-[#827B70]">
          Project photography
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      onError={() => setFailed(true)}
      className={`block ${className}`}
    />
  );
}

function LoadingPage() {
  return (
    <main className="min-h-screen bg-[#F4F2ED]">
      <Navbar />
      <section className="mx-auto max-w-[1320px] px-5 pb-16 pt-28 sm:px-10 sm:pt-36">
        <div className="h-3 w-32 animate-pulse bg-[#DED9CF]" />
        <div className="mt-8 h-12 max-w-2xl animate-pulse bg-[#E5E1D8] sm:h-20" />
        <div className="mt-5 h-4 w-48 animate-pulse bg-[#E5E1D8]" />
        <div className="mt-10 aspect-[4/3] animate-pulse bg-[#E5E1D8] sm:mt-14 sm:aspect-[16/8]" />
      </section>
      <Footer />
    </main>
  );
}

function NotFoundPage() {
  return (
    <main className="min-h-screen bg-[#F4F2ED] text-[#252A26]">
      <Navbar />
      <section className="mx-auto flex min-h-[65vh] max-w-[1200px] flex-col items-start justify-center px-6 py-24 sm:px-10">
        <Eyebrow>Project unavailable</Eyebrow>
        <h1 className="mt-6 max-w-2xl text-[clamp(2.5rem,7vw,5rem)] font-light leading-[1.02] tracking-[-0.055em]">
          This project couldn't be found.
        </h1>
        <p className="mt-5 max-w-md text-sm leading-7 text-[#656A63]">
          The project may have been moved or is no longer published. Explore
          our portfolio to discover more of our work.
        </p>
        <Link
          to="/projects"
          className="mt-8 inline-flex min-h-12 items-center gap-3 border border-[#303432]/20 px-5 text-[10px] uppercase tracking-[0.16em] transition-colors hover:border-[#947650] hover:bg-[#252A26] hover:text-white"
        >
          <ArrowLeft size={15} /> Return to projects
        </Link>
      </section>
      <Footer />
    </main>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    let mounted = true;

    setLoading(true);
    setProject(null);
    setNotFound(false);
    setActiveImage(0);

    sanityClient
      .fetch(
        `*[_type == "project" && published == true && slug.current == $slug][0] {
          _id,
          title,
          "slug": slug.current,
          location,
          category,
          scale,
          description,
          "images": images[].asset->url
        }`,
        { slug }
      )
      .then((data) => {
        if (!mounted) return;

        if (data) {
          setProject(data);
        } else {
          setNotFound(true);
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("Unable to load project:", error);
        if (!mounted) return;
        setNotFound(true);
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [slug]);

  const pageTitle = project
    ? `${project.title} | RafaBuildTec LLP`
    : "Project | RafaBuildTec LLP";

  useEffect(() => {
    document.title = pageTitle;

    const setMeta = (attribute, key, content) => {
      let element = document.head.querySelector(
        `meta[${attribute}="${key}"]`
      );

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }

      element.setAttribute("content", content || "");
    };

    if (project) {
      const description =
        project.description ||
        `${project.title}${project.location ? ` in ${project.location}` : ""}. Explore this project by RafaBuildTec LLP.`;

      const image = project.images?.[0] || "";
      const canonicalUrl =
        `${window.location.origin}/projects/${project.slug}`;

      setMeta("name", "description", description);
      setMeta("property", "og:title", pageTitle);
      setMeta("property", "og:description", description);
      setMeta("property", "og:type", "article");
      setMeta("property", "og:url", canonicalUrl);

      if (image) {
        setMeta("property", "og:image", image);
        setMeta("name", "twitter:image", image);
      }

      setMeta("name", "twitter:card", "summary_large_image");
      setMeta("name", "twitter:title", pageTitle);
      setMeta("name", "twitter:description", description);
    }

    return () => {
      document.title = "RafaBuildTec LLP";
    };
  }, [project, pageTitle]);

  if (loading) return <LoadingPage />;
  if (notFound || !project) return <NotFoundPage />;

  const images = project.images || [];
  const heroImage = images[0];
  const galleryImages = images.slice(1);
  const description =
    project.description ||
    "Further project information will be added as the project portfolio develops.";

  return (
    <main className="min-h-screen overflow-x-clip bg-[#F4F2ED] text-[#252A26]">
      <Navbar />

      {/* Project introduction */}
      <section className="relative overflow-hidden bg-[#252A26] text-[#F4F2ED]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-36 -top-32 h-[420px] w-[420px] rounded-full border border-white/[0.06] sm:h-[600px] sm:w-[600px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-16 h-[280px] w-[280px] rounded-full border border-white/[0.05] sm:h-[430px] sm:w-[430px]"
        />

        <div className="relative mx-auto max-w-[1320px] px-5 pb-9 pt-28 sm:px-10 sm:pb-12 sm:pt-36 lg:px-14 lg:pb-14">
          <Link
            to="/projects"
            className="inline-flex min-h-9 items-center gap-2 text-[9px] uppercase tracking-[0.17em] text-white/65 transition-colors hover:text-[#D0B38A] sm:text-[10px]"
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            All projects
          </Link>

          <div className="mt-11 grid gap-8 sm:mt-16 lg:grid-cols-12 lg:items-end lg:gap-10">
            <div className="lg:col-span-8">
              <Eyebrow light>
                {project.category || "Selected work"}
              </Eyebrow>

              <h1 className="mt-6 max-w-5xl break-words text-[clamp(2.7rem,9vw,6.8rem)] font-light leading-[0.96] tracking-[-0.06em]">
                {project.title}
              </h1>
            </div>

            <div className="lg:col-span-4 lg:justify-self-end lg:pb-2">
              <p className="max-w-sm text-[13px] leading-7 text-white/65 sm:text-sm sm:leading-8">
                An overview of the project, its context and the work behind
                its delivery.
              </p>
            </div>
          </div>

          <div className="mt-9 grid grid-cols-2 gap-x-4 gap-y-5 border-t border-white/15 pt-5 sm:mt-12 sm:grid-cols-3 sm:gap-8 sm:pt-6">
            <div className="min-w-0">
              <p className="text-[8px] uppercase tracking-[0.2em] text-white/45 sm:text-[9px]">
                Location
              </p>
              <p className="mt-2 flex items-start gap-2 text-[11px] leading-5 text-white/90 sm:text-[12px]">
                <MapPin
                  size={13}
                  className="mt-0.5 shrink-0 text-[#C5A77D]"
                  strokeWidth={1.5}
                />
                <span className="break-words">
                  {project.location || "Location to be announced"}
                </span>
              </p>
            </div>

            <div className="min-w-0">
              <p className="text-[8px] uppercase tracking-[0.2em] text-white/45 sm:text-[9px]">
                Project category
              </p>
              <p className="mt-2 break-words text-[11px] leading-5 text-white/90 sm:text-[12px]">
                {project.category || "Construction"}
              </p>
            </div>

            <div className="col-span-2 min-w-0 sm:col-span-1">
              <p className="text-[8px] uppercase tracking-[0.2em] text-white/45 sm:text-[9px]">
                Project scale
              </p>
              <p className="mt-2 break-words text-[11px] leading-5 text-white/90 sm:text-[12px]">
                {project.scale || "Project details available on request"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lead image */}
      <section className="bg-[#EAE7DF] px-3 py-3 sm:px-6 sm:py-6 lg:px-10 lg:py-9">
        <div className="mx-auto max-w-[1440px]">
          <div className="relative overflow-hidden bg-[#DCD7CD]">
            {heroImage ? (
              <ProjectImage
                src={heroImage}
                alt={`${project.title} — project overview`}
                priority
                className="aspect-[4/3] max-h-[780px] w-full object-cover sm:aspect-[16/9] lg:aspect-[1.9/1]"
              />
            ) : (
              <div className="flex aspect-[4/3] items-center justify-center sm:aspect-[16/9]">
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#827B70]">
                  Project photography coming soon
                </span>
              </div>
            )}

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3 sm:bottom-6 sm:left-6 sm:right-6">
              <span className="text-[8px] uppercase tracking-[0.17em] text-white/90 drop-shadow sm:text-[10px] sm:tracking-[0.22em]">
                RafaBuildTec LLP
              </span>

              {images.length > 1 && (
                <span className="flex items-center gap-2 bg-black/35 px-3 py-2 text-[8px] uppercase tracking-[0.14em] text-white backdrop-blur-sm sm:text-[9px]">
                  <Images size={13} />
                  {String(images.length).padStart(2, "0")} images
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Project narrative */}
      <section className="px-5 py-14 sm:px-10 sm:py-20 lg:px-14 lg:py-24">
        <div className="mx-auto grid max-w-[1240px] gap-9 sm:gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Eyebrow>Project / Overview</Eyebrow>

            <h2 className="mt-5 max-w-lg text-[clamp(2rem,5vw,3.9rem)] font-light leading-[1.04] tracking-[-0.05em]">
              Every detail has a purpose.
            </h2>

            <div className="mt-7 h-px w-12 bg-[#947650]" />

            <p className="mt-5 max-w-sm text-[12px] leading-7 text-[#77766F] sm:text-[13px]">
              Explore the project details and the context behind this
              engagement.
            </p>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 lg:pt-1">
            <p className="whitespace-pre-line text-[13px] leading-7 text-[#555D56] sm:text-[15px] sm:leading-8">
              {description}
            </p>

            <div className="mt-9 grid grid-cols-2 gap-4 border-t border-[#303432]/15 pt-5 sm:mt-12 sm:gap-8">
              <div>
                <p className="text-[8px] uppercase tracking-[0.2em] text-[#947650] sm:text-[9px]">
                  Location
                </p>
                <p className="mt-2 text-[12px] leading-6 text-[#303432] sm:text-[13px]">
                  {project.location || "To be announced"}
                </p>
              </div>

              <div>
                <p className="text-[8px] uppercase tracking-[0.2em] text-[#947650] sm:text-[9px]">
                  Category
                </p>
                <p className="mt-2 text-[12px] leading-6 text-[#303432] sm:text-[13px]">
                  {project.category || "Construction"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Remaining project photography */}
      {galleryImages.length > 0 && (
        <section className="bg-[#EAE7DF] px-5 py-12 sm:px-10 sm:py-16 lg:px-14 lg:py-20">
          <div className="mx-auto max-w-[1240px]">
            <div className="mb-7 flex items-end justify-between gap-4 sm:mb-10">
              <div>
                <Eyebrow>In focus</Eyebrow>
                <h2 className="mt-4 text-[clamp(1.8rem,4vw,3.2rem)] font-light leading-tight tracking-[-0.045em]">
                  A closer look.
                </h2>
              </div>

              <span className="pb-1 font-mono text-[10px] text-[#77766F]">
                {String(galleryImages.length).padStart(2, "0")} photographs
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5">
              {galleryImages.map((image, index) => (
                <button
                  type="button"
                  key={`${image}-${index}`}
                  onClick={() => setActiveImage(index + 1)}
                  className="group relative block min-w-0 overflow-hidden bg-[#DCD7CD] text-left"
                  aria-label={`View photograph ${index + 2} of ${project.title}`}
                >
                  <ProjectImage
                    src={image}
                    alt={`${project.title} — photograph ${index + 2}`}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                  />

                  <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center border border-white/70 bg-black/25 text-white backdrop-blur-sm transition-colors group-hover:bg-[#252A26]">
                    <Maximize2 size={14} strokeWidth={1.4} />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact close */}
      <section className="relative overflow-hidden bg-[#252A26] px-5 py-14 text-[#F4F2ED] sm:px-10 sm:py-20 lg:px-14 lg:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full border border-white/[0.08] sm:h-96 sm:w-96"
        />

        <div className="relative mx-auto grid max-w-[1240px] gap-8 sm:gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Eyebrow light>Have a project in mind?</Eyebrow>

            <h2 className="mt-5 max-w-4xl text-[clamp(2.3rem,7vw,5.5rem)] font-light leading-[1.01] tracking-[-0.055em]">
              Let’s build something
              <span className="block text-white/55">that lasts.</span>
            </h2>

            <p className="mt-5 max-w-lg text-[12px] leading-7 text-white/65 sm:text-[13px] sm:leading-8">
              Speak with our team about your project, its requirements and
              the possibilities ahead.
            </p>
          </div>

          <div className="lg:col-span-4 lg:flex lg:justify-end">
            <Link
              to="/contact"
              className="group inline-flex min-h-12 w-full items-center justify-between gap-6 border border-white/30 px-5 text-[9px] uppercase tracking-[0.17em] transition-colors hover:border-[#C5A77D] hover:bg-[#C5A77D] hover:text-[#252A26] sm:w-auto sm:min-w-[230px] sm:text-[10px]"
            >
              Discuss your project
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Back to portfolio */}
      <div className="bg-[#EAE7DF] px-5 py-5 sm:px-10 sm:py-6">
        <div className="mx-auto flex max-w-[1240px]">
          <Link
            to="/projects"
            className="inline-flex min-h-10 items-center gap-2 text-[9px] uppercase tracking-[0.17em] text-[#555D56] transition-colors hover:text-[#947650] sm:text-[10px]"
          >
            <ArrowLeft size={14} /> Back to selected work
          </Link>
        </div>
      </div>

      <Footer />

      {/* Full-screen image viewer */}
      {activeImage > 0 && images[activeImage] && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#171A18]/95 p-3 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Project photograph viewer"
          onClick={() => setActiveImage(0)}
        >
          <button
            type="button"
            onClick={() => setActiveImage(0)}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center border border-white/25 text-white transition-colors hover:bg-white hover:text-[#252A26]"
            aria-label="Close photograph"
          >
            <span className="text-xl leading-none">×</span>
          </button>

          <img
            src={images[activeImage]}
            alt={`${project.title} — photograph ${activeImage + 1}`}
            className="max-h-[86dvh] max-w-full object-contain"
            onClick={(event) => event.stopPropagation()}
          />

          <div className="absolute bottom-5 left-0 right-0 flex items-center justify-center gap-5 text-[10px] uppercase tracking-[0.16em] text-white/80">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setActiveImage(
                  activeImage <= 1 ? images.length - 1 : activeImage - 1
                );
              }}
              className="flex min-h-10 items-center gap-2 px-3 hover:text-[#D0B38A]"
            >
              <ArrowLeft size={14} /> Previous
            </button>

            <span className="font-mono">
              {String(activeImage + 1).padStart(2, "0")} /{" "}
              {String(images.length).padStart(2, "0")}
            </span>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setActiveImage(
                  activeImage >= images.length - 1 ? 0 : activeImage + 1
                );
              }}
              className="flex min-h-10 items-center gap-2 px-3 hover:text-[#D0B38A]"
            >
              Next <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
