"use client";

import type * as z from "zod";
import { CreateMaintenanceCategorySchema } from "@/validations";

export async function createMaintenanceCategory(
  data: z.infer<typeof CreateMaintenanceCategorySchema>,
): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/maintenance-categories/`,
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
        message: "カテゴリーの登録に成功しました。",
      };
    }

    switch (response.status) {
      case 400:
        return {
          success: false,
          message: `カテゴリーの登録が中断されました。入力内容を確認してください。`,
        };
      default:
        return {
          success: false,
          message: "カテゴリーの登録に失敗しました。",
        };
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }

    return {
      success: false,
      message: "カテゴリーの登録に失敗しました。",
    };
  }
}
