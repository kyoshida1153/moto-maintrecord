import Heading from "@/components/Heading";
import MaintenanceRecordEditForm from "./_components/MaintenanceRecordEditForm";

export default function MaintenanceRecordEditPage() {
  return (
    <>
      <Heading level={1}>整備・出費記録の編集</Heading>
      <MaintenanceRecordEditForm />
    </>
  );
}
