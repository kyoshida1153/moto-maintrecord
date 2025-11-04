"use client";

import type { BikeUpdateInput } from "@/app/api/bikes/[id]/route";

export default async function updateBike(
  data: BikeUpdateInput,
  id: string,
): Promise<{
  success: boolean;
  message: string;
}> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/bikes/${id}`,
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
      message: "所有バイクの編集に成功しました。",
    };
  } else {
    return {
      success: false,
      message: "所有バイクの編集に失敗しました。",
    };
  }
}
