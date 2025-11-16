"use client";

import { MaintenanceCategoryUpdateInput } from "@/app/api/maintenance-categories/[id]/route";

export async function updateMaintenanceCategory(
  data: MaintenanceCategoryUpdateInput,
  id: string,
): Promise<{
  success: boolean;
  message: string;
}> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/maintenance-categories/${id}`,
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
      message: "カテゴリーの編集に成功しました。",
    };
  } else {
    return {
      success: false,
      message: "カテゴリーの編集に失敗しました。",
    };
  }
}
