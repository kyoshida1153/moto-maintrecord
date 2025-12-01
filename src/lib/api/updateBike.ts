"use client";

import type * as z from "zod";
import { UpdateBikeSchema } from "@/validations";

export async function updateBike({
  id,
  data,
}: {
  id: string;
  data: z.infer<typeof UpdateBikeSchema>;
}): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/bikes/${id}`,
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
        message: "所有バイクの変更に成功しました。",
      };
    }

    switch (response.status) {
      case 400:
        return {
          success: false,
          message: `所有バイクの変更が中断されました。入力内容を確認してください。`,
        };
      default:
        return {
          success: false,
          message: "所有バイクの変更に失敗しました。",
        };
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }

    return {
      success: false,
      message: "所有バイクの変更に失敗しました。",
    };
  }
}
