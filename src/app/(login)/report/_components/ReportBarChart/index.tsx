"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { useMediaQuery } from "@mui/material";

import { Loading } from "@/components";
import BarChartHorizontal from "./BarChartHorizontal";
import BarChartVertical from "./BarChartVertical";
import { useReportBarChartStore } from "./stores";

export default function ReportBarChart() {
  const { getMaintenanceRecordsTotalCostResponse, isLoadingReportBarChart } =
    useReportBarChartStore();

  // const isPc = useMediaQuery("(min-width:768px)");
  const isPc = useMediaQuery("(min-width:1024px)");

  const [chartData, setChartData] = useState<
    { during: string; cost: number }[]
  >([]);

  useEffect(() => {
    setChartData([]);

    const newChartData =
      getMaintenanceRecordsTotalCostResponse.result &&
      getMaintenanceRecordsTotalCostResponse.result.map((item) => ({
        during:
          getMaintenanceRecordsTotalCostResponse.groupBy === "month"
            ? format(item.date, "M月", { locale: ja })
            : format(item.date, "M/d", { locale: ja }),
        cost: Number(item.cost_str),
      }));

    if (newChartData) setChartData(newChartData);
  }, [getMaintenanceRecordsTotalCostResponse]);

  return (
    <>
      {isLoadingReportBarChart ? (
        <div className="flex w-full justify-center">
          <Loading size="36px" />
        </div>
      ) : getMaintenanceRecordsTotalCostResponse.status === "success" ? (
        <div className="display rounded border border-solid border-[var(--border-color-gray)] bg-white py-6 md:py-8">
          {getMaintenanceRecordsTotalCostResponse.totalCost === 0 ? (
            <div className="w-full min-w-[300px] text-center">
              <p>該当データなし</p>
            </div>
          ) : isPc === true ? (
            <BarChartVertical
              chartData={chartData}
              groupBy={getMaintenanceRecordsTotalCostResponse.groupBy}
            />
          ) : (
            <BarChartHorizontal
              chartData={chartData}
              groupBy={getMaintenanceRecordsTotalCostResponse.groupBy}
            />
          )}
        </div>
      ) : (
        <div className="flex w-full justify-center">
          <p>{getMaintenanceRecordsTotalCostResponse.message}</p>
        </div>
      )}
    </>
  );
}
