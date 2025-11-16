"use client";

import { Prisma } from "@prisma/client";

type Bike = Prisma.BikeGetPayload<{
  select: {
    name: true;
    mileage: true;
    memo: true;
    imageUrl: true;
  };
}>;

export async function createBike(data: Bike): Promise<{
  success: boolean;
  message: string;
}> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/bikes/`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (response?.status === 201) {
    return {
      success: true,
      message: "所有バイクの登録に成功しました。",
    };
  } else {
    return {
      success: false,
      message: "所有バイクの登録に失敗しました。",
    };
  }
}
