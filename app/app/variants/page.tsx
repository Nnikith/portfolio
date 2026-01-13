import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Card, CardBody, ButtonLink } from "@/components/ui";

export default async function VariantsPage() {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) return <div>Missing session email.</div>;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return <div>User not found.</div>;

  const variants = await prisma.variant.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: "desc" },
    select: { id: true, title: true, theme: true, updatedAt: true },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Variants</h1>
          <p className="text-sm text-[rgb(var(--muted))]">Create tailored versions for different roles.</p>
        </div>
        <ButtonLink href="/app/variants/new">New variant</ButtonLink>
      </div>

      <div className="grid gap-4">
        {variants.length === 0 ? (
          <Card><CardBody>No variants yet.</CardBody></Card>
        ) : (
          variants.map((v) => (
            <Card key={v.id}>
              <CardBody>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="font-medium">{v.title}</div>
                    <div className="text-xs text-[rgb(var(--muted))]">
                      theme: {v.theme} • updated {v.updatedAt.toISOString()}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Link className="text-sm underline underline-offset-4" href={`/app/variants/${v.id}`}>Edit</Link>
                    <Link className="text-sm underline underline-offset-4" href={`/app/variants/${v.id}/duplicate`}>Duplicate</Link>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
