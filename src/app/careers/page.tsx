import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG } from "@/lib/site-config";
import { Clock, HeartHandshake, Laptop, LineChart, MapPin, Sparkles, Users } from "lucide-react";

const roles = [
  {
    title: "Staff Writer, Networks & Infrastructure",
    location: "Remote (US/EU time zones)",
    type: "Full-time",
    level: "Mid–Senior",
    summary: "Report on carriers, peering, data centers, and the engineering tradeoffs behind resilient networks.",
  },
  {
    title: "Product Designer, Reading Experience",
    location: "Hybrid · New York",
    type: "Full-time",
    level: "Senior",
    summary: "Own typography, article templates, and navigation patterns for long-form editorial.",
  },
  {
    title: "Audience & Newsletter Editor",
    location: "Remote",
    type: "Full-time",
    level: "Mid",
    summary: "Shape weekly digests, experiment with formats, and partner with editors on launches.",
  },
  {
    title: "Part-time Fact Checker",
    location: "Remote",
    type: "Contract",
    level: "Contributor",
    summary: "Flexible hours supporting investigations and technical explainers pre-publication.",
  },
];

const benefits = [
  { title: "Remote-first", body: "Async-friendly culture with optional studio days in select cities.", icon: Laptop },
  { title: "Health & balance", body: "Medical, dental, and vision where applicable; generous PTO.", icon: HeartHandshake },
  { title: "Learning budget", body: "Annual stipend for courses, conferences, and certifications.", icon: Sparkles },
  { title: "Transparent growth", body: "Quarterly career conversations and clear leveling guides.", icon: LineChart },
];

const steps = [
  { step: "01", title: "Intro call", detail: "30 minutes with recruiting to align on role and impact." },
  { step: "02", title: "Skills conversation", detail: "Meet your future lead; discuss work samples and craft." },
  { step: "03", title: "Collaborative exercise", detail: "A short, paid-where-possible task relevant to the role." },
  { step: "04", title: "Offer & onboarding", detail: "Structured first 90 days with editorial and product buddies." },
];

export default function CareersPage() {
  return (
    <PageShell
      title="Careers"
      description={`Help readers understand the networks, products, and policies behind modern connectivity—at ${SITE_CONFIG.name}.`}
      actions={
        <Button asChild className="bg-[#002D62] text-white hover:bg-[#002D62]/90">
          <Link href="/contact">View open roles</Link>
        </Button>
      }
    >
      <div className="space-y-12">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4">
            <Badge className="bg-[#002D62]/10 text-[#002D62] hover:bg-[#002D62]/15">Why join</Badge>
            <h2 className="text-2xl font-semibold tracking-tight text-[#002D62] sm:text-3xl">
              Build the publication operators read—and citizens trust.
            </h2>
            <p className="text-sm leading-relaxed text-[#70757A] sm:text-base">
              We are a small, senior-heavy team obsessed with clarity. You will work alongside editors, designers, and
              engineers who care as much about a well-set paragraph as about a well-tested deploy.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <span className="inline-flex items-center gap-2 text-xs font-medium text-[#70757A]">
                <Users className="h-4 w-4 text-[#002D62]" aria-hidden />
                Collaborative desks
              </span>
              <span className="inline-flex items-center gap-2 text-xs font-medium text-[#70757A]">
                <Clock className="h-4 w-4 text-[#002D62]" aria-hidden />
                Sensible meeting load
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {benefits.map(({ title, body, icon: Icon }) => (
              <Card key={title} className="border-[#002D62]/15 shadow-none">
                <CardContent className="p-5">
                  <Icon className="h-5 w-5 text-[#002D62]" aria-hidden />
                  <h3 className="mt-3 text-sm font-semibold text-[#002D62]">{title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#70757A]">{body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-[#002D62]">Open positions</h3>
          <p className="mt-1 text-sm text-[#70757A]">Updated regularly—if a role is listed, we are actively hiring.</p>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {roles.map((role) => (
              <Card key={role.title} className="border-[#002D62]/15 shadow-none transition-shadow hover:shadow-md">
                <CardContent className="flex h-full flex-col p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="bg-[#002D62]/10 text-[#002D62]">{role.level}</Badge>
                    <Badge variant="outline" className="border-[#70757A]/30 text-[#70757A]">
                      {role.type}
                    </Badge>
                  </div>
                  <h4 className="mt-4 text-lg font-semibold text-[#002D62]">{role.title}</h4>
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-[#70757A]">
                    <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
                    {role.location}
                  </p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-[#70757A]">{role.summary}</p>
                  <Button variant="outline" className="mt-6 w-fit border-[#002D62]/30 text-[#002D62]" asChild>
                    <Link href="/contact">Apply or ask a question</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#002D62]/15 bg-white p-8">
          <h3 className="text-lg font-semibold text-[#002D62]">Interview journey</h3>
          <p className="mt-1 text-sm text-[#70757A]">What to expect once you raise your hand.</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.step} className="relative">
                <span className="font-mono text-2xl font-bold text-[#002D62]/25">{s.step}</span>
                <h4 className="mt-2 text-sm font-semibold text-[#002D62]">{s.title}</h4>
                <p className="mt-2 text-xs leading-relaxed text-[#70757A]">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <Card className="border-[#002D62]/15 bg-[#002D62]/[0.04] shadow-none">
          <CardContent className="flex flex-col gap-4 p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-[#002D62]">Don&apos;t see the right fit?</h3>
              <p className="mt-1 max-w-xl text-sm text-[#70757A]">
                Send your portfolio or three clips—we keep a rolling list for future openings and freelance partnerships.
              </p>
            </div>
            <Button asChild variant="outline" className="shrink-0 border-[#002D62]/40 text-[#002D62]">
              <Link href="/contact">Introduce yourself</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
