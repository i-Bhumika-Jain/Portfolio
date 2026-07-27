"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { profile, stats } from "@/data/portfolio";

/**
 * Flight BJ-26 - cinematic intro.
 * Story: the visitor boards Bhumika's flight, cruises through a night sky
 * while her name flies on a banner behind the plane, then lands into the
 * portfolio when loading reaches 100%.
 */

type Phase = "gate" | "flight" | "landing" | "welcome" | "fade";

/* Narration lines, spoken by the "captain" via the Web Speech API. */
const NARRATION: { at: number; text: string }[] = [
  { at: 0, text: "Welcome aboard flight B J 26. Your captain: Bhumika Jain, software developer." },
  { at: 35, text: "She turns slow manual work into automated systems, with Python, Django, React, and A I." },
  { at: 100, text: "We have landed. Welcome to Bhumika's portfolio." },
];

function useCaptainVoice(enabled: boolean) {
  const spoken = useRef(new Set<number>());
  // onEnd fires when the line finishes speaking (immediately when voice is
  // off/unavailable) so the landing can wait for the captain to finish.
  // No unmount cancel here: cutting audio mid-word is exactly the bug.
  const speak = (at: number, onEnd?: () => void) => {
    if (spoken.current.has(at)) {
      return;
    }
    spoken.current.add(at);
    const line = NARRATION.find((n) => n.at === at);
    if (!enabled || !line || typeof window === "undefined" || !window.speechSynthesis) {
      onEnd?.();
      return;
    }
    const utter = new SpeechSynthesisUtterance(line.text);
    const voices = window.speechSynthesis.getVoices();
    const preferred =
      voices.find((v) => /female|samantha|karen|zira|google uk english female/i.test(v.name)) ??
      voices.find((v) => v.lang.startsWith("en"));
    if (preferred) utter.voice = preferred;
    utter.rate = 0.98;
    utter.pitch = 1.05;
    if (onEnd) {
      utter.onend = onEnd;
      utter.onerror = onEnd;
    }
    window.speechSynthesis.speak(utter);
  };
  return speak;
}

/* Deterministic pseudo-random so the star field is stable across renders. */
function seeded(i: number) {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function Stars({ count = 90 }: { count?: number }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: seeded(i) * 100,
        top: seeded(i + 500) * 62,
        size: 1 + seeded(i + 900) * 2,
        delay: seeded(i + 1300) * 4,
        dur: 2.2 + seeded(i + 1700) * 3,
      })),
    [count],
  );
  return (
    <div className="absolute inset-0" aria-hidden="true">
      {stars.map((s, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-white"
          style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size }}
          animate={{ opacity: [0.15, 0.9, 0.15] }}
          transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function CloudBand({ top, scale, duration, opacity, reverse = false }: { top: string; scale: number; duration: number; opacity: number; reverse?: boolean }) {
  return (
    <motion.div
      className="pointer-events-none absolute left-0 w-[200%]"
      style={{ top }}
      animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 1600 120" className="w-full" style={{ opacity, transform: `scale(${scale})` }}>
        <g fill="#dbeafe">
          <ellipse cx="140" cy="70" rx="130" ry="26" />
          <ellipse cx="240" cy="52" rx="80" ry="20" />
          <ellipse cx="520" cy="80" rx="150" ry="24" />
          <ellipse cx="640" cy="60" rx="90" ry="18" />
          <ellipse cx="960" cy="66" rx="140" ry="26" />
          <ellipse cx="1080" cy="48" rx="70" ry="16" />
          <ellipse cx="1380" cy="78" rx="120" ry="22" />
        </g>
      </svg>
    </motion.div>
  );
}

function Jet({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 90" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="jetBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="60%" stopColor="#bae6fd" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>
      </defs>
      {/* fuselage */}
      <path d="M18 52 C60 38 150 36 196 44 C210 46 212 54 196 58 C150 66 60 64 18 56 Z" fill="url(#jetBody)" />
      {/* nose */}
      <path d="M196 44 C208 46 214 50 212 53 C210 56 202 58 196 58 Z" fill="#0ea5e9" />
      {/* tail fin */}
      <path d="M22 52 L8 24 C6 20 10 18 14 21 L44 46 Z" fill="#0ea5e9" />
      <path d="M14 24 L36 44" stroke="#e0f2fe" strokeWidth="3" strokeLinecap="round" />
      {/* wing */}
      <path d="M92 52 L60 78 C57 81 61 84 65 82 L118 58 Z" fill="#0284c7" />
      <path d="M104 48 L84 26 C82 23 86 20 89 22 L126 46 Z" fill="#38bdf8" />
      {/* windows */}
      {[68, 84, 100, 116, 132, 148, 164].map((x) => (
        <circle key={x} cx={x} cy={48} r={2.6} fill="#0f172a" opacity={0.65} />
      ))}
      {/* cockpit */}
      <path d="M184 45 C192 45 199 48 202 51 C198 54 190 55 184 54 Z" fill="#0f172a" opacity={0.7} />
      {/* blinking nav light */}
      <circle cx="8" cy="23" r="3" fill="#f87171">
        <animate attributeName="opacity" values="1;0.1;1" dur="1.2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

/* Airplane towing the name banner. */
function BannerPlane({ landing }: { landing: boolean }) {
  return (
    <motion.div
      className="pointer-events-none absolute left-1/2 top-[34%] z-40 flex -translate-x-1/2 items-center"
      animate={
        landing
          ? { y: [0, 90, 168], scale: [1, 1.06, 1.1], rotate: [0, 3, 0] }
          : { y: [0, -12, 0, 10, 0], rotate: [0, -1.4, 0, 1.2, 0] }
      }
      transition={landing ? { duration: 3.2, ease: [0.45, 0, 0.35, 1] } : { duration: 7, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* banner */}
      <motion.div
        className="mr-3 flex items-center"
        animate={{ y: [0, 5, 0, -4, 0] }}
        transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="rounded-md border border-cyan-200/40 bg-[#07142688] px-5 py-3 shadow-[0_0_40px_rgba(56,189,248,0.25)] backdrop-blur-sm sm:px-8 sm:py-4">
          <p className="whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.4em] text-cyan-300 sm:text-[10px]">Now flying</p>
          <p className="whitespace-nowrap text-xl font-bold uppercase tracking-[0.18em] text-white sm:text-4xl">
            {profile.firstName} <span className="text-cyan-300">{profile.lastName}</span>
          </p>
          <p className="mt-1 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.34em] text-zinc-300 sm:text-[10px]">{profile.role}</p>
        </div>
        {/* tow rope */}
        <svg viewBox="0 0 60 12" className="h-3 w-14 text-cyan-200/70">
          <path d="M0 6 Q30 0 60 6" stroke="currentColor" strokeWidth="1.6" fill="none" strokeDasharray="4 4" />
        </svg>
      </motion.div>
      <div className="relative">
        <Jet className="h-16 w-40 drop-shadow-[0_0_26px_rgba(56,189,248,0.55)] sm:h-24 sm:w-60" />
        {/* contrail */}
        <motion.div
          className="absolute right-full top-[58%] h-[3px] w-40 bg-gradient-to-l from-cyan-100/80 to-transparent sm:w-72"
          animate={{ opacity: [0.2, 0.85, 0.2], scaleX: [0.7, 1, 0.7] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "right" }}
        />
      </div>
    </motion.div>
  );
}

function Runway() {
  return (
    <motion.div
      className="absolute inset-x-0 bottom-0 z-30 h-[46vh] overflow-hidden"
      initial={{ y: "110%" }}
      animate={{ y: 0 }}
      transition={{ duration: 2.6, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0b1524] to-[#10131a]" />
      {/* runway trapezoid */}
      <div
        className="absolute bottom-0 left-1/2 h-[86%] w-[68%] -translate-x-1/2 bg-[#1a2230]"
        style={{ clipPath: "polygon(44% 0, 56% 0, 100% 100%, 0 100%)" }}
      >
        {/* center dashes racing toward viewer */}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 w-[3%] -translate-x-1/2 rounded-sm bg-amber-200/90"
            initial={{ top: "-8%", height: "4%", opacity: 0 }}
            animate={{ top: ["-8%", "104%"], height: ["3%", "9%"], opacity: [0, 1, 1] }}
            transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.22, ease: "easeIn" }}
          />
        ))}
      </div>
      {/* edge lights */}
      {[14, 22, 32, 44, 58, 74].map((y, i) => (
        <div key={i}>
          <motion.span
            className="absolute h-2 w-2 rounded-full bg-cyan-300"
            style={{ bottom: `${y}%`, left: `${50 - 6 - i * 5.4}%` }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.12 }}
          />
          <motion.span
            className="absolute h-2 w-2 rounded-full bg-cyan-300"
            style={{ bottom: `${y}%`, left: `${50 + 6 + i * 5.4}%` }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.12 }}
          />
        </div>
      ))}
    </motion.div>
  );
}

function BoardingPass({ onBoard, onSkip }: { onBoard: () => void; onSkip: () => void }) {
  return (
    <motion.div
      key="gate"
      className="absolute inset-0 z-50 flex items-center justify-center px-5"
      exit={{ opacity: 0, y: -60, filter: "blur(6px)" }}
      transition={{ duration: 0.7, ease: "easeIn" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: 18 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-cyan-200/25 bg-[#081426]/90 shadow-[0_30px_90px_rgba(2,8,20,0.8),0_0_50px_rgba(56,189,248,0.12)] backdrop-blur"
      >
        <div className="flex items-center justify-between border-b border-dashed border-cyan-200/25 px-6 py-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-cyan-300">Dev Airways</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-400">Boarding pass</span>
        </div>
        <div className="grid grid-cols-3 gap-4 px-6 py-5">
          <div className="col-span-2">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-500">Passenger of honour</p>
            <p className="mt-1 text-2xl font-bold uppercase tracking-[0.12em] text-white sm:text-3xl">
              {profile.firstName} <span className="text-cyan-300">{profile.lastName}</span>
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.26em] text-zinc-400">{profile.role}</p>
          </div>
          <div className="text-right">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-500">Flight</p>
            <p className="mt-1 font-mono text-xl font-bold text-cyan-300">BJ-26</p>
          </div>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-500">From</p>
            <p className="mt-1 font-semibold text-white">IDEA</p>
          </div>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-500">To</p>
            <p className="mt-1 font-semibold text-white">PORTFOLIO</p>
          </div>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-500">Seat</p>
            <p className="mt-1 font-semibold text-white">1A · Window</p>
          </div>
        </div>
        {/* barcode */}
        <div className="flex h-10 items-end gap-[3px] px-6 opacity-70" aria-hidden="true">
          {Array.from({ length: 46 }, (_, i) => (
            <span key={i} className="w-[3px] bg-cyan-100" style={{ height: `${30 + seeded(i + 60) * 70}%` }} />
          ))}
        </div>
        <div className="relative px-6 pb-6 pt-4">
          {/* animated hint pointing down at the board button */}
          <motion.div
            className="pointer-events-none mb-2 flex items-center justify-center gap-2"
            animate={{ y: [0, 6, 0], opacity: [0.65, 1, 0.65] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-200">Click here to start your flight</span>
            <svg viewBox="0 0 24 28" className="h-5 w-4 text-cyan-300 drop-shadow-[0_0_10px_rgba(56,189,248,0.9)]">
              <path d="M12 2 v18 M4 14 l8 8 8-8" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
          <motion.button
            onClick={onBoard}
            whileHover={{ scale: 1.025 }}
            whileTap={{ scale: 0.97 }}
            animate={{ boxShadow: ["0 0 25px rgba(56,189,248,0.35)", "0 0 55px rgba(56,189,248,0.75)", "0 0 25px rgba(56,189,248,0.35)"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-500 px-6 py-3.5 font-mono text-sm font-bold uppercase tracking-[0.3em] text-[#04101f]"
          >
            Board now
            <motion.span animate={{ x: [0, 6, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>✈</motion.span>
          </motion.button>
          <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
            Headphones on — your captain will speak
          </p>

        </div>
      </motion.div>
    </motion.div>
  );
}

const phaseLabel = (p: number) =>
  p < 14 ? "Taxiing to runway" : p < 32 ? "Takeoff" : p < 68 ? "Cruising at 32,000 ft" : p < 88 ? "Beginning descent" : "Final approach";

export default function ScreenLoader({ onDone }: { onDone: (skipped?: boolean) => void }) {
  // Animated overlay is client-only: skip SSR markup entirely so
  // framer-motion's computed styles can't cause hydration mismatches.
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<Phase>("gate");

  // Mark the flight as flown and hand over to the portfolio.
  // Cancels any speech - used by the skip buttons.
  const finish = () => {
    try {
      window.localStorage.setItem("bj26-flown", "1");
    } catch {}
    window.speechSynthesis?.cancel();
    onDone(true);
  };
  // Natural landing: let the captain's last line finish speaking
  // while the screen fades out, instead of cutting the audio.
  const finishGently = () => {
    try {
      window.localStorage.setItem("bj26-flown", "1");
    } catch {}
    onDone();
  };
  const finishRef = useRef(finish);
  finishRef.current = finish;
  const finishGentlyRef = useRef(finishGently);
  finishGentlyRef.current = finishGently;

  useEffect(() => {
    // Returning visitors and reduced-motion users go straight to the
    // portfolio. Append ?fly to the URL to replay the intro anytime.
    const forceFly = new URLSearchParams(window.location.search).has("fly");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let flown = false;
    try {
      flown = window.localStorage.getItem("bj26-flown") === "1";
    } catch {}
    if (!forceFly && (reducedMotion || flown)) {
      finishRef.current();
      return;
    }
    setMounted(true);
  }, []);
  const [count, setCount] = useState(0);
  const [voiceOn, setVoiceOn] = useState(true);
  const speak = useCaptainVoice(voiceOn);
  const speakRef = useRef(speak);
  speakRef.current = speak;

  const landing = phase === "landing" || phase === "welcome" || phase === "fade";

  // Landing timers live in a ref cleaned up only on unmount. If they were
  // owned by the flight effect, the phase change to "landing" would clear
  // them and the intro would never hand over to the portfolio.
  const timersRef = useRef<number[]>([]);
  useEffect(() => () => timersRef.current.forEach((t) => window.clearTimeout(t)), []);

  useEffect(() => {
    if (phase !== "flight") return;
    let value = 0;
    const tick = window.setInterval(() => {
      value = Math.min(100, value + Math.floor(Math.random() * 3) + 1);
      setCount(value);
      NARRATION.forEach((n) => {
        if (n.at > 0 && n.at < 100 && value >= n.at) speakRef.current(n.at);
      });
      if (value >= 100) {
        window.clearInterval(tick);
        timersRef.current.push(window.setTimeout(() => setPhase("landing"), 500));
        timersRef.current.push(window.setTimeout(() => setPhase("welcome"), 3600));

        // Leave only when BOTH are true: the captain finished her landing
        // line AND the welcome screen has been readable for a moment.
        const ready = { speech: false, minTime: false, done: false };
        const maybeLeave = () => {
          if (ready.done || !ready.speech || !ready.minTime) return;
          ready.done = true;
          setPhase("fade");
          timersRef.current.push(window.setTimeout(() => finishGentlyRef.current(), 1700));
        };
        speakRef.current(100, () => {
          ready.speech = true;
          maybeLeave();
        });
        timersRef.current.push(
          window.setTimeout(() => {
            ready.minTime = true;
            maybeLeave();
          }, 7600),
        );
        // Safety net if the browser never fires the speech end event.
        timersRef.current.push(
          window.setTimeout(() => {
            ready.speech = true;
            ready.minTime = true;
            maybeLeave();
          }, 16000),
        );
      }
    }, 200);
    return () => window.clearInterval(tick);
  }, [phase, onDone]);

  const board = () => {
    setPhase("flight");
    speak(0);
  };

  if (!mounted) return <div className="fixed inset-0 z-[10000] bg-[#040a16]" />;

  return (
    <motion.div
      className="fixed inset-0 z-[10000] overflow-hidden bg-[#040a16]"
      animate={{ opacity: phase === "fade" ? 0 : 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      {/* night sky */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(148,197,255,0.16),transparent_30%),linear-gradient(180deg,#02060f_0%,#071528_55%,#0b1e36_100%)]" />
      <Stars />
      {/* moon */}
      <div className="absolute right-[12%] top-[10%] h-16 w-16 rounded-full bg-gradient-to-br from-slate-100 to-slate-300 shadow-[0_0_60px_rgba(226,232,240,0.5)] sm:h-24 sm:w-24">
        <div className="absolute left-3 top-4 h-3 w-3 rounded-full bg-slate-400/40" />
        <div className="absolute left-9 top-9 h-2 w-2 rounded-full bg-slate-400/40" />
      </div>

      {/* clouds appear once flying */}
      {phase !== "gate" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: landing ? 0.25 : 1 }} transition={{ duration: 1.4 }}>
          <CloudBand top="18%" scale={1.15} duration={34} opacity={0.1} />
          <CloudBand top="42%" scale={1.4} duration={20} opacity={0.16} />
          <CloudBand top="64%" scale={1.8} duration={12} opacity={0.24} reverse />
        </motion.div>
      )}

      <AnimatePresence>{phase === "gate" && <BoardingPass onBoard={board} onSkip={finish} />}</AnimatePresence>

      {phase !== "gate" && <BannerPlane landing={landing} />}
      {landing && <Runway />}

      {/* flight HUD */}
      {phase === "flight" && (
        <motion.div
          className="absolute inset-x-0 bottom-10 z-50 mx-auto w-[min(88vw,34rem)] px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-2 flex items-end justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-400">
            <span>IDEA</span>
            <motion.span
              key={phaseLabel(count)}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-cyan-300"
            >
              {phaseLabel(count)}
            </motion.span>
            <span>PORTFOLIO</span>
          </div>
          <div className="relative h-[3px] w-full rounded-full bg-white/10">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-cyan-300 to-sky-400 shadow-[0_0_18px_rgba(56,189,248,0.8)]"
              animate={{ width: `${count}%` }}
              transition={{ ease: "linear", duration: 0.18 }}
            />
            <motion.span
              className="absolute top-1/2 -translate-y-1/2 text-cyan-200"
              animate={{ left: `${count}%` }}
              transition={{ ease: "linear", duration: 0.18 }}
              style={{ marginLeft: -8 }}
            >
              ✈
            </motion.span>
          </div>
          <div className="mt-2 flex justify-between font-mono text-[10px] tabular-nums text-zinc-500">
            <span>FLIGHT BJ-26</span>
            <span className="text-zinc-300">{count}%</span>
          </div>
        </motion.div>
      )}

      {/* welcome flash after touchdown */}
      <AnimatePresence>
        {(phase === "welcome" || phase === "fade") && (
          <motion.div
            key="welcome"
            className="absolute inset-0 z-[60] flex flex-col items-center justify-center bg-[#02060f]/55 text-center backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.6em" }}
              animate={{ opacity: 1, letterSpacing: "0.42em" }}
              transition={{ duration: 1 }}
              className="font-mono text-[10px] uppercase text-cyan-300 sm:text-xs"
            >
              Touchdown · Flight BJ-26
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 text-3xl font-bold uppercase tracking-[0.14em] text-white sm:text-5xl"
            >
              Welcome to <span className="text-cyan-300">{profile.firstName}&apos;s</span> world
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mt-8 flex flex-wrap items-start justify-center gap-x-10 gap-y-4 px-6"
            >
              {stats.slice(0, 3).map((s) => (
                <div key={s.label} className="max-w-[10rem] text-center">
                  <p className="text-2xl font-bold text-cyan-300 sm:text-3xl">{s.value}</p>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-400">{s.label}</p>
                </div>
              ))}
            </motion.div>
            <motion.a
              href={profile.resume}
              download
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.4 }}
              whileHover={{ scale: 1.04 }}
              className="pointer-events-auto mt-8 inline-flex items-center gap-2 rounded-full border border-cyan-300/50 bg-cyan-300/10 px-7 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.26em] text-cyan-200 shadow-[0_0_30px_rgba(56,189,248,0.25)] backdrop-blur transition hover:bg-cyan-300/20"
            >
              ↓ Download résumé
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* controls */}
      <div className="absolute right-4 top-4 z-[70] flex items-center gap-2">
        <a
          href={profile.resume}
          download
          className="hidden rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-300 backdrop-blur transition hover:border-cyan-300/50 hover:text-cyan-200 sm:block"
        >
          Download Resume
        </a>
        <button
          onClick={finish}
          className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-300 backdrop-blur transition hover:border-cyan-300/50 hover:text-cyan-200"
        >
          View Portfolio
        </button>
        {phase !== "gate" && (
          <button
            onClick={() => {
              setVoiceOn((v) => {
                if (v) window.speechSynthesis?.cancel();
                return !v;
              });
            }}
            className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-300 backdrop-blur transition hover:border-cyan-300/50 hover:text-cyan-200"
          >
            {voiceOn ? "Voice on" : "Voice off"}
          </button>
        )}
      </div>
    </motion.div>
  );
}
