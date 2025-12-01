"use client";

import type * as z from "zod";
import { UpdateMaintenanceRecordSchema } from "@/validations/UpdateMaintenanceRecordSchema";

export async function updateMaintenanceRecord({
  id,
  data,
}: {
  id: string;
  data: z.infer<typeof UpdateMaintenanceRecordSchema>;
}): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/maintenance-records/${id}`,
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
        message: "整備・出費記録の変更に成功しました。",
      };
    }

    switch (response.status) {
      case 400:
        return {
          success: false,
          message: `整備・出費記録の変更が中断されました。入力内容を確認してください。`,
        };
      default:
        return {
          success: false,
          message: "整備・出費記録の変更に失敗しました。",
        };
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }

    return {
      success: false,
      message: "整備・出費記録の変更に失敗しました。",
    };
  }
}
