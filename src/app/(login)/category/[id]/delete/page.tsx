import Heading from "@/components/Heading";
import MaintenanceCategoryDeleteForm from "./_components/MaintenanceCategoryDeleteForm";

export default function MaintenanceCategoryDeletePage() {
  return (
    <>
      <Heading level={1}>カテゴリーの削除</Heading>
      <MaintenanceCategoryDeleteForm />
    </>
  );
}
