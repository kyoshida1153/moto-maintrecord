import Heading from "@/components/Heading";
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
      <UserEmailEditForm />
    </>
  );
}
