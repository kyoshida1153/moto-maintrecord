import { Heading } from "@/components";
import UserDeleteForm from "./_components/UserDeleteForm";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "アカウントの削除",
  };
}
export default function AccountDeletePage() {
  return (
    <>
      <Heading level={1}>アカウントの削除</Heading>
      <div className="max-w-lg">
        <UserDeleteForm />
      </div>
    </>
  );
}
