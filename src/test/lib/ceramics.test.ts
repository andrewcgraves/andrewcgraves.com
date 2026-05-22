import { describe, it, expect, vi, beforeEach } from "vitest";
import fs from "fs";
import { getAllSeries, getSeriesBySlug, getAllSeriesSlugs } from "../../lib/ceramics";

vi.mock("fs", () => {
  const readdirSync = vi.fn();
  const readFileSync = vi.fn();
  const existsSync = vi.fn();
  return {
    default: { readdirSync, readFileSync, existsSync },
    readdirSync,
    readFileSync,
    existsSync,
  };
});

const mockFs = vi.mocked(fs);

const FAKE_MD = (year: string, title: string, material = "porcelain", content = "") => `---
title: ${title}
material: ${material}
year: "${year}"
status: complete
tagline: A test tagline
photos:
  - src: https://example.com/photo.jpg
    width: 6240
    height: 4160
---
${content}`;

const FAKE_MD_MULTI_PARA = `---
title: Multi Para
material: stoneware
year: "2025"
status: complete
tagline: A series with prose
photos:
  - src: https://example.com/photo.jpg
    width: 800
    height: 600
---

First paragraph.

Second paragraph.
`;

beforeEach(() => {
  vi.resetAllMocks();
});

describe("getAllSeries", () => {
  it("returns an empty array when no markdown files exist", () => {
    mockFs.readdirSync.mockReturnValue([] as never);

    expect(getAllSeries()).toEqual([]);
  });

  it("parses and returns series sorted by year descending", () => {
    mockFs.readdirSync.mockReturnValue(["alpha.md", "beta.md"] as never);
    mockFs.readFileSync
      .mockReturnValueOnce(FAKE_MD("2023", "Alpha") as never)
      .mockReturnValueOnce(FAKE_MD("2025", "Beta") as never);

    const result = getAllSeries();

    expect(result).toHaveLength(2);
    expect(result[0].title).toBe("Beta");
    expect(result[0].year).toBe("2025");
    expect(result[1].title).toBe("Alpha");
    expect(result[1].year).toBe("2023");
  });

  it("filters out non-markdown files", () => {
    mockFs.readdirSync.mockReturnValue(["series.md", "README.txt", ".DS_Store"] as never);
    mockFs.readFileSync.mockReturnValue(FAKE_MD("2025", "Only") as never);

    expect(getAllSeries()).toHaveLength(1);
  });

  it("uses sensible defaults for missing frontmatter fields", () => {
    mockFs.readdirSync.mockReturnValue(["minimal.md"] as never);
    mockFs.readFileSync.mockReturnValue("---\n---\n" as never);

    const [s] = getAllSeries();

    expect(s.title).toBe("");
    expect(s.material).toBe("");
    expect(s.year).toBe("");
    expect(s.status).toBe("complete");
    expect(s.tagline).toBe("");
    expect(s.content).toBe("");
    expect(s.photos).toEqual([]);
  });

  it("sets the slug from the filename without extension", () => {
    mockFs.readdirSync.mockReturnValue(["espresso-mugs-01.md"] as never);
    mockFs.readFileSync.mockReturnValue(FAKE_MD("2026", "Espresso Mugs") as never);

    const [s] = getAllSeries();

    expect(s.slug).toBe("espresso-mugs-01");
  });

  it("trims and stores the markdown body as content", () => {
    mockFs.readdirSync.mockReturnValue(["series.md"] as never);
    mockFs.readFileSync.mockReturnValue(FAKE_MD_MULTI_PARA as never);

    const [s] = getAllSeries();

    expect(s.content).toContain("First paragraph.");
    expect(s.content).toContain("Second paragraph.");
  });

  it("returns empty string content when body is absent", () => {
    mockFs.readdirSync.mockReturnValue(["misc.md"] as never);
    mockFs.readFileSync.mockReturnValue(FAKE_MD("2023", "Misc", "various") as never);

    const [s] = getAllSeries();

    expect(s.content).toBe("");
  });

  it("coerces numeric year values from YAML to strings", () => {
    mockFs.readdirSync.mockReturnValue(["series.md"] as never);
    mockFs.readFileSync.mockReturnValue(
      "---\ntitle: Test\nyear: 2025\nstatus: complete\nphotos: []\n---\n" as never
    );

    const [s] = getAllSeries();

    expect(typeof s.year).toBe("string");
    expect(s.year).toBe("2025");
  });
});

describe("getSeriesBySlug", () => {
  it("returns null when the file does not exist", () => {
    mockFs.existsSync.mockReturnValue(false as never);

    expect(getSeriesBySlug("nonexistent")).toBeNull();
  });

  it("returns the parsed series when the file exists", () => {
    mockFs.existsSync.mockReturnValue(true as never);
    mockFs.readFileSync.mockReturnValue(FAKE_MD("2025", "Found It") as never);

    const series = getSeriesBySlug("found-it");

    expect(series).not.toBeNull();
    expect(series!.slug).toBe("found-it");
    expect(series!.title).toBe("Found It");
    expect(mockFs.readFileSync).toHaveBeenCalledWith(
      expect.stringContaining("found-it.md"),
      "utf-8"
    );
  });
});

describe("getAllSeriesSlugs", () => {
  it("returns slugs without .md extension", () => {
    mockFs.readdirSync.mockReturnValue(["espresso-mugs-01.md", "ramen-bowls-02.md"] as never);

    expect(getAllSeriesSlugs()).toEqual(["espresso-mugs-01", "ramen-bowls-02"]);
  });

  it("returns an empty array when the directory is empty", () => {
    mockFs.readdirSync.mockReturnValue([] as never);

    expect(getAllSeriesSlugs()).toEqual([]);
  });

  it("filters out non-markdown files from the slug list", () => {
    mockFs.readdirSync.mockReturnValue(["series.md", "image.png"] as never);

    expect(getAllSeriesSlugs()).toEqual(["series"]);
  });
});
