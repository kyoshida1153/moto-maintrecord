import { Breadcrumbs, Heading } from "@/components";
import MaintenanceRecordCreatePageWrapper from "./_components/MaintenanceRecordCreatePageWrapper";
import MaintenanceRecordsCreateForm from "./_components/MaintenanceRecordsCreateForm";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "整備・出費記録の登録",
  };
}

export default function MaintenanceRecordCreatePage() {
  return (
    <MaintenanceRecordCreatePageWrapper>
      <div className="mb-4">
        <Breadcrumbs />
      </div>
      <Heading level={1}>整備・出費記録の登録</Heading>
      <div className="max-w-lg">
        <MaintenanceRecordsCreateForm />
      </div>
    </MaintenanceRecordCreatePageWrapper>
  );
}
