"use client";

import type { MaintenanceRecordSelect } from "@/app/api/maintenance-records/route";

type Params = {
  page?: string;
  date?: string;
  order?: string;
};

export async function getMaintenanceRecords(params: Params): Promise<{
  success: boolean;
  message: string;
  result?: MaintenanceRecordSelect[];
}> {
  try {
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
    }

    switch (response.status) {
      case 400:
        return {
          success: false,
          message: "読み込みが中断されました。入力内容を確認してください。",
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
