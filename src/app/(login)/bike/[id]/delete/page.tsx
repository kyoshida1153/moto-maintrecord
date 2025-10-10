import Heading from "@/components/Heading";
import BikeDeleteForm from "@/components/BikeDeleteForm";

export default function BikeDeletePage() {
  return (
    <div className="w-full">
      <Heading level={1}>所有バイクの削除</Heading>
      <BikeDeleteForm />
    </div>
  );
}
