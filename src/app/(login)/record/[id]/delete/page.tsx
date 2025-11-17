import { Heading } from "@/components";
import MaintenanceRecordDeleteForm from "./_components/MaintenanceRecordDeleteForm";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "整備・出費記録の削除",
  };
}

export default async function MaintenanceRecordDeletePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <>
      <Heading level={1}>整備・出費記録の削除</Heading>
      <div className="max-w-xl">
        <MaintenanceRecordDeleteForm maintenanceRecordId={id} />
      </div>
    </>
  );
}
