import { Heading } from "@/components";
import BikeCreateForm from "./_components/BikeCreateForm";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "所有バイクの登録",
  };
}

export default function BikeCreatePage() {
  return (
    <>
      <Heading level={1}>所有バイクの登録</Heading>
      <div className="max-w-lg">
        <BikeCreateForm />
      </div>
    </>
  );
}
