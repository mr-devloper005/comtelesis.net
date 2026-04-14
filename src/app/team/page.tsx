import Link from "next/link";
import Image from "next/image";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockTeamMembers } from "@/data/mock-data";
import { Mail, Quote } from "lucide-react";

const deskEditors = [
  {
    name: "Avery Quinn",
    role: "Editor in Chief",
    focus: "Sets coverage priorities, standards, and long-range editorial calendar.",
    beats: ["Investigations", "Policy", "Spectrum"],
  },
  {
    name: "Morgan Ellis",
    role: "Managing Editor",
    focus: "Coordinates production flow, fact-checking, and cross-desk collaboration.",
    beats: ["Workflow", "Accuracy", "Deadlines"],
  },
  {
    name: "Riley Chen",
    role: "Features Editor",
    focus: "Shapes essays, explainers, and opinion with a clear, humane voice.",
    beats: ["Narrative", "Columns", "Briefings"],
  },
];

export default function TeamPage() {
  return (
    <PageShell
      title="Editorial team"
      description="Editors, leads, and contributors who keep ComTelesis accurate, ambitious, and readable."
      actions={
        <Button asChild variant="outline" className="border-[#002D62]/30 text-[#002D62] hover:bg-[#002D62]/5">
          <Link href="/editorial-guidelines">Read our guidelines</Link>
        </Button>
      }
    >
      <div className="space-y-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_280px] lg:items-start">
          <div className="space-y-4">
            <Badge className="bg-[#002D62]/10 text-[#002D62] hover:bg-[#002D62]/15">How we work</Badge>
            <h2 className="text-2xl font-semibold tracking-tight text-[#002D62]">Independent desks, one shared bar for quality.</h2>
            <p className="text-sm leading-relaxed text-[#70757A] sm:text-base">
              Our editors blend newsroom discipline with product thinking: fast when the story breaks, deliberate when the
              topic deserves depth. We collaborate with reporters and technologists worldwide—always with attribution,
              context, and respect for readers&apos; time.
            </p>
          </div>
          <Card className="border-[#002D62]/15 bg-gradient-to-b from-white to-[#002D62]/[0.04] shadow-none">
            <CardContent className="p-6">
              <Quote className="h-8 w-8 text-[#002D62]/40" aria-hidden />
              <p className="mt-4 text-sm italic leading-relaxed text-[#70757A]">
                &ldquo;We hire for curiosity and judgment. The best work happens when editors trust writers—and writers
                trust the reader.&rdquo;
              </p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-[#002D62]">Editorial charter</p>
            </CardContent>
          </Card>
        </div>

        <div>
          <h3 className="mb-2 text-lg font-semibold text-[#002D62]">Desk leadership</h3>
          <p className="mb-6 text-sm text-[#70757A]">Day-to-day owners of voice, cadence, and accountability.</p>
          <div className="grid gap-6 md:grid-cols-3">
            {deskEditors.map((member) => (
              <Card key={member.name} className="border-[#002D62]/15 shadow-none">
                <CardContent className="flex h-full flex-col p-6">
                  <h4 className="text-lg font-semibold text-[#002D62]">{member.name}</h4>
                  <p className="mt-1 text-sm font-medium text-[#70757A]">{member.role}</p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-[#70757A]">{member.focus}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {member.beats.map((b) => (
                      <Badge key={b} variant="secondary" className="bg-[#002D62]/8 text-[#002D62]">
                        {b}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-2 text-lg font-semibold text-[#002D62]">Core editorial roster</h3>
          <p className="mb-6 text-sm text-[#70757A]">Leads across reporting, copy, and audience—partnering on every major series.</p>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {mockTeamMembers.map((member) => (
              <Card
                key={member.id}
                className="group overflow-hidden border-[#002D62]/15 shadow-none transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] bg-[#002D62]/5">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#002D62]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-xs text-white/85">{member.role}</p>
                  </div>
                </div>
                <CardContent className="space-y-3 p-5">
                  <p className="text-sm leading-relaxed text-[#70757A]">{member.bio}</p>
                  <p className="text-xs text-[#70757A]/75">{member.location}</p>
                  <Button variant="ghost" size="sm" className="h-8 gap-2 px-0 text-[#002D62] hover:text-[#002D62]" asChild>
                    <Link href="/contact">
                      <Mail className="h-4 w-4" aria-hidden />
                      Pitch this editor
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="border-[#002D62]/15 bg-[#002D62] text-white shadow-none">
          <CardContent className="flex flex-col gap-4 p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold">Want to contribute?</h3>
              <p className="mt-1 max-w-xl text-sm text-white/85">
                Send a short note with your beat, two clips, and what you want readers to learn next.
              </p>
            </div>
            <Button asChild variant="secondary" className="shrink-0 bg-white text-[#002D62] hover:bg-white/90">
              <Link href="/contact">Start a conversation</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
