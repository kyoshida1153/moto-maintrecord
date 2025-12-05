import { Breadcrumbs, Heading } from "@/components";
import BikeCreateForm from "./_components/BikeCreateForm";
import type { Metadata } from "next";
import BikeCreatePageWrapper from "./_components/BikeCreatePageWrapper";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "所有バイクの登録",
  };
}

export default function BikeCreatePage() {
  return (
    <BikeCreatePageWrapper>
      <div className="mb-4">
        <Breadcrumbs />
      </div>
      <Heading level={1}>所有バイクの登録</Heading>
      <div className="max-w-lg">
        <BikeCreateForm />
      </div>
    </BikeCreatePageWrapper>
  );
}
