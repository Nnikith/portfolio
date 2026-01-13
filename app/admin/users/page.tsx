import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { Card, CardBody } from "@/components/ui";
import Link from "next/link";

export default async function AdminUsers() {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) return notFound();

  const me = await prisma.user.findUnique({ where: { email } });
  if (!me?.isAdmin) return notFound();

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, username: true, email: true, isAdmin: true, createdAt: true },
    take: 100,
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight">Users</h1>

      <div className="grid gap-3">
        {users.map((u) => (
          <Card key={u.id}>
            <CardBody>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="font-medium">{u.username}</div>
                  <div className="text-xs text-[rgb(var(--muted))]">{u.email ?? "—"} • admin: {String(u.isAdmin)}</div>
                </div>
                <Link className="text-sm underline underline-offset-4" href={`/admin/users/${u.id}`}>View</Link>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
