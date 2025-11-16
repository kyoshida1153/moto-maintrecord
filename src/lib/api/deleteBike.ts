"use client";

export async function deleteBike(bikeId: string): Promise<{
  success: boolean;
  message: string;
}> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/bikes/${bikeId}`,
    {
      method: "DELETE",
    },
  );

  if (response.ok) {
    return {
      success: true,
      message: "所有バイクの削除に成功しました。",
    };
  } else {
    return {
      success: false,
      message: "所有バイクの削除に失敗しました。",
    };
  }
}
