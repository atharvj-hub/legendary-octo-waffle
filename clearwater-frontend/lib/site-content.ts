export type SiteStat = {
  value: string;
  label: string;
  detail: string;
};

export type DetailSection = {
  title: string;
  body: string;
  bullets: string[];
};

export type DetailPage = {
  slug: string;
  navLabel: string;
  eyebrow: string;
  title: string;
  intro: string;
  summary: string;
  stats: SiteStat[];
  sections: DetailSection[];
};

export const homeStats: SiteStat[] = [
  {
    value: "2 stages",
    label: "Core pipeline",
    detail: "Enhancement restores the frame for display while detection stays on the raw source.",
  },
  {
    value: "7 passes",
    label: "Enhancement depth",
    detail: "Color correction, local contrast, dehazing, sharpening, denoising, and saturation recovery.",
  },
  {
    value: "15 classes",
    label: "Detection scope",
    detail: "Custom YOLO species labels with post-processing built for underwater false positives.",
  },
  {
    value: "Late MVP",
    label: "Current maturity",
    detail: "Strong CV logic, but still missing tests, API endpoints, and production-grade observability.",
  },
];

export const pipelineSteps = [
  {
    step: "01",
    title: "Input",
    body: "Raw underwater imagery enters untouched so the pipeline can preserve scientific fidelity.",
  },
  {
    step: "02",
    title: "Enhancement",
    body: "The frame is restored through a seven-stage stack with an optional neural enhancement slot.",
  },
  {
    step: "03",
    title: "Detection",
    body: "YOLO runs on the original image using full-frame and tiled passes to recover small objects.",
  },
  {
    step: "04",
    title: "Output",
    body: "The system returns a comparison image, detections, and object-level metrics for review.",
  },
];

export const frontendPhases = [
  {
    title: "Now",
    body: "Clean PRD-driven navigation, stable interactions, and a route structure we can keep when the backend arrives.",
  },
  {
    title: "Next",
    body: "Wire upload, processing, result, and error states to a backend job API instead of local demo state.",
  },
  {
    title: "Later",
    body: "Refine motion, typography, and branded visuals after the data contract and screen flow are locked down.",
  },
];

export const detailPages: DetailPage[] = [
  {
    slug: "architecture",
    navLabel: "Architecture",
    eyebrow: "System map",
    title: "The product is a two-stage underwater vision pipeline.",
    intro:
      "The PRD describes a research-grade computer vision stack with a clear split between image enhancement and marine object detection.",
    summary:
      "This page captures how the current Python project is structured and what the frontend should assume when we wire it to a backend service.",
    stats: [
      {
        value: "738 LOC",
        label: "Source footprint",
        detail: "Most of the logic lives in main.py, enhance.py, and ssuie_arch.py.",
      },
      {
        value: "3 models",
        label: "External weights",
        detail: "YOLO is required while SS-UIE and WaterNet are optional enhancement accelerators.",
      },
      {
        value: "6 images",
        label: "Test inputs",
        detail: "The sample repo currently ships with a small folder of underwater examples.",
      },
      {
        value: "9 commits",
        label: "Build window",
        detail: "The report shows a short academic development burst over roughly five active days.",
      },
    ],
    sections: [
      {
        title: "High-level system",
        body:
          "The pipeline starts from raw underwater imagery, runs an enhancement branch for visual recovery, and keeps detection on the original image to avoid artifact-driven boxes.",
        bullets: [
          "Stage 1 enhancement produces a restored frame for human review and comparison output.",
          "Stage 2 detection performs species localization on the raw frame with a custom YOLO model.",
          "Final output combines side-by-side imagery with structured terminal metrics for each detection.",
        ],
      },
      {
        title: "Code structure reality",
        body:
          "The PRD shows a focused research repository rather than a productized service, so the frontend should expect backend adaptation work before any real integration.",
        bullets: [
          "main.py orchestrates detection, visualization, and metric printing.",
          "enhance.py owns the seven-stage restoration path plus neural model loading.",
          "ssuie_arch.py reconstructs the SS-UIE network and config.py is currently dead code.",
        ],
      },
      {
        title: "Product maturity",
        body:
          "The report rates the project at late MVP or early beta. The algorithms are strong; the infrastructure is not.",
        bullets: [
          "Testing, CI, API design, logging, and containerization are still missing.",
          "The source reportedly contains unresolved merge markers and unused configuration paths.",
          "Graceful degradation is already a strength because enhancement can fall back to classical methods.",
        ],
      },
    ],
  },
  {
    slug: "enhancement",
    navLabel: "Enhancement",
    eyebrow: "Stage 1",
    title: "Enhancement is a seven-stage restoration pass with adaptive tuning.",
    intro:
      "The PRD frames enhancement as a display-first recovery pipeline that compensates for underwater absorption, scattering, and low illumination.",
    summary:
      "This page is the source of truth for how we describe restoration in the UI before the model output is available live.",
    stats: [
      {
        value: "7 stages",
        label: "Sequential steps",
        detail: "The pipeline chains color correction, contrast, dehazing, sharpening, denoising, and saturation recovery.",
      },
      {
        value: "60/40",
        label: "Neural fusion",
        detail: "When a neural model is available, the restored output is blended with the LAB-corrected base.",
      },
      {
        value: "3 scales",
        label: "MSR fallback",
        detail: "Retinex fallback uses multi-scale log-domain illumination recovery when neural models are absent.",
      },
      {
        value: "25%",
        label: "Safety floor",
        detail: "If the result becomes too dark, the original frame is returned instead.",
      },
    ],
    sections: [
      {
        title: "Adaptive cast detection",
        body:
          "The pipeline estimates blue and green cast intensity relative to the red channel and uses that value to tune correction strength throughout the stack.",
        bullets: [
          "Red is the reference because it attenuates first underwater.",
          "Higher cast increases LAB chroma correction and saturation recovery strength.",
          "This keeps the pipeline aggressive on damaged frames without overcorrecting clearer ones.",
        ],
      },
      {
        title: "Seven enhancement stages",
        body:
          "Enhancement progresses from color normalization into local contrast and then into cleanup passes that restore a usable frame.",
        bullets: [
          "LAB chrominance correction neutralizes green and blue drift.",
          "CLAHE plus adaptive gamma lifts dark scenes without flattening bright scenes.",
          "Guided dehazing, unsharp masking, and bilateral denoising recover detail while controlling artifacts.",
        ],
      },
      {
        title: "Neural slot and fallback logic",
        body:
          "The PRD makes clear that neural enhancement is optional. The classical path is not a failure mode; it is an explicit fallback.",
        bullets: [
          "SS-UIE or WaterNet can supply a neural candidate that blends back into the classical base image.",
          "Multi-Scale Retinex fills the same slot when deep weights are unavailable.",
          "A final brightness guard returns the original if the restoration pipeline materially harms the frame.",
        ],
      },
    ],
  },
  {
    slug: "detection",
    navLabel: "Detection",
    eyebrow: "Stage 2",
    title: "Detection uses a two-pass YOLO strategy tuned for underwater scenes.",
    intro:
      "The detector is designed to recover both full-frame objects and small species that disappear when a large image is compressed to a single 640px inference pass.",
    summary:
      "This is the detection behavior the frontend should explain and later surface in a result panel.",
    stats: [
      {
        value: "640 px",
        label: "Base inference size",
        detail: "The detector uses a standard YOLO image size for both full-frame and tiled passes.",
      },
      {
        value: "20%",
        label: "Tile overlap",
        detail: "Overlap reduces missed detections at tile edges before post-processing collapse.",
      },
      {
        value: "0.15",
        label: "Confidence floor",
        detail: "The configuration favors recall and cleans noise later with geometry filters and NMS.",
      },
      {
        value: "2x NMS",
        label: "Post-processing",
        detail: "Per-class and cross-class suppression remove both duplicates and generic-vs-specific conflicts.",
      },
    ],
    sections: [
      {
        title: "Two-pass inference",
        body:
          "The detector first sees the whole frame, then re-runs inference over overlapping tiles to recover smaller fish and species details.",
        bullets: [
          "Full-frame inference handles larger objects and overall scene context.",
          "Tiled inference improves recall when small objects would shrink below the detector threshold.",
          "Tile coordinates are remapped back to the original frame before post-processing.",
        ],
      },
      {
        title: "Validity filtering and NMS",
        body:
          "The PRD uses geometry rules before suppression so obvious nonsense boxes are discarded before overlap resolution begins.",
        bullets: [
          "Boxes must pass minimum area, maximum frame fraction, and maximum aspect-ratio checks.",
          "Per-class NMS removes duplicate boxes for the same label across overlapping tiles.",
          "Cross-class NMS lets specific species labels beat generic fish labels when both fire on the same object.",
        ],
      },
      {
        title: "Output format",
        body:
          "Detection results already have a clear presentation model even though the current project only prints them in the terminal.",
        bullets: [
          "Each object carries confidence, area, diameter, and circularity-style shape measurements.",
          "The compare image overlays detections on both the raw and enhanced views.",
          "Because detection stays on the raw frame, UI copy should never imply boxes are generated from the restored image.",
        ],
      },
    ],
  },
  {
    slug: "integration",
    navLabel: "Integration",
    eyebrow: "Next phase",
    title: "Frontend integration should wrap the current CLI pipeline behind a stable job API.",
    intro:
      "The PRD does not define a web backend, so this page turns the report into a practical frontend contract for the next phase.",
    summary:
      "These are the interfaces and states we should build against before investing in heavier visual polish.",
    stats: [
      {
        value: "5 states",
        label: "UI flow",
        detail: "Idle, uploading, queued, processing, and result should be first-class states in the frontend.",
      },
      {
        value: "4 endpoints",
        label: "API surface",
        detail: "A minimal backend can be framed around job creation, status, result fetch, and system health.",
      },
      {
        value: "1 source",
        label: "Truth model",
        detail: "The frontend should render from structured pipeline metadata rather than ad-hoc scene copy.",
      },
      {
        value: "3 blockers",
        label: "Backend prep",
        detail: "API layer, logging, and tests need attention before production wiring is safe.",
      },
    ],
    sections: [
      {
        title: "Recommended API contract",
        body:
          "The current Python stack should sit behind a job-oriented interface so the frontend can remain asynchronous and resilient.",
        bullets: [
          "POST /api/v1/runs should accept an image upload and return a run id plus initial status.",
          "GET /api/v1/runs/:id should return stage, progress, model availability, and any processing warnings.",
          "GET /api/v1/runs/:id/result should return enhanced image URLs, compare image URLs, detections, and metrics.",
        ],
      },
      {
        title: "Frontend states to preserve",
        body:
          "The UI should be explicit about what is happening rather than pretending the full system is already live.",
        bullets: [
          "Show whether neural enhancement is available or whether classical fallback was used.",
          "Keep raw-image detection and restored-image display as separate concepts in the result view.",
          "Expose failure and degraded-mode states so backend issues do not silently collapse into empty screens.",
        ],
      },
      {
        title: "Backend cleanup before wiring",
        body:
          "The report identifies a few concrete issues that should be addressed before the service boundary is formalized.",
        bullets: [
          "Resolve source merge markers and remove dead configuration paths.",
          "Add structured logging plus at least a smoke-test layer around enhancement and NMS behavior.",
          "Wrap the current CLI pipeline in a backend service without changing the underlying PRD semantics.",
        ],
      },
    ],
  },
];

export function getDetailPage(slug: string) {
  return detailPages.find((page) => page.slug === slug);
}
