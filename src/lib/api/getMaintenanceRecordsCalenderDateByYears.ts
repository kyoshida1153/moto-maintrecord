"use client";

import { MaintenanceRecordAggregateCalenderDateByYears } from "@/app/api/maintenance-records/aggregate/calender-date/by-years/route";

export async function getMaintenanceRecordsCalenderDateByYears(): Promise<{
  success: boolean;
  message: string;
  result?: MaintenanceRecordAggregateCalenderDateByYears[];
}> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/maintenance-records/aggregate/calender-date/by-years`,
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
