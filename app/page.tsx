import { Shell, Card, CardBody, ButtonLink } from "@/components/ui";

export default function HomePage() {
  return (
    <Shell>
      <div className="grid gap-8 md:grid-cols-2 items-start">
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight">
            Multi-tenant portfolio variants with unlisted share links
          </h1>
          <p className="text-[rgb(var(--muted))]">
            Create multiple tailored variants for different roles and share them safely via non-guessable URLs.
          </p>
          <div className="flex gap-3">
            <ButtonLink href="/login">Sign in</ButtonLink>
            <ButtonLink href="/u/demo/demo123">View demo (placeholder)</ButtonLink>
          </div>
        </div>

        <Card>
          <CardBody>
            <div className="space-y-3">
              <div className="text-sm font-medium">v1 scope</div>
              <ul className="list-disc pl-5 text-sm text-[rgb(var(--muted))] space-y-1">
                <li>GitHub OAuth</li>
                <li>Variants (duplicate, reorder)</li>
                <li>Link generator (randomId → variant mapping)</li>
                <li>Curated themes per variant</li>
              </ul>
            </div>
          </CardBody>
        </Card>
      </div>
    </Shell>
  );
}
