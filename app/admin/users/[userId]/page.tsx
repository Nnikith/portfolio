import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { Card, CardBody } from "@/components/ui";

export default async function AdminUserDetail({ params }: { params: { userId: string } }) {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) return notFound();

  const me = await prisma.user.findUnique({ where: { email } });
  if (!me?.isAdmin) return notFound();

  const user = await prisma.user.findUnique({
    where: { id: params.userId },
    include: {
      variants: { select: { id: true, title: true, theme: true, updatedAt: true } },
      links: { include: { variant: { select: { title: true } } } },
    },
  });
  if (!user) return notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">{user.username}</h1>
        <p className="text-sm text-[rgb(var(--muted))]">{user.email ?? "—"} • admin: {String(user.isAdmin)}</p>
      </div>

      <Card>
        <CardBody>
          <div className="font-medium mb-2">Variants</div>
          <ul className="list-disc pl-5 text-sm text-[rgb(var(--muted))] space-y-1">
            {user.variants.map((v) => (
              <li key={v.id}>{v.title} (theme: {v.theme})</li>
            ))}
          </ul>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <div className="font-medium mb-2">Links</div>
          <ul className="list-disc pl-5 text-sm text-[rgb(var(--muted))] space-y-1">
            {user.links.map((l) => (
              <li key={l.id}>
                {l.label ?? "Untitled"} • active: {String(l.isActive)} • variant: {l.variant.title} • randomId: {l.randomId}
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>
    </div>
  );
}
