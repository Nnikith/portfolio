import { signIn } from "@/lib/auth";
import { Shell, Card, CardBody, PrimaryButton, ButtonLink } from "@/components/ui";

export default function LoginPage({
  searchParams,
}: {
  searchParams?: { next?: string };
}) {
  const next = searchParams?.next ?? "/app";

  async function doSignIn() {
    "use server";
    await signIn("github", { redirectTo: next });
  }

  return (
    <Shell>
      <Card>
        <CardBody>
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold">Sign in</h2>
              <p className="text-sm text-[rgb(var(--muted))]">
                GitHub OAuth is enabled. Google/email can be added later without breaking schema.
              </p>
            </div>

            <form action={doSignIn}>
              <PrimaryButton type="submit">Continue with GitHub</PrimaryButton>
            </form>

            <div className="text-sm">
              <ButtonLink href="/">Back</ButtonLink>
            </div>
          </div>
        </CardBody>
      </Card>
    </Shell>
  );
}
