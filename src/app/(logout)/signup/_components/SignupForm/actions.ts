"use server";

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
}): Promise<{
  success: boolean;
  message: string;
}> {
  const signupResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/signup/`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (signupResponse.ok) {
    return {
      success: true,
      message: "アカウントの作成に成功しました。",
    };
  } else {
    return {
      success: false,
      message: "アカウントの作成に失敗しました。",
    };
  }
}
