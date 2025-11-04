"use client";

export default async function deleteCategory(id: string): Promise<{
  success: boolean;
  message: string;
}> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/maintenance-categories/${id}`,
    {
      method: "DELETE",
    },
  );

  if (response.ok) {
    return {
      success: true,
      message: "カテゴリーの削除に成功しました。",
    };
  } else {
    return {
      success: false,
      message: "カテゴリーの削除に失敗しました。",
    };
  }
}
