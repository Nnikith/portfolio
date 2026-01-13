import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { themeTokens } from "@/lib/themes";
import { notFound, redirect } from "next/navigation";
import { Card, CardBody, PrimaryButton } from "@/components/ui";

export default async function VariantEditorPage({ params }: { params: { variantId: string } }) {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) return <div>Missing session email.</div>;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return <div>User not found.</div>;

  const variant = await prisma.variant.findFirst({
    where: { id: params.variantId, userId: user.id },
  });
  if (!variant) return notFound();

  const tokens = themeTokens[variant.theme as any] ?? themeTokens.light;

  async function save(formData: FormData) {
    "use server";
    const title = String(formData.get("title") ?? "").trim() || variant.title;
    const summary = String(formData.get("summary") ?? "");

    await prisma.variant.update({
      where: { id: variant.id },
      data: {
        title,
        content: {
          ...(variant.content as any),
          summary,
        },
      },
    });

    redirect(`/app/variants/${variant.id}`);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Edit variant</h1>
        <p className="text-sm text-[rgb(var(--muted))]">
          v1 editor is minimal: title + summary. Projects/experience reorder UI comes next.
        </p>
      </div>

      <Card>
        <CardBody>
          <form action={save} className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Title</label>
              <input
                name="title"
                defaultValue={variant.title}
                className="w-full rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-3 py-2 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Summary</label>
              <textarea
                name="summary"
                defaultValue={(variant.content as any)?.summary ?? ""}
                className="min-h-[120px] w-full rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-3 py-2 text-sm"
              />
            </div>

            <PrimaryButton type="submit">Save</PrimaryButton>
          </form>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <div className="text-sm font-medium mb-2">Preview (theme: {variant.theme})</div>
          <div
            data-theme={variant.theme}
            style={Object.fromEntries(Object.entries(tokens).map(([k, v]) => [k, `rgb(${v})`])) as any}
            className="rounded-2xl border border-[rgb(var(--border))] p-6"
          >
            <div className="text-xl font-semibold">{variant.title}</div>
            <div className="mt-2 text-sm text-[rgb(var(--muted))] whitespace-pre-wrap">
              {(variant.content as any)?.summary || "No summary yet."}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
