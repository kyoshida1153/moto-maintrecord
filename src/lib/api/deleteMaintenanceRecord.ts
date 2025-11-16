"use client";

export async function deleteMaintenanceRecord(id: string): Promise<{
  success: boolean;
  message: string;
}> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/maintenance-records/${id}`,
    {
      method: "DELETE",
    },
  );

  if (response.ok) {
    return {
      success: true,
      message: "整備・出費記録の削除に成功しました。",
    };
  } else {
    return {
      success: false,
      message: "整備・出費記録の削除に失敗しました。",
    };
  }
}
