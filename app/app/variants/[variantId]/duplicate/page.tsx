import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect, notFound } from "next/navigation";

export default async function DuplicateVariant({ params }: { params: { variantId: string } }) {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) return <div>Missing session email.</div>;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return <div>User not found.</div>;

  const variant = await prisma.variant.findFirst({ where: { id: params.variantId, userId: user.id } });
  if (!variant) return notFound();

  const copy = await prisma.variant.create({
    data: {
      userId: user.id,
      title: `${variant.title} (copy)`,
      theme: variant.theme,
      content: variant.content,
    },
    select: { id: true },
  });

  redirect(`/app/variants/${copy.id}`);
}
