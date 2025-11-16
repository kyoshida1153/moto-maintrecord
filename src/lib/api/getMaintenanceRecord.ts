"use client";

import { MaintenanceRecordUniqueSelect } from "@/app/api/maintenance-records/[id]/route";

export async function getMaintenanceRecord(id: string): Promise<{
  success: boolean;
  message: string;
  result?: MaintenanceRecordUniqueSelect;
}> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/maintenance-records/${id}`,
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
