"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import {
  getMaintenanceRecordsTotalCostByMonthly,
  getMaintenanceRecordsTotalCostByDays,
  getMaintenanceRecordsTotalCostByBikes,
  getMaintenanceRecordsTotalCostByCategories,
  getMaintenanceRecordsCalenderDateByYears,
} from "@/lib/api";
import { isDateYyyyMm } from "@/utils";

import useReportBarChartStore from "../ReportBarChart/store";
import useReportTableStore from "../ReportTable/store";
import useReportDonutChartByBikesStore from "../ReportDonutChartByBikes/store";
import useReportDonutChartByCategoriesStore from "../ReportDonutChartByCategories/store";
import useReportNavigationStore from "../ReportNavigation/store";

export default function ReportPageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    setGetMaintenanceRecordsTotalCostResponse,
    setIsLoadingGetMaintenanceRecordsTotalCost,
  } = useReportBarChartStore();
  const {
    setGetMaintenanceRecordsTotalCostResponse:
      setGetMaintenanceRecordsTotalCostResponseTable,
    setIsLoadingGetMaintenanceRecordsTotalCost:
      setIsLoadingGetMaintenanceRecordsTotalCostTable,
  } = useReportTableStore();
  const {
    setGetMaintenanceRecordsTotalCostByBikesResponse,
    setIsLoadingGetMaintenanceRecordsTotalCostByBikes,
  } = useReportDonutChartByBikesStore();
  const {
    setGetMaintenanceRecordsTotalCostByCategoriesResponse,
    setIsLoadingGetMaintenanceRecordsTotalCostByCategories,
  } = useReportDonutChartByCategoriesStore();
  const {
    setGetMaintenanceRecordsCalenderDateByYearsResponse,
    setIsLoadingGetMaintenanceRecordsCalenderDateByYears,
  } = useReportNavigationStore();

  const searchParams = useSearchParams();
  const date = searchParams.get("date") || "";

  useEffect(() => {
    Promise.all([
      // 月別 or 日別の出費（棒グラフ、表）
      (async () => {
        setIsLoadingGetMaintenanceRecordsTotalCost(true);
        setIsLoadingGetMaintenanceRecordsTotalCostTable(true);

        const groupBy = isDateYyyyMm(date) ? "day" : "month";

        const response =
          groupBy === "day"
            ? await getMaintenanceRecordsTotalCostByDays({ date })
            : await getMaintenanceRecordsTotalCostByMonthly({ date });

        if (response.success === false) {
          setGetMaintenanceRecordsTotalCostResponse({
            status: "error",
            message: response.message,
            result: undefined,
            totalCost: 0,
          });
          setIsLoadingGetMaintenanceRecordsTotalCost(false);

          setGetMaintenanceRecordsTotalCostResponseTable({
            status: "error",
            message: response.message,
            result: undefined,
            totalCost: 0,
          });
          setIsLoadingGetMaintenanceRecordsTotalCostTable(false);
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

        setGetMaintenanceRecordsTotalCostResponseTable({
          status: "success",
          message: response.message,
          result: response.result,
          groupBy,
          totalCost,
        });
        setIsLoadingGetMaintenanceRecordsTotalCostTable(false);
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
    setGetMaintenanceRecordsTotalCostResponseTable,
    setIsLoadingGetMaintenanceRecordsTotalCostTable,
    setGetMaintenanceRecordsTotalCostByBikesResponse,
    setIsLoadingGetMaintenanceRecordsTotalCostByBikes,
    setGetMaintenanceRecordsTotalCostByCategoriesResponse,
    setIsLoadingGetMaintenanceRecordsTotalCostByCategories,
    setGetMaintenanceRecordsCalenderDateByYearsResponse,
    setIsLoadingGetMaintenanceRecordsCalenderDateByYears,
  ]);

  return <>{children}</>;
}
