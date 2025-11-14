"use client";

import type { UserUniqueSelect } from "@/app/api/user/route";

export default async function getUser(): Promise<{
  success: boolean;
  message: string;
  result?: UserUniqueSelect;
}> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const { result } = await response.json();
    return {
      success: true,
      message: "読み込みに成功しました。",
      result,
    };
  } else {
    return {
      success: false,
      message: "読み込みに失敗しました。",
    };
  }
}
