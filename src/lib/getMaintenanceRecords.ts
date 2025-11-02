"use client";

import type { MaintenanceRecordSelect } from "@/app/api/maintenance-records/route";

type Params = {
  page?: string;
  date?: string;
  order?: string;
};

export default async function getMaintenanceRecords(params: Params): Promise<{
  success: boolean;
  message: string;
  result?: MaintenanceRecordSelect[];
}> {
  const queryString = new URLSearchParams(params).toString();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/maintenance-records/?${queryString}`,
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
