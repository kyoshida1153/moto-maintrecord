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
import { useReportDonutChartStore } from "../ReportDonutChart/stores";
import { useReportTableStore } from "../ReportTable/stores";
import { useReportNavigationStore } from "../ReportNavigation/stores";

export default function ReportPageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setBreadcrumbItems, setIsLoadingBreadcrumbs } = useBreadcrumbsStore();
  const {
    setGetMaintenanceRecordsCalenderDateByYearsResponse,
    setIsLoadingReportNavigation,
  } = useReportNavigationStore();
  const {
    setGetMaintenanceRecordsTotalCostResponse,
    setIsLoadingReportBarChart,
  } = useReportBarChartStore();
  const {
    setGetMaintenanceRecordsTotalCostByBikesResponse,
    setGetMaintenanceRecordsTotalCostByCategoriesResponse,
    setIsLoadingReportDonutChart,
  } = useReportDonutChartStore();
  const {
    setGetMaintenanceRecordsTotalCostResponse:
      setGetMaintenanceRecordsTotalCostResponseTable,
    setIsLoadingReportTable,
  } = useReportTableStore();

  const searchParams = useSearchParams();
  const date = searchParams.get("date") || "";

  useEffect(() => {
    setIsLoadingBreadcrumbs(true);
    setIsLoadingReportNavigation(true);
    setIsLoadingReportBarChart(true);
    setIsLoadingReportDonutChart(true);
    setIsLoadingReportTable(true);

    Promise.all([
      // パンくずリスト
      (async () => {
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
      })(),

      // ReportBarChart, ReportTable用のデータをセット
      (async () => {
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

          setGetMaintenanceRecordsTotalCostResponseTable({
            status: "error",
            message: response.message,
            result: undefined,
            totalCost: 0,
          });
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

        setGetMaintenanceRecordsTotalCostResponseTable({
          status: "success",
          message: response.message,
          result: response.result,
          groupBy,
          totalCost,
        });
      })(),

      // ReportDonutChartByBikes用のデータをセット
      (async () => {
        const response = await getMaintenanceRecordsTotalCostByBikes({ date });

        if (response.success === false) {
          setGetMaintenanceRecordsTotalCostByBikesResponse({
            status: "error",
            message: response.message,
            result: undefined,
            totalCost: 0,
          });
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
      })(),

      // ReportDonutChartByCategories用のデータをセット
      (async () => {
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
      })(),

      // ReportNavigation用のデータをセット
      (async () => {
        const response = await getMaintenanceRecordsCalenderDateByYears();

        if (response.success === false) {
          setGetMaintenanceRecordsCalenderDateByYearsResponse({
            status: "error",
            message: response.message,
            result: undefined,
          });
          return;
        }

        setGetMaintenanceRecordsCalenderDateByYearsResponse({
          status: "success",
          message: response.message,
          result: response.result,
        });
      })(),
    ]).then(() => {
      setIsLoadingBreadcrumbs(false);
      setIsLoadingReportNavigation(false);
      setIsLoadingReportBarChart(false);
      setIsLoadingReportDonutChart(false);
      setIsLoadingReportTable(false);
    });
  }, [
    date,
    setBreadcrumbItems,
    setIsLoadingBreadcrumbs,

    setGetMaintenanceRecordsTotalCostResponse,
    setIsLoadingReportBarChart,

    setGetMaintenanceRecordsTotalCostResponseTable,
    setIsLoadingReportTable,

    setGetMaintenanceRecordsTotalCostByBikesResponse,
    setGetMaintenanceRecordsTotalCostByCategoriesResponse,
    setIsLoadingReportDonutChart,

    setGetMaintenanceRecordsCalenderDateByYearsResponse,
    setIsLoadingReportNavigation,
  ]);

  return <>{children}</>;
}
