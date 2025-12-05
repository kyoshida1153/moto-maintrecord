import { Breadcrumbs, Heading } from "@/components";
import MaintenanceCategoryCreatePageWrapper from "./_components/MaintenanceCategoryCreatePageWrapper";
import MaintenanceCategoryCreateForm from "./_components/MaintenanceCategoryCreateForm";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "カテゴリーの登録",
  };
}

export default function MaintenanceCategoryCreatePage() {
  return (
    <MaintenanceCategoryCreatePageWrapper>
      <div className="mb-4">
        <Breadcrumbs />
      </div>
      <Heading level={1}>カテゴリーの登録</Heading>
      <div className="max-w-lg">
        <MaintenanceCategoryCreateForm />
      </div>
    </MaintenanceCategoryCreatePageWrapper>
  );
}
