"use client";

import type { MaintenanceRecordAggregateCalenderDateByYears } from "@/app/api/maintenance-records/aggregate/calender-date/by-years/route";

export async function getMaintenanceRecordsCalenderDateByYears(): Promise<{
  success: boolean;
  message: string;
  result?: MaintenanceRecordAggregateCalenderDateByYears[];
}> {
  try {
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
    }

    switch (response.status) {
      case 400:
        return {
          success: false,
          message: "読み込みが中断されました。",
        };
      default:
        return {
          success: false,
          message: "読み込みに失敗しました。",
        };
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }

    return {
      success: false,
      message: "読み込みに失敗しました。",
    };
  }
}
