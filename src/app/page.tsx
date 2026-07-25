"use client";

import { motion, useScroll, useSpring, useTransform, type Variants } from "framer-motion";
import { ArrowUpRight, Download, GraduationCap, Mail, MapPin, RotateCcw, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import HeroScene from "@/components/HeroScene";
import ScreenLoader from "@/components/ScreenLoader";
import {
  about,
  education,
  experience,
  navLinks,
  problemSignals,
  processSteps,
  profile,
  projects,
  skillGroups,
  stats,
} from "@/data/portfolio";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <Reveal className="mb-12">
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-cyan-400/60" aria-hidden="true" />
        <p className="u-eyebrow text-cyan-400">{eyebrow}</p>
      </div>
      <h2 className="u-h2 mt-3 text-white">{title}</h2>
    </Reveal>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[#060a12]/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="group flex items-center gap-2 font-semibold tracking-tight text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-300 text-sm font-bold text-[#060a12]">
            {profile.initials}
          </span>
          <span className="hidden sm:inline">{profile.name}</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-zinc-400 transition-colors hover:text-white">
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:border-cyan-400/60 hover:bg-cyan-400/10 md:inline-flex"
        >
          <GithubIcon className="h-4 w-4" />
          GitHub
        </a>

        <button
          onClick={() => setOpen((value) => !value)}
          className="inline-flex flex-col gap-1.5 p-2 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="h-0.5 w-6 bg-white" />
          <span className="h-0.5 w-6 bg-white" />
          <span className="h-0.5 w-6 bg-white" />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-white/5 px-6 py-4 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-2 text-sm text-zinc-300 transition hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

function highlightTagline(text: string, term: string) {
  if (!term || !text.includes(term)) return text;
  const [before, ...rest] = text.split(term);
  return (
    <>
      {before}
      <span className="text-cyan-300">{term}</span>
      {rest.join(term)}
    </>
  );
}

function PlaneIcon({ className = "h-8 w-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 104 72" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id="heroPlaneBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="58%" stopColor="#bae6fd" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>
      </defs>
      <path d="M8 35 94 7 66 65 48 43 29 56l9-19L8 35Z" fill="url(#heroPlaneBody)" />
      <path d="M38 37 94 7 48 43" fill="none" stroke="#0f172a" strokeOpacity="0.35" strokeWidth="3.2" strokeLinejoin="round" />
      <path d="M29 56 48 43" stroke="#0f172a" strokeOpacity="0.25" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  );
}

function HeroFlightAccent() {
  return (
    <div className="pointer-events-none absolute inset-y-0 right-0 z-[6] hidden w-[36rem] max-w-[52vw] overflow-hidden lg:block">
      <motion.svg
        viewBox="0 0 520 760"
        className="absolute right-0 top-1/2 h-[44rem] w-[32rem] -translate-y-1/2"
        fill="none"
        aria-hidden="true"
      >
        <motion.path
          d="M424 42 C238 126 458 262 272 332 C118 390 172 548 430 626"
          stroke="rgba(56,189,248,0.42)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="8 16"
          initial={{ pathLength: 0.2, opacity: 0.35 }}
          animate={{ pathLength: [0.2, 1, 0.2], opacity: [0.25, 0.82, 0.25] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M468 150 C382 222 360 292 438 356 C500 407 492 488 418 560"
          stroke="rgba(255,255,255,0.16)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0.1, opacity: 0.2 }}
          animate={{ pathLength: [0.1, 0.8, 0.1], opacity: [0.1, 0.45, 0.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        />
      </motion.svg>
      <motion.div
        className="absolute right-28 top-1/2 drop-shadow-[0_0_22px_rgba(56,189,248,0.65)]"
        animate={{
          x: [42, -42, -150, -62, 28, 42],
          y: [-250, -132, -8, 130, 250, -250],
          rotate: [138, 106, 74, 38, -12, 138],
          scale: [0.92, 1.04, 1.12, 1.02, 0.95, 0.92],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      >
        <PlaneIcon className="h-10 w-16" />
      </motion.div>
      <div className="absolute right-8 top-1/2 h-56 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-cyan-300/35 to-transparent" />
    </div>
  );
}

function SectionCurtain() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 border-r border-cyan-200/10"
        style={{
          background:
            "linear-gradient(90deg, rgba(6,10,18,0.96), rgba(10,28,48,0.88) 58%, rgba(56,189,248,0.12))",
        }}
        initial={{ x: 0, opacity: 0.85 }}
        whileInView={{ x: "-105%", opacity: 0 }}
        viewport={{ once: true, amount: 0.28 }}
        transition={{ duration: 1.05, ease: [0.83, 0, 0.17, 1] }}
      />
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2 border-l border-cyan-200/10"
        style={{
          background:
            "linear-gradient(270deg, rgba(6,10,18,0.96), rgba(10,28,48,0.88) 58%, rgba(56,189,248,0.12))",
        }}
        initial={{ x: 0, opacity: 0.85 }}
        whileInView={{ x: "105%", opacity: 0 }}
        viewport={{ once: true, amount: 0.28 }}
        transition={{ duration: 1.05, ease: [0.83, 0, 0.17, 1] }}
      />
      <motion.div
        className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-cyan-200/60 shadow-[0_0_30px_rgba(56,189,248,0.6)]"
        initial={{ scaleY: 0, opacity: 0 }}
        whileInView={{ scaleY: [0, 1, 1], opacity: [0, 1, 0] }}
        viewport={{ once: true, amount: 0.28 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  );
}

type TourStep = {
  id: string;
  eyebrow: string;
  title: string;
  note: string;
  plane: { left: string; top: string; rotate: number; scale: number };
};

const tourSteps: TourStep[] = [
  {
    id: "top",
    eyebrow: "Resume Flight",
    title: "Bhumika Jain",
    note: "The opening stop: role, focus areas, and quick resume download.",
    plane: { left: "18vw", top: "30vh", rotate: -10, scale: 1 },
  },
  {
    id: "about",
    eyebrow: "Profile",
    title: "About Snapshot",
    note: "The story behind the work, with the avatar reveal waiting on the card.",
    plane: { left: "72vw", top: "35vh", rotate: 18, scale: 1.04 },
  },
  {
    id: "experience",
    eyebrow: "Timeline",
    title: "Experience",
    note: "Production work across automation, migrations, dashboards, and infrastructure tools.",
    plane: { left: "24vw", top: "42vh", rotate: -22, scale: 1.08 },
  },
  {
    id: "projects",
    eyebrow: "Builds",
    title: "Projects",
    note: "Selected AI, OCR, and full-stack systems from the resume.",
    plane: { left: "76vw", top: "45vh", rotate: 24, scale: 1.1 },
  },
  {
    id: "skills",
    eyebrow: "Toolkit",
    title: "Skills",
    note: "Languages, backend, cloud, databases, frontend, and AI/OCR tools.",
    plane: { left: "28vw", top: "38vh", rotate: -12, scale: 1.06 },
  },
  {
    id: "contact",
    eyebrow: "Landing",
    title: "Contact + Resume",
    note: "The final stop keeps email and the downloadable resume close at hand.",
    plane: { left: "58vw", top: "34vh", rotate: 8, scale: 1.14 },
  },
];

function PortfolioTour({ active, onClose }: { active: boolean; onClose: () => void }) {
  const [stepIndex, setStepIndex] = useState(0);
  const programmaticScrollUntil = useRef(0);


  useEffect(() => {
    if (!active) return;

    const closeFromScroll = () => {
      if (window.performance.now() > programmaticScrollUntil.current) onClose();
    };
    const closeFromIntent = () => onClose();
    const closeFromKey = (event: KeyboardEvent) => {
      if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(event.key)) {
        onClose();
      }
    };

    window.addEventListener("wheel", closeFromIntent, { passive: true });
    window.addEventListener("touchmove", closeFromIntent, { passive: true });
    window.addEventListener("scroll", closeFromScroll, { passive: true });
    window.addEventListener("keydown", closeFromKey);

    return () => {
      window.removeEventListener("wheel", closeFromIntent);
      window.removeEventListener("touchmove", closeFromIntent);
      window.removeEventListener("scroll", closeFromScroll);
      window.removeEventListener("keydown", closeFromKey);
    };
  }, [active, onClose]);

  useEffect(() => {
    if (!active) return;

    const step = tourSteps[stepIndex];
    const target = document.getElementById(step.id);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    programmaticScrollUntil.current = window.performance.now() + (reducedMotion ? 400 : 1800);
    target?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: step.id === "top" ? "start" : "center" });

    const timer = window.setTimeout(() => {
      if (stepIndex < tourSteps.length - 1) {
        setStepIndex((index) => index + 1);
      } else {
        onClose();
      }
    }, stepIndex === 0 ? 3600 : 4300);

    return () => window.clearTimeout(timer);
  }, [active, onClose, stepIndex]);

  if (!active) return null;

  const step = tourSteps[stepIndex] ?? tourSteps[0];

  return (
    <>
      <motion.div
        className="pointer-events-none fixed inset-0 z-[60] bg-[radial-gradient(circle_at_50%_35%,rgba(56,189,248,0.14),transparent_32%),linear-gradient(180deg,rgba(6,10,18,0.28),rgba(6,10,18,0.04))]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45 }}
      />

      <motion.div
        className="pointer-events-none fixed z-[70] drop-shadow-[0_0_26px_rgba(56,189,248,0.7)]"
        initial={{ left: "10vw", top: "22vh", opacity: 0, scale: 0.72 }}
        animate={{ left: step.plane.left, top: step.plane.top, opacity: 1, scale: step.plane.scale }}
        transition={{ duration: 1.18, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div animate={{ rotate: step.plane.rotate }} transition={{ duration: 1.18, ease: [0.16, 1, 0.3, 1] }}>
          <PlaneIcon className="h-12 w-20" />
          <motion.div
            className="absolute right-16 top-1/2 h-px w-52 origin-right -translate-y-1/2 bg-gradient-to-l from-cyan-100/90 via-cyan-300/45 to-transparent"
            animate={{ scaleX: [0.35, 1, 0.45], opacity: [0.35, 0.95, 0.4] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="pointer-events-auto fixed bottom-5 left-1/2 z-[75] w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 rounded-2xl border border-white/12 bg-[#071426]/86 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.46)] backdrop-blur-xl md:left-auto md:right-5 md:translate-x-0"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-cyan-300">{step.eyebrow}</p>
            <h2 className="mt-2 text-lg font-semibold text-white">{step.title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-white/10 text-zinc-300 transition hover:border-cyan-300/60 hover:text-white"
            aria-label="Skip tour"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <p className="mt-2 text-sm leading-6 text-zinc-300">{step.note}</p>
        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="flex gap-1.5">
            {tourSteps.map((item, index) => (
              <span
                key={item.id}
                className={`h-1.5 rounded-full transition-all ${index === stepIndex ? "w-7 bg-cyan-300" : "w-1.5 bg-white/25"}`}
              />
            ))}
          </div>
          {step.id === "contact" && (
            <a
              href={profile.resume}
              download="Bhumika-Jain-Resume.pdf"
              className="inline-flex h-9 items-center gap-2 rounded-full bg-cyan-300 px-4 text-xs font-semibold text-[#06121f] transition hover:bg-cyan-200"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              Resume PDF
            </a>
          )}
        </div>
      </motion.div>
    </>
  );
}
function Hero() {
  const ease = [0.22, 1, 0.36, 1] as const;
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-linked parallax: the portrait and 3D layer drift as you scroll away.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const sceneY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="hero-cinematic relative isolate min-h-screen overflow-hidden"
    >
      {/* Drifting aurora glow behind the scene */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="aurora aurora-a"
          style={{ top: "-10%", left: "-5%", width: "48%", height: "60%", background: "rgba(56,189,248,0.28)" }}
        />
        <div
          className="aurora aurora-b"
          style={{ bottom: "-15%", left: "12%", width: "42%", height: "55%", background: "rgba(129,140,248,0.24)" }}
        />
        <div
          className="aurora aurora-a"
          style={{ top: "20%", left: "28%", width: "30%", height: "40%", background: "rgba(34,211,238,0.16)", animationDelay: "-8s" }}
        />
      </div>

      {/* Immersive 3D layer â€” full strength */}
      <motion.div
        style={{ y: sceneY }}
        className="pointer-events-none absolute inset-0 z-0"
      >
        <HeroScene />
      </motion.div>

      {/* Full-bleed portrait on the right, its left edge dissolved into the scene */}
      <div className="absolute inset-y-0 right-0 z-[1] hidden w-[52%] overflow-hidden md:block lg:w-[50%]">
        <motion.img
          src={profile.heroPhoto}
          alt={profile.name}
          initial={{ opacity: 0, scale: 1.06, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.1, ease }}
          style={{
            y: photoY,
            scale: photoScale,
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 22%, rgba(0,0,0,0.7) 40%, #000 55%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 22%, rgba(0,0,0,0.7) 40%, #000 55%)",
          }}
          className="h-full w-full object-cover object-top"
        />
        {/* Feather only the bottom edge into the sections below */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#060a12] to-transparent" />
      </div>

      {/* Radial vignette keeps the hero copy legible over the live scene */}
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            "radial-gradient(115% 80% at 28% 42%, rgba(6,10,18,0.78) 0%, rgba(6,10,18,0.32) 42%, transparent 72%)",
        }}
      />

      {/* Bottom fade into the dark sections below */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-32 bg-gradient-to-t from-[#060a12] to-transparent" />
      <HeroFlightAccent />

      {/* Left vertical social rail */}
      <div className="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-6 lg:flex">
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          className="flex flex-col items-center gap-2 text-white/70 transition hover:text-white"
        >
          <GithubIcon className="h-4 w-4" />
          <span className="vertical-text text-[0.55rem] font-bold uppercase tracking-[0.2em]">GitHub</span>
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          className="flex flex-col items-center gap-2 text-white/70 transition hover:text-white"
        >
          <LinkedinIcon className="h-4 w-4" />
          <span className="vertical-text text-[0.55rem] font-bold uppercase tracking-[0.2em]">LinkedIn</span>
        </a>
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/50 transition hover:text-white lg:flex"
      >
        <span className="vertical-text text-[0.55rem] font-bold uppercase tracking-[0.25em]">Scroll</span>
        <span className="flex h-8 w-5 justify-center rounded-full border border-white/40 pt-1.5">
          <span className="h-1.5 w-1.5 animate-scroll-dot rounded-full bg-cyan-300" />
        </span>
      </a>

      {/* Left content column */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-28 lg:pl-20"
      >
        <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="font-mono text-sm text-zinc-300"
          >
            {profile.greeting}{" "}
            <span className="font-semibold text-cyan-300">{profile.role}</span>
          </motion.p>

          <div className="mt-3">
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.05 }}
              className="text-5xl font-extrabold leading-[0.9] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
            >
              {profile.firstName}
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.15 }}
              className="bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-300 bg-clip-text text-5xl font-extrabold leading-[0.9] tracking-tight text-transparent sm:text-6xl md:text-7xl lg:text-8xl"
            >
              {profile.lastName}
            </motion.h1>
          </div>

          {/* Tag pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.25 }}
            className="mt-7 flex flex-wrap items-center gap-2.5"
          >
            {profile.heroPills.map((pill) => (
              <span
                key={pill}
                className="glass rounded-full px-4 py-1.5 text-sm font-medium text-white"
              >
                {pill}
              </span>
            ))}
          </motion.div>

          {/* One-line tagline (relocated out of the floating card) */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.32 }}
            className="mt-6 max-w-md text-base leading-relaxed text-zinc-300"
          >
            {highlightTagline(profile.tagline, profile.taglineHighlight)}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.42 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-cyan-300 px-6 text-sm font-semibold text-[#06121f] shadow-[0_10px_40px_-12px_rgba(56,189,248,0.7)] transition-colors hover:bg-cyan-200"
            >
              View Work
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </a>
            <a
              href={profile.resume}
              download="Bhumika-Jain-Resume.pdf"
              className="glass inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-semibold text-white transition hover:border-cyan-400/60"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download Resume
            </a>
            <a
              href="#contact"
              className="glass inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-semibold text-white transition hover:border-cyan-400/60"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Get in touch
            </a>
          </motion.div>

          {/* Availability + location â€” one quiet supporting line */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.5 }}
            className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-zinc-400"
          >
            <span className="inline-flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {profile.availableLabel}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {profile.location}
            </span>
          </motion.div>
        </div>
      </motion.div>

    </section>
  );
}

function pickNextAvatarIndex(current: number, total: number) {
  if (total < 2) return current;
  const next = Math.floor(Math.random() * (total - 1));
  return next >= current ? next + 1 : next;
}

function CartoonAvatar({ src, label }: { src: string; label: string }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#07111f]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={label}
        className="h-full w-full object-cover object-center transition duration-700 group-hover:scale-105"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#060a12]/80 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
      <div className="absolute bottom-4 left-4 right-4 z-20 rounded-2xl border border-white/15 bg-[#060a12]/68 px-4 py-3 text-center backdrop-blur-md">
        <p className="text-sm font-semibold text-white">{profile.name}</p>
        <p className="text-[0.7rem] text-cyan-300">{label}</p>
      </div>
    </div>
  );
}
function About() {
  const [avatarIndex, setAvatarIndex] = useState(0);
  const avatar = profile.avatarOptions[avatarIndex] ?? profile.avatarOptions[0];

  function shuffleAvatar() {
    setAvatarIndex((current) => pickNextAvatarIndex(current, profile.avatarOptions.length));
  }

  return (
    <section id="about" className="bg-grid relative overflow-hidden border-t border-white/5 py-24 sm:py-32">
      <SectionCurtain />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal className="flex justify-center lg:justify-start">
            <motion.div
              className="relative"
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
            >
              <div className="absolute -inset-5 rounded-[2.25rem] bg-gradient-to-tr from-cyan-500/25 via-transparent to-indigo-500/25 blur-2xl" />
              <div className="flip-card group w-60 sm:w-72" tabIndex={0} aria-label="Profile card. Hover, focus, or tap to reveal a random avatar." onMouseEnter={shuffleAvatar} onFocus={shuffleAvatar} onTouchStart={shuffleAvatar}>
                <div className="flip-card-inner aspect-[4/5]">
                  <div className="flip-card-face surface rounded-[1.75rem] p-2">
                    <div className="relative h-full overflow-hidden rounded-[1.35rem]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={profile.photo}
                        alt={profile.name}
                        className="h-full w-full object-cover object-top"
                        style={{ filter: "saturate(0.9) contrast(1.03)" }}
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-cyan-500/25 via-transparent to-indigo-500/20 mix-blend-overlay" />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#060a12]/75 via-transparent to-transparent" />
                      <div className="pointer-events-none absolute inset-0 rounded-[1.35rem] ring-1 ring-inset ring-white/10" />
                    </div>
                  </div>
                  <div className="flip-card-face flip-card-back surface rounded-[1.75rem] p-2">
                    <div className="h-full overflow-hidden rounded-[1.35rem]">
                      <CartoonAvatar src={avatar.src} label={avatar.label} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </Reveal>

          <div>
            <SectionHeading eyebrow="About" title="Automation-first, full-stack." />
            <div className="space-y-5">
              {about.map((para, index) => (
                <Reveal key={para} delay={index * 0.08}>
                  <p className="u-body text-zinc-300">{para}</p>
                </Reveal>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((stat, index) => (
                <Reveal key={stat.label} delay={index * 0.06}>
                  <div className="rounded-2xl surface p-4 text-center">
                    <div className="bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-xs leading-4 text-zinc-400">{stat.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * The problem-to-system diagram.
 *
 * Six problem chips start scattered and tangled, then settle into an ordered
 * column that feeds a working system. The transition is the whole point, so it
 * runs on scroll-into-view and can be replayed.
 *
 * Motion is driven by variants rather than state-in-effect, and the labels are
 * the *kinds* of problems this work starts from - no claims are made here.
 */
const NODE_W = 196;
const NODE_H = 42;

const MESSY_LAYOUT = [
  { x: 300, y: 8, rotate: -7 },
  { x: 34, y: 68, rotate: 6 },
  { x: 556, y: 34, rotate: -4 },
  { x: 246, y: 148, rotate: 8 },
  { x: 604, y: 188, rotate: -9 },
  { x: 52, y: 236, rotate: 5 },
];

function ProblemToSystem() {
  // Bumping the key remounts the svg, which replays every variant from "messy".
  const [runId, setRunId] = useState(0);

  const nodes = problemSignals.slice(0, 6).map((label, i) => ({
    label,
    messy: MESSY_LAYOUT[i],
    tidy: { x: 24, y: 14 + i * 48, rotate: 0 },
  }));

  // Tangled connectors, drawn between the scattered positions.
  const centre = (p: { x: number; y: number }) => ({
    cx: p.x + NODE_W / 2,
    cy: p.y + NODE_H / 2,
  });
  const tangles = [
    [0, 1],
    [1, 3],
    [3, 2],
    [2, 4],
    [4, 5],
    [5, 0],
  ].map(([a, b]) => {
    const from = centre(MESSY_LAYOUT[a]);
    const to = centre(MESSY_LAYOUT[b]);
    // Bow each line the opposite way so the cluster reads as knotted.
    const bow = (a % 2 ? -1 : 1) * 60;
    return `M${from.cx} ${from.cy} Q ${(from.cx + to.cx) / 2 + bow} ${
      (from.cy + to.cy) / 2 - bow
    } ${to.cx} ${to.cy}`;
  });

  return (
    <div className="relative">
      <motion.svg
        key={runId}
        viewBox="0 0 960 320"
        className="w-full"
        initial="messy"
        whileInView="tidy"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ staggerChildren: 0.07, delayChildren: 0.35 }}
        role="img"
        aria-label="Six scattered problems - manual steps, scattered systems, repeated data entry, slow queries, no visibility and access control - reorganising into an ordered sequence that feeds a single working system."
      >
        {/* Knotted connectors, present only while things are still a mess. */}
        <motion.g
          variants={{ messy: { opacity: 1 }, tidy: { opacity: 0 } }}
          transition={{ duration: 0.5 }}
        >
          {tangles.map((d, i) => (
            <path
              key={i}
              d={d}
              fill="none"
              stroke="rgba(255,255,255,0.16)"
              strokeWidth={1.4}
              strokeDasharray="5 7"
            />
          ))}
        </motion.g>

        {/* The ordered spine that replaces them. */}
        <motion.g
          variants={{ messy: { opacity: 0 }, tidy: { opacity: 1 } }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <path d="M12 30 V 282" stroke="url(#p2sLine)" strokeWidth={2} strokeLinecap="round" />
          <path
            d="M232 160 H 448 m -10 -6 l 10 6 l -10 6"
            fill="none"
            stroke="url(#p2sLine)"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.g>

        {/* The problems themselves. */}
        {nodes.map((node, i) => (
          <motion.g
            key={node.label}
            custom={node}
            variants={{
              messy: (n: typeof node) => ({ x: n.messy.x, y: n.messy.y, rotate: n.messy.rotate }),
              tidy: (n: typeof node) => ({ x: n.tidy.x, y: n.tidy.y, rotate: 0 }),
            }}
            transition={{ type: "spring", stiffness: 60, damping: 16 }}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          >
            <rect
              width={NODE_W}
              height={NODE_H}
              rx={10}
              fill="rgba(255,255,255,0.045)"
              stroke="rgba(255,255,255,0.14)"
              strokeWidth={1.2}
            />
            <circle cx={18} cy={NODE_H / 2} r={3.5} fill="#22d3ee" opacity={0.75} />
            <text
              x={34}
              y={NODE_H / 2 + 4}
              fontSize={13}
              fill="#c9d2de"
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              {node.label}
            </text>
            <text x={NODE_W - 14} y={NODE_H / 2 + 4} fontSize={11} fill="#5c6675" textAnchor="end">
              {`0${i + 1}`}
            </text>
          </motion.g>
        ))}

        {/* What it turns into. */}
        <motion.g
          variants={{ messy: { opacity: 0, x: 24 }, tidy: { opacity: 1, x: 0 } }}
          transition={{ duration: 0.6, delay: 0.95 }}
        >
          <rect
            x={470}
            y={86}
            width={440}
            height={148}
            rx={16}
            fill="rgba(34,211,238,0.05)"
            stroke="rgba(34,211,238,0.32)"
            strokeWidth={1.3}
          />
          <text
            x={496}
            y={122}
            fontSize={15}
            fill="#e8edf4"
            style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
          >
            a working system
          </text>
          {["validated flows", "queues + workers", "one screen to see it"].map((line, i) => (
            <g key={line}>
              <circle cx={502} cy={152 + i * 26} r={3} fill="#818cf8" />
              <text
                x={518}
                y={156 + i * 26}
                fontSize={12.5}
                fill="#9aa5b4"
                style={{ fontFamily: "var(--font-geist-mono), monospace" }}
              >
                {line}
              </text>
            </g>
          ))}
        </motion.g>

        <defs>
          <linearGradient id="p2sLine" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
        </defs>
      </motion.svg>

      <button
        type="button"
        onClick={() => setRunId((n) => n + 1)}
        className="absolute right-0 top-0 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-400 transition hover:border-cyan-400/40 hover:text-cyan-300"
      >
        <RotateCcw className="h-3 w-3" aria-hidden="true" />
        Replay
      </button>
    </div>
  );
}

function Process() {
  return (
    <section id="process" className="relative overflow-hidden border-t border-white/5 py-24 sm:py-32">
      <SectionCurtain />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Process"
          title="How a messy problem becomes a working system."
        />

        <Reveal>
          <p className="u-body mb-10 max-w-2xl text-zinc-400">
            Every project below started as something slow and manual. The domain changes; the
            method does not.
          </p>
        </Reveal>

        <Reveal>
          <div className="surface rounded-3xl p-5 sm:p-8">
            <ProblemToSystem />
          </div>
        </Reveal>

        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.06}>
              <li className="surface h-full rounded-2xl p-5">
                <span className="font-mono text-xs text-cyan-400">{`0${index + 1}`}</span>
                <h3 className="mt-1.5 text-base font-semibold text-white">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-zinc-400">{step.detail}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Experience() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 75%", "end 60%"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.3 });

  return (
    <section id="experience" className="relative overflow-hidden border-t border-white/5 py-24 sm:py-32">
      <SectionCurtain />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Experience" title="Where I have built things." />
        <div ref={trackRef} className="relative space-y-12 pl-8">
          {/* Timeline track + scroll-drawn fill */}
          <div className="absolute inset-y-0 left-0 w-px bg-white/10" />
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute inset-y-0 left-0 w-px origin-top bg-gradient-to-b from-cyan-400 via-sky-400 to-indigo-400"
          />
          {experience.map((job, index) => (
            <Reveal key={job.company} delay={index * 0.05}>
              <div className="relative">
                <span className="absolute -left-[41px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-cyan-400/50 bg-[#060a12]">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                </span>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-xl font-semibold text-white">{job.role}</h3>
                  <span className="font-mono text-xs text-zinc-500">{job.period}</span>
                </div>
                <p className="mt-1 text-sm font-medium text-cyan-300">{job.company}</p>
                <ul className="mt-4 space-y-2.5">
                  {job.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-6 text-zinc-400">
                      <span className="mt-2 h-1 w-1 flex-none rounded-full bg-violet-400" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="bg-grid relative overflow-hidden border-t border-white/5 py-24 sm:py-32">
      <SectionCurtain />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Projects" title="Selected project work." />
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={index * 0.08}>
              <article className="group relative h-full overflow-hidden rounded-2xl surface p-7 transition-colors hover:border-cyan-400/40 hover:bg-white/[0.06]">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                  <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{project.blurb}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-zinc-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden border-t border-white/5 py-24 sm:py-32">
      <SectionCurtain />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Skills" title="The toolkit." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => (
            <Reveal key={group.label} delay={index * 0.05}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 250, damping: 18 }}
                className="h-full rounded-2xl surface p-6"
              >
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-400">{group.label}</h3>
                <motion.div
                  className="mt-4 flex flex-wrap gap-2"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ staggerChildren: 0.03 }}
                >
                  {group.items.map((item) => (
                    <motion.span
                      key={item}
                      variants={{
                        hidden: { opacity: 0, y: 8, scale: 0.9 },
                        show: { opacity: 1, y: 0, scale: 1 },
                      }}
                      whileHover={{ y: -3, scale: 1.05 }}
                      className="cursor-default rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-zinc-300 transition-colors hover:border-cyan-400/50 hover:text-white"
                    >
                      {item}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-col gap-4 rounded-2xl surface p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                <GraduationCap className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">{education.degree}</h3>
                <p className="text-sm text-zinc-400">
                  {education.school} - {education.detail}
                </p>
              </div>
            </div>
            <span className="font-mono text-xs text-zinc-500">{education.period}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-white/5 py-24 sm:py-32">
      <SectionCurtain />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <Reveal className="relative overflow-hidden rounded-3xl surface px-8 py-16 text-center sm:px-16">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-400">Contact</p>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Let&apos;s build something worth automating.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-300">
            I&apos;m currently open to new roles. The fastest way to reach me is email.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-cyan-300 px-6 text-sm font-semibold text-[#060a12] transition hover:bg-cyan-200"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {profile.email}
            </a>
            <a
              href={profile.resume}
              download="Bhumika-Jain-Resume.pdf"
              className="glass inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-semibold text-white transition hover:border-cyan-400/60"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download Resume
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="mx-auto flex max-w-6xl items-center justify-center px-6">
        <div className="flex gap-3">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition hover:border-cyan-400/60 hover:text-white"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition hover:border-cyan-400/60 hover:text-white"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition hover:border-cyan-400/60 hover:text-white"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [tourActive, setTourActive] = useState(false);

  function finishLoading() {
    setLoaded(true);
    window.setTimeout(() => setTourActive(true), 450);
  }

  function closeTour() {
    setTourActive(false);
  }

  return (
    <>
      {!loaded && <ScreenLoader onDone={finishLoading} />}
      <main className="relative">
        <Nav />
        <Hero />
        <About />
        <Process />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
        <Footer />
      </main>
      <PortfolioTour active={loaded && tourActive} onClose={closeTour} />
    </>
  );
}


