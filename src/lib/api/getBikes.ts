"use client";

import type { BikeSelect } from "@/app/api/bikes/route";

export async function getBikes(): Promise<{
  success: boolean;
  message: string;
  result?: BikeSelect[];
}> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/bikes/`,
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
          message: `読み込みが中断されました。`,
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
