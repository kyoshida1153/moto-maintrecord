"use client";

import { useEffect, useState } from "react";
import useReportDonutChartByCategoriesStore from "./store";
import { Loading } from "@/components";
import DonutChart from "../DonutChart";

export default function ReportDonutChartByCategories() {
  const chartName = "カテゴリー";

  const {
    getMaintenanceRecordsTotalCostByCategoriesResponse,
    isLoadingGetMaintenanceRecordsTotalCostByCategories,
  } = useReportDonutChartByCategoriesStore();

  const [chartData, setChartData] = useState<
    { label: string; value: number }[]
  >([]);

  useEffect(() => {
    setChartData([]);

    const newChartData =
      getMaintenanceRecordsTotalCostByCategoriesResponse.result &&
      getMaintenanceRecordsTotalCostByCategoriesResponse.result.map((item) => ({
        label: item.name,
        value: Number(item.cost_str),
      }));

    if (newChartData) setChartData(newChartData);
  }, [getMaintenanceRecordsTotalCostByCategoriesResponse]);

  return (
    <>
      {isLoadingGetMaintenanceRecordsTotalCostByCategories ? (
        <div className="flex w-full justify-center py-4">
          <Loading size="36px" />
        </div>
      ) : getMaintenanceRecordsTotalCostByCategoriesResponse.status ===
        "success" ? (
        getMaintenanceRecordsTotalCostByCategoriesResponse.totalCost === 0 ? (
          <div className="w-full py-4 text-center">
            <p>該当データなし</p>
          </div>
        ) : (
          <DonutChart chartName={chartName} chartData={chartData} />
        )
      ) : (
        <div className="w-full py-4 text-center">
          <p>{getMaintenanceRecordsTotalCostByCategoriesResponse.message}</p>
        </div>
      )}
    </>
  );
}
