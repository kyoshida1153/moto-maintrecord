"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import useReportStore from "@/app/(login)/report/_components/useReportStore";
import getMaintenanceRecordsTotalCostByMonth from "@/lib/getMaintenanceRecordsTotalCostByMonthly";
import getMaintenanceRecordsTotalCostByDay from "@/lib/getMaintenanceRecordsTotalCostByDays";
import getMaintenanceRecordsTotalCostByBikes from "@/lib/getMaintenanceRecordsTotalCostByBikes";
import getMaintenanceRecordsTotalCostByCategories from "@/lib/getMaintenanceRecordsTotalCostByCategories";
import isDateYyyyMm from "@/utils/isDateYyyyMm";
import getMaintenanceRecordsCalenderDateByYears from "@/lib/getMaintenanceRecordsCalenderDateByYears";

export default function ReportPageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    setGetMaintenanceRecordsTotalCostResponse,
    setIsLoadingGetMaintenanceRecordsTotalCost,
    setGetMaintenanceRecordsTotalCostByBikesResponse,
    setIsLoadingGetMaintenanceRecordsTotalCostByBikes,
    setGetMaintenanceRecordsTotalCostByCategoriesResponse,
    setIsLoadingGetMaintenanceRecordsTotalCostByCategories,
    setGetMaintenanceRecordsCalenderDateByYearsResponse,
    setIsLoadingGetMaintenanceRecordsCalenderDateByYears,
  } = useReportStore();

  const searchParams = useSearchParams();
  const date = searchParams.get("date") || "";

  useEffect(() => {
    Promise.all([
      // 月別 or 日別の出費
      (async () => {
        setIsLoadingGetMaintenanceRecordsTotalCost(true);

        const groupBy = isDateYyyyMm(date) ? "day" : "month";

        const response =
          groupBy === "day"
            ? await getMaintenanceRecordsTotalCostByDay({ date })
            : await getMaintenanceRecordsTotalCostByMonth({ date });

        if (response.success === false) {
          setGetMaintenanceRecordsTotalCostResponse({
            status: "error",
            message: response.message,
            result: undefined,
            totalCost: 0,
          });
          setIsLoadingGetMaintenanceRecordsTotalCost(false);
          return;
        }

        const totalCost = response.result
          ? response.result.reduce(
              (sum, current) => sum + Number(current.cost_str),
              0,
            )
          : 0;
        setGetMaintenanceRecordsTotalCostResponse({
          status: "success",
          message: response.message,
          result: response.result,
          groupBy,
          totalCost,
        });

        setIsLoadingGetMaintenanceRecordsTotalCost(false);
      })(),

      // 所有バイク別の出費
      (async () => {
        setIsLoadingGetMaintenanceRecordsTotalCostByBikes(true);
        const response = await getMaintenanceRecordsTotalCostByBikes({ date });

        if (response.success === false) {
          setGetMaintenanceRecordsTotalCostByBikesResponse({
            status: "error",
            message: response.message,
            result: undefined,
            totalCost: 0,
          });
          setIsLoadingGetMaintenanceRecordsTotalCostByBikes(false);
          return;
        }

        const totalCost = response.result
          ? response.result.reduce(
              (sum, current) => sum + Number(current.cost_str),
              0,
            )
          : 0;
        setGetMaintenanceRecordsTotalCostByBikesResponse({
          status: "success",
          message: response.message,
          result: response.result,
          totalCost,
        });
        setIsLoadingGetMaintenanceRecordsTotalCostByBikes(false);
      })(),

      // カテゴリー別の出費
      (async () => {
        setIsLoadingGetMaintenanceRecordsTotalCostByCategories(true);
        const response = await getMaintenanceRecordsTotalCostByCategories({
          date,
        });

        if (response.success === false) {
          setGetMaintenanceRecordsTotalCostByCategoriesResponse({
            status: "error",
            message: response.message,
            result: undefined,
            totalCost: 0,
          });
          setIsLoadingGetMaintenanceRecordsTotalCostByCategories(false);
          return;
        }

        const totalCost = response.result
          ? response.result.reduce(
              (sum, current) => sum + Number(current.cost_str),
              0,
            )
          : 0;
        setGetMaintenanceRecordsTotalCostByCategoriesResponse({
          status: "success",
          message: response.message,
          result: response.result,
          totalCost,
        });
        setIsLoadingGetMaintenanceRecordsTotalCostByCategories(false);
      })(),

      // 記録のある年
      (async () => {
        setIsLoadingGetMaintenanceRecordsCalenderDateByYears(true);
        const response = await getMaintenanceRecordsCalenderDateByYears();

        if (response.success === false) {
          setGetMaintenanceRecordsCalenderDateByYearsResponse({
            status: "error",
            message: response.message,
            result: undefined,
          });
          setIsLoadingGetMaintenanceRecordsCalenderDateByYears(false);
          return;
        }

        setGetMaintenanceRecordsCalenderDateByYearsResponse({
          status: "success",
          message: response.message,
          result: response.result,
        });
        setIsLoadingGetMaintenanceRecordsCalenderDateByYears(false);
      })(),
    ]);
  }, [
    date,
    setGetMaintenanceRecordsTotalCostResponse,
    setIsLoadingGetMaintenanceRecordsTotalCost,
    setGetMaintenanceRecordsTotalCostByBikesResponse,
    setIsLoadingGetMaintenanceRecordsTotalCostByBikes,
    setGetMaintenanceRecordsTotalCostByCategoriesResponse,
    setIsLoadingGetMaintenanceRecordsTotalCostByCategories,
    setGetMaintenanceRecordsCalenderDateByYearsResponse,
    setIsLoadingGetMaintenanceRecordsCalenderDateByYears,
  ]);

  return <>{children}</>;
}
