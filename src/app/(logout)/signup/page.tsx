import type { Metadata } from "next";
import SignupForm from "./_components/SignupForm";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "アカウント作成",
  };
}

export default function SignupPage() {
  return <SignupForm />;
}
