"use client";

import { Prisma } from "@prisma/client";

type MaintenanceRecord = Prisma.MaintenanceRecordGetPayload<{
  select: {
    calenderDate: true;
    isDone: true;
    title: true;
    cost: true;
    bikeId: true;
    maintenanceCategoryId: true;
    memo: true;
    mileage: true;
  };
}>;

type MaintenanceRecordImage = Prisma.MaintenanceRecordImageGetPayload<{
  select: {
    imageUrl: true;
  };
}>;

export async function createMaintenanceRecord(
  baseData: MaintenanceRecord,
  imageData?: MaintenanceRecordImage[],
): Promise<{
  success: boolean;
  message: string;
}> {
  const data = imageData
    ? { ...baseData, maintenanceRecordImages: imageData }
    : { ...baseData };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/maintenance-records/`,
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
      message: "整備・出費記録の登録に成功しました。",
    };
  } else {
    return {
      success: false,
      message: "整備・出費記録の登録に失敗しました。",
    };
  }
}
