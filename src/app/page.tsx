"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, GraduationCap, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import Avatar from "@/components/Avatar";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import HeroScene from "@/components/HeroScene";
import {
  about,
  education,
  experience,
  navLinks,
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
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-400">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
    </Reveal>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[#05060a]/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="group flex items-center gap-2 font-semibold tracking-tight text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-300 text-sm font-bold text-[#05060a]">
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

function Hero() {
  return (
    <section id="top" className="relative isolate flex min-h-screen items-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <HeroScene />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-[#05060a] via-[#05060a]/85 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-[#05060a] to-transparent" />

      <div className="mx-auto w-full max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-zinc-300 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Open to new opportunities
          </div>

          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            {profile.name}
          </h1>
          <p className="mt-4 bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-300 bg-clip-text text-xl font-semibold text-transparent sm:text-2xl">
            {profile.role}
          </p>
          <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-300">{profile.tagline}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-cyan-300 px-6 text-sm font-semibold text-[#05060a] transition hover:bg-cyan-200"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Get in touch
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 text-sm font-semibold text-white transition hover:border-cyan-400/60 hover:bg-white/10"
            >
              <GithubIcon className="h-4 w-4" />
              View GitHub
            </a>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-zinc-300 transition hover:border-cyan-400/60 hover:text-white"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-zinc-300 transition hover:border-cyan-400/60 hover:text-white"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
            <span className="inline-flex items-center gap-1.5 text-sm text-zinc-500">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {profile.location}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="bg-grid relative border-t border-white/5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal className="flex justify-center lg:justify-start">
            <div className="relative">
              <div className="relative h-56 w-56 rounded-full border border-white/10 bg-white/5 p-1.5 sm:h-64 sm:w-64">
                <Avatar src={profile.photo} initials={profile.initials} alt={profile.name} />
              </div>
            </div>
          </Reveal>

          <div>
            <SectionHeading eyebrow="About" title="Automation-first, full-stack." />
            <div className="space-y-5">
              {about.map((para, index) => (
                <Reveal key={para} delay={index * 0.08}>
                  <p className="text-lg leading-8 text-zinc-300">{para}</p>
                </Reveal>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((stat, index) => (
                <Reveal key={stat.label} delay={index * 0.06}>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center">
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

function Experience() {
  return (
    <section id="experience" className="relative border-t border-white/5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Experience" title="Where I have built things." />
        <div className="relative space-y-12 border-l border-white/10 pl-8">
          {experience.map((job, index) => (
            <Reveal key={job.company} delay={index * 0.05}>
              <div className="relative">
                <span className="absolute -left-[41px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-cyan-400/50 bg-[#05060a]">
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
    <section id="projects" className="bg-grid relative border-t border-white/5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Projects" title="Selected project work." />
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={index * 0.08}>
              <article className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-white/[0.06]">
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
    <section id="skills" className="relative border-t border-white/5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Skills" title="The toolkit." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => (
            <Reveal key={group.label} delay={index * 0.05}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-400">{group.label}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-zinc-300 transition hover:border-cyan-400/40 hover:text-white">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:flex-row sm:items-center sm:justify-between">
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
    <section id="contact" className="relative border-t border-white/5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] px-8 py-16 text-center sm:px-16">
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
              className="inline-flex h-12 items-center gap-2 rounded-full bg-cyan-300 px-6 text-sm font-semibold text-[#05060a] transition hover:bg-cyan-200"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {profile.email}
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
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-6 sm:flex-row">
        <p className="text-sm text-zinc-500">
          Copyright {new Date().getFullYear()} {profile.name}. Built with Next.js, Three.js &amp; Framer Motion.
        </p>
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
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}