"use client";

import type * as z from "zod";
import { UpdateBikeSchema } from "@/validations";

type UpdateBikeId = z.infer<typeof UpdateBikeSchema.shape.id>;
type UpdateBikeOmitId = Omit<z.infer<typeof UpdateBikeSchema>, "id">;

export async function updateBike({
  id,
  data,
}: {
  id: UpdateBikeId;
  data: UpdateBikeOmitId;
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
        message: "更新に成功しました。",
      };
    }

    switch (response.status) {
      case 400:
        return {
          success: false,
          message: "更新が中断されました。入力内容を確認してください。",
        };
      default:
        return {
          success: false,
          message: "更新に失敗しました。",
        };
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }

    return {
      success: false,
      message: "更新に失敗しました。",
    };
  }
}
