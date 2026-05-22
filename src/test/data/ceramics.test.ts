import { describe, it, expect } from "vitest";
import { CERAMICS_SERIES } from "../../data/ceramics";

describe("CERAMICS_SERIES", () => {
  it("contains the expected series in order", () => {
    const slugs = CERAMICS_SERIES.map((s) => s.slug);
    expect(slugs).toContain("espresso-mugs-01");
    expect(slugs).toContain("taped-mugs-01");
    expect(slugs).toContain("ramen-bowls-02");
    expect(slugs).toContain("misc-pieces");
  });

  it("has no duplicate slugs", () => {
    const slugs = CERAMICS_SERIES.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  describe("espresso-mugs-01", () => {
    const series = CERAMICS_SERIES.find((s) => s.slug === "espresso-mugs-01")!;

    it("has correct metadata", () => {
      expect(series.title).toBe("Espresso Mugs");
      expect(series.material).toBe("stonewear (LBC)");
      expect(series.year).toBe("2026");
      expect(series.status).toBe("complete");
    });

    it("has 6 photos each with valid dimensions", () => {
      expect(series.photos).toHaveLength(6);
      for (const photo of series.photos) {
        expect(photo.src).toBeTruthy();
        expect(photo.width).toBeGreaterThan(0);
        expect(photo.height).toBeGreaterThan(0);
      }
    });

    it("has a non-empty longread", () => {
      expect(series.longread.length).toBeGreaterThan(0);
    });
  });

  describe("taped-mugs-01", () => {
    const series = CERAMICS_SERIES.find((s) => s.slug === "taped-mugs-01")!;

    it("has correct metadata", () => {
      expect(series.title).toBe("Taped Tea Mugs");
      expect(series.year).toBe("2025");
      expect(series.status).toBe("complete");
    });

    it("has 10 photos", () => {
      expect(series.photos).toHaveLength(10);
    });
  });

  describe("ramen-bowls-02", () => {
    const series = CERAMICS_SERIES.find((s) => s.slug === "ramen-bowls-02")!;

    it("has correct metadata", () => {
      expect(series.title).toBe("Ramen Bowls");
      expect(series.material).toBe("porcelain");
      expect(series.year).toBe("2025");
    });

    it("has 7 photos", () => {
      expect(series.photos).toHaveLength(7);
    });
  });

  describe("misc-pieces", () => {
    const series = CERAMICS_SERIES.find((s) => s.slug === "misc-pieces")!;

    it("has correct metadata", () => {
      expect(series.title).toBe("Misc Pieces");
      expect(series.material).toBe("various");
      expect(series.status).toBe("complete");
    });

    it("intentionally has an empty longread array", () => {
      expect(series.longread).toEqual([]);
    });

    it("has 6 photos", () => {
      expect(series.photos).toHaveLength(6);
    });
  });
});
