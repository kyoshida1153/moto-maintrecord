import Heading from "@/components/Heading";
import CategoryDeleteForm from "@/components/CategoryDeleteForm";

export default function CategoryDeletePage() {
  return (
    <div className="w-full">
      <Heading level={1}>カテゴリーの削除</Heading>
      <CategoryDeleteForm />
    </div>
  );
}
