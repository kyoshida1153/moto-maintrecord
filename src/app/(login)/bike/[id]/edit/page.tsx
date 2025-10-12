import Heading from "@/components/Heading";
import BikeEditForm from "./_components/BikeEditForm";

export default function BikeEditPage() {
  return (
    <>
      <Heading level={1}>所有バイクの編集</Heading>
      <BikeEditForm />
    </>
  );
}
