"use client";

import type { MaintenanceCategorySelect } from "@/app/api/maintenance-categories/route";

export async function getMaintenanceCategories(): Promise<{
  success: boolean;
  message: string;
  result?: MaintenanceCategorySelect[];
}> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/maintenance-categories/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

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
