import Heading from "@/components/Heading";
import MaintenanceCategoryCreateForm from "./_components/MaintenanceCategoryCreateForm";

export default function MaintenanceCategoryCreatePage() {
  return (
    <>
      <Heading level={1}>カテゴリーの登録</Heading>
      <MaintenanceCategoryCreateForm />
    </>
  );
}
