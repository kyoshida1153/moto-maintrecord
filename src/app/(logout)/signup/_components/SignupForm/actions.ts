"use server";

import axios from "axios";

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
}): Promise<{
  success: boolean;
  message: string;
}> {
  const signupResponse = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/signup`,
    data,
  );

  if (signupResponse.status === 200) {
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
