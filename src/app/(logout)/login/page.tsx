import type { Metadata } from "next";
import LoginForm from "./_components/LoginForm";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "ログイン",
  };
}

export default function LoginPage() {
  return <LoginForm />;
}
