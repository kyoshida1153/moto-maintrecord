import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

// サインアップ

export type UserCreateInput = Prisma.UserCreateInput;

export async function POST(request: Request) {
  try {
    // リクエストボディの取得
    const { email, name, password } = await request.json();

    // パスワードのハッシュ化
    const hashedPassword = await bcrypt.hash(password, 12);

    const data: UserCreateInput = {
      email,
      name,
      hashedPassword,
    };

    // ユーザーの作成
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
