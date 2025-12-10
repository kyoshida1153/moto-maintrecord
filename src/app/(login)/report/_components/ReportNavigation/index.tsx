"use client";

import { Loading } from "@/components";
import ReportNavigationByYears from "./ReportNavigationByYears";
import ReportNavigationByMonthly from "./ReportNavigationByMonthly";
import { useReportNavigationStore } from "./stores";

export default function ReportNavigation() {
  const { isLoadingReportNavigation } = useReportNavigationStore();

  return (
    <>
      {isLoadingReportNavigation ? (
        <div className="flex w-full justify-center py-4 md:w-[250px]">
          <Loading size="24px" />
        </div>
      ) : (
        <div className="flex gap-2">
          <ReportNavigationByYears />
          <ReportNavigationByMonthly />
        </div>
      )}
    </>
  );
}
