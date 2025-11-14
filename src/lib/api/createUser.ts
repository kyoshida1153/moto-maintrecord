"use client";

import { Prisma } from "@prisma/client";

type User = Prisma.UserGetPayload<{
  select: {
    email: true;
    name: true;
  };
}> & {
  password: string;
};

export default async function createUser(data: User): Promise<{
  success: boolean;
  message: string;
}> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (response.ok) {
    return {
      success: true,
      message: "アカウントの作成に成功しました。",
    };
  } else {
    return {
      success: false,
      message: "アカウントの作成に失敗しました。",
    };
  }
}
