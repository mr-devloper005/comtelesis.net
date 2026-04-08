import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const principles = [
  {
    title: "Clarity first",
    body: "Write with precise structure, clear claims, and minimal filler so readers can scan and understand quickly.",
  },
  {
    title: "Evidence and sourcing",
    body: "Support factual claims with references, attribution, and transparent context when uncertainty exists.",
  },
  {
    title: "Reader value",
    body: "Every article should help the reader learn, decide, or gain perspective—not just generate pageviews.",
  },
  {
    title: "Editorial integrity",
    body: "Separate opinion from reporting, disclose conflicts, and document corrections when needed.",
  },
];

export default function EditorialGuidelinesPage() {
  return (
    <PageShell
      title="Editorial Guidelines"
      description="Publishing principles used across features, explainers, and opinion pieces."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {principles.map((item) => (
          <Card key={item.title} className="border-border bg-card">
            <CardContent className="p-6">
              <Badge variant="secondary">Guideline</Badge>
              <h2 className="mt-3 text-lg font-semibold text-foreground">{item.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
