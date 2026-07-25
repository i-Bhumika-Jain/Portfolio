"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { profile } from "@/data/portfolio";

type Phase = "loading" | "lift" | "fly";

function PaperPlane({ className = "h-16 w-24" }: { className?: string }) {
  return (
    <svg viewBox="0 0 104 72" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id="loaderPlaneBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor="#bae6fd" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>
      </defs>
      <path d="M8 35 94 7 66 65 48 43 29 56l9-19L8 35Z" fill="url(#loaderPlaneBody)" />
      <path d="M38 37 94 7 48 43" fill="none" stroke="#0f172a" strokeOpacity="0.35" strokeWidth="3.2" strokeLinejoin="round" />
      <path d="M29 56 48 43" stroke="#0f172a" strokeOpacity="0.25" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M66 65 62 38" stroke="#0f172a" strokeOpacity="0.22" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  );
}

function RopeKid({ active }: { active: boolean }) {
  const pull = active
    ? { y: [0, 42, 18, 58, 34], rotate: [0, -4, 3, -5, 0] }
    : { y: [0, 8, 0], rotate: [0, -1.5, 0] };

  return (
    <div className="pointer-events-none absolute bottom-10 right-4 z-50 hidden h-[68vh] w-40 sm:block lg:right-10">
      <div className="absolute left-[5.05rem] top-0 h-[calc(100%-7.5rem)] w-px bg-gradient-to-b from-cyan-100/80 via-cyan-100/45 to-cyan-100/20" />
      <div className="absolute left-[4.55rem] top-0 h-5 w-5 rounded-full border border-cyan-100/50 bg-[#071426] shadow-[0_0_20px_rgba(125,211,252,0.45)]" />
      <motion.div
        className="absolute left-[4.35rem] top-[35%] h-8 w-8 rounded-full border border-cyan-100/50 bg-[#071426]/95 shadow-[0_0_28px_rgba(56,189,248,0.48)]"
        animate={pull}
        transition={{ duration: active ? 2.9 : 2.1, repeat: active ? 0 : Infinity, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200 shadow-[0_0_16px_rgba(125,211,252,0.95)]" />
      </motion.div>

      <motion.svg
        viewBox="0 0 180 210"
        className="absolute bottom-0 right-0 h-56 w-44 drop-shadow-[0_22px_32px_rgba(0,0,0,0.45)]"
        aria-hidden="true"
        animate={active ? { y: [0, 4, -2, 5, 0] } : { y: [0, -2, 0] }}
        transition={{ duration: active ? 2.9 : 2.4, repeat: active ? 0 : Infinity, ease: "easeInOut" }}
      >
        <ellipse cx="92" cy="196" rx="47" ry="8" fill="rgba(3,7,18,0.55)" />
        <path d="M54 72 C44 48 55 23 84 18 C121 11 142 38 130 76 C122 105 65 103 54 72Z" fill="#2b1736" />
        <path d="M46 75 C28 92 31 120 54 134 C74 144 89 126 78 108 C70 94 62 84 46 75Z" fill="#342047" />
        <path d="M129 75 C149 90 149 118 127 134 C106 148 91 128 103 108 C112 94 118 84 129 75Z" fill="#342047" />
        <circle cx="91" cy="66" r="36" fill="#f6c7a9" />
        <path d="M56 62 C70 24 123 23 132 62 C108 53 82 47 56 62Z" fill="#35203f" />
        <circle cx="78" cy="69" r="3.2" fill="#172033" />
        <circle cx="104" cy="69" r="3.2" fill="#172033" />
        <path d="M80 84 C88 91 99 91 106 84" stroke="#9b4b5d" strokeWidth="3" strokeLinecap="round" fill="none" />
        <circle cx="64" cy="78" r="5" fill="#f5a6b9" opacity="0.45" />
        <circle cx="119" cy="78" r="5" fill="#f5a6b9" opacity="0.45" />
        <path d="M62 105 C71 94 111 93 121 105 C137 125 134 166 125 188 L58 188 C49 164 46 127 62 105Z" fill="#38bdf8" />
        <path d="M70 107 C82 119 102 119 114 107" stroke="#e0f2fe" strokeOpacity="0.45" strokeWidth="6" strokeLinecap="round" />
        <path d="M61 125 C46 132 40 147 43 165" stroke="#f6c7a9" strokeWidth="12" strokeLinecap="round" fill="none" />
        <motion.path
          d="M121 124 C133 132 139 145 139 164"
          stroke="#f6c7a9"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
          animate={active ? { d: ["M121 124 C133 132 139 145 139 164", "M121 124 C129 141 119 153 106 160", "M121 124 C133 132 139 145 139 164"] } : undefined}
          transition={{ duration: 2.4, ease: "easeInOut" }}
        />
        <path d="M70 188 L65 204" stroke="#f6c7a9" strokeWidth="11" strokeLinecap="round" />
        <path d="M112 188 L117 204" stroke="#f6c7a9" strokeWidth="11" strokeLinecap="round" />
        <path d="M56 204 H76" stroke="#7dd3fc" strokeWidth="8" strokeLinecap="round" />
        <path d="M106 204 H127" stroke="#7dd3fc" strokeWidth="8" strokeLinecap="round" />
      </motion.svg>
    </div>
  );
}

export default function ScreenLoader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<Phase>("loading");

  const lifting = phase !== "loading";
  const flying = phase === "fly";

  useEffect(() => {
    let value = 0;
    const timers: number[] = [];
    const counter = window.setInterval(() => {
      value = Math.min(100, value + Math.floor(Math.random() * 6) + 4);
      setCount(value);

      if (value >= 100) {
        window.clearInterval(counter);
        timers.push(window.setTimeout(() => setPhase("lift"), 520));
        timers.push(window.setTimeout(() => setPhase("fly"), 4200));
        timers.push(window.setTimeout(onDone, 6100));
      }
    }, 86);

    return () => {
      window.clearInterval(counter);
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-[10000] overflow-hidden bg-[#050912]">
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(56,189,248,0.22),transparent_34%),linear-gradient(135deg,#060a12,#0b1b2e_52%,#060a12)]"
        animate={flying ? { opacity: 0.08 } : { opacity: 1 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      />

      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(56,189,248,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(129,140,248,0.1) 1px, transparent 1px)",
          backgroundSize: "58px 58px",
        }}
        animate={{ backgroundPosition: lifting ? ["0px 0px", "0px -116px"] : ["0px 0px", "58px 58px"] }}
        transition={{ duration: lifting ? 4.2 : 4.5, repeat: lifting ? 0 : Infinity, ease: "linear" }}
      />

      <motion.div
        className="absolute inset-x-0 top-0 z-30 h-[116vh] origin-top overflow-hidden border-b border-cyan-200/20 shadow-[0_28px_90px_rgba(0,0,0,0.58)]"
        style={{
          background:
            "repeating-linear-gradient(90deg, #06101f 0px, #0a2038 24px, #0d2c4a 48px, #06101f 72px), linear-gradient(180deg, rgba(56,189,248,0.16), transparent 42%)",
        }}
        animate={flying ? { y: "-118%", opacity: 0.42 } : lifting ? { y: "-82%" } : { y: 0 }}
        transition={flying ? { duration: 1.35, ease: [0.83, 0, 0.17, 1] } : { duration: 3.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,rgba(56,189,248,0.14),transparent_34%)]" />
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-b from-cyan-200/10 via-[#081a2e] to-[#020617] shadow-[0_-12px_35px_rgba(56,189,248,0.18)]" />
      </motion.div>

      <motion.div
        className="absolute inset-x-0 top-0 z-40 h-16 border-b border-cyan-200/15 bg-[#071426]/95 shadow-[0_18px_60px_rgba(0,0,0,0.35)]"
        animate={flying ? { y: "-130%" } : { y: 0 }}
        transition={{ duration: 1.05, ease: [0.83, 0, 0.17, 1] }}
      />

      <RopeKid active={lifting} />

      <motion.div
        className="pointer-events-none absolute inset-0 z-[45] flex flex-col items-center justify-center px-6 text-center"
        animate={flying ? { opacity: 0, y: -32, filter: "blur(7px)" } : { opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="font-mono text-xs uppercase tracking-[0.48em] text-cyan-300"
        >
          Portfolio
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={lifting ? { opacity: 1, y: [0, -5, 0], scale: [1, 1.018, 1] } : { opacity: 1, y: 0, scale: 1 }}
          transition={lifting ? { duration: 2.5, ease: "easeInOut" } : { duration: 0.72, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
          className="mt-5 text-4xl font-bold uppercase tracking-[0.15em] text-white sm:text-6xl"
        >
          {profile.firstName}
          <span className="text-cyan-300"> {profile.lastName}</span>
        </motion.h1>

        <motion.div
          className="mt-9 h-1 w-60 overflow-hidden rounded-full bg-white/10 ring-1 ring-white/10"
          animate={lifting ? { opacity: 0, y: 14 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-300 shadow-[0_0_22px_rgba(56,189,248,0.75)]"
            animate={{ width: `${count}%` }}
            transition={{ ease: "linear", duration: 0.08 }}
          />
        </motion.div>
        <motion.span
          className="mt-3 font-mono text-xs tabular-nums text-zinc-400"
          animate={lifting ? { opacity: [1, 0.8, 1], y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 1.2, repeat: lifting && !flying ? Infinity : 0 }}
        >
          {lifting ? "Opening the curtain" : `${count}%`}
        </motion.span>
      </motion.div>

      <motion.svg
        viewBox="0 0 900 420"
        className="pointer-events-none absolute left-1/2 top-1/2 z-[55] h-[24rem] w-[56rem] max-w-[96vw] -translate-x-1/2 -translate-y-1/2"
        fill="none"
        aria-hidden="true"
      >
        <motion.path
          d="M92 268 C210 62 382 78 486 172 C574 252 462 358 354 280 C250 205 370 104 528 106 C704 108 782 206 824 298"
          stroke="rgba(56,189,248,0.78)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="10 16"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={flying ? { pathLength: [0, 1], opacity: [0, 0.9, 0] } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 1.85, ease: "easeInOut" }}
        />
      </motion.svg>

      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 z-[60] drop-shadow-[0_0_28px_rgba(56,189,248,0.78)]"
        initial={{ x: -520, y: 102, rotate: -12, opacity: 0, scale: 0.85 }}
        animate={
          flying
            ? {
                x: [-520, -252, -26, 202, 470, 680],
                y: [102, -104, -148, -42, 50, -18],
                rotate: [-10, 25, 78, 42, 0, -4],
                opacity: [0, 1, 1, 1, 1, 0],
                scale: [0.85, 1, 1.08, 1.18, 1.28, 1.34],
              }
            : { x: -520, y: 102, rotate: -12, opacity: 0, scale: 0.85 }
        }
        transition={{ duration: 1.95, times: [0, 0.2, 0.42, 0.62, 0.86, 1], ease: [0.16, 1, 0.3, 1] }}
      >
        <PaperPlane className="h-20 w-28" />
        <motion.div
          className="absolute right-20 top-1/2 h-px w-72 origin-right -translate-y-1/2 bg-gradient-to-l from-cyan-100/95 via-cyan-300/45 to-transparent"
          animate={flying ? { scaleX: [0, 1, 0.55], opacity: [0, 1, 0] } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 1.7, ease: "easeOut" }}
        />
      </motion.div>
    </div>
  );
}
