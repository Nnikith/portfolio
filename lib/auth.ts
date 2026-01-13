import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import { prisma } from "@/lib/db";

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  session: { strategy: "database" },
  pages: { signIn: "/login" },
  callbacks: {
    async signIn({ user }) {
      // Ensure username exists and is unique.
      // Default strategy: use email local-part if present; otherwise use a short cuid suffix.
      if (!("username" in user) || !user.username) {
        const seed =
          (user.email?.split("@")[0] ??
            user.name?.toLowerCase().replace(/\s+/g, "") ??
            "user") + "-" + user.id.slice(-6);

        const base = seed.replace(/[^a-zA-Z0-9_-]/g, "").toLowerCase().slice(0, 24) || "user";
        let candidate = base;

        for (let i = 0; i < 5; i++) {
          const exists = await prisma.user.findUnique({ where: { username: candidate } });
          if (!exists) break;
          candidate = `${base}${i + 1}`;
        }

        await prisma.user.update({
          where: { id: user.id },
          data: { username: candidate },
        });
      }
      return true;
    },
  },
};

export const { auth, handlers, signIn, signOut } = NextAuth(authConfig);
