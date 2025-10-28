"use client";

import type { MaintenanceRecordSelect } from "@/app/api/maintenance-records/route";

type Params = {
  page?: string;
  date?: string;
  order?: string;
};

export default async function getMaintenanceRecords(
  params: Params,
): Promise<MaintenanceRecordSelect[] | false> {
  const queryString = new URLSearchParams(params).toString();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/maintenance-records/?${queryString}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (response.ok) {
    const { result: data } = await response.json();
    return data;
  } else {
    return false;
  }
}
