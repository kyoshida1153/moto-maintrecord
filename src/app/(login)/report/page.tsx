import { Breadcrumbs, Heading } from "@/components";
import ReportPageWrapper from "./_components/ReportPageWrapper";
import ReportNavigation from "./_components/ReportNavigation";
import ReportBarChart from "./_components/ReportBarChart";
import ReportDonutChartByBikes from "./_components/ReportDonutChartByBikes";
import ReportDonutChartByCategories from "./_components/ReportDonutChartByCategories";
import ReportTable from "./_components/ReportTable";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "レポート",
  };
}

export default function ReportPage() {
  return (
    <ReportPageWrapper>
      <div className="mb-4">
        <Breadcrumbs />
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
        <Heading level={1}>レポート</Heading>
        <div className="mb-4 md:mb-6">
          <ReportNavigation />
        </div>
      </div>
      <div className="flex flex-col gap-6 md:gap-8">
        <div className="flex flex-col gap-6 md:gap-8 xl:flex-row">
          <div className="flex w-full max-w-4xl flex-col gap-6 md:gap-8">
            <section className="display rounded border border-solid border-[var(--border-color-gray)] bg-white py-6 md:py-8">
              <ReportBarChart />
            </section>
            <section className="flex w-full flex-col items-center gap-4 rounded border border-solid border-[var(--border-color-gray)] bg-white px-4 py-6 md:px-0 md:py-8 lg:flex-row lg:items-start lg:justify-evenly">
              <ReportDonutChartByBikes />
              <div className="block w-full border-t border-[var(--border-color-gray)] lg:hidden"></div>
              <ReportDonutChartByCategories />
            </section>
          </div>
          <div className="w-full max-w-4xl xl:max-w-sm">
            <section className="display flex h-fit justify-center rounded border border-solid border-[var(--border-color-gray)] bg-white px-6 py-6 md:px-8 md:py-8">
              <ReportTable />
            </section>
          </div>
        </div>
      </div>
    </ReportPageWrapper>
  );
}
