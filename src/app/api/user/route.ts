import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import getCurrentUser from "@/actions/getCurrentUser";

/* ###################################################################### */

// 取得

const UserUniqueSelect = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  name: true,
  email: true,
});

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
  } catch {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

/* ###################################################################### */

// 作成

export type UserCreateInput = Prisma.UserCreateInput;

export async function POST(request: NextRequest) {
  // 認証チェック※ログイン中は作成できないようにする
  const currentUser = await getCurrentUser();
  if (currentUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { email, name, password } = await request.json();
    const hashedPassword = await bcrypt.hash(password, 12);

    const data: UserCreateInput = {
      email,
      name,
      hashedPassword,
    };

    const result = await prisma.user.create({ data });

    if (result) {
      return NextResponse.json({ message: "Success" }, { status: 201 });
    } else {
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    }
  } catch {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

/* ###################################################################### */

// 編集

export type UserUpdateInput = Prisma.UserUpdateInput;

export async function PUT(request: NextRequest) {
  // 認証チェック
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const userId = currentUser.id;

  // ここからDB操作
  try {
    const { name, email, password } = await request.json();
    const hashedPassword = password
      ? await bcrypt.hash(password, 12)
      : undefined;

    const data: UserUpdateInput = {
      name,
      email,
      hashedPassword,
    };

    const result = await prisma.user.update({
      data,
      where: { id: userId },
    });

    if (result) {
      return NextResponse.json({ message: "Success", result }, { status: 201 });
    } else {
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    }
  } catch {
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
    // 型は編集のを使用
    const data: UserUpdateInput = {
      deletedAt: new Date(),
    };

    const result = await prisma.user.update({
      data,
      where: { id: userId },
    });

    if (result) {
      return NextResponse.json({ message: "Success", result }, { status: 201 });
    } else {
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    }
  } catch {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
