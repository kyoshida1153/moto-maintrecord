import Heading from "@/components/Heading";
import BikeDeleteForm from "./_components/BikeDeleteForm";

export default function BikeDeletePage() {
  return (
    <>
      <Heading level={1}>所有バイクの削除</Heading>
      <BikeDeleteForm />
    </>
  );
}
