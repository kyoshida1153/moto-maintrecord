import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib";
import { Prisma } from "@prisma/client";

type User = Prisma.UserGetPayload<Prisma.UserDefaultArgs>;

// ログインユーザー取得
export async function getCurrentUser(): Promise<User | null> {
  try {
    // セッション情報取得
    const session = await getServerSession(authOptions);

    // ログインしていない場合
    if (!session?.user?.email) {
      return null;
    }

    // ログインユーザー取得
    const response = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!response) {
      return null;
    }

    return response;
  } catch {
    return null;
  }
}
