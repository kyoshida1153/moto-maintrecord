import { Breadcrumbs, Heading } from "@/components";
import BikeDeleteForm from "./_components/BikeDeleteForm";
import type { Metadata } from "next";
import BikeDeletePageWrapper from "./_components/BikeDeletePageWrapper";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "所有バイクの削除",
  };
}

export default async function BikeDeletePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <BikeDeletePageWrapper bikeId={id}>
      <div className="mb-4">
        <Breadcrumbs />
      </div>
      <Heading level={1}>所有バイクの削除</Heading>
      <div className="max-w-xl">
        <BikeDeleteForm />
      </div>
    </BikeDeletePageWrapper>
  );
}
