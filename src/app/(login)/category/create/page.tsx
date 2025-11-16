import { Heading } from "@/components";
import MaintenanceCategoryCreateForm from "./_components/MaintenanceCategoryCreateForm";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "カテゴリーの登録",
  };
}

export default function MaintenanceCategoryCreatePage() {
  return (
    <>
      <Heading level={1}>カテゴリーの登録</Heading>
      <MaintenanceCategoryCreateForm />
    </>
  );
}
