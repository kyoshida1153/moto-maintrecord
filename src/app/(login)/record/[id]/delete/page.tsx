import Heading from "@/components/Heading";
import MaintenanceRecordDeleteForm from "./_components/MaintenanceRecordDeleteForm";

export default function MaintenanceRecordDeletePage() {
  return (
    <>
      <Heading level={1}>整備・出費記録の削除</Heading>
      <MaintenanceRecordDeleteForm />
    </>
  );
}
