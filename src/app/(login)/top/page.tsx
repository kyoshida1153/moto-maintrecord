import AddIcon from "@mui/icons-material/Add";
import { LinkButton, MaintenanceRecordsList } from "@/components";
import MaintenanceRecordsCalendar from "./_components/MaintenanceRecordsCalendar";
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
      <div className="mb-6 text-center md:mb-8 md:text-left">
        <LinkButton
          href="/record/create"
          startIcon={<AddIcon />}
          variant="contained"
        >
          新しい整備・出費記録
        </LinkButton>
      </div>
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
