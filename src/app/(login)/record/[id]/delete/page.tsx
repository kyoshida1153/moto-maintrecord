import Heading from "@/components/Heading";
import RecordDeleteForm from "@/components/RecordDeleteForm";

export default function RecordDeletePage() {
  return (
    <div className="w-full">
      <Heading level={1}>整備・出費記録の削除</Heading>
      <RecordDeleteForm />
    </div>
  );
}
