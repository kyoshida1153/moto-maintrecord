import { Breadcrumbs, Heading } from "@/components";
import ReportPageWrapper from "./_components/ReportPageWrapper";
import ReportNavigation from "./_components/ReportNavigation";
import ReportBarChart from "./_components/ReportBarChart";
import ReportDonutChart from "./_components/ReportDonutChart";
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
        <section className="mb-4 md:mb-6">
          <ReportNavigation />
        </section>
      </div>
      <div className="flex flex-col gap-6 md:gap-8">
        <div className="flex flex-col gap-6 md:gap-8 xl:flex-row">
          <section className="flex w-full max-w-4xl flex-col gap-6 md:gap-8">
            <ReportBarChart />
            <ReportDonutChart />
          </section>
          <section className="w-full max-w-4xl xl:max-w-sm">
            <ReportTable />
          </section>
        </div>
      </div>
    </ReportPageWrapper>
  );
}
