import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect, notFound } from "next/navigation";

/**
 * Professional-service behavior:
 * - /u/{username} is not public content.
 * - Not signed in => login (then dashboard).
 * - Signed in as {username} OR admin => /app.
 * - Otherwise => 404 (avoid leaking user existence to random visitors).
 */
export default async function UserGate({ params }: { params: { username: string } }) {
  const session = await auth();
  if (!session?.user) {
    redirect(`/login?next=/u/${encodeURIComponent(params.username)}`);
  }

  const email = session.user.email;
  if (!email) return notFound();

  const me = await prisma.user.findUnique({ where: { email } });
  if (!me) return notFound();

  if (me.isAdmin || me.username === params.username) {
    redirect("/app");
  }

  return notFound();
}
