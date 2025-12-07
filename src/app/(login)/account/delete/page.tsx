import { Breadcrumbs, Heading } from "@/components";
import UserDeleteForm from "./_components/UserDeleteForm";
import AccountDeletePageWrapper from "./_components/AccountDeletePageWrapper";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "アカウントの削除",
  };
}
export default function AccountDeletePage() {
  return (
    <AccountDeletePageWrapper>
      <div className="mb-4">
        <Breadcrumbs />
      </div>
      <Heading level={1}>アカウントの削除</Heading>
      <div className="max-w-lg">
        <UserDeleteForm />
      </div>
    </AccountDeletePageWrapper>
  );
}
