import Heading from "@/components/Heading";
import BikeCreateForm from "./_components/BikeCreateForm";

export default function BikeCreatePage() {
  return (
    <>
      <Heading level={1}>所有バイクの登録</Heading>
      <BikeCreateForm />
    </>
  );
}
