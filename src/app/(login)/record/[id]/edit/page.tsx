import { Breadcrumbs, Heading } from "@/components";
import MaintenanceRecordEditForm from "./_components/MaintenanceRecordEditForm";
import type { Metadata } from "next";
import MaintenanceRecordEditPageWrapper from "./_components/MaintenanceRecordEditPageWrapper";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "整備・出費記録の編集",
  };
}

export default async function MaintenanceRecordEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <MaintenanceRecordEditPageWrapper maintenanceRecordId={id}>
      <div className="mb-4">
        <Breadcrumbs />
      </div>
      <Heading level={1}>整備・出費記録の編集</Heading>
      <div className="max-w-lg">
        <MaintenanceRecordEditForm />
      </div>
    </MaintenanceRecordEditPageWrapper>
  );
}
