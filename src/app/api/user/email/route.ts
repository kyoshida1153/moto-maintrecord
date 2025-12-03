import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib";
import { getCurrentUser } from "@/actions";
import { UpdateUserEmailSchema } from "@/validations";

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
    const { currentEmail, newEmail, confirmNewEmail } = await request.json();

    // 現在のメールアドレスとログインユーザーのメールアドレスが一致するかチェック
    if (currentEmail !== currentUser.email) {
      return NextResponse.json({ message: "Bad Request" }, { status: 400 });
    }

    // バリデーションチェック
    const validated = UpdateUserEmailSchema.safeParse({
      currentEmail,
      newEmail,
      confirmNewEmail,
    });
    if (!validated.success) {
      return NextResponse.json({ message: "Bad Request" }, { status: 400 });
    }

    const result = await prisma.user.update({
      data: {
        email: validated.data.newEmail,
      },
      where: { id: userId, deletedAt: null },
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
