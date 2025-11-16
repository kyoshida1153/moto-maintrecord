"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getMonth, getYear } from "date-fns";
import { Loading } from "@/components";
import { isDateYyyyMm } from "@/utils";
import useMaintenanceRecordsTotalCostStore from "./store";

export default function MaintenanceRecordsTotalCost() {
  const {
    getMaintenanceRecordsTotalCostResponse,
    isLoadingGetMaintenanceRecordsTotalCost,
  } = useMaintenanceRecordsTotalCostStore();
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
  }, [date, getMaintenanceRecordsTotalCostResponse]);

  return (
    <>
      {isLoadingGetMaintenanceRecordsTotalCost ? (
        <div className="flex w-full justify-center py-2">
          <Loading size="24px" />
        </div>
      ) : (
        <h1 className="border-b border-gray-800 text-xl font-[500] md:text-2xl">
          {year}年{month}月の合計：{" "}
          <>
            <span className="font-alphanumeric mr-0.5 text-3xl md:text-4xl">
              {getMaintenanceRecordsTotalCostResponse.result !== undefined ? (
                getMaintenanceRecordsTotalCostResponse.result.toLocaleString()
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
