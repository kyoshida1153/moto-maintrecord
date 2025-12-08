import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib";
import bcrypt from "bcrypt";
import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),

  providers: [
    Google,
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials) {
        const validated = signInSchema.safeParse(credentials);

        if (!validated.success) {
          throw new Error("バリデーションに失敗しました。");
        }

        const { email, password } = validated.data;

        // セッション情報のメールアドレスを元にユーザーを取得、チェックする
        const user = await prisma.user.findUnique({
          where: {
            email,
            deletedAt: null,
          },
        });

        if (!user) {
          throw new Error("ユーザーが存在しません。");
        }

        if (!user?.hashedPassword) {
          throw new Error("パスワードが設定されていません。");
        }

        const isCorrectPassword = await bcrypt.compare(
          password,
          user.hashedPassword,
        );
        if (!isCorrectPassword) {
          throw new Error("パスワードが一致しません。");
        }

        return user;
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async signIn({ user }) {
      if (!user?.email) return false;

      // DBに該当ユーザーが存在するかチェック
      const dbUser = await prisma.user.findUnique({
        where: {
          email: user.email,
          deletedAt: null,
        },
      });
      if (!dbUser) return false;

      return true;
    },
    async jwt({ token, trigger, session }) {
      if (trigger === "update") {
        if (session?.name) {
          token.name = session.name;
        }
      }
      return token;
    },
  },
});
