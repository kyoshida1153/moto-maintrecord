import BikeCreateForm from "@/components/BikeCreateForm";
import Heading from "@/components/Heading";

export default function BikeCreatePage() {
  return (
    <>
      <Heading level={1}>所有バイクの登録</Heading>
      <BikeCreateForm />
    </>
  );
}
