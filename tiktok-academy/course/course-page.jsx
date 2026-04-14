import { useEffect, useMemo, useRef, useState } from "react";
import {
  useRecord,
  useCurrentRecordId,
  useLinkedRecords,
  q,
} from "@/lib/datasource";
import {
  ArrowRight,
  BookOpen,
  Clock,
  Award,
  Download,
  CheckCircle2,
  PlayCircle,
  Lock,
  Sparkles,
  User as UserIcon,
} from "lucide-react";

// =====================================================================
// TikTok Academy — Course page (v1)
// Source tab: Course table (FhDJfPPcLJEKHT) in Content Tracking App DB
// Renders: hero, progress strip, about, what you'll learn, lesson list,
// certificate card (locked/unlocked based on localStorage completions).
// =====================================================================

const courseFields = q.select({
  name: "4e8yM",              // SINGLE_LINE_TEXT — course title
  thumbnail: "hLsGv",         // URL — hero thumbnail
  about: "ck1JJ",             // LONG_TEXT — rich text
  whatYouLearn: "63H4g",      // LONG_TEXT — rich text (bulleted)
  overview: "f32JB",          // LONG_TEXT — short overview for hero sub
  duration: "VB4oU",          // SINGLE_LINE_TEXT
  category: "jXSnc",          // SELECT
  difficulty: "5khor",        // SELECT
  lessons: "TlDOR",           // LINKED_RECORD → Lessons
  lessonCount: "DiFh2",       // ROLLUP — number of lessons
  firstLessonUrl: "sqSYJ",    // SINGLE_LINE_TEXT — /lessons-details?recordId=…
  host: "BoJCO",              // ATTACHMENT — host avatar
  hostName: "DqLWF",          // SINGLE_LINE_TEXT
  certificate: "1ujhf",       // ATTACHMENT — static PDF for download
});

// =====================================================================
// Brand palette (matches lesson page)
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
  gold: "#f4c04e",
  goldDeep: "#c48f14",
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

function htmlToText(html) {
  if (!html) return "";
  try {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return (doc.body.textContent || "").trim();
  } catch (e) {
    return String(html).replace(/<[^>]*>/g, "").trim();
  }
}

function firstAttachment(val) {
  if (!val) return null;
  if (Array.isArray(val)) return firstAttachment(val[0]);
  if (typeof val === "object") {
    if (val.url) return val;
    if (val.value) return firstAttachment(val.value);
  }
  if (typeof val === "string") return { url: val, filename: "" };
  return null;
}

function selectLabel(val) {
  if (val == null) return "";
  if (Array.isArray(val)) return selectLabel(val[0]);
  if (typeof val === "object") return val.label || val.name || "";
  return String(val);
}

// Parse a rich-text "What You'll Learn" field into an array of bullet
// strings. Accepts <ul><li>…</li></ul> or newline-separated plain text.
function parseLearnList(html) {
  if (!html) return [];
  try {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const lis = Array.from(doc.body.querySelectorAll("li"));
    if (lis.length > 0) {
      return lis.map((li) => (li.textContent || "").trim()).filter(Boolean);
    }
    const text = (doc.body.textContent || "").trim();
    return text
      .split(/\n+/)
      .map((s) => s.replace(/^[-•·*]\s*/, "").trim())
      .filter(Boolean);
  } catch (e) {
    return [];
  }
}

function lessonUrl(lessonId) {
  if (!lessonId) return "#";
  return `/lessons-details?recordId=${lessonId}`;
}

// Construct a plausible thumbnail src from whatever Softr hands back.
function thumbnailUrl(val) {
  if (!val) return null;
  if (typeof val === "string") return val;
  if (Array.isArray(val)) return thumbnailUrl(val[0]);
  if (typeof val === "object") return val.url || val.value || null;
  return null;
}

// =====================================================================
// Style objects
// =====================================================================

const S = {
  root: (mobile) => ({
    maxWidth: 1200,
    margin: "0 auto",
    padding: mobile ? "16px 14px 60px" : "24px 16px 80px",
    fontFamily: FONT_STACK,
    fontSize: 16,
    lineHeight: 1.65,
    color: C.navy,
    boxSizing: "border-box",
  }),

  // ---------- HERO ----------
  hero: (mobile) => ({
    position: "relative",
    background:
      "linear-gradient(135deg, #152237 0%, #000f4d 60%, #1a2d6b 100%)",
    borderRadius: 28,
    padding: mobile ? "36px 26px" : "56px 52px",
    color: C.white,
    marginBottom: 32,
    overflow: "hidden",
    boxShadow: "0 24px 60px rgba(0, 15, 77, 0.24)",
  }),
  heroGlow: {
    position: "absolute",
    top: "-40%",
    right: "-15%",
    width: 640,
    height: 640,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(94, 123, 246, 0.38) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  heroGrid: (mobile) => ({
    position: "relative",
    zIndex: 2,
    display: "grid",
    gridTemplateColumns: mobile ? "1fr" : "1fr 340px",
    gap: mobile ? 28 : 40,
    alignItems: "center",
  }),
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
    fontSize: mobile ? 32 : 50,
    fontWeight: 800,
    letterSpacing: "-0.02em",
    lineHeight: 1.1,
  }),
  heroSub: {
    fontSize: 17,
    lineHeight: 1.6,
    color: "#c3cfe8",
    margin: "0 0 26px",
    maxWidth: 560,
  },
  chips: { display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 26 },
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
    padding: "16px 28px",
    borderRadius: 14,
    fontSize: 15,
    fontWeight: 800,
    cursor: "pointer",
    fontFamily: FONT_STACK,
    boxShadow: "0 12px 32px rgba(41, 79, 246, 0.45)",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    textDecoration: "none",
  },
  btnSecondary: {
    background: "rgba(255, 255, 255, 0.08)",
    color: C.white,
    border: "1px solid rgba(122, 147, 255, 0.4)",
    padding: "16px 26px",
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
  heroThumb: {
    position: "relative",
    borderRadius: 20,
    overflow: "hidden",
    aspectRatio: "4 / 3",
    boxShadow: "0 20px 50px rgba(0, 0, 0, 0.35)",
    border: "1px solid rgba(122, 147, 255, 0.3)",
    background:
      "linear-gradient(135deg, rgba(94, 123, 246, 0.2) 0%, rgba(0, 15, 77, 0.4) 100%)",
  },
  heroThumbImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  heroHost: {
    marginTop: 24,
    display: "inline-flex",
    alignItems: "center",
    gap: 12,
    padding: "10px 16px 10px 10px",
    background: "rgba(255, 255, 255, 0.06)",
    border: "1px solid rgba(122, 147, 255, 0.25)",
    borderRadius: 100,
  },
  heroHostAvatar: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    objectFit: "cover",
    background: C.light2,
    flexShrink: 0,
  },
  heroHostLabel: { fontSize: 11, color: "#9fb0d4", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 },
  heroHostName: { fontSize: 14, color: C.white, fontWeight: 700 },

  // ---------- PROGRESS STRIP ----------
  progressCard: {
    background: C.white,
    border: `1px solid ${C.light2}`,
    borderRadius: 18,
    padding: "20px 24px",
    marginBottom: 28,
    boxShadow: "0 6px 20px rgba(0, 15, 77, 0.05)",
    display: "flex",
    alignItems: "center",
    gap: 20,
    flexWrap: "wrap",
  },
  progressLabel: { flex: "1 1 220px", minWidth: 0 },
  progressEyebrow: {
    fontSize: 10,
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "0.14em",
    color: C.blue,
    marginBottom: 6,
  },
  progressTitle: { fontSize: 18, fontWeight: 800, color: C.navy, margin: 0 },
  progressBarWrap: {
    flex: "2 1 300px",
    height: 12,
    background: C.light2,
    borderRadius: 100,
    overflow: "hidden",
  },
  progressBarFill: (pct) => ({
    height: "100%",
    width: `${pct}%`,
    background: `linear-gradient(90deg, ${C.blue} 0%, ${C.blue4} 100%)`,
    borderRadius: 100,
    transition: "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
  }),
  progressCount: {
    flex: "0 0 auto",
    fontSize: 14,
    color: C.inkSoft,
    fontWeight: 700,
  },

  // ---------- SECTION ----------
  section: { marginBottom: 44 },
  sectionEyebrow: {
    display: "inline-block",
    background: C.light2,
    color: C.blue,
    fontSize: 11,
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "0.14em",
    padding: "6px 12px",
    borderRadius: 100,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 28,
    color: C.navy,
    margin: "0 0 18px",
    fontWeight: 800,
    letterSpacing: "-0.02em",
  },
  card: {
    background: C.white,
    border: `1px solid ${C.light2}`,
    borderRadius: 20,
    padding: "32px 36px",
    boxShadow: "0 6px 20px rgba(0, 15, 77, 0.05)",
  },
  cardP: {
    fontSize: 16,
    lineHeight: 1.75,
    color: C.ink,
    margin: "0 0 14px",
  },

  // ---------- WHAT YOU'LL LEARN ----------
  learnGrid: (mobile) => ({
    display: "grid",
    gridTemplateColumns: mobile ? "1fr" : "1fr 1fr",
    gap: 14,
  }),
  learnItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    padding: "16px 18px",
    background: C.light1,
    border: `1px solid ${C.light2}`,
    borderRadius: 14,
  },
  learnCheck: {
    flex: "0 0 26px",
    height: 26,
    borderRadius: "50%",
    background: C.blue,
    color: C.white,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  learnText: { fontSize: 15, lineHeight: 1.5, color: C.ink, fontWeight: 500 },

  // ---------- LESSON LIST ----------
  lessonList: { display: "flex", flexDirection: "column", gap: 14 },
  lessonCard: (state) => ({
    display: "flex",
    alignItems: "center",
    gap: 20,
    padding: "22px 26px",
    background:
      state === "next"
        ? "linear-gradient(135deg, #eef4fd 0%, #f8fbff 60%, #d8d8ff 100%)"
        : state === "done"
        ? "rgba(52, 211, 153, 0.08)"
        : C.white,
    border:
      state === "next"
        ? `2px solid ${C.blue}`
        : state === "done"
        ? "1px solid rgba(52, 211, 153, 0.35)"
        : `1px solid ${C.light2}`,
    borderRadius: 18,
    textDecoration: "none",
    color: C.navy,
    boxShadow:
      state === "next"
        ? "0 14px 36px rgba(41, 79, 246, 0.22)"
        : "0 4px 16px rgba(0, 15, 77, 0.05)",
    cursor: "pointer",
    transition: "transform 0.2s ease",
  }),
  lessonNum: (state) => ({
    flex: "0 0 56px",
    height: 56,
    borderRadius: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    fontWeight: 900,
    background:
      state === "done"
        ? C.green
        : state === "next"
        ? C.blue
        : C.light2,
    color: state === "locked" ? C.inkSoft : C.white,
    boxShadow:
      state === "next"
        ? "0 10px 24px rgba(41, 79, 246, 0.35)"
        : state === "done"
        ? "0 8px 20px rgba(52, 211, 153, 0.32)"
        : "none",
  }),
  lessonBody: { flex: 1, minWidth: 0 },
  lessonEyebrow: (state) => ({
    fontSize: 10,
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "0.14em",
    color: state === "next" ? C.blue : state === "done" ? "#0f9e6e" : C.inkSoft,
    marginBottom: 4,
  }),
  lessonTitle: {
    fontSize: 17,
    fontWeight: 800,
    color: C.navy,
    margin: 0,
    lineHeight: 1.3,
  },
  lessonArrow: (state) => ({
    flex: "0 0 auto",
    color: state === "next" ? C.blue : C.inkSoft,
  }),

  // ---------- CERTIFICATE ----------
  certWrap: (mobile) => ({
    marginTop: 56,
    padding: mobile ? "32px 20px" : "56px 48px",
    background:
      "linear-gradient(135deg, #eef4fd 0%, #f8fbff 50%, #d8d8ff 100%)",
    border: "1px solid rgba(41, 79, 246, 0.15)",
    borderRadius: 28,
    position: "relative",
    overflow: "hidden",
  }),
  certWrapUnlocked: {
    background:
      "linear-gradient(135deg, #fff8e1 0%, #fef3c7 50%, #fde68a 100%)",
    border: "1px solid rgba(244, 192, 78, 0.4)",
    boxShadow: "0 24px 60px rgba(244, 192, 78, 0.22)",
  },
  certEyebrow: {
    display: "inline-block",
    background: C.navy,
    color: C.white,
    fontSize: 11,
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "0.14em",
    padding: "7px 14px",
    borderRadius: 100,
    marginBottom: 14,
  },
  certEyebrowUnlocked: {
    background: "linear-gradient(135deg, #c48f14 0%, #f4c04e 100%)",
    color: C.white,
  },
  certIntroTitle: {
    fontSize: 28,
    color: C.navy,
    margin: "0 0 10px",
    fontWeight: 800,
    letterSpacing: "-0.02em",
  },
  certIntroSub: { fontSize: 16, color: C.ink, margin: "0 0 28px", lineHeight: 1.6 },

  // The on-screen certificate preview — rendered as styled JSX.
  certFrame: (unlocked, mobile) => ({
    position: "relative",
    background: C.white,
    border: unlocked
      ? `6px double ${C.goldDeep}`
      : `6px double ${C.inkSoft}`,
    borderRadius: 14,
    padding: mobile ? "40px 24px" : "56px 64px",
    textAlign: "center",
    maxWidth: 720,
    margin: "0 auto",
    boxShadow: unlocked
      ? "0 24px 60px rgba(196, 143, 20, 0.3)"
      : "0 14px 32px rgba(0, 15, 77, 0.12)",
    filter: unlocked ? "none" : "grayscale(40%)",
    opacity: unlocked ? 1 : 0.78,
    transition: "all 0.5s ease",
  }),
  certInnerBorder: (unlocked) => ({
    position: "absolute",
    inset: 10,
    border: `1px solid ${unlocked ? C.gold : C.inkSoft}`,
    borderRadius: 8,
    pointerEvents: "none",
  }),
  certKicker: (unlocked) => ({
    fontSize: 11,
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "0.24em",
    color: unlocked ? C.goldDeep : C.inkSoft,
    marginBottom: 14,
  }),
  certTitle: (unlocked, mobile) => ({
    fontSize: mobile ? 28 : 40,
    fontWeight: 800,
    color: C.navy,
    margin: "0 0 22px",
    letterSpacing: "-0.015em",
    fontFamily: '"Playfair Display", Georgia, "Times New Roman", serif',
  }),
  certPresentedTo: {
    fontSize: 13,
    color: C.inkSoft,
    margin: "0 0 6px",
    textTransform: "uppercase",
    letterSpacing: "0.18em",
    fontWeight: 700,
  },
  certName: (mobile) => ({
    fontSize: mobile ? 24 : 32,
    fontWeight: 700,
    color: C.navy,
    margin: "0 0 26px",
    paddingBottom: 14,
    borderBottom: `1px solid ${C.light2}`,
    fontFamily: '"Playfair Display", Georgia, "Times New Roman", serif',
    fontStyle: "italic",
  }),
  certBody: {
    fontSize: 15,
    color: C.ink,
    margin: "0 0 10px",
    lineHeight: 1.6,
  },
  certCourseName: (unlocked) => ({
    fontSize: 19,
    fontWeight: 800,
    color: unlocked ? C.goldDeep : C.navy,
    margin: "0 0 28px",
  }),
  certFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 26,
    paddingTop: 22,
    borderTop: `1px solid ${C.light2}`,
    gap: 20,
    flexWrap: "wrap",
  },
  certStamp: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    fontSize: 11,
    color: C.inkSoft,
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    fontWeight: 700,
  },
  certStampValue: {
    fontSize: 14,
    color: C.navy,
    marginTop: 4,
    textTransform: "none",
    letterSpacing: "normal",
    fontWeight: 800,
  },

  certLockedBar: {
    marginTop: 26,
    padding: "16px 20px",
    background: "rgba(0, 15, 77, 0.06)",
    border: "1px solid rgba(0, 15, 77, 0.12)",
    borderRadius: 14,
    display: "flex",
    alignItems: "center",
    gap: 14,
    maxWidth: 720,
    margin: "26px auto 0",
  },
  certLockedIcon: {
    flex: "0 0 42px",
    height: 42,
    borderRadius: 12,
    background: C.navy,
    color: C.white,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  certLockedText: { flex: 1, fontSize: 14, color: C.ink, lineHeight: 1.45 },
  certLockedStrong: { color: C.navy, display: "block", fontWeight: 800 },

  certDownloadWrap: {
    display: "flex",
    justifyContent: "center",
    marginTop: 28,
  },
  certBtnGold: {
    background: "linear-gradient(135deg, #c48f14 0%, #f4c04e 60%, #e5a820 100%)",
    color: C.white,
    border: "none",
    padding: "18px 34px",
    borderRadius: 16,
    fontSize: 16,
    fontWeight: 800,
    cursor: "pointer",
    fontFamily: FONT_STACK,
    boxShadow: "0 14px 36px rgba(196, 143, 20, 0.4)",
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    textDecoration: "none",
  },

  // Loading / error
  center: {
    minHeight: 420,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: C.inkSoft,
    fontSize: 15,
  },
};

// =====================================================================
// Sub-components
// =====================================================================

function AboutCard({ html }) {
  // Parse the About field and render paragraphs. Strip every other tag.
  const paragraphs = useMemo(() => {
    if (!html) return [];
    try {
      const doc = new DOMParser().parseFromString(html, "text/html");
      const ps = Array.from(doc.body.querySelectorAll("p"))
        .map((p) => (p.textContent || "").trim())
        .filter(Boolean);
      if (ps.length > 0) return ps;
      // Fallback: split on double newlines
      return (doc.body.textContent || "")
        .split(/\n{2,}/)
        .map((s) => s.trim())
        .filter(Boolean);
    } catch (e) {
      return [];
    }
  }, [html]);

  if (paragraphs.length === 0) return null;
  return (
    <div style={S.card}>
      {paragraphs.map((p, i) => (
        <p
          key={i}
          style={{
            ...S.cardP,
            marginBottom: i === paragraphs.length - 1 ? 0 : 14,
          }}
        >
          {p}
        </p>
      ))}
    </div>
  );
}

function LessonCard({ index, lesson, state }) {
  return (
    <a href={lessonUrl(lesson.id)} style={S.lessonCard(state)}>
      <div style={S.lessonNum(state)}>
        {state === "done" ? (
          <CheckCircle2 size={24} />
        ) : state === "locked" ? (
          <Lock size={20} />
        ) : (
          index + 1
        )}
      </div>
      <div style={S.lessonBody}>
        <div style={S.lessonEyebrow(state)}>
          {state === "done"
            ? "Completed"
            : state === "next"
            ? "Next up"
            : state === "locked"
            ? "Upcoming"
            : `Lesson ${index + 1}`}
        </div>
        <h3 style={S.lessonTitle}>{lesson.title || `Lesson ${index + 1}`}</h3>
      </div>
      <div style={S.lessonArrow(state)}>
        {state === "done" ? <PlayCircle size={22} /> : <ArrowRight size={22} />}
      </div>
    </a>
  );
}

function Certificate({ unlocked, courseName, completedAt, mobile, hostName }) {
  const dateLabel = completedAt
    ? new Date(completedAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "—";
  return (
    <div style={S.certFrame(unlocked, mobile)}>
      <div style={S.certInnerBorder(unlocked)} />
      <div style={{ position: "relative" }}>
        <div style={S.certKicker(unlocked)}>Creator Scans · TikTok Academy</div>
        <h2 style={S.certTitle(unlocked, mobile)}>Certificate of Completion</h2>
        <p style={S.certPresentedTo}>Presented to</p>
        <p style={S.certName(mobile)}>
          {unlocked ? "You" : "Your name here"}
        </p>
        <p style={S.certBody}>for successfully completing</p>
        <p style={S.certCourseName(unlocked)}>{courseName || "—"}</p>
        <div style={S.certFooter}>
          <div style={S.certStamp}>
            Awarded
            <span style={S.certStampValue}>{dateLabel}</span>
          </div>
          <div style={{ ...S.certStamp, textAlign: "right", alignItems: "flex-end" }}>
            Instructor
            <span style={S.certStampValue}>{hostName || "Creator Scans"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// =====================================================================
// MAIN BLOCK
// =====================================================================

export default function Block() {
  const recordId = useCurrentRecordId();
  const { data, status } = useRecord({ recordId, select: courseFields });

  // Linked lessons (returns { id, title } per item).
  const { data: linkedLessonData } = useLinkedRecords({
    select: courseFields,
    field: "lessons",
    count: 100,
  });
  const linkedLessons = useMemo(
    () => linkedLessonData?.pages.flatMap((p) => p.items) ?? [],
    [linkedLessonData],
  );

  const [isMobile, setIsMobile] = useState(false);
  const [completedIds, setCompletedIds] = useState(new Set());
  const [lastCompletedAt, setLastCompletedAt] = useState(null);

  // Responsive breakpoint
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 860);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Read localStorage completion flags for each linked lesson.
  // Recompute whenever the lesson list changes, and also on window focus
  // (so a user finishing a lesson in another tab sees progress update).
  useEffect(() => {
    if (linkedLessons.length === 0) return;
    const refresh = () => {
      const done = new Set();
      let latest = 0;
      linkedLessons.forEach((lesson) => {
        try {
          const raw = localStorage.getItem(`tta-completed-${lesson.id}`);
          if (raw) {
            done.add(lesson.id);
            const ts = parseInt(raw, 10);
            if (!isNaN(ts) && ts > latest) latest = ts;
          }
        } catch (e) { /* noop */ }
      });
      setCompletedIds(done);
      setLastCompletedAt(latest > 0 ? latest : null);
    };
    refresh();
    window.addEventListener("focus", refresh);
    return () => window.removeEventListener("focus", refresh);
  }, [linkedLessons]);

  // ========== DATA ==========

  const courseName = data?.fields?.name || "";
  const thumbnail = thumbnailUrl(data?.fields?.thumbnail);
  const aboutHtml = data?.fields?.about || "";
  const learnHtml = data?.fields?.whatYouLearn || "";
  const overview = htmlToText(data?.fields?.overview);
  const duration = data?.fields?.duration || "";
  const categoryLabel = selectLabel(data?.fields?.category);
  const difficultyLabel = selectLabel(data?.fields?.difficulty);
  const firstLessonUrl = data?.fields?.firstLessonUrl || null;
  const hostName = data?.fields?.hostName || "";
  const hostAvatar = firstAttachment(data?.fields?.host);
  const certificate = firstAttachment(data?.fields?.certificate);
  const rollupCount = Number(data?.fields?.lessonCount) || 0;

  const learnItems = useMemo(() => parseLearnList(learnHtml), [learnHtml]);

  // Compute totals / progress / next-up lesson.
  const totalLessons = linkedLessons.length || rollupCount || 0;
  const doneCount = linkedLessons.reduce(
    (n, l) => (completedIds.has(l.id) ? n + 1 : n),
    0,
  );
  const pct = totalLessons > 0 ? (doneCount / totalLessons) * 100 : 0;
  const allDone = totalLessons > 0 && doneCount >= totalLessons;

  const nextLesson = linkedLessons.find((l) => !completedIds.has(l.id));
  // Continue URL: first incomplete lesson, else first lesson URL field, else #.
  const continueUrl = nextLesson
    ? lessonUrl(nextLesson.id)
    : firstLessonUrl || (linkedLessons[0] ? lessonUrl(linkedLessons[0].id) : "#");

  const continueLabel = doneCount === 0
    ? "Start course"
    : allDone
      ? "Review course"
      : "Continue course";

  // ========== RENDER ==========

  if (status === "pending") {
    return (
      <div style={S.root(isMobile)}>
        <div style={S.center}>Loading course…</div>
      </div>
    );
  }
  if (status === "error" || !data) {
    return (
      <div style={S.root(isMobile)}>
        <div style={S.center}>Course not found.</div>
      </div>
    );
  }

  return (
    <div style={S.root(isMobile)}>
      {/* ============ HERO ============ */}
      <div style={S.hero(isMobile)}>
        <div style={S.heroGlow} />
        <div style={S.heroGrid(isMobile)}>
          <div>
            <span style={S.heroEyebrow}>
              {categoryLabel ? `${categoryLabel.toUpperCase()} COURSE` : "COURSE"}
            </span>
            <h1 style={S.heroTitle(isMobile)}>{courseName}</h1>
            {overview && <p style={S.heroSub}>{overview}</p>}
            <div style={S.chips}>
              <span style={S.chip}>
                <BookOpen size={13} /> {totalLessons || "—"} lessons
              </span>
              {duration && (
                <span style={S.chip}>
                  <Clock size={13} /> {duration}
                </span>
              )}
              {difficultyLabel && <span style={S.chip}>{difficultyLabel}</span>}
            </div>
            <div style={S.heroCtas}>
              <a style={S.btnPrimary} href={continueUrl}>
                {continueLabel} <ArrowRight size={16} />
              </a>
              {certificate?.url && allDone && (
                <a
                  style={S.btnSecondary}
                  href={certificate.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download size={16} /> Download certificate
                </a>
              )}
            </div>
            {hostName && (
              <div style={S.heroHost}>
                {hostAvatar?.url ? (
                  <img src={hostAvatar.url} alt="" style={S.heroHostAvatar} />
                ) : (
                  <div
                    style={{
                      ...S.heroHostAvatar,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: C.blue,
                    }}
                  >
                    <UserIcon size={18} />
                  </div>
                )}
                <div>
                  <div style={S.heroHostLabel}>Taught by</div>
                  <div style={S.heroHostName}>{hostName}</div>
                </div>
              </div>
            )}
          </div>
          {thumbnail && !isMobile && (
            <div style={S.heroThumb}>
              <img src={thumbnail} alt="" style={S.heroThumbImg} />
            </div>
          )}
        </div>
      </div>

      {/* ============ PROGRESS STRIP ============ */}
      {totalLessons > 0 && (
        <div style={S.progressCard}>
          <div style={S.progressLabel}>
            <div style={S.progressEyebrow}>Your progress</div>
            <h3 style={S.progressTitle}>
              {allDone
                ? "Course complete — amazing work"
                : doneCount === 0
                  ? "Ready to begin"
                  : `${totalLessons - doneCount} lesson${totalLessons - doneCount === 1 ? "" : "s"} left to go`}
            </h3>
          </div>
          <div style={S.progressBarWrap}>
            <div style={S.progressBarFill(pct)} />
          </div>
          <div style={S.progressCount}>
            {doneCount} / {totalLessons}
          </div>
        </div>
      )}

      {/* ============ ABOUT ============ */}
      {aboutHtml && (
        <div style={S.section}>
          <span style={S.sectionEyebrow}>About this course</span>
          <h2 style={S.sectionTitle}>What you're stepping into</h2>
          <AboutCard html={aboutHtml} />
        </div>
      )}

      {/* ============ WHAT YOU'LL LEARN ============ */}
      {learnItems.length > 0 && (
        <div style={S.section}>
          <span style={S.sectionEyebrow}>What you'll learn</span>
          <h2 style={S.sectionTitle}>By the end of this course</h2>
          <div style={S.learnGrid(isMobile)}>
            {learnItems.map((item, i) => (
              <div key={i} style={S.learnItem}>
                <div style={S.learnCheck}>
                  <CheckCircle2 size={16} />
                </div>
                <div style={S.learnText}>{item}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============ LESSONS LIST ============ */}
      {linkedLessons.length > 0 && (
        <div style={S.section}>
          <span style={S.sectionEyebrow}>Lessons</span>
          <h2 style={S.sectionTitle}>Your path through the course</h2>
          <div style={S.lessonList}>
            {linkedLessons.map((lesson, i) => {
              let state = "upcoming";
              if (completedIds.has(lesson.id)) state = "done";
              else if (nextLesson && lesson.id === nextLesson.id) state = "next";
              return (
                <LessonCard
                  key={lesson.id}
                  index={i}
                  lesson={lesson}
                  state={state}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* ============ CERTIFICATE ============ */}
      <div
        style={{
          ...S.certWrap(isMobile),
          ...(allDone ? S.certWrapUnlocked : {}),
        }}
      >
        <div style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
          <div
            style={{
              ...S.certEyebrow,
              ...(allDone ? S.certEyebrowUnlocked : {}),
            }}
          >
            {allDone ? "🏆 You did it" : "Your certificate"}
          </div>
          <h2 style={S.certIntroTitle}>
            {allDone
              ? "Certificate unlocked"
              : "Finish the course to unlock your certificate"}
          </h2>
          <p style={S.certIntroSub}>
            {allDone
              ? "You've completed every lesson. Download your certificate below and share it anywhere you like."
              : `Complete all ${totalLessons || "the"} lessons and this certificate becomes yours to download.`}
          </p>
        </div>

        <Certificate
          unlocked={allDone}
          courseName={courseName}
          completedAt={lastCompletedAt}
          mobile={isMobile}
          hostName={hostName}
        />

        {!allDone && totalLessons > 0 && (
          <div style={S.certLockedBar}>
            <div style={S.certLockedIcon}>
              <Lock size={20} />
            </div>
            <div style={S.certLockedText}>
              <strong style={S.certLockedStrong}>
                {totalLessons - doneCount} lesson{totalLessons - doneCount === 1 ? "" : "s"} left to unlock
              </strong>
              Keep going — each lesson brings you closer.
            </div>
            <a
              style={{ ...S.btnPrimary, padding: "12px 20px", fontSize: 13 }}
              href={continueUrl}
            >
              {continueLabel} <ArrowRight size={14} />
            </a>
          </div>
        )}

        {allDone && certificate?.url && (
          <div style={S.certDownloadWrap}>
            <a
              style={S.certBtnGold}
              href={certificate.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Award size={18} />
              Download your certificate
              <Download size={18} />
            </a>
          </div>
        )}

        {allDone && !certificate?.url && (
          <div style={{ ...S.certLockedBar, maxWidth: 520 }}>
            <div style={S.certLockedIcon}>
              <Sparkles size={20} />
            </div>
            <div style={S.certLockedText}>
              <strong style={S.certLockedStrong}>Certificate file missing</strong>
              Upload the PDF to the Course record's Certificate field and the download button will appear here.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
