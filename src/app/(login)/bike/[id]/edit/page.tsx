import { Heading } from "@/components";
import BikeEditForm from "./_components/BikeEditForm";
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
    <>
      <Heading level={1}>所有バイクの編集</Heading>
      <BikeEditForm bikeId={id} />
    </>
  );
}
