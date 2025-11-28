import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib";
import bcrypt from "bcrypt";
import { getCurrentUser } from "@/actions";
import { UpdateUserPasswordSchema } from "@/validations";

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
    const validated = UpdateUserPasswordSchema.safeParse({
      currentPassword,
      newPassword,
      confirmNewPassword,
    });

    if (!validated.success) {
      return NextResponse.json({ message: "Bad Request" }, { status: 400 });
    }

    // 現在のパスワードチェック
    // ※OAuthでログインしたユーザーはパスワード未設定 null なので除外
    if (currentUser.hashedPassword !== null) {
      const isCorrectPassword = await bcrypt.compare(
        validated.data.currentPassword ?? "",
        currentUser.hashedPassword,
      );

      if (!isCorrectPassword) {
        return NextResponse.json({ message: "Bad Request" }, { status: 400 });
      }
    }

    // パスワード未設定 null の場合、現在のパスワードの値が null か 空文字 以外なら中断
    if (currentUser.hashedPassword === null) {
      if (
        validated.data.currentPassword !== null &&
        validated.data.currentPassword.length > 0
      ) {
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
