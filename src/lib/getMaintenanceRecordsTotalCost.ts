"use client";

type Params = {
  date?: string;
};

export default async function getMaintenanceRecordsTotalCost(
  params: Params,
): Promise<number | false> {
  const queryString = new URLSearchParams(params).toString();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/maintenance-records/aggregate/cost/?${queryString}`,
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
