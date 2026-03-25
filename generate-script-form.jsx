import { useState, useEffect } from "react";
import { useCurrentUser } from "@/lib/user";
import { useRecordCreate, useRecordUpdate, useRecord, useLinkedRecords, q } from "@/lib/datasource";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Video,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Info,
  HelpCircle,
} from "lucide-react";

// ─── Storyboard/Script table (moJabgXWJZmGeK) ───────────────────
// This is where form submissions go. Hidden fields link to the
// product, brand, research, and strategy records on the current page.

const createFields = q.select({
  concept_name: "yfiqQ",
  full_script: "AtsZG",
  script: "ofrnY",
});

const readFields = q.select({
  concept_name: "yfiqQ",
  full_script: "AtsZG",
});

// ─── Form field IDs for the Storyboard/Script table ──────────────
// NOTE: These fields need to be added to the Storyboard/Script table
// in Softr for the form to work. See softr-schema.md for the table.
//
// Fields to add:
//   context       (LONG_TEXT)   — creator's personal use case
//   format        (SELECT)     — video format choice
//   stage         (SELECT)     — awareness level
//   direction     (LONG_TEXT)  — optional creative notes
//   product_link  (LINKED_RECORD -> Products)
//   brand_link    (LINKED_RECORD -> Brands)
//   research_link (LINKED_RECORD -> Research)
//   strategy_link (LINKED_RECORD -> Strategy)
//   creator_link  (LINKED_RECORD -> Users)
//   generation_status (SELECT) — Pending / Generating / Complete / Failed
//
// Once created, replace the placeholder IDs below with real ones.

const formCreateFields = q.select({
  context: "PLACEHOLDER_context",
  format: "PLACEHOLDER_format",
  stage: "PLACEHOLDER_stage",
  direction: "PLACEHOLDER_direction",
  product_link: "PLACEHOLDER_product",
  brand_link: "PLACEHOLDER_brand",
  research_link: "PLACEHOLDER_research",
  strategy_link: "PLACEHOLDER_strategy",
  creator_link: "PLACEHOLDER_creator",
  generation_status: "PLACEHOLDER_status",
});

// ─── Video format options ────────────────────────────────────────

const FORMAT_OPTIONS = [
  {
    value: "talking_to_camera",
    label: "Talking to camera",
    description:
      "You speak directly to the viewer. The most versatile format. Works for any product and any experience level.",
    stages: ["tof", "mof", "bof"],
  },
  {
    value: "grwm",
    label: "Get ready with me",
    description:
      "Show your routine while talking through the product. Works best for beauty, skincare, fashion, and anything you use daily.",
    stages: ["mof"],
  },
  {
    value: "before_after",
    label: "Before and after",
    description:
      "Show the problem, then the transformation. Powerful when the product has a visible result.",
    stages: ["mof"],
  },
  {
    value: "tutorial",
    label: "Tutorial",
    description:
      "Walk the viewer through how to use the product step by step. Great if the product has a technique.",
    stages: ["mof"],
  },
  {
    value: "review",
    label: "Review",
    description:
      "Share your honest opinion after using the product. Best when you've genuinely used it and have real things to say.",
    stages: ["mof"],
  },
  {
    value: "unboxing",
    label: "Unboxing",
    description:
      "Film your first reaction to receiving and opening the product. Works when the packaging or first impression matters.",
    stages: ["mof", "bof"],
  },
  {
    value: "day_in_life",
    label: "Day in my life",
    description:
      "Weave the product into a slice of your daily routine. Best when the product naturally fits a moment in your day.",
    stages: ["tof"],
  },
  {
    value: "reaction",
    label: "Reaction",
    description:
      "React to something: a claim, a review, a competitor, a result. High energy, great for hooks.",
    stages: ["tof", "mof"],
  },
  {
    value: "asmr",
    label: "ASMR",
    description:
      "Close-up, satisfying sounds, slow and sensory. Best for products with great textures, packaging, or application feel.",
    stages: ["tof", "bof"],
  },
  {
    value: "skit",
    label: "Skit",
    description:
      "A short comedic or relatable scenario. Hardest to pull off but highest viral potential if you're naturally funny.",
    stages: ["tof"],
  },
  {
    value: "street_interview",
    label: "Street interview",
    description:
      "Ask real people about the problem or show them the product. You need confidence and a mate to film, but it stops the scroll.",
    stages: ["tof"],
  },
];

// ─── Awareness stage options ─────────────────────────────────────

const STAGE_OPTIONS = [
  {
    value: "tof",
    label: "Most people won't know this product yet",
    description:
      "Your job is to introduce the problem AND the product. The video needs to educate, build curiosity, and make people care before you even mention what it is. This is harder to convert but reaches the biggest audience.",
    tag: "Introducing",
  },
  {
    value: "mof",
    label: "People might have seen this around",
    description:
      "Your audience has heard of the product or the problem. They just haven't tried it yet. Your job is to share your experience and show them what it's actually like. This is where honest, specific videos win.",
    tag: "Sharing experience",
  },
  {
    value: "bof",
    label: "This product is already popular",
    description:
      "Your audience already knows the product. They don't need convincing. They need a nudge. Keep it short, confident, and direct. \"If you know, you know\" energy.",
    tag: "Quick rec",
  },
];

// ─── Tooltip component ───────────────────────────────────────────

function Tooltip({ text }) {
  const [show, setShow] = useState(false);

  return (
    <span className="relative inline-block ml-1">
      <button
        type="button"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onClick={() => setShow(!show)}
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        <HelpCircle className="w-3.5 h-3.5" />
      </button>
      {show && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-3 rounded-lg bg-foreground text-background text-xs leading-relaxed shadow-lg">
          {text}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-foreground" />
        </div>
      )}
    </span>
  );
}

// ─── Character counter ───────────────────────────────────────────

function CharCount({ current, min, max }) {
  const belowMin = min && current < min;
  const nearMax = max && current > max * 0.9;
  const overMax = max && current > max;

  return (
    <div
      className={`text-xs mt-1 text-right ${
        overMax
          ? "text-destructive"
          : belowMin
            ? "text-amber-500"
            : nearMax
              ? "text-amber-500"
              : "text-muted-foreground"
      }`}
    >
      {current}
      {min && current < min && ` / ${min} min`}
      {max && ` / ${max}`}
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────

export default function Block() {
  const user = useCurrentUser();

  // Form state
  const [context, setContext] = useState("");
  const [format, setFormat] = useState("");
  const [stage, setStage] = useState("");
  const [direction, setDirection] = useState("");
  const [step, setStep] = useState(1); // 1 = form, 2 = review, 3 = generating, 4 = done
  const [submissionId, setSubmissionId] = useState(null);

  // Get linked record IDs from the page (hidden fields)
  // These come from item detail blocks on the product page
  const { data: productData } = useLinkedRecords({
    select: q.select({ product_title: "AHF5Y" }),
    field: "Products",
    count: 1,
  });
  const { data: researchData } = useLinkedRecords({
    select: q.select({ research_id: "FhHC7" }),
    field: "Research",
    count: 1,
  });
  const { data: strategyData } = useLinkedRecords({
    select: q.select({ strategy_id: "531z8" }),
    field: "Strategy",
    count: 1,
  });
  const { data: brandData } = useLinkedRecords({
    select: q.select({ brand_name: "eLXLv" }),
    field: "Shop_name",
    count: 1,
  });

  const product = productData?.pages?.flatMap((p) => p.items)?.[0];
  const research = researchData?.pages?.flatMap((p) => p.items)?.[0];
  const strategy = strategyData?.pages?.flatMap((p) => p.items)?.[0];
  const brand = brandData?.pages?.flatMap((p) => p.items)?.[0];

  // Record creation
  const createRecord = useRecordCreate({
    fields: formCreateFields,
    onSuccess: (newRecord) => {
      setSubmissionId(newRecord.id);
      setStep(3);
      toast.success("Generating your script...");
    },
    onError: (error) => {
      toast.error("Something went wrong", { description: error.message });
      setStep(1);
    },
  });

  // Filter formats by selected stage
  const availableFormats = stage
    ? FORMAT_OPTIONS.filter((f) => f.stages.includes(stage))
    : FORMAT_OPTIONS;

  // Reset format if it's no longer available for the selected stage
  useEffect(() => {
    if (stage && format) {
      const stillAvailable = FORMAT_OPTIONS.find(
        (f) => f.value === format && f.stages.includes(stage)
      );
      if (!stillAvailable) {
        setFormat("");
      }
    }
  }, [stage]);

  // Validation
  const contextValid = context.trim().length >= 80;
  const formValid = contextValid && format && stage;

  // Submit handler
  function handleSubmit() {
    if (!formValid) return;

    createRecord.mutate({
      context: context.trim(),
      format: format,
      stage: stage,
      direction: direction.trim() || null,
      product_link: product ? [{ id: product.id }] : null,
      brand_link: brand ? [{ id: brand.id }] : null,
      research_link: research ? [{ id: research.id }] : null,
      strategy_link: strategy ? [{ id: strategy.id }] : null,
      creator_link: user ? [{ id: user.id }] : null,
      generation_status: "Pending",
    });

    setStep(3);
  }

  // ─── Step 1: The Form ──────────────────────────────────────────

  if (step === 1) {
    return (
      <div className="w-full max-w-2xl mx-auto py-6 px-4 space-y-6">
        <div className="text-center space-y-2 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-foreground">
            Generate Your Script & Storyboard
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Tell us about you and how this product fits your life. The AI combines your perspective with our research to write a script that sounds like you.
          </p>
        </div>

        {/* Field 1: Context */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center">
            What's your life like, and where does this product fit in?
            <Tooltip text="The more specific you are about your daily life, the better your script will sound like YOU, not a generic ad. Think about your job, your routine, the moment you'd actually reach for this product." />
          </label>
          <p className="text-xs text-muted-foreground">
            Great answers include who you are, what your day looks like, and the specific moment this product matters. This is what makes your video feel real. Viewers buy from people whose lives look like theirs.
          </p>
          <Textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder='e.g. "I\'m a teaching assistant and a mum of two. My mornings are chaos — I\'ve got about 4 minutes between getting the kids dressed and running out the door. I need skincare that actually works but doesn\'t need 10 steps. I usually do my whole routine while the kettle boils."'
            rows={5}
            className={`resize-none ${
              context.length > 0 && !contextValid
                ? "border-amber-400 focus-visible:ring-amber-400"
                : ""
            }`}
          />
          <div className="flex items-center justify-between">
            {context.length > 0 && !contextValid && (
              <p className="text-xs text-amber-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                Keep going. The more detail, the better your script.
              </p>
            )}
            {contextValid && (
              <p className="text-xs text-green-600 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Great detail.
              </p>
            )}
            <CharCount current={context.length} min={80} />
          </div>
        </div>

        {/* Field 2: Awareness Stage (asked BEFORE format so it can filter) */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center">
            How much does your audience already know about this product?
            <Tooltip text="This is one of the most important decisions in any ad. A video introducing something brand new needs a completely different structure to one where the product is already everywhere. Getting this right is what separates top affiliates from everyone else." />
          </label>
          <p className="text-xs text-muted-foreground">
            You can make multiple videos for the same product at different levels. Top affiliates do this to reach different audiences with the same product.
          </p>
          <div className="space-y-2">
            {STAGE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setStage(opt.value)}
                className={`w-full text-left p-3 rounded-lg border transition-all ${
                  stage === opt.value
                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                    : "border-border hover:border-primary/50 hover:bg-muted/30"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground">
                    {opt.label}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {opt.tag}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {opt.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Field 3: Format (filtered by stage) */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center">
            What type of video do you want to film?
            <Tooltip text="Pick the format you're most comfortable with. There's no wrong answer. Each format works differently and your script will be tailored to match. If you're not sure, 'Talking to camera' is the easiest to start with." />
          </label>
          <p className="text-xs text-muted-foreground">
            This decides your shot types, pacing, and how the script is structured. Pick what feels natural for you.
            {stage && (
              <span className="text-primary font-medium">
                {" "}
                Showing formats that work best for your chosen audience level.
              </span>
            )}
          </p>
          <Select value={format} onValueChange={setFormat}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a video format..." />
            </SelectTrigger>
            <SelectContent>
              {availableFormats.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  <div className="py-1">
                    <span className="font-medium">{opt.label}</span>
                    <span className="text-xs text-muted-foreground ml-2">
                      {opt.description.split(".")[0]}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {stage && availableFormats.length < FORMAT_OPTIONS.length && (
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Info className="w-3 h-3" />
              {FORMAT_OPTIONS.length - availableFormats.length} formats hidden because they don't match your audience level. "Talking to camera" always works.
            </p>
          )}
        </div>

        {/* Field 4: Direction (optional) */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center">
            What's your vision for this video?
            <span className="text-xs text-muted-foreground font-normal ml-2">
              Optional
            </span>
            <Tooltip text="This is your space to shape the script. The AI will use everything you write here alongside your profile and the product research to create something that sounds like you. Nothing here is mandatory, but the more you share, the more personal the result." />
          </label>
          <p className="text-xs text-muted-foreground">
            Think about: a personal story with this product, a specific result you've had, something you want to say, a vibe or energy you're going for, or anything you want the script to avoid.
          </p>
          <Textarea
            value={direction}
            onChange={(e) =>
              setDirection(e.target.value.slice(0, 500))
            }
            placeholder='e.g. "I actually bought this for my mum first and she wouldn\'t stop talking about it, so I tried it myself. I want the video to start with that story. Keep it relaxed and chatty — I don\'t want to sound like I\'m selling."'
            rows={3}
            className="resize-none"
          />
          <CharCount current={direction.length} max={500} />
        </div>

        {/* Submit */}
        <div className="pt-4">
          <Button
            onClick={() => setStep(2)}
            disabled={!formValid}
            size="lg"
            className="w-full"
          >
            Review & Generate
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
          {!formValid && context.length > 0 && (
            <p className="text-xs text-muted-foreground text-center mt-2">
              {!contextValid && "Add more detail about your life and this product. "}
              {!stage && "Choose an audience level. "}
              {!format && stage && "Pick a video format."}
            </p>
          )}
        </div>
      </div>
    );
  }

  // ─── Step 2: Review before generating ──────────────────────────

  if (step === 2) {
    const selectedFormat = FORMAT_OPTIONS.find((f) => f.value === format);
    const selectedStage = STAGE_OPTIONS.find((s) => s.value === stage);

    return (
      <div className="w-full max-w-2xl mx-auto py-6 px-4 space-y-6">
        <div className="text-center space-y-2 mb-6">
          <h2 className="text-xl font-bold text-foreground">
            Review Your Choices
          </h2>
          <p className="text-sm text-muted-foreground">
            Check everything looks right before we generate your script.
          </p>
        </div>

        <div className="rounded-xl border bg-card divide-y">
          {/* Context */}
          <div className="p-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
              Your life & this product
            </p>
            <p className="text-sm text-foreground leading-relaxed">{context}</p>
          </div>

          {/* Stage */}
          <div className="p-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
              Audience level
            </p>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {selectedStage?.tag}
              </Badge>
              <p className="text-sm text-foreground">{selectedStage?.label}</p>
            </div>
          </div>

          {/* Format */}
          <div className="p-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
              Video format
            </p>
            <p className="text-sm text-foreground">{selectedFormat?.label}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {selectedFormat?.description}
            </p>
          </div>

          {/* Direction */}
          {direction.trim() && (
            <div className="p-4">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                Your creative direction
              </p>
              <p className="text-sm text-foreground leading-relaxed">
                {direction}
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setStep(1)}
            className="flex-1"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Edit
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={createRecord.isPending}
            className="flex-1"
          >
            {createRecord.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-1" />
                Generate My Script
              </>
            )}
          </Button>
        </div>
      </div>
    );
  }

  // ─── Step 3: Generating ────────────────────────────────────────

  if (step === 3) {
    return (
      <div className="w-full max-w-2xl mx-auto py-16 px-4 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
        <h2 className="text-xl font-bold text-foreground">
          Writing your script...
        </h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          The AI is combining your profile, your answers, and our product research to create a personalised script and storyboard. This usually takes 30-60 seconds.
        </p>
        <div className="flex items-center justify-center gap-2 pt-4">
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0s" }} />
            <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.2s" }} />
            <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.4s" }} />
          </div>
        </div>
      </div>
    );
  }

  // ─── Step 4: Done ──────────────────────────────────────────────

  if (step === 4) {
    return (
      <div className="w-full max-w-2xl mx-auto py-16 px-4 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-xl font-bold text-foreground">
          Your script is ready!
        </h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Scroll down to see your personalised script and frame-by-frame storyboard.
        </p>
        <Button
          variant="outline"
          onClick={() => {
            setStep(1);
            setContext("");
            setFormat("");
            setStage("");
            setDirection("");
          }}
          className="mt-4"
        >
          Generate another version
        </Button>
      </div>
    );
  }

  return null;
}
