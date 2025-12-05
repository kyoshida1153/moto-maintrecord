import { Breadcrumbs, Heading } from "@/components";
import MaintenanceCategoryEditForm from "./_components/MaintenanceCategoryEditForm";
import MaintenanceCategoryEditPageWrapper from "./_components/MaintenanceCategoryEditPageWrapper";
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
    <MaintenanceCategoryEditPageWrapper maintenanceCategoryId={id}>
      <div className="mb-4">
        <Breadcrumbs />
      </div>
      <Heading level={1}>カテゴリーの編集</Heading>
      <div className="max-w-lg">
        <MaintenanceCategoryEditForm />
      </div>
    </MaintenanceCategoryEditPageWrapper>
  );
}
