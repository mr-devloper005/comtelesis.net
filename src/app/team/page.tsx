import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";

const editors = [
  { name: "Avery Quinn", role: "Editor in Chief", focus: "Long-form essays and investigative features." },
  { name: "Jordan Lee", role: "Managing Editor", focus: "Issue planning, copy flow, and publication QA." },
  { name: "Riley Morgan", role: "Features Editor", focus: "Analysis pieces, opinion columns, and deep dives." },
];

export default function TeamPage() {
  return (
    <PageShell
      title="Editorial Team"
      description="Meet the editors shaping every issue and article section."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {editors.map((member) => (
          <Card key={member.name} className="border-border bg-card">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-foreground">{member.name}</h2>
              <p className="mt-1 text-sm font-medium text-primary">{member.role}</p>
              <p className="mt-3 text-sm text-muted-foreground">{member.focus}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
