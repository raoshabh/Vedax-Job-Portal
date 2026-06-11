// Edge-safe config: no Prisma imports — used by middleware to read the JWT.
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = (user as { role?: string }).role;
      return token;
    },
    session({ session, token }) {
      if (session.user)
        (session.user as { role?: string }).role = token.role as string;
      return session;
    },
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl;
      const role = (auth?.user as { role?: string } | undefined)?.role;
      if (!auth?.user) return false; // redirects to /login
      if (pathname.startsWith("/admin")) return role === "admin";
      if (pathname.startsWith("/company"))
        return role === "company" || role === "admin";
      return true;
    },
  },
  providers: [], // filled in auth.ts (Node runtime only)
} satisfies NextAuthConfig;
