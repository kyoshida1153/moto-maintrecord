"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { BarChart } from "@mui/x-charts/BarChart";

import Loading from "@/components/Loading";
import useReportStore from "@/app/(login)/report/_components/useReportStore";

import BarChartHorizontal from "./BarChartHorizontal";
import { useMediaQuery } from "@mui/material";
import BarChartVertical from "./BarChartVertical";

export default function ReportBarChart() {
  const {
    getMaintenanceRecordsTotalCostResponse,
    isLoadingGetMaintenanceRecordsTotalCost,
  } = useReportStore();

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
      {isLoadingGetMaintenanceRecordsTotalCost ? (
        <div className="flex w-full justify-center">
          <Loading size="36px" />
        </div>
      ) : getMaintenanceRecordsTotalCostResponse.status === "success" ? (
        getMaintenanceRecordsTotalCostResponse.totalCost === 0 ? (
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
        )
      ) : (
        <div className="flex w-full justify-center">
          <p>{getMaintenanceRecordsTotalCostResponse.message}</p>
        </div>
      )}
    </>
  );
}
