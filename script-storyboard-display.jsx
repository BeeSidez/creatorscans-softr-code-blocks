import { useState } from "react";
import { useCurrentUser } from "@/lib/user";
import { useRecord, useLinkedRecords, q } from "@/lib/datasource";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Film,
  FileText,
  Camera,
  Mic,
  Type,
  Eye,
  Clock,
  Layers,
  Sparkles,
  MessageSquare,
  Volume2,
  MonitorPlay,
} from "lucide-react";

// ─── Storyboard/Script table fields (moJabgXWJZmGeK) ────────────

const scriptFields = q.select({
  concept_name: "yfiqQ",
  full_script: "AtsZG",
  frame: "sAfaI",
  section: "qNYv4",
  section_details: "pR9P6",
  shot_type: "WqgDZ",
  script: "ofrnY",
  voiceover: "PWiAB",
  caption: "pBk7E",
  visual_action: "aw8mj",
  scene_description: "gAeK8",
  timestamp: "0TuwG",
});

// ─── Helpers ─────────────────────────────────────────────────────

function val(record, fieldName) {
  if (!record?.fields) return "";
  const field = record.fields[fieldName];
  if (field === null || field === undefined) return "";
  if (typeof field === "object" && field.value !== undefined) return String(field.value);
  if (Array.isArray(field)) return field.map((f) => f.name || f.label || f).join(", ");
  return String(field);
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded"
      title="Copy to clipboard"
    >
      {copied ? (
        <Check className="w-3.5 h-3.5 text-green-600" />
      ) : (
        <Copy className="w-3.5 h-3.5" />
      )}
    </button>
  );
}

// ─── Section colour mapping ──────────────────────────────────────

const SECTION_COLORS = {
  Hook: "bg-red-100 text-red-700 border-red-200",
  "On-ramp": "bg-orange-100 text-orange-700 border-orange-200",
  Problem: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Agitation: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Motivator: "bg-blue-100 text-blue-700 border-blue-200",
  "Solution Intro": "bg-purple-100 text-purple-700 border-purple-200",
  "Product Intro": "bg-purple-100 text-purple-700 border-purple-200",
  Demonstration: "bg-pink-100 text-pink-700 border-pink-200",
  Education: "bg-pink-100 text-pink-700 border-pink-200",
  Proof: "bg-gray-100 text-gray-700 border-gray-200",
  "Trust Builder": "bg-gray-100 text-gray-700 border-gray-200",
  "Call To Action": "bg-green-100 text-green-700 border-green-200",
  Urgency: "bg-green-100 text-green-700 border-green-200",
  Outro: "bg-green-100 text-green-700 border-green-200",
  Objections: "bg-amber-100 text-amber-700 border-amber-200",
  Reassurances: "bg-amber-100 text-amber-700 border-amber-200",
  "Offer stack": "bg-emerald-100 text-emerald-700 border-emerald-200",
  "Persuasion Levers": "bg-indigo-100 text-indigo-700 border-indigo-200",
  Engagement: "bg-cyan-100 text-cyan-700 border-cyan-200",
  Community: "bg-cyan-100 text-cyan-700 border-cyan-200",
};

function SectionBadge({ section }) {
  const colors = SECTION_COLORS[section] || "bg-muted text-foreground";
  return (
    <Badge className={`text-xs border ${colors}`}>
      {section}
    </Badge>
  );
}

// ─── Frame card component ────────────────────────────────────────

function FrameCard({ frame, isExpanded, onToggle }) {
  const section = val(frame, "section");
  const sectionDetail = val(frame, "section_details");
  const shotType = val(frame, "shot_type");
  const scriptText = val(frame, "script");
  const voiceover = val(frame, "voiceover");
  const caption = val(frame, "caption");
  const visualAction = val(frame, "visual_action");
  const sceneDesc = val(frame, "scene_description");
  const timestamp = val(frame, "timestamp");
  const frameNum = val(frame, "frame");

  return (
    <div className="rounded-xl border bg-card overflow-hidden">
      {/* Frame header — always visible */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 p-3 hover:bg-muted/30 transition-colors"
      >
        {/* Frame number */}
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <span className="text-xs font-bold text-primary">{frameNum}</span>
        </div>

        {/* Section + detail */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <SectionBadge section={section} />
          {sectionDetail && (
            <span className="text-xs text-muted-foreground truncate">
              {sectionDetail}
            </span>
          )}
        </div>

        {/* Timestamp */}
        {timestamp && (
          <span className="text-xs text-muted-foreground font-mono shrink-0">
            {timestamp}
          </span>
        )}

        {/* Expand icon */}
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
        )}
      </button>

      {/* Script preview — always visible */}
      {scriptText && !isExpanded && (
        <div className="px-3 pb-3 -mt-1">
          <p className="text-sm text-foreground line-clamp-2 italic pl-11">
            "{scriptText}"
          </p>
        </div>
      )}

      {/* Expanded detail */}
      {isExpanded && (
        <div className="px-3 pb-4 space-y-3 border-t bg-muted/10">
          {/* Script */}
          {scriptText && (
            <div className="pt-3">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Script
                  </span>
                </div>
                <CopyButton text={scriptText} />
              </div>
              <div className="rounded-lg bg-card border p-3">
                <p className="text-sm text-foreground leading-relaxed italic">
                  "{scriptText}"
                </p>
              </div>
            </div>
          )}

          {/* Detail grid */}
          <div className="grid grid-cols-2 gap-2">
            {/* Shot Type */}
            {shotType && (
              <div className="rounded-lg bg-card border p-2.5">
                <div className="flex items-center gap-1.5 mb-1">
                  <Camera className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Shot</span>
                </div>
                <p className="text-xs font-medium text-foreground">{shotType}</p>
              </div>
            )}

            {/* Visual Action */}
            {visualAction && (
              <div className="rounded-lg bg-card border p-2.5">
                <div className="flex items-center gap-1.5 mb-1">
                  <Eye className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Visual</span>
                </div>
                <p className="text-xs font-medium text-foreground">{visualAction}</p>
              </div>
            )}

            {/* Voiceover */}
            {voiceover && (
              <div className="rounded-lg bg-card border p-2.5">
                <div className="flex items-center gap-1.5 mb-1">
                  <Volume2 className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Voiceover</span>
                </div>
                <p className="text-xs font-medium text-foreground">{voiceover}</p>
              </div>
            )}

            {/* Caption */}
            {caption && (
              <div className="rounded-lg bg-card border p-2.5">
                <div className="flex items-center gap-1.5 mb-1">
                  <Type className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">On-screen text</span>
                </div>
                <p className="text-xs font-medium text-foreground">{caption}</p>
              </div>
            )}
          </div>

          {/* Scene Description */}
          {sceneDesc && (
            <div className="rounded-lg bg-card border p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <MonitorPlay className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Scene
                </span>
              </div>
              <p className="text-xs text-foreground leading-relaxed">
                {sceneDesc}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Full Script view component ──────────────────────────────────

function FullScriptView({ scriptText }) {
  const [copied, setCopied] = useState(false);

  if (!scriptText) return null;

  function handleCopyAll() {
    navigator.clipboard.writeText(scriptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-xl border bg-card overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-primary" />
          <h3 className="font-semibold text-foreground">Full Script</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyAll}
          className="text-xs"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 mr-1 text-green-600" />
              Copied
            </>
          ) : (
            <>
              <Copy className="w-3 h-3 mr-1" />
              Copy all
            </>
          )}
        </Button>
      </div>
      <div className="p-4">
        <div className="prose prose-sm max-w-none text-foreground whitespace-pre-line leading-relaxed">
          {scriptText}
        </div>
      </div>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────

export default function Block() {
  const user = useCurrentUser();
  const [view, setView] = useState("storyboard"); // "storyboard" | "script"
  const [expandedFrame, setExpandedFrame] = useState(null);
  const [expandAll, setExpandAll] = useState(false);

  // Fetch storyboard frames linked to the current record
  // On the product page, these would be frames generated for this product
  const { data: framesData } = useLinkedRecords({
    select: scriptFields,
    field: "Storyboard/Script",
    count: 100,
  });

  const frames = framesData?.pages?.flatMap((p) => p.items) ?? [];

  // Sort frames by frame number
  const sortedFrames = [...frames].sort((a, b) => {
    const aNum = parseInt(val(a, "frame")) || 0;
    const bNum = parseInt(val(b, "frame")) || 0;
    return aNum - bNum;
  });

  // Get full script from the first frame (stored once)
  const fullScript = frames.length > 0 ? val(frames[0], "full_script") : "";
  const conceptName = frames.length > 0 ? val(frames[0], "concept_name") : "";

  // Count sections
  const sections = [...new Set(sortedFrames.map((f) => val(f, "section")).filter(Boolean))];

  // Total duration from last frame timestamp
  const lastFrame = sortedFrames[sortedFrames.length - 1];
  const lastTimestamp = lastFrame ? val(lastFrame, "timestamp") : "";
  const totalDuration = lastTimestamp ? lastTimestamp.split("-").pop()?.trim() : "";

  if (frames.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto py-12 text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mx-auto">
          <Film className="w-6 h-6 text-muted-foreground" />
        </div>
        <p className="text-sm text-muted-foreground">
          No script generated yet. Use the form above to generate your personalised script and storyboard.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-6 px-4 space-y-4">
      {/* ─── Header ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-foreground">
            {conceptName || "Your Script & Storyboard"}
          </h2>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Layers className="w-3 h-3" />
              {sortedFrames.length} frames
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Film className="w-3 h-3" />
              {sections.length} sections
            </span>
            {totalDuration && (
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                ~{totalDuration}
              </span>
            )}
          </div>
        </div>

        {/* View toggle */}
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border bg-muted/50 p-0.5">
            <button
              onClick={() => setView("storyboard")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                view === "storyboard"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Film className="w-3 h-3 inline mr-1" />
              Storyboard
            </button>
            <button
              onClick={() => setView("script")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                view === "script"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <FileText className="w-3 h-3 inline mr-1" />
              Full Script
            </button>
          </div>
        </div>
      </div>

      {/* ─── Storyboard View ─── */}
      {view === "storyboard" && (
        <div className="space-y-3">
          {/* Controls */}
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              Click any frame to see the full detail. Your script text can be copied frame by frame.
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setExpandAll(!expandAll);
                setExpandedFrame(null);
              }}
              className="text-xs"
            >
              {expandAll ? "Collapse all" : "Expand all"}
            </Button>
          </div>

          {/* Section timeline */}
          <div className="flex flex-wrap gap-1.5 pb-2">
            {sections.map((section) => (
              <SectionBadge key={section} section={section} />
            ))}
          </div>

          {/* Frame cards */}
          <div className="space-y-2">
            {sortedFrames.map((frame, index) => (
              <FrameCard
                key={frame.id || index}
                frame={frame}
                isExpanded={expandAll || expandedFrame === index}
                onToggle={() => {
                  if (expandAll) return;
                  setExpandedFrame(expandedFrame === index ? null : index);
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* ─── Full Script View ─── */}
      {view === "script" && <FullScriptView scriptText={fullScript} />}

      {/* ─── Generate Another ─── */}
      <div className="rounded-xl border border-dashed p-4 text-center">
        <p className="text-sm text-muted-foreground">
          Want a different angle or format?
        </p>
        <Button variant="outline" size="sm" className="mt-2">
          <Sparkles className="w-3.5 h-3.5 mr-1" />
          Generate another version
        </Button>
      </div>
    </div>
  );
}
