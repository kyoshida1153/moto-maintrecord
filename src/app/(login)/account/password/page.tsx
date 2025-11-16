import { Heading } from "@/components";
import UserPasswordEditForm from "./_components/UserPasswordEditForm";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "パスワードの変更",
  };
}

export default function AccountPasswordEditPage() {
  return (
    <>
      <Heading level={1}>パスワードの変更</Heading>
      <UserPasswordEditForm />
    </>
  );
}
