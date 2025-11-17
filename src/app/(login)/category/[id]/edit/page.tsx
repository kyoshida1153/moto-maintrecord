import { Heading } from "@/components";
import MaintenanceCategoryEditForm from "./_components/MaintenanceCategoryEditForm";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "カテゴリーの編集",
  };
}

export default async function MaintenanceCategoryEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <>
      <Heading level={1}>カテゴリーの編集</Heading>
      <div className="max-w-lg">
        <MaintenanceCategoryEditForm maintenanceCategoryId={id} />
      </div>
    </>
  );
}
