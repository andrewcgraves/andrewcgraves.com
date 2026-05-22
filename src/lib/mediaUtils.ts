export function isVideoUrl(src: string): boolean {
  return /\.(mp4|webm|mov|ogg)(\?.*)?$/i.test(src);
}

export function getVideoEmbedUrl(src: string): string | null {
  const yt = src.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([A-Za-z0-9_-]{11})/
  );
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}`;

  const vimeo = src.match(/(?:vimeo\.com\/)(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;

  return null;
}
