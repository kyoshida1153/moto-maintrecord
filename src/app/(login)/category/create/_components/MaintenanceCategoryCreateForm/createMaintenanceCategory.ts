"use client";

import { Prisma } from "@prisma/client";

type MaintenanceCategory = Prisma.MaintenanceCategoryGetPayload<{
  select: {
    name: true;
  };
}>;

export default async function createMaintenanceCategory(
  data: MaintenanceCategory,
): Promise<{
  success: boolean;
  message: string;
}> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/maintenance-categories/`,
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
      message: "カテゴリーの登録に成功しました。",
    };
  } else {
    return {
      success: false,
      message: "カテゴリーの登録に失敗しました。",
    };
  }
}
