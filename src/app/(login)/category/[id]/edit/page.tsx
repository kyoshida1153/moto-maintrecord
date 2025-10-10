import CategoryEditForm from "@/components/CategoryEditForm";
import Heading from "@/components/Heading";

export default function CategoryEditPage() {
  return (
    <>
      <Heading level={1}>カテゴリーの編集</Heading>
      <CategoryEditForm />
    </>
  );
}
