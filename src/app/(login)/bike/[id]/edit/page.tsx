import { Breadcrumbs, Heading } from "@/components";
import BikeEditForm from "./_components/BikeEditForm";
import BikeEditPageWrapper from "./_components/BikeEditPageWrapper";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "所有バイクの編集",
  };
}

export default async function BikeEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <BikeEditPageWrapper bikeId={id}>
      <div className="mb-4">
        <Breadcrumbs />
      </div>
      <Heading level={1}>所有バイクの編集</Heading>
      <div className="max-w-lg">
        <BikeEditForm />
      </div>
    </BikeEditPageWrapper>
  );
}
