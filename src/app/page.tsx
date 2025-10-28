import { redirect } from "next/navigation";
import MaintenanceRecordsCalendar from "./(login)/_components/MaintenanceRecordsCalendar";
import MaintenanceRecordsList from "@/components/MaintenanceRecordsList";
import getCurrentUser from "@/actions/getCurrentUser";
import TopPageWrapper from "./(login)/_components/TopPageWrapper";
import MaintenanceRecordsTotalCost from "./(login)/_components/MaintenanceRecordsTotalCost";

export default async function TopPage() {
  // ログアウト状態の時は、ログインページにリダイレクト
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect("/login");
  }

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
