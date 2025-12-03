"use client";

import type * as z from "zod";
import { CreateUserSchema } from "@/validations";

export async function createUser(
  data: z.infer<typeof CreateUserSchema>,
): Promise<{
  success: boolean;
  message: string;
}> {
  try {
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
        message: "アカウント作成に成功しました。",
      };
    }

    switch (response.status) {
      case 400:
        return {
          success: false,
          message: `アカウント作成が中断されました。入力内容を確認してください。`,
        };
      default:
        return {
          success: false,
          message: "アカウント作成に失敗しました。",
        };
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }

    return {
      success: false,
      message: "アカウント作成に失敗しました。",
    };
  }
}
