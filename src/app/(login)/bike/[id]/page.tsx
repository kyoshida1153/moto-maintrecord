import { Heading } from "@/components";
import BikeDetail from "./_components/BikeDetail";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "所有バイクの詳細",
  };
}

export default async function BikeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <Heading level={1}>所有バイクの詳細</Heading>
      <div className="max-w-3xl">
        <BikeDetail bikeId={id} />
      </div>
    </>
  );
}
