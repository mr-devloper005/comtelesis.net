import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG } from "@/lib/site-config";
import { ArrowRight, Megaphone, Newspaper, Radio } from "lucide-react";

const releases = [
  {
    date: "March 18, 2026",
    title: `${SITE_CONFIG.name} expands coverage of edge compute and private 5G`,
    summary:
      "New topic hub aggregates explainers, operator interviews, and policy notes for enterprise architects and builders.",
    tag: "Product",
  },
  {
    date: "February 4, 2026",
    title: "Annual transparency report: corrections, sourcing, and reader feedback",
    summary:
      "We published metrics on turnaround times, correction volume, and how reader tips influenced investigations.",
    tag: "Trust & safety",
  },
  {
    date: "January 9, 2026",
    title: "Contributor program opens for regional telecom correspondents",
    summary:
      "Paid retainers for experienced reporters in APAC, LATAM, and Africa—applications reviewed on a rolling basis.",
    tag: "Community",
  },
];

const briefs = [
  {
    title: "Media contact",
    body: "For interview requests, on-the-record comment, or broadcast segments, reach our communications desk.",
    icon: Radio,
    action: { label: "Email newsroom", href: "/contact" },
  },
  {
    title: "Press kit & brand",
    body: "Logos, boilerplate, leadership bios, and product imagery for accredited outlets.",
    icon: Newspaper,
    action: { label: "Open press room", href: "/press" },
  },
  {
    title: "Embargoed news",
    body: "Register for verified journalist updates when we coordinate timed stories with partners.",
    icon: Megaphone,
    action: { label: "Request access", href: "/contact" },
  },
];

export default function NewsroomPage() {
  return (
    <PageShell
      title="Newsroom"
      description="Official updates from ComTelesis: launches, editorial initiatives, and how to work with our team."
      actions={
        <Button asChild variant="outline" className="border-[#002D62]/30 text-[#002D62] hover:bg-[#002D62]/5">
          <Link href="/press">
            Press kit
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
          </Link>
        </Button>
      }
    >
      <div className="space-y-12">
        <div className="rounded-2xl border border-[#002D62]/15 bg-gradient-to-br from-[#002D62] to-[#001a3d] p-8 text-white sm:p-10">
          <Badge className="border-white/20 bg-white/10 text-white hover:bg-white/15">Latest</Badge>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">Notes for readers and partners</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
            This is where we share what we are building—not a substitute for our reporting, but a clear record of how the
            newsroom evolves. For assets and coverage archives, visit the press room.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-[#002D62]">Company & editorial news</h3>
          <p className="mt-1 text-sm text-[#70757A]">Recent announcements and program updates.</p>
          <ul className="mt-6 space-y-4">
            {releases.map((item) => (
              <li key={item.title}>
                <Card className="border-[#002D62]/15 shadow-none transition-colors hover:border-[#002D62]/30">
                  <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-medium text-[#70757A]">{item.date}</span>
                        <Badge variant="secondary" className="bg-[#002D62]/10 text-[#002D62]">
                          {item.tag}
                        </Badge>
                      </div>
                      <h4 className="text-base font-semibold text-[#002D62]">{item.title}</h4>
                      <p className="max-w-2xl text-sm leading-relaxed text-[#70757A]">{item.summary}</p>
                    </div>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {briefs.map(({ title, body, icon: Icon, action }) => (
            <Card key={title} className="border-[#002D62]/15 shadow-none">
              <CardContent className="flex h-full flex-col p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#002D62]/10 text-[#002D62]">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h4 className="mt-4 text-base font-semibold text-[#002D62]">{title}</h4>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#70757A]">{body}</p>
                <Button variant="link" className="mt-4 h-auto justify-start p-0 text-[#002D62]" asChild>
                  <Link href={action.href}>{action.label}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
