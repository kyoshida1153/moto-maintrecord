import Heading from "@/components/Heading";
import MaintenanceRecordCreateForm from "./_components/MaintenanceRecordCreateForm";

export default function MaintenanceRecordCreatePage() {
  return (
    <>
      <Heading level={1}>整備・出費記録の登録</Heading>
      <MaintenanceRecordCreateForm />
    </>
  );
}
