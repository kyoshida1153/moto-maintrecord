import { Heading } from "@/components";
import MaintenanceCategoryDeleteForm from "./_components/MaintenanceCategoryDeleteForm";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "カテゴリーの削除",
  };
}

export default async function MaintenanceCategoryDeletePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="w-full max-w-xl">
      <Heading level={1}>カテゴリーの削除</Heading>
      <MaintenanceCategoryDeleteForm maintenanceCategoryId={id} />
    </div>
  );
}
