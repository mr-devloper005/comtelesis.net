import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, FileImage, Newspaper } from "lucide-react";

const pressAssets = [
  {
    id: "press-1",
    title: "ComTelesis Logo Pack",
    description: "Primary logo, icon, and simple usage notes for approved media mentions.",
    fileType: "PNG",
  },
  {
    id: "press-2",
    title: "Publication Overview",
    description: "Short description of ComTelesis coverage areas, audience, and editorial focus.",
    fileType: "PDF",
  },
  {
    id: "press-3",
    title: "Brand Summary",
    description: "Boilerplate copy for telecom, connectivity, and digital infrastructure stories.",
    fileType: "DOC",
  },
];

const pressCoverage = [
  {
    id: "coverage-1",
    outlet: "Telecom Briefing",
    headline: "ComTelesis brings clearer context to connectivity and infrastructure coverage.",
    date: "Mar 2026",
  },
  {
    id: "coverage-2",
    outlet: "Network Market Review",
    headline: "A practical article hub for broadband, mobile, and cloud-edge readers.",
    date: "Feb 2026",
  },
];

export default function PressPage() {
  return (
    <PageShell
      title="Press"
      description="Media resources, brand notes, and selected coverage for ComTelesis."
      actions={
        <Button variant="outline" asChild className="border-[#002D62]/30 text-[#002D62] hover:bg-[#002D62]/5">
          <Link href="/newsroom">
            Newsroom updates
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
          </Link>
        </Button>
      }
    >
      <div className="space-y-12">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:items-stretch">
          <Card className="border-[#002D62]/15 shadow-none">
            <CardContent className="space-y-4 p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#002D62]/10 text-[#002D62]">
                  <FileImage className="h-6 w-6" aria-hidden />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[#002D62]">Press kit</h2>
                  <p className="text-sm text-[#70757A]">Approved brand notes and media-ready summaries.</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-[#70757A]">
                Use these materials when referencing ComTelesis in articles, directories, media briefs, and partner
                communications. For interviews or custom assets, contact the team directly.
              </p>
            </CardContent>
          </Card>
          <Card className="border-[#002D62]/15 bg-[#002D62]/[0.03] shadow-none">
            <CardContent className="flex h-full flex-col justify-center p-8">
              <Newspaper className="h-8 w-8 text-[#002D62]" aria-hidden />
              <h3 className="mt-4 text-base font-semibold text-[#002D62]">Boilerplate</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#70757A]">
                ComTelesis publishes clear articles about telecom, connectivity, digital infrastructure, and the
                services that keep people and businesses connected.
              </p>
            </CardContent>
          </Card>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-[#002D62]">Media resources</h3>
          <p className="mt-1 text-sm text-[#70757A]">Simple, static resources for references and media use.</p>
          <div className="mt-6 space-y-3">
            {pressAssets.map((asset) => (
              <div
                key={asset.id}
                className="flex flex-col gap-4 rounded-xl border border-[#002D62]/15 bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-[#002D62]">{asset.title}</p>
                  <p className="mt-1 text-sm text-[#70757A]">{asset.description}</p>
                </div>
                <div className="flex shrink-0 flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="bg-[#002D62]/10 text-[#002D62]">
                    {asset.fileType}
                  </Badge>
                  <Button size="sm" variant="outline" className="border-[#002D62]/25" asChild>
                    <Link href="/contact">
                      Request
                      <Download className="ml-1.5 h-3.5 w-3.5" aria-hidden />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-[#002D62]">Press coverage</h3>
          <p className="mt-1 text-sm text-[#70757A]">Selected mentions and context from telecom and technology media.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {pressCoverage.map((item) => (
              <Card
                key={item.id}
                className="border-l-4 border-l-[#002D62] border-t-[#002D62]/15 border-r-[#002D62]/15 border-b-[#002D62]/15 shadow-none transition-shadow hover:shadow-md"
              >
                <CardContent className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#002D62]/80">{item.outlet}</p>
                  <p className="mt-3 text-sm font-medium leading-snug text-[#002D62]">{item.headline}</p>
                  <p className="mt-3 text-xs text-[#70757A]">{item.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
