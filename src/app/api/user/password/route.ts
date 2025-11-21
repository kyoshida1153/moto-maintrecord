import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib";
import bcrypt from "bcrypt";
import { getCurrentUser } from "@/actions";
import { UserPasswordSchema } from "@/validations";

/* ###################################################################### */

// 編集

export async function PUT(request: NextRequest) {
  // 認証チェック
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const userId = currentUser.id;

  // ここからDB操作
  try {
    const { currentPassword, newPassword, confirmNewPassword } =
      await request.json();

    // バリデーションチェック
    const validated = UserPasswordSchema.safeParse({
      currentPassword,
      newPassword,
      confirmNewPassword,
    });

    if (!validated.success) {
      return NextResponse.json({ message: "Bad Request" }, { status: 400 });
    }

    // 現在のパスワードチェック ※OAuthでログインしたユーザーは除く
    if (currentUser.hashedPassword !== null) {
      const isCorrectPassword = await bcrypt.compare(
        currentPassword,
        currentUser.hashedPassword,
      );

      if (!isCorrectPassword) {
        return NextResponse.json({ message: "Bad Request" }, { status: 400 });
      }
    }

    const hashedPassword = await bcrypt.hash(validated.data.newPassword, 12);

    const result = await prisma.user.update({
      data: {
        hashedPassword,
      },
      where: { id: userId },
    });

    if (result) {
      return NextResponse.json({ message: "Success", result }, { status: 201 });
    } else {
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
