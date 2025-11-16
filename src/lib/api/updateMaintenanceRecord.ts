"use client";

import type { MaintenanceRecordUpdateInput } from "@/app/api/maintenance-records/[id]/route";

export async function updateMaintenanceRecord(
  data: MaintenanceRecordUpdateInput,
  maintenanceRecordId: string,
  isChangedImages: boolean,
): Promise<{
  success: boolean;
  message: string;
}> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/maintenance-records/${maintenanceRecordId}`,
    {
      method: "PUT",
      body: JSON.stringify({ ...data, isChangedImages }),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (response.ok) {
    return {
      success: true,
      message: "整備・出費記録の編集に成功しました。",
    };
  } else {
    return {
      success: false,
      message: "整備・出費記録の編集に失敗しました。",
    };
  }
}
