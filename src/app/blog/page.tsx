import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const columns = [
  {
    title: "Editorial Notes",
    body: "How our editors choose features, verify claims, and keep issue quality consistent.",
  },
  {
    title: "Writer Updates",
    body: "Announcements from contributors about ongoing series, research work, and upcoming essays.",
  },
  {
    title: "Product for Readers",
    body: "Improvements to article discovery, reading flow, and accessibility for long-form content.",
  },
];

export default function BlogPage() {
  return (
    <PageShell
      title="Editorial Blog"
      description="Inside the publication: notes from editors, writers, and reader experience updates."
      actions={
        <Button asChild>
          <Link href="/articles">Read Articles</Link>
        </Button>
      }
    >
      <div className="grid gap-6 md:grid-cols-3">
        {columns.map((item) => (
          <Card key={item.title} className="border-border bg-card">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-foreground">{item.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
