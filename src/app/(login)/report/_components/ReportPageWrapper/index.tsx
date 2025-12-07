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
import { isDateYyyy, isDateYyyyMm } from "@/utils";

import { useBreadcrumbsStore } from "@/components/Breadcrumbs/stores";
import { useReportBarChartStore } from "../ReportBarChart/stores";
import { useReportTableStore } from "../ReportTable/stores";
import { useReportDonutChartByBikesStore } from "../ReportDonutChartByBikes/stores";
import { useReportDonutChartByCategoriesStore } from "../ReportDonutChartByCategories/stores";
import { useReportNavigationStore } from "../ReportNavigation/stores";

export default function ReportPageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setBreadcrumbItems, setIsLoadingBreadcrumbs } = useBreadcrumbsStore();
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
      // パンくずリストの設定
      (async () => {
        setIsLoadingBreadcrumbs(true);

        const bradcrumbItems = [];

        if (isDateYyyy(date)) {
          bradcrumbItems.push({
            text: "レポート",
            href: "/report",
          });
          bradcrumbItems.push({
            text: `${date}年`,
          });
        } else if (isDateYyyyMm(date)) {
          const year = date.split("-")[0];
          const month = date.split("-")[1].replace(/^0+/, "");

          bradcrumbItems.push({
            text: "レポート",
            href: "/report",
          });
          bradcrumbItems.push({
            text: `${year}年${month}月`,
          });
        } else {
          bradcrumbItems.push({
            text: "レポート",
          });
        }

        setBreadcrumbItems(bradcrumbItems);
        setIsLoadingBreadcrumbs(false);
      })(),

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
    setBreadcrumbItems,
    setIsLoadingBreadcrumbs,
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
