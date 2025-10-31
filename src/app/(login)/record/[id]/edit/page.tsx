import Heading from "@/components/Heading";
import MaintenanceRecordEditForm from "./_components/MaintenanceRecordEditForm";
import type { Metadata } from "next";

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
    <>
      <Heading level={1}>整備・出費記録の編集</Heading>
      <MaintenanceRecordEditForm maintenanceRecordId={id} />
    </>
  );
}
