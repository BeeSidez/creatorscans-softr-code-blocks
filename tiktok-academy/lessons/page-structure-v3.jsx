import { useEffect, useMemo, useRef, useState } from "react";
import { useRecord, useCurrentRecordId, q } from "@/lib/datasource";
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
// No Actions tab wiring needed — completion persists to localStorage.
// =====================================================================

const lessonFields = q.select({
  name: "4e8yM",
  lessonNumber: "42btG",
  category: "jXSnc",
  difficulty: "5khor",
  description: "ck1JJ",
  duration: "VB4oU",
  body: "0wTBQ",
  explainer: "DqSLD",
  podcast: "uU6oS",
  slides: "nINLz",
});

// =====================================================================
// Brand palette — matches lead-magnet/itwin/blocks/itwin-course.html
// =====================================================================
const C = {
  blue: "#294ff6",
  blue2: "#4466f8",
  blue3: "#5e7bf6",
  blue4: "#7a93ff",
  navy: "#000f4d",
  navy2: "#001364",
  navy3: "#152237",
  light1: "#f8fbff",
  light2: "#eef4fd",
  light3: "#fafbff",
  lavender: "#d8d8ff",
  red: "#fe2c55",
  green: "#34d399",
  ink: "#1c274c",
  inkSoft: "#5a6690",
  white: "#ffffff",
};

const FONT_STACK =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

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

// Softr SELECT fields can come back as an object {id, label}, an array of
// those, or a plain string — normalise to a readable label.
function selectLabel(val) {
  if (val == null) return "";
  if (Array.isArray(val)) return selectLabel(val[0]);
  if (typeof val === "object") return val.label || val.name || "";
  return String(val);
}

// Strip HTML tags from a rich-text field and return clean text.
// The Description field in Softr stores wrapped HTML like
// <div class="lesson-description"><p>…</p></div> — we want just the text.
function htmlToText(html) {
  if (!html) return "";
  try {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return (doc.body.textContent || "").trim();
  } catch (e) {
    return String(html).replace(/<[^>]*>/g, "").trim();
  }
}

function normaliseCanvaUrl(url) {
  if (!url) return null;
  if (url.includes("/embed")) return url;
  if (url.includes("canva.com/design/")) {
    return url.includes("?") ? `${url}&embed` : `${url}?embed`;
  }
  return url;
}

// =====================================================================
// Style objects
// =====================================================================

const S = {
  root: (mobile) => ({
    maxWidth: 1280,
    margin: "0 auto",
    padding: mobile ? "16px 14px 48px" : "24px 16px 60px",
    fontFamily: FONT_STACK,
    fontSize: 16,
    lineHeight: 1.65,
    color: C.navy,
    display: "grid",
    gridTemplateColumns: mobile ? "1fr" : "280px 1fr",
    gap: mobile ? 24 : 40,
    boxSizing: "border-box",
  }),

  // ---------- SIDEBAR ----------
  sidebar: (mobile) => ({
    position: mobile ? "static" : "sticky",
    top: 24,
    alignSelf: "start",
    maxHeight: mobile ? "none" : "calc(100vh - 48px)",
    overflowY: "auto",
    background: C.white,
    border: `1px solid ${C.light2}`,
    borderRadius: 20,
    padding: "26px 22px",
    boxShadow: "0 8px 28px rgba(0, 15, 77, 0.06)",
    order: mobile ? 2 : 0,
  }),
  sideEyebrow: {
    fontSize: 10,
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "0.14em",
    color: C.blue,
    marginBottom: 16,
  },
  ringWrap: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    marginBottom: 22,
    paddingBottom: 22,
    borderBottom: `1px solid ${C.light2}`,
  },
  ringBox: { position: "relative", width: 84, height: 84, flexShrink: 0 },
  ringLabel: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
    fontWeight: 900,
    color: C.navy,
  },
  ringMeta: { fontSize: 13, color: C.inkSoft, lineHeight: 1.4 },
  ringMetaStrong: {
    color: C.navy,
    display: "block",
    fontSize: 14,
    marginBottom: 2,
    fontWeight: 800,
  },

  navSection: {
    fontSize: 10,
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "0.14em",
    color: C.inkSoft,
    margin: "18px 0 10px 4px",
  },
  navItem: (active, visited) => ({
    display: "flex",
    alignItems: "center",
    gap: 10,
    width: "100%",
    textAlign: "left",
    background: active ? C.light2 : "transparent",
    border: "none",
    padding: "9px 10px",
    borderRadius: 8,
    fontSize: 13,
    fontWeight: active ? 800 : 600,
    color: active ? C.navy : visited ? C.navy : C.inkSoft,
    cursor: "pointer",
    fontFamily: FONT_STACK,
    marginBottom: 2,
    transition: "background 0.2s ease",
  }),
  navTile: (active, visited) => ({
    flex: "0 0 22px",
    height: 22,
    borderRadius: 6,
    background: active ? C.blue : visited ? C.green : C.light2,
    color: active || visited ? C.white : C.inkSoft,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 10,
    fontWeight: 900,
    flexShrink: 0,
  }),
  navText: {
    flex: 1,
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  sideBtn: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    width: "100%",
    textAlign: "left",
    background: C.light1,
    border: `1px solid ${C.light2}`,
    padding: "11px 14px",
    borderRadius: 12,
    fontSize: 13,
    fontWeight: 700,
    color: C.navy,
    cursor: "pointer",
    fontFamily: FONT_STACK,
    marginTop: 8,
    textDecoration: "none",
  },
  sideBtnPrimary: {
    background: C.blue,
    borderColor: C.blue,
    color: C.white,
    boxShadow: "0 8px 20px rgba(41, 79, 246, 0.35)",
  },
  sideBtnSuccess: {
    background: "rgba(52, 211, 153, 0.12)",
    borderColor: "rgba(52, 211, 153, 0.4)",
    color: "#0f9e6e",
  },
  sideDivider: {
    marginTop: 22,
    paddingTop: 22,
    borderTop: `1px solid ${C.light2}`,
  },

  // ---------- MAIN ----------
  main: { minWidth: 0, order: 1 },

  // ---------- HERO ----------
  hero: (mobile) => ({
    position: "relative",
    background:
      "linear-gradient(135deg, #152237 0%, #000f4d 60%, #1a2d6b 100%)",
    borderRadius: 24,
    padding: mobile ? "40px 28px" : "56px 48px",
    color: C.white,
    marginBottom: 32,
    overflow: "hidden",
    boxShadow: "0 20px 50px rgba(0, 15, 77, 0.22)",
  }),
  heroGlow: {
    content: '""',
    position: "absolute",
    top: "-60%",
    right: "-20%",
    width: 600,
    height: 600,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(94, 123, 246, 0.35) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  heroInner: { position: "relative", zIndex: 2, maxWidth: 700 },
  heroEyebrow: {
    display: "inline-block",
    background: "rgba(122, 147, 255, 0.18)",
    color: C.blue4,
    border: "1px solid rgba(122, 147, 255, 0.3)",
    fontSize: 12,
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "0.14em",
    padding: "7px 14px",
    borderRadius: 100,
    marginBottom: 22,
  },
  heroTitle: (mobile) => ({
    color: C.white,
    margin: "0 0 18px",
    fontSize: mobile ? 30 : 44,
    fontWeight: 800,
    letterSpacing: "-0.02em",
    lineHeight: 1.15,
  }),
  heroSub: {
    fontSize: 17,
    lineHeight: 1.6,
    color: "#c3cfe8",
    margin: "0 0 26px",
    maxWidth: 620,
  },
  chips: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    marginBottom: 28,
  },
  chip: {
    background: "rgba(255, 255, 255, 0.08)",
    border: "1px solid rgba(122, 147, 255, 0.3)",
    color: "#dbe4ff",
    fontSize: 12,
    fontWeight: 700,
    padding: "7px 14px",
    borderRadius: 100,
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
  },
  heroCtas: { display: "flex", gap: 12, flexWrap: "wrap" },
  btnPrimary: {
    background: C.blue,
    color: C.white,
    border: "none",
    padding: "15px 26px",
    borderRadius: 14,
    fontSize: 15,
    fontWeight: 800,
    cursor: "pointer",
    fontFamily: FONT_STACK,
    boxShadow: "0 10px 28px rgba(41, 79, 246, 0.45)",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    textDecoration: "none",
  },
  btnSecondary: {
    background: "rgba(255, 255, 255, 0.08)",
    color: C.white,
    border: "1px solid rgba(122, 147, 255, 0.4)",
    padding: "15px 24px",
    borderRadius: 14,
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: FONT_STACK,
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    textDecoration: "none",
  },

  // ---------- RESUME BANNER ----------
  resume: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    padding: "18px 22px",
    marginBottom: 28,
    background: "linear-gradient(135deg, #eef4fd 0%, #f8fbff 100%)",
    border: "1px solid rgba(41, 79, 246, 0.2)",
    borderRadius: 16,
  },
  resumeIcon: {
    flex: "0 0 44px",
    height: 44,
    borderRadius: 12,
    background: C.blue,
    color: C.white,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  resumeBody: { flex: 1, fontSize: 14, color: C.ink },
  resumeStrong: { color: C.navy, display: "block", marginBottom: 2, fontWeight: 800 },
  resumeBtn: {
    background: C.blue,
    color: C.white,
    border: "none",
    padding: "10px 18px",
    borderRadius: 10,
    fontSize: 13,
    fontWeight: 800,
    cursor: "pointer",
    fontFamily: FONT_STACK,
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
  },

  // ---------- MEDIA CARDS ----------
  mediaGrid: { display: "grid", gridTemplateColumns: "1fr", gap: 18, marginBottom: 36 },
  mediaCard: {
    background: C.white,
    border: `1px solid ${C.light2}`,
    borderRadius: 20,
    padding: 24,
    boxShadow: "0 6px 20px rgba(0, 15, 77, 0.05)",
  },
  mediaHead: { display: "flex", alignItems: "center", gap: 12, marginBottom: 16 },
  mediaTile: {
    flex: "0 0 42px",
    height: 42,
    borderRadius: 12,
    background: C.light2,
    color: C.blue,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  mediaHeadTitle: { fontSize: 16, margin: 0, color: C.navy, fontWeight: 800 },
  mediaHeadSub: { fontSize: 13, margin: "2px 0 0", color: C.inkSoft },
  videoFrame: {
    position: "relative",
    width: "100%",
    paddingTop: "56.25%",
    borderRadius: 14,
    overflow: "hidden",
    background: C.light2,
  },
  videoIframe: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    border: 0,
  },

  // Podcast
  podRow: { display: "flex", alignItems: "center", gap: 16 },
  podPlay: {
    flex: "0 0 52px",
    height: 52,
    borderRadius: "50%",
    background: C.blue,
    color: C.white,
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(41, 79, 246, 0.35)",
  },
  podTrack: { flex: 1, minWidth: 0 },
  podScrub: {
    height: 6,
    background: C.light2,
    borderRadius: 100,
    overflow: "hidden",
    cursor: "pointer",
    marginBottom: 6,
  },
  podScrubFill: { height: "100%", background: C.blue, borderRadius: 100 },
  podTime: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 12,
    color: C.inkSoft,
  },

  // ---------- LESSON BODY ----------
  sectionH2: {
    fontSize: 30,
    color: C.navy,
    margin: "44px 0 16px",
    paddingTop: 8,
    scrollMarginTop: 24,
    fontWeight: 800,
    letterSpacing: "-0.02em",
    lineHeight: 1.2,
  },
  sectionBar: {
    display: "block",
    width: 46,
    height: 4,
    background: C.blue,
    borderRadius: 100,
    marginBottom: 14,
  },
  p: {
    fontSize: 16,
    lineHeight: 1.75,
    margin: "0 0 16px",
    color: C.ink,
  },
  strong: { color: C.navy, fontWeight: 700 },
  link: { color: C.blue, textDecoration: "underline", textUnderlineOffset: 3 },
  ul: { margin: "0 0 20px", paddingLeft: 22 },
  li: { marginBottom: 8, color: C.ink, lineHeight: 1.65 },
  slide: {
    width: "100%",
    height: "auto",
    borderRadius: 16,
    display: "block",
    margin: "16px 0 22px",
    boxShadow: "0 14px 36px rgba(0, 15, 77, 0.14)",
    background: C.light2,
    border: `1px solid ${C.light2}`,
  },
  callout: {
    background: "linear-gradient(135deg, #eef4fd 0%, #f8fbff 100%)",
    borderLeft: `4px solid ${C.blue}`,
    borderRadius: 14,
    padding: "18px 22px",
    margin: "22px 0",
  },
  calloutP: { margin: "0 0 10px", color: C.navy, fontSize: 16, lineHeight: 1.7 },

  // Quiz
  quiz: {
    background: "linear-gradient(135deg, #152237 0%, #000f4d 100%)",
    color: C.white,
    borderRadius: 22,
    padding: "32px 30px",
    margin: "32px 0",
    boxShadow: "0 16px 40px rgba(0, 15, 77, 0.28)",
    position: "relative",
    overflow: "hidden",
  },
  quizGlow: {
    position: "absolute",
    top: "-50%",
    right: "-20%",
    width: 420,
    height: 420,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(94, 123, 246, 0.22) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  quizEyebrow: {
    position: "relative",
    zIndex: 2,
    display: "inline-block",
    background: "rgba(122, 147, 255, 0.2)",
    color: C.blue4,
    border: "1px solid rgba(122, 147, 255, 0.3)",
    fontSize: 11,
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "0.14em",
    padding: "6px 12px",
    borderRadius: 100,
    marginBottom: 14,
  },
  quizQuestion: {
    position: "relative",
    zIndex: 2,
    fontSize: 21,
    fontWeight: 800,
    lineHeight: 1.4,
    margin: "0 0 22px",
    color: C.white,
  },
  quizOpts: { position: "relative", zIndex: 2 },
  quizOpt: (state) => ({
    display: "block",
    width: "100%",
    textAlign: "left",
    background:
      state === "correct"
        ? "rgba(52, 211, 153, 0.22)"
        : state === "wrong"
        ? "rgba(254, 44, 85, 0.18)"
        : "rgba(255, 255, 255, 0.06)",
    border:
      state === "correct"
        ? `1px solid ${C.green}`
        : state === "wrong"
        ? `1px solid ${C.red}`
        : "1px solid rgba(122, 147, 255, 0.25)",
    color:
      state === "correct" ? "#d1fae5" : state === "wrong" ? "#ffe3ea" : "#e5ecff",
    fontSize: 15,
    fontWeight: 600,
    padding: "15px 18px",
    marginBottom: 10,
    borderRadius: 13,
    cursor: state ? "default" : "pointer",
    fontFamily: FONT_STACK,
    boxShadow:
      state === "correct" ? "0 0 0 3px rgba(52, 211, 153, 0.18)" : "none",
  }),
  quizFeedback: (correct) => ({
    position: "relative",
    zIndex: 2,
    marginTop: 16,
    padding: "13px 16px",
    borderRadius: 12,
    fontSize: 14,
    fontWeight: 600,
    background: correct ? "rgba(52, 211, 153, 0.2)" : "rgba(254, 44, 85, 0.18)",
    color: correct ? "#d1fae5" : "#ffe3ea",
    border: correct
      ? "1px solid rgba(52, 211, 153, 0.35)"
      : "1px solid rgba(254, 44, 85, 0.35)",
  }),

  // Complete card
  completeCard: {
    marginTop: 52,
    padding: "36px 34px",
    background:
      "linear-gradient(135deg, #eef4fd 0%, #f8fbff 60%, #d8d8ff 100%)",
    border: "1px solid rgba(41, 79, 246, 0.2)",
    borderRadius: 22,
    textAlign: "center",
  },
  completeTitle: {
    fontSize: 24,
    margin: "0 0 10px",
    color: C.navy,
    fontWeight: 800,
    letterSpacing: "-0.02em",
  },
  completeSub: { margin: "0 0 22px", color: C.ink, fontSize: 16, lineHeight: 1.6 },

  // Loading / error
  center: {
    gridColumn: "1 / -1",
    minHeight: 420,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: C.inkSoft,
    fontSize: 15,
  },
};

// =====================================================================
// Body HTML → JSX (no dangerouslySetInnerHTML, no external CSS)
// =====================================================================

function InlineChildren({ node }) {
  // Walks inline children of a block element and renders text + <strong>,
  // <em>, <a> as JSX. Anything else is stripped.
  const children = Array.from(node.childNodes);
  return (
    <>
      {children.map((n, i) => {
        if (n.nodeType === 3) return n.textContent;
        if (n.nodeType !== 1) return null;
        const tag = n.tagName.toLowerCase();
        if (tag === "strong" || tag === "b")
          return <strong key={i} style={S.strong}>{n.textContent}</strong>;
        if (tag === "em" || tag === "i") return <em key={i}>{n.textContent}</em>;
        if (tag === "a")
          return (
            <a
              key={i}
              href={n.getAttribute("href") || "#"}
              target="_blank"
              rel="noopener noreferrer"
              style={S.link}
            >
              {n.textContent}
            </a>
          );
        if (tag === "br") return <br key={i} />;
        return n.textContent;
      })}
    </>
  );
}

function Quiz({ question, options }) {
  const [selected, setSelected] = useState(null);
  const correctIdx = options.findIndex((o) => o.correct);
  const answered = selected !== null;
  const pickedCorrect = answered && options[selected]?.correct;

  return (
    <div style={S.quiz}>
      <div style={S.quizGlow} />
      <div style={S.quizEyebrow}>Quick check</div>
      <p style={S.quizQuestion}>{question}</p>
      <div style={S.quizOpts}>
        {options.map((opt, i) => {
          let state = null;
          if (answered) {
            if (i === correctIdx) state = "correct";
            else if (i === selected) state = "wrong";
          }
          return (
            <button
              key={i}
              type="button"
              disabled={answered}
              onClick={() => setSelected(i)}
              style={S.quizOpt(state)}
            >
              {opt.text}
            </button>
          );
        })}
      </div>
      {answered && (
        <div style={S.quizFeedback(pickedCorrect)}>
          {pickedCorrect
            ? "Correct — nice one."
            : "Not quite. The correct answer is highlighted in green."}
        </div>
      )}
    </div>
  );
}

function renderBodyNodes(bodyEl) {
  const nodes = Array.from(bodyEl.childNodes);
  const out = [];
  nodes.forEach((n, i) => {
    if (n.nodeType !== 1) return;
    const el = n;
    const tag = el.tagName.toLowerCase();
    const key = `n${i}`;

    if (tag === "h2") {
      out.push(
        <h2 key={key} id={el.id || undefined} style={S.sectionH2}>
          <span style={S.sectionBar} />
          {el.textContent}
        </h2>,
      );
      return;
    }
    if (tag === "p") {
      out.push(
        <p key={key} style={S.p}>
          <InlineChildren node={el} />
        </p>,
      );
      return;
    }
    if (tag === "ul" || tag === "ol") {
      const ListTag = tag;
      out.push(
        <ListTag key={key} style={S.ul}>
          {Array.from(el.children).map((li, j) => (
            <li key={j} style={S.li}>
              <InlineChildren node={li} />
            </li>
          ))}
        </ListTag>,
      );
      return;
    }
    if (tag === "img") {
      const src = el.getAttribute("src");
      if (!src) return;
      out.push(
        <img
          key={key}
          src={src}
          alt={el.getAttribute("alt") || ""}
          style={S.slide}
        />,
      );
      return;
    }
    if (tag === "div") {
      const cls = el.className || "";
      if (cls.includes("callout")) {
        out.push(
          <div key={key} style={S.callout}>
            {Array.from(el.children).map((p, j) => (
              <p
                key={j}
                style={{ ...S.calloutP, marginBottom: j === el.children.length - 1 ? 0 : 10 }}
              >
                <InlineChildren node={p} />
              </p>
            ))}
          </div>,
        );
        return;
      }
      if (cls.includes("quiz")) {
        const question = el.getAttribute("data-question") || "";
        const options = Array.from(el.children).map((child) => ({
          text: child.textContent || "",
          correct: child.getAttribute("data-correct") === "true",
        }));
        if (!options.length) return;
        out.push(<Quiz key={key} question={question} options={options} />);
        return;
      }
    }
    // Unknown tag — skip.
  });
  return out;
}

// Extract {id, text} for every <h2 id="sec-N"> in the body, used by the TOC.
function extractSections(bodyEl) {
  const h2s = Array.from(bodyEl.querySelectorAll('h2[id^="sec-"]'));
  return h2s.map((h) => ({ id: h.id, text: h.textContent || "" }));
}

// =====================================================================
// Progress ring
// =====================================================================

function ProgressRing({ percent }) {
  const radius = 34;
  const circ = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, percent));
  const offset = circ - (clamped / 100) * circ;
  return (
    <div style={S.ringBox}>
      <svg width="84" height="84" viewBox="0 0 84 84" style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx="42"
          cy="42"
          r={radius}
          fill="none"
          stroke={C.light2}
          strokeWidth="6"
        />
        <circle
          cx="42"
          cy="42"
          r={radius}
          fill="none"
          stroke={C.blue}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)" }}
        />
      </svg>
      <div style={S.ringLabel}>{Math.round(clamped)}%</div>
    </div>
  );
}

// =====================================================================
// Podcast player
// =====================================================================

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
    if (isPlaying) {
      a.pause();
      setPlaying(false);
    } else {
      a.play();
      setPlaying(true);
    }
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
    <div style={S.mediaCard}>
      <div style={S.mediaHead}>
        <div style={S.mediaTile}>
          <Volume2 size={20} />
        </div>
        <div>
          <h3 style={S.mediaHeadTitle}>Listen on the go</h3>
          <p style={S.mediaHeadSub}>
            Audio version of this lesson — perfect for walks, commutes, gym sessions.
          </p>
        </div>
      </div>
      <div style={S.podRow}>
        <button
          type="button"
          style={S.podPlay}
          onClick={toggle}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} style={{ marginLeft: 2 }} />}
        </button>
        <div style={S.podTrack}>
          <div style={S.podScrub} onClick={seek}>
            <div style={{ ...S.podScrubFill, width: `${pct}%` }} />
          </div>
          <div style={S.podTime}>
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
    <div style={S.mediaCard}>
      <div style={S.mediaHead}>
        <div style={S.mediaTile}>
          <Play size={20} />
        </div>
        <div>
          <h3 style={S.mediaHeadTitle}>Watch the lesson video</h3>
          <p style={S.mediaHeadSub}>
            Start here — the slides below walk through everything in detail.
          </p>
        </div>
      </div>
      <div style={S.videoFrame}>
        <iframe
          src={embedUrl}
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          title="Lesson video"
          style={S.videoIframe}
        />
      </div>
    </div>
  );
}

// =====================================================================
// MAIN BLOCK
// =====================================================================

export default function Block() {
  const recordId = useCurrentRecordId();
  const { data, status } = useRecord({ recordId, select: lessonFields });

  const [isMobile, setIsMobile] = useState(false);
  const [activeSec, setActiveSec] = useState(null);
  const [visitedSecs, setVisitedSecs] = useState(new Set());
  const [resumeSec, setResumeSec] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [completedLocal, setCompletedLocal] = useState(false);
  const proseRef = useRef(null);

  // Responsive breakpoint — inline styles can't use media queries.
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 960);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const progressKey = recordId ? `tta-progress-${recordId}` : null;
  const completedKey = recordId ? `tta-completed-${recordId}` : null;

  const lessonBody = data?.fields?.body || "";
  const lessonName = data?.fields?.name || "";
  const lessonNumber = data?.fields?.lessonNumber || "";
  const lessonDesc = htmlToText(data?.fields?.description);
  const lessonDuration = data?.fields?.duration || "";
  const categoryLabel = selectLabel(data?.fields?.category);
  const difficultyLabel = selectLabel(data?.fields?.difficulty);
  const podcast = firstAttachment(data?.fields?.podcast);
  const slides = firstAttachment(data?.fields?.slides);
  const explainerUrl = useMemo(
    () => normaliseCanvaUrl(data?.fields?.explainer),
    [data?.fields?.explainer],
  );

  // Parse lesson body once per change: build JSX tree AND section list.
  const { bodyJsx, sections } = useMemo(() => {
    if (!lessonBody) return { bodyJsx: null, sections: [] };
    try {
      const doc = new DOMParser().parseFromString(lessonBody, "text/html");
      return {
        bodyJsx: renderBodyNodes(doc.body),
        sections: extractSections(doc.body),
      };
    } catch (e) {
      console.error("tta: failed to parse lesson body", e);
      return { bodyJsx: null, sections: [] };
    }
  }, [lessonBody]);

  // Load saved progress for this lesson.
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
      /* noop */
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
      /* noop */
    }
  }, [visitedSecs, activeSec, progressKey, resumeSec]);

  // Scroll-spy on h2[id^=sec-] inside the prose container.
  useEffect(() => {
    if (!bodyJsx || !proseRef.current) return;
    const root = proseRef.current;
    const headings = Array.from(root.querySelectorAll('h2[id^="sec-"]'));
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
  }, [bodyJsx]);

  const totalSecs = sections.length;
  const percent = totalSecs > 0 ? (visitedSecs.size / totalSecs) * 100 : 0;

  const scrollToSection = (id) => {
    if (!id) return;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToFirst = () => {
    if (sections[0]) scrollToSection(sections[0].id);
  };

  const handleComplete = () => {
    if (completedLocal) {
      toast.success("Already marked complete");
      return;
    }
    setSubmitting(true);
    try {
      if (completedKey) localStorage.setItem(completedKey, String(Date.now()));
      setCompletedLocal(true);
      toast.success("Lesson complete. Nice work.");
    } catch (e) {
      toast.error("Couldn't save progress");
    } finally {
      setSubmitting(false);
    }
  };

  // ========== RENDER ==========

  if (status === "pending") {
    return (
      <div style={S.root(isMobile)}>
        <div style={S.center}>Loading lesson…</div>
      </div>
    );
  }

  if (status === "error" || !data) {
    return (
      <div style={S.root(isMobile)}>
        <div style={S.center}>Lesson not found.</div>
      </div>
    );
  }

  return (
    <div style={S.root(isMobile)}>
      {/* ============ SIDEBAR ============ */}
      <aside style={S.sidebar(isMobile)}>
        <div style={S.sideEyebrow}>Your progress</div>
        <div style={S.ringWrap}>
          <ProgressRing percent={percent} />
          <div style={S.ringMeta}>
            <strong style={S.ringMetaStrong}>
              {visitedSecs.size} / {totalSecs || "—"}
            </strong>
            sections viewed
          </div>
        </div>

        {sections.length > 0 && (
          <>
            <div style={S.navSection}>Sections</div>
            {sections.map((sec, i) => {
              const active = activeSec === sec.id;
              const visited = visitedSecs.has(sec.id);
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => scrollToSection(sec.id)}
                  style={S.navItem(active, visited)}
                >
                  <span style={S.navTile(active, visited)}>
                    {visited && !active ? "✓" : i + 1}
                  </span>
                  <span style={S.navText}>{sec.text}</span>
                </button>
              );
            })}
          </>
        )}

        <div style={S.sideDivider}>
          <button
            type="button"
            style={{ ...S.sideBtn, ...S.sideBtnPrimary }}
            onClick={scrollToFirst}
          >
            <BookOpen size={16} />
            {visitedSecs.size > 0 ? "Keep going" : "Start lesson"}
          </button>

          <button
            type="button"
            style={{
              ...S.sideBtn,
              ...(completedLocal ? S.sideBtnSuccess : {}),
            }}
            onClick={handleComplete}
            disabled={submitting}
          >
            <CheckCircle2 size={16} />
            {completedLocal ? "Lesson complete" : submitting ? "Saving…" : "Mark complete"}
          </button>

          {slides?.url && (
            <a
              style={S.sideBtn}
              href={slides.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download size={16} />
              Download slides
            </a>
          )}

          <a style={S.sideBtn} href="/course">
            <Award size={16} />
            Back to course
          </a>
        </div>
      </aside>

      {/* ============ MAIN ============ */}
      <main style={S.main}>
        {/* HERO */}
        <div style={S.hero(isMobile)}>
          <div style={S.heroGlow} />
          <div style={S.heroInner}>
            {lessonNumber && <span style={S.heroEyebrow}>{lessonNumber}</span>}
            <h1 style={S.heroTitle(isMobile)}>{lessonName}</h1>
            {lessonDesc && <p style={S.heroSub}>{lessonDesc}</p>}
            <div style={S.chips}>
              {categoryLabel && (
                <span style={S.chip}>
                  <Sparkles size={13} /> {categoryLabel.toUpperCase()}
                </span>
              )}
              {difficultyLabel && <span style={S.chip}>{difficultyLabel}</span>}
              {lessonDuration && (
                <span style={S.chip}>
                  <Clock size={13} /> {lessonDuration}
                </span>
              )}
            </div>
            <div style={S.heroCtas}>
              <button type="button" style={S.btnPrimary} onClick={scrollToFirst}>
                Start lesson <ArrowRight size={16} />
              </button>
              {slides?.url && (
                <a
                  style={S.btnSecondary}
                  href={slides.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download size={16} /> Download slides
                </a>
              )}
            </div>
          </div>
        </div>

        {/* RESUME BANNER */}
        {resumeSec && visitedSecs.size > 0 && !completedLocal && (
          <div style={S.resume}>
            <div style={S.resumeIcon}>
              <BookOpen size={20} />
            </div>
            <div style={S.resumeBody}>
              <strong style={S.resumeStrong}>Pick up where you left off</strong>
              You've viewed {visitedSecs.size} of {totalSecs} sections so far.
            </div>
            <button
              type="button"
              style={S.resumeBtn}
              onClick={() => scrollToSection(resumeSec)}
            >
              Resume <ArrowRight size={14} />
            </button>
          </div>
        )}

        {/* MEDIA (video + podcast) */}
        {(explainerUrl || podcast?.url) && (
          <div style={S.mediaGrid}>
            {explainerUrl && <VideoCard embedUrl={explainerUrl} />}
            {podcast?.url && <PodcastCard podcast={podcast} />}
          </div>
        )}

        {/* LESSON BODY */}
        <div ref={proseRef}>{bodyJsx}</div>

        {/* COMPLETE CARD */}
        <div style={S.completeCard}>
          <h3 style={S.completeTitle}>
            {completedLocal ? "Lesson complete — nice work." : "Finished the lesson?"}
          </h3>
          <p style={S.completeSub}>
            {completedLocal
              ? "Your progress is saved. Head back to the course for what's next."
              : "Mark this lesson complete to track your progress across the Academy."}
          </p>
          {completedLocal ? (
            <a style={S.btnPrimary} href="/course">
              Back to course <ArrowRight size={16} />
            </a>
          ) : (
            <button
              type="button"
              style={S.btnPrimary}
              onClick={handleComplete}
              disabled={submitting}
            >
              <CheckCircle2 size={16} />
              {submitting ? "Saving…" : "Mark lesson complete"}
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
