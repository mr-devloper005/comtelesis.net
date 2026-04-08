import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CATEGORY_OPTIONS } from "@/lib/categories";

export default function TopicsPage() {
  const topTopics = CATEGORY_OPTIONS.slice(0, 18);

  return (
    <PageShell
      title="Article Topics"
      description="Browse all editorial topics and jump into focused article feeds."
      actions={
        <Button asChild>
          <Link href="/articles">Latest Articles</Link>
        </Button>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {topTopics.map((topic) => (
          <Card key={topic.slug} className="border-border bg-card hover:border-primary/40 transition-colors">
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <h2 className="text-base font-semibold text-foreground">{topic.name}</h2>
                <p className="mt-1 text-xs text-muted-foreground">Topic feed</p>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href={`/articles?category=${topic.slug}`}>Open</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
