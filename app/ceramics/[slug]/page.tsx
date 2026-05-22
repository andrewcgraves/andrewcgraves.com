import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSeriesBySlug, getAllSeriesSlugs } from "../../../src/lib/ceramics";
import SeriesDetailClient from "./SeriesDetailClient";

export async function generateStaticParams() {
  return getAllSeriesSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const series = getSeriesBySlug(slug);
  if (!series) return {};
  return {
    title: `${series.title} — Ceramics — Andrew Graves`,
    description: series.tagline || `${series.title} — ceramics by Andrew Graves`,
  };
}

export default async function SeriesDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const series = getSeriesBySlug(slug);
  if (!series) notFound();
  return <SeriesDetailClient series={series} />;
}
