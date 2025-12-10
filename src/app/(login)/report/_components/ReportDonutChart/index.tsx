"use client";

import { Loading } from "@/components";
import ReportDonutChartByBikes from "./ReportDonutChartByBikes";
import ReportDonutChartByCategories from "./ReportDonutChartByCategories";
import { useReportDonutChartStore } from "./stores";

export default function ReportDonutChart() {
  const { isLoadingReportDonutChart } = useReportDonutChartStore();

  return (
    <>
      {isLoadingReportDonutChart ? (
        <div className="flex w-full justify-center">
          <Loading size="36px" />
        </div>
      ) : (
        <div className="flex w-full flex-col items-center gap-4 rounded border border-solid border-[var(--border-color-gray)] bg-white px-4 py-6 md:px-0 md:py-8 lg:flex-row lg:items-start lg:justify-evenly">
          <ReportDonutChartByBikes />
          <div className="block w-full border-t border-[var(--border-color-gray)] lg:hidden"></div>
          <ReportDonutChartByCategories />
        </div>
      )}
    </>
  );
}
