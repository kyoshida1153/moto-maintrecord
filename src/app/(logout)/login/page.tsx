import type { Metadata } from "next";
import LoginForm from "./_components/LoginForm";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "ログイン",
  };
}

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-var(--header-height)-32px-var(--footer-height))] items-center justify-center md:min-h-[calc(100vh-var(--header-height)-64px-var(--footer-height))]">
      <div className="w-full max-w-lg">
        <LoginForm />
      </div>
    </div>
  );
}
