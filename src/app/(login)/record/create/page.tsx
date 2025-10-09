import Heading from "@/components/Heading";
import RecordCreateForm from "@/components/RecordCreateForm";

export default function RecordCreatePage() {
  return (
    <>
      <Heading level={1}>整備・出費記録の登録</Heading>
      <RecordCreateForm />
    </>
  );
}
