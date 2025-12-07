import { Breadcrumbs, Heading } from "@/components";
import UserPasswordEditForm from "./_components/UserPasswordEditForm";
import AccountPasswordEditPageWrapper from "./AccountPasswordEditPageWrapper";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "パスワードの変更",
  };
}

export default function AccountPasswordEditPage() {
  return (
    <AccountPasswordEditPageWrapper>
      <div className="mb-4">
        <Breadcrumbs />
      </div>
      <Heading level={1}>パスワードの変更</Heading>
      <div className="max-w-lg">
        <UserPasswordEditForm />
      </div>
    </AccountPasswordEditPageWrapper>
  );
}
