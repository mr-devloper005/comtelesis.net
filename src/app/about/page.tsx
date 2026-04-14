import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockTeamMembers } from "@/data/mock-data";
import { SITE_CONFIG } from "@/lib/site-config";
import { BookOpen, Globe2, ShieldCheck, Sparkles, Target, Users } from "lucide-react";

const pillars = [
  {
    title: "Signal, not noise",
    description:
      "We publish explainers, analysis, and long-form reporting so readers can understand what matters in telecom, connectivity, and digital infrastructure.",
    icon: Sparkles,
  },
  {
    title: "Editorial rigor",
    description:
      "Every story is edited for accuracy, clarity, and fairness. We correct errors promptly and show our work when data or sourcing is complex.",
    icon: ShieldCheck,
  },
  {
    title: "Reader-centered design",
    description:
      "Typography, pacing, and navigation are tuned for deep reading on any device—whether you skim headlines or settle in for a feature.",
    icon: BookOpen,
  },
];

const milestones = [
  { year: "2019", label: "Launched as an independent article hub focused on connectivity trends." },
  { year: "2021", label: "Expanded topics to include policy, spectrum, cloud edge, and enterprise networks." },
  { year: "2024", label: "Introduced contributor programs and transparent editorial guidelines." },
  { year: "Today", label: "Serving a global audience of operators, builders, and curious readers." },
];

const stats = [
  { value: "12k+", label: "Stories & updates archived" },
  { value: "180k", label: "Monthly engaged readers" },
  { value: "86+", label: "Topic channels" },
];

export default function AboutPage() {
  return (
    <PageShell
      title={`About ${SITE_CONFIG.name}`}
      description={`${SITE_CONFIG.name} is the editorial home for clear, credible coverage of the networks and ideas shaping how the world connects.`}
      actions={
        <>
          <Button variant="outline" asChild className="border-[#002D62]/30 text-[#002D62] hover:bg-[#002D62]/5">
            <Link href="/team">Meet the team</Link>
          </Button>
          <Button asChild className="bg-[#002D62] text-white hover:bg-[#002D62]/90">
            <Link href="/contact">Contact us</Link>
          </Button>
        </>
      }
    >
      <div className="space-y-12">
        <div className="relative overflow-hidden rounded-2xl border border-[#002D62]/15 bg-gradient-to-br from-white via-white to-[#002D62]/[0.04] p-8 sm:p-10">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border border-[#8FABD4]/40" aria-hidden />
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_220px]">
            <div className="space-y-4">
              <Badge className="bg-[#002D62]/10 text-[#002D62] hover:bg-[#002D62]/15">Our mission</Badge>
              <h2 className="text-2xl font-semibold tracking-tight text-[#002D62] sm:text-3xl">
                Trusted context for a connected world.
              </h2>
              <p className="max-w-2xl text-sm leading-relaxed text-[#70757A] sm:text-base">
                From backbone infrastructure to the products people use every day, {SITE_CONFIG.name} explains the “why”
                behind the headlines. We partner with reporters, operators, and subject-matter experts to keep coverage
                approachable without oversimplifying the technology.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#70757A]/25 bg-white/80 px-3 py-1 text-xs font-medium text-[#70757A]">
                  <Globe2 className="h-3.5 w-3.5 text-[#002D62]" aria-hidden />
                  Global perspective
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#70757A]/25 bg-white/80 px-3 py-1 text-xs font-medium text-[#70757A]">
                  <Target className="h-3.5 w-3.5 text-[#002D62]" aria-hidden />
                  Independent editorial
                </span>
              </div>
            </div>
            <div className="relative mx-auto flex w-full max-w-[200px] justify-center lg:mx-0 lg:max-w-none">
              <div className="rounded-2xl border border-[#002D62]/10 bg-white p-6 shadow-sm">
                <Image src="/favico.png" alt={`${SITE_CONFIG.name} logo`} width={180} height={180} className="h-auto w-full" priority />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-[#002D62]">By the numbers</h3>
              <p className="mt-1 text-sm text-[#70757A]">A snapshot of the library we maintain for readers.</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((item) => (
              <Card key={item.label} className="border-[#002D62]/15 bg-white shadow-none">
                <CardContent className="p-6">
                  <div className="text-3xl font-semibold tabular-nums text-[#002D62]">{item.value}</div>
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

        <div className="rounded-2xl border border-[#002D62]/15 bg-[#002D62]/[0.03] p-8">
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <Users className="h-6 w-6 text-[#002D62]" aria-hidden />
            <h3 className="text-lg font-semibold text-[#002D62]">Our path</h3>
          </div>
          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {milestones.map((m) => (
              <li key={m.year} className="border-t-2 border-[#002D62]/25 pt-5">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#002D62]">{m.year}</span>
                <p className="mt-2 text-sm leading-relaxed text-[#70757A]">{m.label}</p>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#002D62]">Editorial leadership</h3>
            <p className="mt-1 text-sm text-[#70757A]">
              The people guiding standards, coverage, and day-to-day publishing decisions.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {mockTeamMembers.map((member) => (
              <Card
                key={member.id}
                className="border-[#002D62]/15 bg-white shadow-none transition-transform hover:-translate-y-0.5 hover:shadow-md"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-14 w-14 border border-[#002D62]/10">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="bg-[#002D62]/10 text-[#002D62]">{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-[#002D62]">{member.name}</p>
                      <p className="text-xs text-[#70757A]">{member.role}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-[#70757A]">{member.bio}</p>
                  <p className="mt-3 text-xs text-[#70757A]/80">{member.location}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <Button variant="outline" asChild className="border-[#002D62]/30 text-[#002D62]">
              <Link href="/team">Full editorial roster</Link>
            </Button>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
