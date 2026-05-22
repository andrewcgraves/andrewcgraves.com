import { describe, it, expect, vi, beforeEach } from "vitest";
import fs from "fs";
import { getAllProjects, getProjectBySlug, getAllProjectSlugs } from "../../lib/projects";

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

const FAKE_MD = (year: number, title: string) => `---
title: ${title}
year: ${year}
kind: Engineering
blurb: A test project
color: "#FF0000"
cover:
  src: https://example.com/cover.jpg
gallery:
  - src: https://example.com/img.jpg
    caption: A photo
    width: 800
    height: 600
---

Project content here.
`;

beforeEach(() => {
  vi.resetAllMocks();
});

describe("getAllProjects", () => {
  it("returns an empty array when no markdown files exist", () => {
    mockFs.readdirSync.mockReturnValue([] as never);

    expect(getAllProjects()).toEqual([]);
  });

  it("parses and returns projects sorted by year descending", () => {
    mockFs.readdirSync.mockReturnValue(["alpha.md", "beta.md"] as never);
    mockFs.readFileSync
      .mockReturnValueOnce(FAKE_MD(2021, "Alpha") as never)
      .mockReturnValueOnce(FAKE_MD(2023, "Beta") as never);

    const projects = getAllProjects();

    expect(projects).toHaveLength(2);
    expect(projects[0].title).toBe("Beta");
    expect(projects[0].year).toBe(2023);
    expect(projects[1].title).toBe("Alpha");
    expect(projects[1].year).toBe(2021);
  });

  it("filters out non-markdown files", () => {
    mockFs.readdirSync.mockReturnValue(["project.md", "README.txt", ".DS_Store"] as never);
    mockFs.readFileSync.mockReturnValue(FAKE_MD(2022, "Only") as never);

    const projects = getAllProjects();

    expect(projects).toHaveLength(1);
  });

  it("uses sensible defaults for missing frontmatter fields", () => {
    mockFs.readdirSync.mockReturnValue(["minimal.md"] as never);
    mockFs.readFileSync.mockReturnValue("---\n---\nContent." as never);

    const [project] = getAllProjects();

    expect(project.year).toBe(0);
    expect(project.kind).toBe("");
    expect(project.title).toBe("");
    expect(project.blurb).toBe("");
    expect(project.color).toBe("#888888");
    expect(project.gallery).toEqual([]);
  });

  it("sets the slug from the filename without extension", () => {
    mockFs.readdirSync.mockReturnValue(["my-project.md"] as never);
    mockFs.readFileSync.mockReturnValue(FAKE_MD(2022, "My Project") as never);

    const [project] = getAllProjects();

    expect(project.slug).toBe("my-project");
  });

  it("includes the markdown body as content", () => {
    mockFs.readdirSync.mockReturnValue(["post.md"] as never);
    mockFs.readFileSync.mockReturnValue(FAKE_MD(2022, "Post") as never);

    const [project] = getAllProjects();

    expect(project.content).toContain("Project content here.");
  });
});

describe("getProjectBySlug", () => {
  it("returns null when the file does not exist", () => {
    mockFs.existsSync.mockReturnValue(false as never);

    expect(getProjectBySlug("nonexistent")).toBeNull();
  });

  it("returns the parsed project when the file exists", () => {
    mockFs.existsSync.mockReturnValue(true as never);
    mockFs.readFileSync.mockReturnValue(FAKE_MD(2022, "Found It") as never);

    const project = getProjectBySlug("found-it");

    expect(project).not.toBeNull();
    expect(project!.slug).toBe("found-it");
    expect(project!.title).toBe("Found It");
    expect(project!.year).toBe(2022);
    // verify the correct file path was constructed
    expect(mockFs.readFileSync).toHaveBeenCalledWith(
      expect.stringContaining("found-it.md"),
      "utf-8"
    );
  });
});

describe("getAllProjectSlugs", () => {
  it("returns slugs without .md extension", () => {
    mockFs.readdirSync.mockReturnValue(["project-a.md", "project-b.md"] as never);

    expect(getAllProjectSlugs()).toEqual(["project-a", "project-b"]);
  });

  it("returns an empty array when the directory is empty", () => {
    mockFs.readdirSync.mockReturnValue([] as never);

    expect(getAllProjectSlugs()).toEqual([]);
  });

  it("filters out non-markdown files from the slug list", () => {
    mockFs.readdirSync.mockReturnValue(["post.md", "image.png"] as never);

    expect(getAllProjectSlugs()).toEqual(["post"]);
  });
});
