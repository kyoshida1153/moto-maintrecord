"use client";

import type { UserUpdateInput } from "@/app/api/user/route";

type UserUpdateInputPre = Omit<UserUpdateInput, "hashedPassword"> & {
  password?: string | null;
};

export async function updateUser(data: UserUpdateInputPre): Promise<{
  success: boolean;
  message: string;
}> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  await sleep(3000);

  if (response.ok) {
    return {
      success: true,
      message: "変更に成功しました。",
    };
  } else {
    return {
      success: false,
      message: "変更に失敗しました。",
    };
  }
}
