import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { THEME_PRESETS } from "@/lib/themes";
import { redirect } from "next/navigation";
import { Card, CardBody, PrimaryButton } from "@/components/ui";

export default async function NewVariantPage() {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) return <div>Missing session email.</div>;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return <div>User not found.</div>;

  async function createVariant(formData: FormData) {
    "use server";
    const title = String(formData.get("title") ?? "").trim() || "Untitled variant";
    const theme = String(formData.get("theme") ?? "light");

    const v = await prisma.variant.create({
      data: {
        userId: user.id,
        title,
        theme: theme as any,
        content: {
          summary: "",
          skills: [],
          experience: [],
          projects: [],
        },
      },
      select: { id: true },
    });

    redirect(`/app/variants/${v.id}`);
  }

  return (
    <Card>
      <CardBody>
        <h1 className="text-2xl font-semibold">New variant</h1>
        <p className="text-sm text-[rgb(var(--muted))] mt-1">Pick a theme preset and start editing.</p>

        <form action={createVariant} className="mt-6 space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Title</label>
            <input
              name="title"
              className="w-full rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-3 py-2 text-sm"
              placeholder="e.g. Data Engineer – FinTech"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Theme</label>
            <select
              name="theme"
              className="w-full rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-3 py-2 text-sm"
              defaultValue="light"
            >
              {THEME_PRESETS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <PrimaryButton type="submit">Create</PrimaryButton>
        </form>
      </CardBody>
    </Card>
  );
}
