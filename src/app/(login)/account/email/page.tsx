import { Breadcrumbs, Heading } from "@/components";
import UserEmailEditForm from "./_components/UserEmailEditForm";
import type { Metadata } from "next";
import AccountEmailEditPageWrapper from "./_components/AccountEmailEditPageWrapper";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "メールアドレスの変更",
  };
}

export default function AccountEmailEditPage() {
  return (
    <AccountEmailEditPageWrapper>
      <div className="mb-4">
        <Breadcrumbs />
      </div>
      <Heading level={1}>メールアドレスの変更</Heading>
      <div className="max-w-lg">
        <UserEmailEditForm />
      </div>
    </AccountEmailEditPageWrapper>
  );
}
