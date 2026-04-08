import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const docs = [
  { title: "Article Schema", body: "Structure for title, summary, cover media, and body fields used in publication pages." },
  { title: "Editorial Workflow", body: "Draft → review → schedule → publish lifecycle for article teams." },
  { title: "Reader APIs", body: "Search, feed, and metadata endpoints used by client article surfaces." },
];

export default function DevelopersPage() {
  return (
    <PageShell
      title="Publishing Docs"
      description="Technical docs for article publishing and editorial integrations."
      actions={
        <Button asChild>
          <Link href="/contact">Request Access</Link>
        </Button>
      }
    >
      <div className="grid gap-6 md:grid-cols-3">
        {docs.map((doc) => (
          <Card key={doc.title} className="border-border bg-card">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-foreground">{doc.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{doc.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
