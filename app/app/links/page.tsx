import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Card, CardBody, PrimaryButton } from "@/components/ui";
import { randomBytes } from "crypto";
import Link from "next/link";

function makeRandomId() {
  return randomBytes(16).toString("hex"); // non-guessable
}

export default async function LinksPage() {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) return <div>Missing session email.</div>;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return <div>User not found.</div>;

  const variants = await prisma.variant.findMany({
    where: { userId: user.id },
    select: { id: true, title: true },
    orderBy: { updatedAt: "desc" },
  });

  const links = await prisma.publicLink.findMany({
    where: { userId: user.id },
    include: { variant: { select: { title: true } } },
    orderBy: { updatedAt: "desc" },
  });

  async function createLink(formData: FormData) {
    "use server";
    const variantId = String(formData.get("variantId") ?? "");
    const label = String(formData.get("label") ?? "").trim() || null;
    if (!variantId) return;

    await prisma.publicLink.create({
      data: {
        userId: user.id,
        variantId,
        label,
        randomId: makeRandomId(),
      },
    });
  }

  async function toggleLink(formData: FormData) {
    "use server";
    const linkId = String(formData.get("linkId") ?? "");
    const isActive = String(formData.get("isActive") ?? "") === "true";
    if (!linkId) return;

    await prisma.publicLink.update({
      where: { id: linkId },
      data: { isActive },
    });
  }

  async function repointLink(formData: FormData) {
    "use server";
    const linkId = String(formData.get("linkId") ?? "");
    const variantId = String(formData.get("variantId") ?? "");
    if (!linkId || !variantId) return;

    await prisma.publicLink.update({
      where: { id: linkId },
      data: { variantId },
    });
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Links</h1>
        <p className="text-sm text-[rgb(var(--muted))]">
          Create unlisted share links. Each randomId maps to a variant (mutable).
        </p>
      </div>

      <Card>
        <CardBody>
          <h2 className="text-lg font-semibold">Create link</h2>

          {variants.length === 0 ? (
            <p className="text-sm text-[rgb(var(--muted))] mt-2">Create a variant first.</p>
          ) : (
            <form action={createLink} className="mt-4 grid gap-3 md:grid-cols-3 items-end">
              <div className="space-y-1 md:col-span-1">
                <label className="text-sm font-medium">Variant</label>
                <select
                  name="variantId"
                  className="w-full rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-3 py-2 text-sm"
                >
                  {variants.map((v) => (
                    <option key={v.id} value={v.id}>{v.title}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1 md:col-span-1">
                <label className="text-sm font-medium">Label (optional)</label>
                <input
                  name="label"
                  className="w-full rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-3 py-2 text-sm"
                  placeholder="e.g. DE – Jan 2026"
                />
              </div>

              <div className="md:col-span-1">
                <PrimaryButton type="submit">Create</PrimaryButton>
              </div>
            </form>
          )}
        </CardBody>
      </Card>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Your links</h2>

        {links.length === 0 ? (
          <Card><CardBody>No links yet.</CardBody></Card>
        ) : (
          links.map((l) => (
            <Card key={l.id}>
              <CardBody>
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="space-y-1">
                    <div className="font-medium">
                      {l.label ?? "Untitled link"}{" "}
                      <span className="text-xs text-[rgb(var(--muted))]">({l.isActive ? "active" : "disabled"})</span>
                    </div>
                    <div className="text-xs text-[rgb(var(--muted))]">
                      Variant: {l.variant.title}
                    </div>
                    <div className="text-xs font-mono">
                      <Link className="underline underline-offset-4" href={`/u/${user.username}/${l.randomId}`}>
                        /u/{user.username}/{l.randomId}
                      </Link>
                    </div>
                  </div>

                  <div className="grid gap-2 md:grid-cols-2">
                    <form action={toggleLink} className="flex items-center gap-2">
                      <input type="hidden" name="linkId" value={l.id} />
                      <select
                        name="isActive"
                        defaultValue={String(l.isActive)}
                        className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-3 py-2 text-sm"
                      >
                        <option value="true">active</option>
                        <option value="false">disabled</option>
                      </select>
                      <button className="text-sm underline underline-offset-4" type="submit">Save</button>
                    </form>

                    <form action={repointLink} className="flex items-center gap-2">
                      <input type="hidden" name="linkId" value={l.id} />
                      <select
                        name="variantId"
                        defaultValue={l.variantId}
                        className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-3 py-2 text-sm"
                      >
                        {variants.map((v) => (
                          <option key={v.id} value={v.id}>{v.title}</option>
                        ))}
                      </select>
                      <button className="text-sm underline underline-offset-4" type="submit">Repoint</button>
                    </form>
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
