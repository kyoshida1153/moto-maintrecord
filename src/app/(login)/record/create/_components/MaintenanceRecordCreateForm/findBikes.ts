"use client";

import type { BikeSelect } from "@/app/api/bikes/route";

export async function findBikes(): Promise<BikeSelect[] | false> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/bikes/`,
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
