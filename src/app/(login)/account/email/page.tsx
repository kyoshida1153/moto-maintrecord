import { Heading } from "@/components";
import UserEmailEditForm from "./_components/UserEmailEditForm";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "メールアドレスの変更",
  };
}

export default function AccountEmailEditPage() {
  return (
    <>
      <Heading level={1}>メールアドレスの変更</Heading>
      <div className="max-w-lg">
        <UserEmailEditForm />
      </div>
    </>
  );
}
