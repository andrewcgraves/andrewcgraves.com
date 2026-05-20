import { describe, it, expect } from "vitest";
import { CERAMICS_SERIES, Series, Photo } from "../../data/ceramics";

describe("CERAMICS_SERIES", () => {
  it("is a non-empty array", () => {
    expect(Array.isArray(CERAMICS_SERIES)).toBe(true);
    expect(CERAMICS_SERIES.length).toBeGreaterThan(0);
  });

  it("every series has required string fields", () => {
    for (const series of CERAMICS_SERIES) {
      expect(typeof series.slug).toBe("string");
      expect(series.slug.length).toBeGreaterThan(0);

      expect(typeof series.title).toBe("string");
      expect(series.title.length).toBeGreaterThan(0);

      expect(typeof series.material).toBe("string");
      expect(typeof series.year).toBe("string");
      expect(typeof series.tagline).toBe("string");
    }
  });

  it("every series has a valid status", () => {
    const validStatuses: Series["status"][] = ["complete", "in-progress"];
    for (const series of CERAMICS_SERIES) {
      expect(validStatuses).toContain(series.status);
    }
  });

  it("every series has a photos array", () => {
    for (const series of CERAMICS_SERIES) {
      expect(Array.isArray(series.photos)).toBe(true);
    }
  });

  it("every photo has a non-empty src and positive dimensions", () => {
    for (const series of CERAMICS_SERIES) {
      for (const photo of series.photos) {
        expect(typeof photo.src).toBe("string");
        expect(photo.src.length).toBeGreaterThan(0);
        expect(photo.width).toBeGreaterThan(0);
        expect(photo.height).toBeGreaterThan(0);
      }
    }
  });

  it("every series has a longread array", () => {
    for (const series of CERAMICS_SERIES) {
      expect(Array.isArray(series.longread)).toBe(true);
    }
  });

  it("has unique slugs", () => {
    const slugs = CERAMICS_SERIES.map((s) => s.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);
  });
});
