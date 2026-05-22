export interface Photo {
  src: string;
  width: number;
  height: number;
}

export interface Series {
  slug: string;
  order?: number;
  title: string;
  material: string;
  year: string;
  status: "complete" | "in-progress";
  content: string;
  tagline: string;
  photos: Photo[];
}
