"use client";

import type * as z from "zod";
import { DeleteBikeSchema } from "@/validations";

type DeleteBikeId = z.infer<typeof DeleteBikeSchema.shape.id>;

export async function deleteBike(id: DeleteBikeId): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/bikes/${id}`,
      {
        method: "DELETE",
      },
    );

    if (response.ok) {
      return {
        success: true,
        message: "削除に成功しました。",
      };
    }

    switch (response.status) {
      case 400:
        return {
          success: false,
          message: "削除が中断されました。",
        };
      default:
        return {
          success: false,
          message: "削除に失敗しました。",
        };
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }

    return {
      success: false,
      message: "削除に失敗しました。",
    };
  }
}
