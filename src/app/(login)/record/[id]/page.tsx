import Heading from "@/components/Heading";
import MaintenanceRecordDetail from "./_components/MaintenanceRecordDetail";

export default function MaintenanceRecordDetailPage() {
  return (
    <div className="w-full max-w-3xl">
      <p className="flex items-center gap-0.5 text-lg font-[500] md:text-xl">
        2025年1月1日
      </p>
      <Heading level={1}>オイル交換</Heading>
      <MaintenanceRecordDetail />
    </div>
  );
}
