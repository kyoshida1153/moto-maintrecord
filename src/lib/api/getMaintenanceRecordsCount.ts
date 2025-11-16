"use client";

type Params = {
  date?: string;
};

export async function getMaintenanceRecordsCount(params: Params): Promise<{
  success: boolean;
  message: string;
  result?: number;
}> {
  const queryString = new URLSearchParams(params).toString();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/maintenance-records/count/?${queryString}`,
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
