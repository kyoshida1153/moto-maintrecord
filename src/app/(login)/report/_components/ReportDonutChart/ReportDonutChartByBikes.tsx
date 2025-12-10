"use client";

import { useEffect, useState } from "react";
import { useReportDonutChartStore } from "./stores";
import DonutChart from "./_DonutChart";

export default function ReportDonutChartByBikes() {
  const chartName = "所有バイク";

  const { getMaintenanceRecordsTotalCostByBikesResponse } =
    useReportDonutChartStore();

  const [chartData, setChartData] = useState<
    { label: string; value: number }[]
  >([]);

  useEffect(() => {
    setChartData([]);

    const newChartData =
      getMaintenanceRecordsTotalCostByBikesResponse.result &&
      getMaintenanceRecordsTotalCostByBikesResponse.result.map((item) => ({
        label: item.name,
        value: Number(item.cost_str),
      }));

    if (newChartData) setChartData(newChartData);
  }, [getMaintenanceRecordsTotalCostByBikesResponse]);

  return (
    <>
      {getMaintenanceRecordsTotalCostByBikesResponse.status === "success" ? (
        getMaintenanceRecordsTotalCostByBikesResponse.totalCost === 0 ? (
          <div className="w-full py-4 text-center">
            <p>該当データなし</p>
          </div>
        ) : (
          <DonutChart chartName={chartName} chartData={chartData} />
        )
      ) : (
        <div className="w-full py-4 text-center">
          <p>{getMaintenanceRecordsTotalCostByBikesResponse.message}</p>
        </div>
      )}
    </>
  );
}
