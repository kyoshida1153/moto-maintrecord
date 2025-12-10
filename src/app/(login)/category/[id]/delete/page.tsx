import { Breadcrumbs, Heading } from "@/components";
import MaintenanceCategoryDeleteForm from "./_components/MaintenanceCategoryDeleteForm";
import MaintenanceCategoryDeletePageWrapper from "./_components/MaintenanceCategoryDeletePageWrapper";
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
    <MaintenanceCategoryDeletePageWrapper maintenanceCategoryId={id}>
      <div className="mb-4">
        <Breadcrumbs />
      </div>
      <div className="max-w-xl">
        <Heading level={1}>カテゴリーの削除</Heading>
        <MaintenanceCategoryDeleteForm />
      </div>
    </MaintenanceCategoryDeletePageWrapper>
  );
}
