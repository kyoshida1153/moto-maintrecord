"use client";

import * as z from "zod";
import { UpdateUserPasswordSchema } from "@/validations";

export async function updateUserPassword(
  data: z.infer<typeof UpdateUserPasswordSchema>,
): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/password`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (response.ok) {
      return {
        success: true,
        message: "変更に成功しました。",
      };
    }

    switch (response.status) {
      case 400:
        return {
          success: false,
          message: `変更が中断されました。入力内容を確認してください。`,
        };
      default:
        return {
          success: false,
          message: "変更に失敗しました。",
        };
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }

    return {
      success: false,
      message: "変更に失敗しました。",
    };
  }
}
