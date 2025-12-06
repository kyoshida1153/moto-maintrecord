import { Breadcrumbs, Heading } from "@/components";
import MaintenanceRecordDetailPageWrapper from "./_components/MaintenanceRecordDetailPageWrapper";
import MaintenanceRecordDetail from "./_components/MaintenanceRecordDetail";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "整備・出費記録の詳細",
  };
}

export default async function MaintenanceRecordDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <MaintenanceRecordDetailPageWrapper maintenanceRecordId={id}>
      <div className="mb-4">
        <Breadcrumbs />
      </div>
      <Heading level={1}>整備・出費記録の詳細</Heading>
      <div className="max-w-3xl">
        <MaintenanceRecordDetail />
      </div>
    </MaintenanceRecordDetailPageWrapper>
  );
}
