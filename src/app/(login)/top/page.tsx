import MaintenanceRecordsCalendar from "./_components/MaintenanceRecordsCalendar";
import MaintenanceRecordsList from "@/components/MaintenanceRecordsList";
import TopPageWrapper from "./_components/TopPageWrapper";
import MaintenanceRecordsTotalCost from "./_components/MaintenanceRecordsTotalCost";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "カレンダー",
  };
}

export default async function TopPage() {
  return (
    <TopPageWrapper>
      <div className="mb-4 md:mb-6">
        <MaintenanceRecordsTotalCost />
      </div>
      <div className="mb-8 flex flex-col gap-8 md:mb-0 xl:flex-row">
        <div className="xl:w-[50%]">
          <MaintenanceRecordsCalendar />
        </div>
        <div className="flex flex-col gap-4 xl:w-[50%]">
          <MaintenanceRecordsList pagination={false} />
        </div>
      </div>
    </TopPageWrapper>
  );
}
