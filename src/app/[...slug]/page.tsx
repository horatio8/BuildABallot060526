import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { InfoPageLayout } from "@/components/InfoPageLayout";
import allPages from "../../../data/all-pages.json";

interface CrawledPage {
  path: string;
  status: number;
  kind?: string;
  title?: string;
  description?: string;
  h1?: string;
  sections?: { h2s: string[]; h3s: string[]; paragraphs: string[]; list?: string[] }[];
  error?: string;
}

const PAGES = allPages as CrawledPage[];

function findPage(slug: string[]): CrawledPage | undefined {
  const path = "/" + slug.join("/");
  return PAGES.find((p) => p.path === path && p.status === 200);
}

export function generateStaticParams() {
  return PAGES.filter((p) => p.status === 200 && p.path !== "/").map((p) => ({
    slug: p.path.replace(/^\//, "").split("/"),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = findPage(slug);
  if (!page) return { title: "Build a Ballot" };
  return {
    title: page.title || page.h1 || "Build a Ballot",
    description: page.description || undefined,
  };
}

export default async function CatchAllPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const page = findPage(slug);
  if (!page) notFound();

  return (
    <InfoPageLayout
      h1={page.h1 || page.title || ""}
      description={page.description}
      sections={page.sections || []}
    />
  );
}
