import { prisma } from "@/lib/db";
import { themeTokens } from "@/lib/themes";
import { notFound } from "next/navigation";

export default async function PublicVariantPage({
  params,
}: {
  params: { username: string; randomId: string };
}) {
  const user = await prisma.user.findUnique({
    where: { username: params.username },
    select: { id: true, username: true },
  });
  if (!user) return notFound();

  const link = await prisma.publicLink.findFirst({
    where: { userId: user.id, randomId: params.randomId, isActive: true },
    include: { variant: true },
  });
  if (!link) return notFound();

  // Best-effort view tracking (non-blocking).
  await prisma.publicLink.update({
    where: { id: link.id },
    data: {
      viewCount: { increment: 1 },
      lastViewedAt: new Date(),
    },
  });

  const variant = link.variant;
  const tokens = themeTokens[variant.theme as any] ?? themeTokens.light;
  const summary = (variant.content as any)?.summary ?? "";

  return (
    <main
      data-theme={variant.theme}
      style={Object.fromEntries(Object.entries(tokens).map(([k, v]) => [k, `rgb(${v})`])) as any}
      className="min-h-screen"
    >
      <div className="mx-auto max-w-3xl px-6 py-14">
        <div className="rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-8 shadow-sm">
          <div className="text-sm text-[rgb(var(--muted))]">Unlisted portfolio</div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">{variant.title}</h1>
          <div className="mt-4 whitespace-pre-wrap text-sm text-[rgb(var(--muted))]">
            {summary || "No content yet."}
          </div>
        </div>
      </div>
    </main>
  );
}
