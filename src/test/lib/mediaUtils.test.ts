import { describe, it, expect } from "vitest";
import { isVideoUrl, getVideoEmbedUrl } from "../../lib/mediaUtils";

describe("isVideoUrl", () => {
  it("returns true for .mp4 URLs", () => {
    expect(isVideoUrl("https://example.com/video.mp4")).toBe(true);
  });

  it("returns true for .webm URLs", () => {
    expect(isVideoUrl("https://example.com/clip.webm")).toBe(true);
  });

  it("returns true for .mov URLs", () => {
    expect(isVideoUrl("https://example.com/file.mov")).toBe(true);
  });

  it("returns true for .ogg URLs", () => {
    expect(isVideoUrl("https://example.com/audio.ogg")).toBe(true);
  });

  it("returns true for video URLs with query strings", () => {
    expect(isVideoUrl("https://example.com/video.mp4?token=abc")).toBe(true);
  });

  it("returns false for image URLs", () => {
    expect(isVideoUrl("https://example.com/photo.jpg")).toBe(false);
  });

  it("returns false for YouTube URLs", () => {
    expect(isVideoUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ")).toBe(false);
  });

  it("is case-insensitive", () => {
    expect(isVideoUrl("https://example.com/VIDEO.MP4")).toBe(true);
  });
});

describe("getVideoEmbedUrl", () => {
  describe("YouTube URLs", () => {
    it("handles youtube.com/watch?v= format", () => {
      expect(getVideoEmbedUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ")).toBe(
        "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"
      );
    });

    it("handles youtu.be/ short format", () => {
      expect(getVideoEmbedUrl("https://youtu.be/dQw4w9WgXcQ")).toBe(
        "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"
      );
    });

    it("handles youtube.com/embed/ format", () => {
      expect(getVideoEmbedUrl("https://www.youtube.com/embed/dQw4w9WgXcQ")).toBe(
        "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"
      );
    });

    it("rejects malformed YouTube URLs", () => {
      expect(getVideoEmbedUrl("https://www.youtube.com/watch?v=tooshort")).toBeNull();
    });
  });

  describe("Vimeo URLs", () => {
    it("handles vimeo.com/:id format", () => {
      expect(getVideoEmbedUrl("https://vimeo.com/123456789")).toBe(
        "https://player.vimeo.com/video/123456789"
      );
    });
  });

  describe("non-embed URLs", () => {
    it("returns null for plain image URLs", () => {
      expect(getVideoEmbedUrl("https://example.com/photo.jpg")).toBeNull();
    });

    it("returns null for direct video file URLs", () => {
      expect(getVideoEmbedUrl("https://example.com/video.mp4")).toBeNull();
    });
  });
});
