"use client";

import type { MaintenanceCategorySelect } from "@/app/api/maintenance-categories/route";

export async function findMaintenanceCategories(): Promise<
  MaintenanceCategorySelect[] | false
> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/maintenance-categories/`,
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
