import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib";
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import { getCurrentUser } from "@/actions";
import { CreateUserSchema } from "@/validations";

/* ###################################################################### */

// 取得

const UserUniqueSelect = {
  id: true,
  name: true,
  email: true,
} satisfies Prisma.UserSelect;

export type UserUniqueSelect = Prisma.UserGetPayload<{
  select: typeof UserUniqueSelect;
}>;

export async function GET() {
  // 認証チェック
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const userId = currentUser.id;

  // ここからDB操作
  try {
    const result = await prisma.user.findUnique({
      select: UserUniqueSelect,
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

/* ###################################################################### */

// 作成

export async function POST(request: NextRequest) {
  // 認証チェック※ログイン中は作成できないようにする
  const currentUser = await getCurrentUser();
  if (currentUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { name, email, password, confirmPassword } = await request.json();

    // バリデーションチェック
    const validated = CreateUserSchema.safeParse({
      name,
      email,
      password,
      confirmPassword,
    });

    if (!validated.success) {
      return NextResponse.json({ message: "Bad Request" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(validated.data.password, 12);

    const result = await prisma.user.create({
      data: {
        name: validated.data.name,
        email: validated.data.email,
        hashedPassword,
      },
    });

    if (result) {
      return NextResponse.json({ message: "Success" }, { status: 201 });
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

/* ###################################################################### */

// 削除（論理削除）

export async function DELETE() {
  // 認証チェック
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const userId = currentUser.id;

  // ここからDB操作
  try {
    const result = await prisma.user.update({
      data: {
        deletedAt: new Date(),
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
