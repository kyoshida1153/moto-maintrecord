"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getMonth, getYear } from "date-fns";
import useMaintenanceRecordsTotalCostStore from "@/stores/useMaintenanceRecordsTotalCostStore";
import isDateYyyyMm from "@/utils/isDateYyyyMm";
import Loading from "@/components/Loading";

export default function MaintenanceRecordsTotalCost() {
  const { maintenanceRecordsTotalCost, maintenanceRecordsTotalCostLoading } =
    useMaintenanceRecordsTotalCostStore();
  const [year, setYear] = useState<number>(getYear(new Date()));
  const [month, setMonth] = useState<number>(getMonth(new Date()) + 1);

  const searchParams = useSearchParams();
  const date = searchParams.get("date") || "";

  useEffect(() => {
    if (isDateYyyyMm(date)) {
      const [yearString, monthString] = date.split("-");
      setYear(Number(yearString));
      setMonth(Number(monthString));
    }
  }, [date, maintenanceRecordsTotalCost]);

  return (
    <>
      {maintenanceRecordsTotalCostLoading ? (
        <div className="flex w-full justify-center py-2">
          <Loading size="24px" />
        </div>
      ) : (
        <h1 className="border-b border-gray-800 text-xl font-[500] md:text-2xl">
          {year}年{month}月の合計：{" "}
          <>
            <span className="font-alphanumeric mr-0.5 text-3xl md:text-4xl">
              {maintenanceRecordsTotalCost !== undefined ? (
                maintenanceRecordsTotalCost.toLocaleString()
              ) : (
                <> - </>
              )}
            </span>
            円
          </>
        </h1>
      )}
    </>
  );
}
