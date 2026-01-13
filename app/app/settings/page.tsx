import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Card, CardBody } from "@/components/ui";

export default async function SettingsPage() {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) return <div>Missing session email.</div>;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return <div>User not found.</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-[rgb(var(--muted))]">Auth providers will expand later (Google/email).</p>
      </div>

      <Card>
        <CardBody className="space-y-2">
          <div className="text-sm"><span className="font-medium">Username:</span> {user.username}</div>
          <div className="text-sm"><span className="font-medium">Email:</span> {user.email ?? "—"}</div>
          <div className="text-sm"><span className="font-medium">Admin:</span> {user.isAdmin ? "true" : "false"}</div>
        </CardBody>
      </Card>
    </div>
  );
}
