import BikeEditForm from "@/components/BikeEditForm";
import Heading from "@/components/Heading";

export default function BikeEditPage() {
  return (
    <>
      <Heading level={1}>所有バイクの編集</Heading>
      <BikeEditForm />
    </>
  );
}
