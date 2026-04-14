import { useEffect, useMemo, useRef, useState } from "react";
import {
  useRecord,
  useCurrentRecordId,
  useRecordCreate,
  q,
} from "@/lib/datasource";
import { useCurrentUser } from "@/lib/user";
import { toast } from "sonner";
import {
  Play,
  Pause,
  Volume2,
  Download,
  CheckCircle2,
  ArrowRight,
  Clock,
  Sparkles,
  Award,
  BookOpen,
} from "lucide-react";

// =====================================================================
// TikTok Academy — Lesson page (v3)
// Source tab: Lessons table (gFW6PZeT2JHVCk) in Content Tracking App DB
// Actions tab: one Add Record action targeting Lesson Completions
//   (hsDFWXx7nTzEAn) with field aliases: completionUser, completionLesson,
//   completionCourse, completedAt — matching the IDs in completionFields below.
// =====================================================================

const lessonFields = q.select({
  name: "4e8yM",            // SINGLE_LINE_TEXT — Name
  lessonNumber: "42btG",    // SINGLE_LINE_TEXT — Lesson Number ("Lesson 1")
  category: "jXSnc",        // SELECT — SHOP/LIVE/ORGANIC/PLATFORM
  difficulty: "5khor",      // SELECT
  description: "ck1JJ",     // LONG_TEXT — hero description
  duration: "VB4oU",        // SINGLE_LINE_TEXT — "30:00"
  body: "0wTBQ",            // LONG_TEXT — lesson body HTML (whitelist format)
  explainer: "DqSLD",       // URL — Canva video embed URL
  podcast: "uU6oS",         // ATTACHMENT — audio file
  slides: "nINLz",          // ATTACHMENT — slide deck download
  course: "v5YZr",          // LINKED_RECORD → Course
});

// Lesson Completions table field IDs. See note above: these must be wired
// into an Add Record action in the Actions tab that targets Lesson Completions.
const completionFields = q.select({
  completionUser: "oie3o",   // LINKED_RECORD → Users
  completionLesson: "ZpVkx", // LINKED_RECORD → Lessons
  completionCourse: "sUNbZ", // LINKED_RECORD → Course
  completedAt: "pigYM",      // DATETIME
});

// =====================================================================
// Scoped CSS — everything lives under #tta-lesson so nothing leaks.
// =====================================================================
const STYLES = `
  #tta-lesson {
    --cs-blue: #294ff6;
    --cs-blue-2: #4466f8;
    --cs-blue-3: #5e7bf6;
    --cs-blue-4: #7a93ff;
    --cs-navy: #000f4d;
    --cs-navy-2: #001364;
    --cs-navy-3: #152237;
    --cs-light-1: #f8fbff;
    --cs-light-2: #eef4fd;
    --cs-light-3: #fafbff;
    --cs-lavender: #d8d8ff;
    --cs-red: #fe2c55;
    --cs-green: #34d399;
    --cs-ink: #1c274c;
    --cs-ink-soft: #5a6690;

    max-width: 1280px;
    margin: 0 auto;
    padding: 24px 16px 60px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 16px;
    line-height: 1.65;
    color: var(--cs-navy);
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 40px;
  }
  #tta-lesson *, #tta-lesson *::before, #tta-lesson *::after { box-sizing: border-box; }
  #tta-lesson h1, #tta-lesson h2, #tta-lesson h3, #tta-lesson h4 {
    color: var(--cs-navy);
    letter-spacing: -0.02em;
    line-height: 1.2;
    margin: 0 0 14px;
    font-weight: 800;
  }
  #tta-lesson p { margin: 0 0 16px; color: var(--cs-ink); }
  #tta-lesson a { color: var(--cs-blue); text-decoration: underline; text-underline-offset: 3px; }
  #tta-lesson strong { color: var(--cs-navy); }

  /* ============ SIDEBAR ============ */
  #tta-lesson .tta-sidebar {
    position: sticky;
    top: 24px;
    align-self: start;
    max-height: calc(100vh - 48px);
    overflow-y: auto;
    background: white;
    border: 1px solid var(--cs-light-2);
    border-radius: 20px;
    padding: 26px 22px;
    box-shadow: 0 8px 28px rgba(0, 15, 77, 0.06);
    scrollbar-width: thin;
    scrollbar-color: var(--cs-lavender) transparent;
  }
  #tta-lesson .tta-sidebar::-webkit-scrollbar { width: 6px; }
  #tta-lesson .tta-sidebar::-webkit-scrollbar-thumb { background: var(--cs-lavender); border-radius: 10px; }
  #tta-lesson .tta-side-eyebrow {
    font-size: 10px; font-weight: 800; text-transform: uppercase;
    letter-spacing: 0.14em; color: var(--cs-blue); margin-bottom: 16px;
  }
  #tta-lesson .tta-ring-wrap {
    display: flex; align-items: center; gap: 16px;
    margin-bottom: 22px; padding-bottom: 22px;
    border-bottom: 1px solid var(--cs-light-2);
  }
  #tta-lesson .tta-ring { position: relative; width: 84px; height: 84px; flex-shrink: 0; }
  #tta-lesson .tta-ring svg { transform: rotate(-90deg); }
  #tta-lesson .tta-ring-bg { stroke: var(--cs-light-2); }
  #tta-lesson .tta-ring-fill { stroke: var(--cs-blue); transition: stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1); }
  #tta-lesson .tta-ring-label {
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; font-weight: 900; color: var(--cs-navy);
  }
  #tta-lesson .tta-ring-meta { font-size: 13px; color: var(--cs-ink-soft); line-height: 1.4; }
  #tta-lesson .tta-ring-meta strong { color: var(--cs-navy); display: block; font-size: 14px; margin-bottom: 2px; }

  #tta-lesson .tta-side-btn {
    display: flex; align-items: center; gap: 10px;
    width: 100%; text-align: left;
    background: var(--cs-light-1);
    border: 1px solid var(--cs-light-2);
    padding: 12px 14px; border-radius: 12px;
    font-size: 14px; font-weight: 700; color: var(--cs-navy);
    cursor: pointer; font-family: inherit;
    margin-bottom: 10px; text-decoration: none;
    transition: all 0.2s ease;
  }
  #tta-lesson .tta-side-btn:hover { background: var(--cs-light-2); transform: translateY(-1px); }
  #tta-lesson .tta-side-btn svg { color: var(--cs-blue); flex-shrink: 0; }
  #tta-lesson .tta-side-btn.primary {
    background: var(--cs-blue); border-color: var(--cs-blue); color: white;
    box-shadow: 0 8px 20px rgba(41, 79, 246, 0.35);
  }
  #tta-lesson .tta-side-btn.primary:hover { background: var(--cs-blue-2); }
  #tta-lesson .tta-side-btn.primary svg { color: white; }
  #tta-lesson .tta-side-btn.success {
    background: rgba(52, 211, 153, 0.12);
    border-color: rgba(52, 211, 153, 0.4);
    color: #0f9e6e;
  }
  #tta-lesson .tta-side-btn.success svg { color: #0f9e6e; }
  #tta-lesson .tta-side-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

  #tta-lesson .tta-side-section {
    margin-top: 22px; padding-top: 22px;
    border-top: 1px solid var(--cs-light-2);
  }

  /* ============ MAIN ============ */
  #tta-lesson .tta-main { min-width: 0; }

  /* ============ HERO ============ */
  #tta-lesson .tta-hero {
    position: relative;
    background: linear-gradient(135deg, #152237 0%, #000f4d 60%, #1a2d6b 100%);
    border-radius: 24px;
    padding: 56px 48px;
    color: white;
    margin-bottom: 32px;
    overflow: hidden;
    box-shadow: 0 20px 50px rgba(0, 15, 77, 0.22);
  }
  #tta-lesson .tta-hero::before {
    content: ""; position: absolute; top: -60%; right: -20%;
    width: 600px; height: 600px; border-radius: 50%;
    background: radial-gradient(circle, rgba(94, 123, 246, 0.35) 0%, transparent 70%);
    pointer-events: none;
  }
  #tta-lesson .tta-hero-inner { position: relative; z-index: 2; max-width: 700px; }
  #tta-lesson .tta-hero-eyebrow {
    display: inline-block;
    background: rgba(122, 147, 255, 0.18);
    color: var(--cs-blue-4);
    border: 1px solid rgba(122, 147, 255, 0.3);
    font-size: 12px; font-weight: 800;
    text-transform: uppercase; letter-spacing: 0.14em;
    padding: 7px 14px; border-radius: 100px;
    margin-bottom: 22px;
  }
  #tta-lesson .tta-hero h1 {
    color: white; margin-bottom: 18px;
    font-size: clamp(30px, 4.4vw, 46px);
  }
  #tta-lesson .tta-hero-sub {
    font-size: 17px; line-height: 1.6;
    color: #c3cfe8; margin-bottom: 26px; max-width: 620px;
  }
  #tta-lesson .tta-chips { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 28px; }
  #tta-lesson .tta-chip {
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(122, 147, 255, 0.3);
    color: #dbe4ff; font-size: 12px; font-weight: 700;
    padding: 7px 14px; border-radius: 100px;
    display: inline-flex; align-items: center; gap: 6px;
  }
  #tta-lesson .tta-chip svg { width: 13px; height: 13px; }
  #tta-lesson .tta-hero-ctas { display: flex; gap: 12px; flex-wrap: wrap; }
  #tta-lesson .tta-btn-primary {
    background: var(--cs-blue); color: white; border: none;
    padding: 15px 26px; border-radius: 14px;
    font-size: 15px; font-weight: 800;
    cursor: pointer; font-family: inherit;
    box-shadow: 0 10px 28px rgba(41, 79, 246, 0.45);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    display: inline-flex; align-items: center; gap: 8px;
  }
  #tta-lesson .tta-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 14px 36px rgba(41, 79, 246, 0.55); }
  #tta-lesson .tta-btn-secondary {
    background: rgba(255, 255, 255, 0.08);
    color: white;
    border: 1px solid rgba(122, 147, 255, 0.4);
    padding: 15px 24px; border-radius: 14px;
    font-size: 15px; font-weight: 700;
    cursor: pointer; font-family: inherit;
    transition: all 0.2s ease;
    display: inline-flex; align-items: center; gap: 8px;
  }
  #tta-lesson .tta-btn-secondary:hover { background: rgba(122, 147, 255, 0.2); }

  /* ============ RESUME BANNER ============ */
  #tta-lesson .tta-resume {
    display: flex; align-items: center; gap: 16px;
    padding: 18px 22px; margin-bottom: 28px;
    background: linear-gradient(135deg, #eef4fd 0%, #f8fbff 100%);
    border: 1px solid rgba(41, 79, 246, 0.2);
    border-radius: 16px;
  }
  #tta-lesson .tta-resume-icon {
    flex: 0 0 44px; height: 44px; border-radius: 12px;
    background: var(--cs-blue); color: white;
    display: flex; align-items: center; justify-content: center;
  }
  #tta-lesson .tta-resume-body { flex: 1; font-size: 14px; color: var(--cs-ink); }
  #tta-lesson .tta-resume-body strong { color: var(--cs-navy); display: block; margin-bottom: 2px; }
  #tta-lesson .tta-resume-btn {
    background: var(--cs-blue); color: white; border: none;
    padding: 10px 18px; border-radius: 10px;
    font-size: 13px; font-weight: 800;
    cursor: pointer; font-family: inherit;
    display: inline-flex; align-items: center; gap: 6px;
  }

  /* ============ MEDIA CARDS (video + podcast) ============ */
  #tta-lesson .tta-media-grid {
    display: grid; grid-template-columns: 1fr; gap: 18px;
    margin-bottom: 36px;
  }
  #tta-lesson .tta-media-card {
    background: white;
    border: 1px solid var(--cs-light-2);
    border-radius: 20px;
    padding: 24px;
    box-shadow: 0 6px 20px rgba(0, 15, 77, 0.05);
  }
  #tta-lesson .tta-media-head {
    display: flex; align-items: center; gap: 12px; margin-bottom: 16px;
  }
  #tta-lesson .tta-media-tile {
    flex: 0 0 42px; height: 42px; border-radius: 12px;
    background: var(--cs-light-2); color: var(--cs-blue);
    display: flex; align-items: center; justify-content: center;
  }
  #tta-lesson .tta-media-head-text h3 {
    font-size: 16px; margin: 0; color: var(--cs-navy);
  }
  #tta-lesson .tta-media-head-text p {
    font-size: 13px; margin: 2px 0 0; color: var(--cs-ink-soft);
  }
  #tta-lesson .tta-video-frame {
    position: relative; width: 100%;
    padding-top: 56.25%;
    border-radius: 14px; overflow: hidden;
    background: var(--cs-light-2);
  }
  #tta-lesson .tta-video-frame iframe {
    position: absolute; inset: 0; width: 100%; height: 100%; border: 0;
  }

  /* podcast player row */
  #tta-lesson .tta-pod-row {
    display: flex; align-items: center; gap: 16px;
  }
  #tta-lesson .tta-pod-play {
    flex: 0 0 52px; height: 52px; border-radius: 50%;
    background: var(--cs-blue); color: white; border: none;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; box-shadow: 0 8px 20px rgba(41, 79, 246, 0.35);
  }
  #tta-lesson .tta-pod-track { flex: 1; min-width: 0; }
  #tta-lesson .tta-pod-scrub {
    height: 6px; background: var(--cs-light-2);
    border-radius: 100px; overflow: hidden; cursor: pointer; margin-bottom: 6px;
  }
  #tta-lesson .tta-pod-scrub-fill { height: 100%; background: var(--cs-blue); border-radius: 100px; }
  #tta-lesson .tta-pod-time {
    display: flex; justify-content: space-between;
    font-size: 12px; color: var(--cs-ink-soft);
  }

  /* ============ LESSON BODY (.lesson-prose whitelist) ============ */
  #tta-lesson .lesson-prose { color: var(--cs-ink); }
  #tta-lesson .lesson-prose h2 {
    font-size: clamp(22px, 2.6vw, 30px);
    color: var(--cs-navy);
    margin: 44px 0 18px;
    padding-top: 8px;
    scroll-margin-top: 24px;
    position: relative;
  }
  #tta-lesson .lesson-prose h2::before {
    content: "";
    display: block;
    width: 46px; height: 4px;
    background: var(--cs-blue);
    border-radius: 100px;
    margin-bottom: 12px;
  }
  #tta-lesson .lesson-prose > h2:first-child { margin-top: 0; }
  #tta-lesson .lesson-prose p { font-size: 16px; line-height: 1.7; margin: 0 0 16px; }
  #tta-lesson .lesson-prose ul, #tta-lesson .lesson-prose ol {
    margin: 0 0 20px; padding-left: 22px;
  }
  #tta-lesson .lesson-prose li { margin-bottom: 8px; color: var(--cs-ink); line-height: 1.65; }
  #tta-lesson .lesson-prose a { color: var(--cs-blue); }

  #tta-lesson .lesson-prose img.lesson-slide {
    width: 100%; height: auto;
    border-radius: 16px; display: block;
    margin: 16px 0 22px;
    box-shadow: 0 14px 36px rgba(0, 15, 77, 0.14);
    background: var(--cs-light-2);
    border: 1px solid var(--cs-light-2);
  }

  #tta-lesson .lesson-prose .callout {
    background: linear-gradient(135deg, #eef4fd 0%, #f8fbff 100%);
    border-left: 4px solid var(--cs-blue);
    border-radius: 14px;
    padding: 18px 22px;
    margin: 22px 0;
  }
  #tta-lesson .lesson-prose .callout p { margin: 0 0 10px; color: var(--cs-navy); }
  #tta-lesson .lesson-prose .callout p:last-child { margin-bottom: 0; }
  #tta-lesson .lesson-prose .callout strong { color: var(--cs-blue); }

  /* Quiz — re-rendered as dark gradient card on enhance */
  #tta-lesson .lesson-prose .quiz {
    background: linear-gradient(135deg, #152237 0%, #000f4d 100%);
    color: white;
    border-radius: 22px;
    padding: 32px 30px;
    margin: 32px 0;
    box-shadow: 0 16px 40px rgba(0, 15, 77, 0.28);
    position: relative;
    overflow: hidden;
  }
  #tta-lesson .lesson-prose .quiz::before {
    content: ""; position: absolute;
    top: -50%; right: -20%; width: 420px; height: 420px; border-radius: 50%;
    background: radial-gradient(circle, rgba(94, 123, 246, 0.22) 0%, transparent 70%);
    pointer-events: none;
  }
  #tta-lesson .lesson-prose .quiz .tta-q-eyebrow {
    position: relative; z-index: 2;
    display: inline-block;
    background: rgba(122, 147, 255, 0.2);
    color: var(--cs-blue-4);
    border: 1px solid rgba(122, 147, 255, 0.3);
    font-size: 11px; font-weight: 800;
    text-transform: uppercase; letter-spacing: 0.14em;
    padding: 6px 12px; border-radius: 100px;
    margin-bottom: 14px;
  }
  #tta-lesson .lesson-prose .quiz .tta-q-question {
    position: relative; z-index: 2;
    font-size: 21px; font-weight: 800; line-height: 1.4;
    margin: 0 0 22px; color: white;
  }
  #tta-lesson .lesson-prose .quiz .tta-q-options { position: relative; z-index: 2; }
  #tta-lesson .lesson-prose .quiz .tta-q-opt {
    display: block; width: 100%; text-align: left;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(122, 147, 255, 0.25);
    color: #e5ecff; font-size: 15px; font-weight: 600;
    padding: 15px 18px; margin-bottom: 10px; border-radius: 13px;
    cursor: pointer; transition: all 0.25s ease;
    font-family: inherit;
  }
  #tta-lesson .lesson-prose .quiz .tta-q-opt:hover:not(:disabled) {
    background: rgba(122, 147, 255, 0.18);
    border-color: var(--cs-blue-4);
    transform: translateY(-1px);
  }
  #tta-lesson .lesson-prose .quiz .tta-q-opt.correct {
    background: rgba(52, 211, 153, 0.22);
    border-color: var(--cs-green);
    color: #d1fae5;
    box-shadow: 0 0 0 3px rgba(52, 211, 153, 0.18);
  }
  #tta-lesson .lesson-prose .quiz .tta-q-opt.incorrect {
    background: rgba(254, 44, 85, 0.18);
    border-color: var(--cs-red);
    color: #ffe3ea;
  }
  #tta-lesson .lesson-prose .quiz .tta-q-opt:disabled { cursor: default; }
  #tta-lesson .lesson-prose .quiz .tta-q-feedback {
    position: relative; z-index: 2;
    margin-top: 16px; padding: 13px 16px;
    border-radius: 12px;
    font-size: 14px; font-weight: 600;
  }
  #tta-lesson .lesson-prose .quiz .tta-q-feedback.correct {
    background: rgba(52, 211, 153, 0.2); color: #d1fae5;
    border: 1px solid rgba(52, 211, 153, 0.35);
  }
  #tta-lesson .lesson-prose .quiz .tta-q-feedback.incorrect {
    background: rgba(254, 44, 85, 0.18); color: #ffe3ea;
    border: 1px solid rgba(254, 44, 85, 0.35);
  }

  /* ============ COMPLETE CARD ============ */
  #tta-lesson .tta-complete {
    margin-top: 52px; padding: 36px 34px;
    background: linear-gradient(135deg, #eef4fd 0%, #f8fbff 60%, #d8d8ff 100%);
    border: 1px solid rgba(41, 79, 246, 0.2);
    border-radius: 22px;
    text-align: center;
  }
  #tta-lesson .tta-complete h3 { font-size: 24px; margin-bottom: 10px; }
  #tta-lesson .tta-complete p { margin-bottom: 22px; color: var(--cs-ink); }
  #tta-lesson .tta-complete .tta-btn-primary { box-shadow: 0 12px 32px rgba(41, 79, 246, 0.45); }

  /* ============ LOADING / EMPTY ============ */
  #tta-lesson .tta-loading, #tta-lesson .tta-error {
    grid-column: 1 / -1;
    min-height: 420px;
    display: flex; align-items: center; justify-content: center;
    color: var(--cs-ink-soft); font-size: 15px;
  }

  /* ============ RESPONSIVE ============ */
  @media (max-width: 960px) {
    #tta-lesson {
      grid-template-columns: 1fr;
      gap: 24px;
      padding: 16px 14px 48px;
    }
    #tta-lesson .tta-sidebar {
      position: static; max-height: none;
      order: 2;
    }
    #tta-lesson .tta-main { order: 1; }
    #tta-lesson .tta-hero { padding: 40px 28px; }
    #tta-lesson .tta-hero h1 { font-size: 30px; }
  }
`;

// =====================================================================
// Helpers
// =====================================================================

function formatTime(t) {
  if (!t || isNaN(t)) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function firstAttachment(val) {
  if (!val) return null;
  if (Array.isArray(val)) return val[0] || null;
  if (typeof val === "object" && val.url) return val;
  return null;
}

// Convert a Canva edit URL to an embed URL if needed.
function normaliseCanvaUrl(url) {
  if (!url) return null;
  if (url.includes("/embed")) return url;
  // https://www.canva.com/design/XXXX/YYYY/view  →  .../view?embed
  if (url.includes("canva.com/design/")) {
    return url.includes("?") ? `${url}&embed` : `${url}?embed`;
  }
  return url;
}

// =====================================================================
// Sub-components
// =====================================================================

function ProgressRing({ percent }) {
  const radius = 34;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (Math.max(0, Math.min(100, percent)) / 100) * circ;
  return (
    <div className="tta-ring">
      <svg width="84" height="84" viewBox="0 0 84 84">
        <circle className="tta-ring-bg" cx="42" cy="42" r={radius} fill="none" strokeWidth="6" />
        <circle
          className="tta-ring-fill"
          cx="42"
          cy="42"
          r={radius}
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="tta-ring-label">{Math.round(percent)}%</div>
    </div>
  );
}

function PodcastCard({ podcast }) {
  const [isPlaying, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => setCurrent(a.currentTime);
    const onMeta = () => setDuration(a.duration || 0);
    const onEnd = () => setPlaying(false);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("ended", onEnd);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("ended", onEnd);
    };
  }, [podcast?.url]);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (isPlaying) { a.pause(); setPlaying(false); }
    else { a.play(); setPlaying(true); }
  };

  const seek = (e) => {
    const a = audioRef.current;
    if (!a || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    a.currentTime = pct * duration;
    setCurrent(a.currentTime);
  };

  if (!podcast?.url) return null;
  const pct = duration ? (current / duration) * 100 : 0;

  return (
    <div className="tta-media-card">
      <div className="tta-media-head">
        <div className="tta-media-tile"><Volume2 size={20} /></div>
        <div className="tta-media-head-text">
          <h3>Listen on the go</h3>
          <p>Audio version of this lesson — perfect for walks, commutes, gym sessions.</p>
        </div>
      </div>
      <div className="tta-pod-row">
        <button className="tta-pod-play" onClick={toggle} aria-label={isPlaying ? "Pause" : "Play"}>
          {isPlaying ? <Pause size={20} /> : <Play size={20} style={{ marginLeft: 2 }} />}
        </button>
        <div className="tta-pod-track">
          <div className="tta-pod-scrub" onClick={seek}>
            <div className="tta-pod-scrub-fill" style={{ width: `${pct}%` }} />
          </div>
          <div className="tta-pod-time">
            <span>{formatTime(current)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
      <audio ref={audioRef} src={podcast.url} preload="metadata" />
    </div>
  );
}

function VideoCard({ embedUrl }) {
  if (!embedUrl) return null;
  return (
    <div className="tta-media-card">
      <div className="tta-media-head">
        <div className="tta-media-tile"><Play size={20} /></div>
        <div className="tta-media-head-text">
          <h3>Watch the lesson video</h3>
          <p>Start here — the slides below walk through everything in the video in detail.</p>
        </div>
      </div>
      <div className="tta-video-frame">
        <iframe
          src={embedUrl}
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          title="Lesson video"
        />
      </div>
    </div>
  );
}

// =====================================================================
// MAIN BLOCK
// =====================================================================

export default function Block() {
  const user = useCurrentUser();
  const recordId = useCurrentRecordId();
  const { data, status } = useRecord({ recordId, select: lessonFields });

  // Writes to Lesson Completions (configured in Actions tab).
  const createCompletion = useRecordCreate({ fields: completionFields });

  const [activeSec, setActiveSec] = useState(null);
  const [visitedSecs, setVisitedSecs] = useState(new Set());
  const [totalSecs, setTotalSecs] = useState(0);
  const [resumeSec, setResumeSec] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [completedLocal, setCompletedLocal] = useState(false);
  const proseRef = useRef(null);

  const progressKey = recordId ? `tta-progress-${recordId}` : null;
  const completedKey = recordId ? `tta-completed-${recordId}` : null;

  const lessonBody = data?.fields?.body || "";
  const lessonName = data?.fields?.name || "";
  const lessonNumber = data?.fields?.lessonNumber || "";
  const lessonDesc = data?.fields?.description || "";
  const lessonDuration = data?.fields?.duration || "";
  const category = data?.fields?.category;
  const difficulty = data?.fields?.difficulty;
  const podcast = firstAttachment(data?.fields?.podcast);
  const slides = firstAttachment(data?.fields?.slides);
  const explainerUrl = useMemo(
    () => normaliseCanvaUrl(data?.fields?.explainer),
    [data?.fields?.explainer],
  );

  // Load saved progress on first render for this lesson.
  useEffect(() => {
    if (!progressKey) return;
    try {
      const raw = localStorage.getItem(progressKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed.visited)) setVisitedSecs(new Set(parsed.visited));
        if (parsed.last) setResumeSec(parsed.last);
      }
      if (completedKey && localStorage.getItem(completedKey)) {
        setCompletedLocal(true);
      }
    } catch (e) {
      console.warn("tta: failed to read saved progress", e);
    }
  }, [progressKey, completedKey]);

  // Save visited sections whenever they change.
  useEffect(() => {
    if (!progressKey) return;
    try {
      localStorage.setItem(
        progressKey,
        JSON.stringify({
          visited: Array.from(visitedSecs),
          last: activeSec || resumeSec || null,
          updatedAt: Date.now(),
        }),
      );
    } catch (e) {
      /* quota / SSR */
    }
  }, [visitedSecs, activeSec, progressKey, resumeSec]);

  // Scroll-spy + section counting. Runs after lesson HTML is rendered.
  useEffect(() => {
    if (!lessonBody || !proseRef.current) return;
    const root = proseRef.current;
    const headings = Array.from(root.querySelectorAll('h2[id^="sec-"]'));
    setTotalSecs(headings.length);
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            const id = entry.target.id;
            setActiveSec(id);
            setVisitedSecs((prev) => {
              if (prev.has(id)) return prev;
              const next = new Set(prev);
              next.add(id);
              return next;
            });
          }
        });
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: 0 },
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [lessonBody]);

  // Quiz enhancer: convert whitelist <div class="quiz" data-question="..."><div>A</div>...</div>
  // into an interactive card in-place. Idempotent — skips already-enhanced quizzes.
  useEffect(() => {
    if (!lessonBody || !proseRef.current) return;
    const root = proseRef.current;
    const quizzes = Array.from(root.querySelectorAll(".quiz"));
    quizzes.forEach((quiz) => {
      if (quiz.dataset.enhanced === "1") return;
      const question = quiz.getAttribute("data-question") || "";
      const optionEls = Array.from(quiz.querySelectorAll(":scope > div"));
      if (optionEls.length === 0) return;
      const options = optionEls.map((el) => ({
        text: el.textContent || "",
        correct: el.getAttribute("data-correct") === "true",
      }));

      // Clear and rebuild
      quiz.innerHTML = "";
      quiz.dataset.enhanced = "1";

      const eyebrow = document.createElement("div");
      eyebrow.className = "tta-q-eyebrow";
      eyebrow.textContent = "Quick check";
      quiz.appendChild(eyebrow);

      const qEl = document.createElement("p");
      qEl.className = "tta-q-question";
      qEl.textContent = question;
      quiz.appendChild(qEl);

      const optsWrap = document.createElement("div");
      optsWrap.className = "tta-q-options";
      quiz.appendChild(optsWrap);

      const feedback = document.createElement("div");
      feedback.className = "tta-q-feedback";
      feedback.style.display = "none";

      const btns = [];
      options.forEach((opt) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "tta-q-opt";
        b.textContent = opt.text;
        b.addEventListener("click", () => {
          if (b.disabled) return;
          btns.forEach((other) => { other.disabled = true; });
          if (opt.correct) {
            b.classList.add("correct");
            feedback.className = "tta-q-feedback correct";
            feedback.textContent = "Correct — nice one.";
          } else {
            b.classList.add("incorrect");
            feedback.className = "tta-q-feedback incorrect";
            feedback.textContent = "Not quite. The correct answer is highlighted in green.";
            btns.forEach((other, i) => {
              if (options[i].correct) other.classList.add("correct");
            });
          }
          feedback.style.display = "block";
        });
        optsWrap.appendChild(b);
        btns.push(b);
      });

      quiz.appendChild(feedback);
    });
  }, [lessonBody]);

  const percent = totalSecs > 0 ? (visitedSecs.size / totalSecs) * 100 : 0;

  const scrollToFirstSection = () => {
    const root = proseRef.current;
    if (!root) return;
    const first = root.querySelector('h2[id^="sec-"]');
    if (first) first.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToSection = (id) => {
    if (!id) return;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleComplete = async () => {
    if (completedLocal) {
      toast.success("Already marked complete");
      return;
    }
    if (!user?.id) {
      toast.error("Please log in to mark lessons complete");
      return;
    }
    setSubmitting(true);

    // Optimistic local flag so the UI updates even if the Action isn't wired.
    try {
      if (completedKey) localStorage.setItem(completedKey, String(Date.now()));
      setCompletedLocal(true);
    } catch (e) { /* noop */ }

    try {
      if (createCompletion.enabled) {
        const courseIds = Array.isArray(data?.fields?.course)
          ? data.fields.course
          : data?.fields?.course
            ? [data.fields.course]
            : [];
        await createCompletion.mutateAsync({
          completionUser: user.id,
          completionLesson: [{ id: recordId }],
          completionCourse: courseIds.map((c) => (typeof c === "object" ? c : { id: c })),
          completedAt: new Date().toISOString(),
        });
        toast.success("Lesson complete. Nice work.");
      } else {
        toast.success("Lesson marked complete");
        console.warn(
          "tta: createCompletion.enabled is false — wire the Lesson Completions Action in the Actions tab to persist server-side.",
        );
      }
    } catch (e) {
      console.error("tta: failed to record completion", e);
      toast.error("Saved locally, but couldn't sync", { description: e.message });
    } finally {
      setSubmitting(false);
    }
  };

  // ========== RENDER ==========

  if (status === "pending") {
    return (
      <div id="tta-lesson">
        <style dangerouslySetInnerHTML={{ __html: STYLES }} />
        <div className="tta-loading">Loading lesson…</div>
      </div>
    );
  }

  if (status === "error" || !data) {
    return (
      <div id="tta-lesson">
        <style dangerouslySetInnerHTML={{ __html: STYLES }} />
        <div className="tta-error">Lesson not found.</div>
      </div>
    );
  }

  return (
    <div id="tta-lesson">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* ============ SIDEBAR ============ */}
      <aside className="tta-sidebar">
        <div className="tta-side-eyebrow">Your progress</div>
        <div className="tta-ring-wrap">
          <ProgressRing percent={percent} />
          <div className="tta-ring-meta">
            <strong>{visitedSecs.size} / {totalSecs || "—"}</strong>
            sections viewed
          </div>
        </div>

        <button className="tta-side-btn primary" onClick={scrollToFirstSection}>
          <BookOpen size={16} />
          {visitedSecs.size > 0 ? "Keep going" : "Start lesson"}
        </button>

        <button
          className={`tta-side-btn ${completedLocal ? "success" : ""}`}
          onClick={handleComplete}
          disabled={submitting}
        >
          <CheckCircle2 size={16} />
          {completedLocal ? "Lesson complete" : submitting ? "Saving…" : "Mark complete"}
        </button>

        {slides?.url && (
          <a className="tta-side-btn" href={slides.url} target="_blank" rel="noopener noreferrer">
            <Download size={16} />
            Download slides
          </a>
        )}

        <div className="tta-side-section">
          <div className="tta-side-eyebrow">Next up</div>
          <a className="tta-side-btn" href="/course">
            <Award size={16} />
            Back to course
          </a>
        </div>
      </aside>

      {/* ============ MAIN ============ */}
      <main className="tta-main">
        {/* HERO */}
        <div className="tta-hero">
          <div className="tta-hero-inner">
            {lessonNumber && <span className="tta-hero-eyebrow">{lessonNumber}</span>}
            <h1>{lessonName}</h1>
            {lessonDesc && <p className="tta-hero-sub">{lessonDesc}</p>}
            <div className="tta-chips">
              {category && (
                <span className="tta-chip"><Sparkles /> {String(category).toUpperCase()}</span>
              )}
              {difficulty && <span className="tta-chip">{String(difficulty)}</span>}
              {lessonDuration && (
                <span className="tta-chip"><Clock /> {lessonDuration}</span>
              )}
            </div>
            <div className="tta-hero-ctas">
              <button className="tta-btn-primary" onClick={scrollToFirstSection}>
                Start lesson <ArrowRight size={16} />
              </button>
              {slides?.url && (
                <a className="tta-btn-secondary" href={slides.url} target="_blank" rel="noopener noreferrer">
                  <Download size={16} /> Download slides
                </a>
              )}
            </div>
          </div>
        </div>

        {/* RESUME BANNER */}
        {resumeSec && visitedSecs.size > 0 && !completedLocal && (
          <div className="tta-resume">
            <div className="tta-resume-icon"><BookOpen size={20} /></div>
            <div className="tta-resume-body">
              <strong>Pick up where you left off</strong>
              You've viewed {visitedSecs.size} of {totalSecs} sections so far.
            </div>
            <button className="tta-resume-btn" onClick={() => scrollToSection(resumeSec)}>
              Resume <ArrowRight size={14} />
            </button>
          </div>
        )}

        {/* MEDIA (video + podcast) */}
        {(explainerUrl || podcast?.url) && (
          <div className="tta-media-grid">
            {explainerUrl && <VideoCard embedUrl={explainerUrl} />}
            {podcast?.url && <PodcastCard podcast={podcast} />}
          </div>
        )}

        {/* LESSON BODY */}
        <div
          className="lesson-prose"
          ref={proseRef}
          dangerouslySetInnerHTML={{ __html: lessonBody }}
        />

        {/* COMPLETE CARD */}
        <div className="tta-complete">
          <h3>{completedLocal ? "Lesson complete — nice work." : "Finished the lesson?"}</h3>
          <p>
            {completedLocal
              ? "Your progress is saved. Head back to the course for what's next."
              : "Mark this lesson complete to track your progress across the Academy."}
          </p>
          <button
            className="tta-btn-primary"
            onClick={completedLocal ? () => { window.location.href = "/course"; } : handleComplete}
            disabled={submitting}
          >
            {completedLocal ? (
              <>Back to course <ArrowRight size={16} /></>
            ) : submitting ? (
              "Saving…"
            ) : (
              <><CheckCircle2 size={16} /> Mark lesson complete</>
            )}
          </button>
        </div>
      </main>
    </div>
  );
}
