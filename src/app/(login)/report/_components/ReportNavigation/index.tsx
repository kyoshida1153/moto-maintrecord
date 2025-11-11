"use client";

import ReportNavigationByYears from "./ReportNavigationByYears";
import ReportNavigationByMonthly from "./ReportNavigationByMonthly";

export default function ReportNavigation() {
  return (
    <section className="flex max-w-[220px] gap-2">
      <ReportNavigationByYears />
      <ReportNavigationByMonthly />
    </section>
  );
}
