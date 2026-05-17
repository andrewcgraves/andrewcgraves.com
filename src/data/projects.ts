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
  gallery: GalleryPhoto[];
  content: string;
}
