import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, getAllProjectSlugs } from "../../../src/lib/projects";
import ProjectDetailClient from "./ProjectDetailClient";

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Andrew Graves`,
    description: project.blurb,
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  return <ProjectDetailClient project={project} />;
}
