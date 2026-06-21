import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG } from "@/lib/site-config";
import { BookOpen, Globe2, Network, ShieldCheck, Sparkles, Target } from "lucide-react";

const pillars = [
  {
    title: "Telecom clarity",
    description:
      "We turn telecom, broadband, mobile networks, cloud edge, and infrastructure topics into clear articles readers can use.",
    icon: Sparkles,
  },
  {
    title: "Practical context",
    description:
      "Our coverage connects technology decisions with business impact, policy shifts, service quality, and customer experience.",
    icon: Network,
  },
  {
    title: "Reader-first publishing",
    description:
      "Articles are structured for fast scanning and deeper reading, so visitors can move from headline to useful detail without friction.",
    icon: BookOpen,
  },
];

const focusAreas = [
  { value: "Telecom", label: "Network, broadband, and connectivity coverage" },
  { value: "Business", label: "Market context for operators, teams, and buyers" },
  { value: "Guides", label: "Readable explainers for technical and nontechnical readers" },
];

export default function AboutPage() {
  return (
    <PageShell
      title={`About ${SITE_CONFIG.name}`}
      description={`${SITE_CONFIG.name} publishes clear articles about telecom, connectivity, digital infrastructure, and the services that keep people and businesses connected.`}
      actions={
        <Button asChild className="bg-[#002D62] text-white hover:bg-[#002D62]/90">
          <Link href="/contact">Contact us</Link>
        </Button>
      }
    >
      <div className="space-y-12">
        <div className="overflow-hidden rounded-2xl border border-[#002D62]/15 bg-white p-8 sm:p-10">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_220px]">
            <div className="space-y-4">
              <Badge className="bg-[#002D62]/10 text-[#002D62] hover:bg-[#002D62]/15">ComTelesis overview</Badge>
              <h2 className="text-2xl font-semibold tracking-tight text-[#002D62] sm:text-3xl">
                Clear telecom insight for a connected world.
              </h2>
              <p className="max-w-2xl text-sm leading-relaxed text-[#70757A] sm:text-base">
                {SITE_CONFIG.name} helps readers understand how communication networks, broadband access, cloud services,
                mobile technology, and digital infrastructure shape modern work and everyday life. The site is built as a
                straightforward article hub for people who want useful context without unnecessary noise.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#70757A]/25 bg-white/80 px-3 py-1 text-xs font-medium text-[#70757A]">
                  <Globe2 className="h-3.5 w-3.5 text-[#002D62]" aria-hidden />
                  Connectivity coverage
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#70757A]/25 bg-white/80 px-3 py-1 text-xs font-medium text-[#70757A]">
                  <Target className="h-3.5 w-3.5 text-[#002D62]" aria-hidden />
                  Practical analysis
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#70757A]/25 bg-white/80 px-3 py-1 text-xs font-medium text-[#70757A]">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#002D62]" aria-hidden />
                  Plain-language explainers
                </span>
              </div>
            </div>
            <div className="relative mx-auto flex w-full max-w-[200px] justify-center lg:mx-0 lg:max-w-none">
              <div className="rounded-2xl border border-[#002D62]/10 bg-white p-6 shadow-sm">
                <Image src="/favicon.png" alt={`${SITE_CONFIG.name} logo`} width={180} height={180} className="h-auto w-full" priority />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-[#002D62]">What we cover</h3>
              <p className="mt-1 text-sm text-[#70757A]">Focused reading paths for telecom, technology, and business context.</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {focusAreas.map((item) => (
              <Card key={item.label} className="border-[#002D62]/15 bg-white shadow-none">
                <CardContent className="p-6">
                  <div className="text-2xl font-semibold text-[#002D62]">{item.value}</div>
                  <p className="mt-2 text-sm text-[#70757A]">{item.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {pillars.map(({ title, description, icon: Icon }) => (
            <Card key={title} className="border-[#002D62]/15 bg-white shadow-none transition-shadow hover:shadow-md">
              <CardContent className="flex h-full flex-col p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#002D62]/10 text-[#002D62]">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-[#002D62]">{title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#70757A]">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
