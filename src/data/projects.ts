export type BodyBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "image"; src?: string; slot?: string; caption?: string; aspect?: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] };

export interface GalleryPhoto {
  src?: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface ProjectEntry {
  slug: string;
  year: number;
  kind: string;
  title: string;
  blurb: string;
  color: string;
  cover?: { src?: string };
  body: BodyBlock[];
  gallery: GalleryPhoto[];
}

export const PROJECTS: ProjectEntry[] = [
  {
    slug: "example-project",
    year: 2025,
    kind: "Project",
    title: "Example project",
    blurb:
      "This is a placeholder. Replace this entry with your real project — fill in the title, blurb, body blocks, and gallery photos.",
    color: "#E1665B",
    body: [
      {
        type: "p",
        text: "This is the opening paragraph of the project writeup. It sets the scene — what you were trying to do, why it mattered, and what the reader is about to learn. Keep it short: two or three sentences is usually enough to earn the scroll.",
      },
      {
        type: "p",
        text: "A second paragraph continues the thought. This is a good place to add context that didn't fit in the blurb — the constraint you were working under, the material you were using, or the problem that made the project interesting in the first place.",
      },
      {
        type: "h2",
        text: "A section heading",
      },
      {
        type: "p",
        text: "Body paragraphs sit in a single 680px column at a comfortable reading width. Long sentences breathe; short ones land. You can use as many paragraphs as you need — the layout adapts.",
      },
      {
        type: "image",
        slot: "inline",
        caption:
          "Inline images break out to 880px and sit centered across the column. Drop a real src here when you have photography.",
      },
      {
        type: "p",
        text: "The paragraph after an image picks up where you left off. The caption gives the reader something to orient to — what they're looking at, when it was taken, what it shows.",
      },
      {
        type: "quote",
        text: "A pull quote sits here. Use it for a line worth repeating — a constraint, an observation, or a decision that shaped the work.",
      },
      {
        type: "h2",
        text: "Another section",
      },
      {
        type: "p",
        text: "Continue the writeup. Add as many sections as the project warrants — no more, no fewer.",
      },
      {
        type: "list",
        items: [
          "A bulleted list works well for things you'd do differently, gear lists, materials used, or lessons learned.",
          "Each item should be a complete thought — a sentence, not a fragment.",
          "Three to five items is usually the right length.",
        ],
      },
    ],
    gallery: [
      { caption: "Photo one — add a src URL when you have real images." },
      { caption: "Photo two." },
      { caption: "Photo three." },
      { caption: "Photo four." },
    ],
  },
];
