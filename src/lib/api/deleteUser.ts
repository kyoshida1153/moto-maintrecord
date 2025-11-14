"use client";

export default async function deleteUser(): Promise<{
  success: boolean;
  message: string;
}> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user`, {
    method: "DELETE",
  });

  if (response.ok) {
    return {
      success: true,
      message: "アカウントの削除に成功しました。",
    };
  } else {
    return {
      success: false,
      message: "アカウントの削除に失敗しました。",
    };
  }
}
