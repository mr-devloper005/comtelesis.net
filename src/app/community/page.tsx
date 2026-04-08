import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const lanes = [
  { title: "Reader Discussions", body: "Join conversations around features, analysis, and current topic threads." },
  { title: "Writer Q&A", body: "Ask contributors about sources, process, and follow-up context from published pieces." },
  { title: "Reading Clubs", body: "Create or join recurring reading circles around a topic or long-form series." },
];

export default function CommunityPage() {
  return (
    <PageShell
      title="Reader Community"
      description="A community space for discussion, Q&A, and topic-based reading groups."
      actions={
        <Button asChild>
          <Link href="/articles">Browse Articles</Link>
        </Button>
      }
    >
      <div className="grid gap-6 md:grid-cols-3">
        {lanes.map((lane) => (
          <Card key={lane.title} className="border-border bg-card">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-foreground">{lane.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{lane.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
