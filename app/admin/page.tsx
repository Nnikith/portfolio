import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { Card, CardBody } from "@/components/ui";
import Link from "next/link";

export default async function AdminHome() {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) return notFound();

  const me = await prisma.user.findUnique({ where: { email } });
  if (!me?.isAdmin) return notFound();

  const [users, variants, links] = await Promise.all([
    prisma.user.count(),
    prisma.variant.count(),
    prisma.publicLink.count(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Admin</h1>
        <p className="text-sm text-[rgb(var(--muted))]">Root admin only.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card><CardBody><div className="text-sm font-medium">Users</div><div className="text-2xl font-semibold">{users}</div></CardBody></Card>
        <Card><CardBody><div className="text-sm font-medium">Variants</div><div className="text-2xl font-semibold">{variants}</div></CardBody></Card>
        <Card><CardBody><div className="text-sm font-medium">Links</div><div className="text-2xl font-semibold">{links}</div></CardBody></Card>
      </div>

      <div>
        <Link className="text-sm underline underline-offset-4" href="/admin/users">Manage users</Link>
      </div>
    </div>
  );
}
