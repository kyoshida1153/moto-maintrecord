import CategoryCreateForm from "@/components/CategoryCreateForm";
import Heading from "@/components/Heading";

export default function CategoryCreatePage() {
  return (
    <>
      <Heading level={1}>カテゴリーの登録</Heading>
      <CategoryCreateForm />
    </>
  );
}
