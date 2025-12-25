import type { Metadata } from "next";
import SignupForm from "./_components/SignupForm";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "アカウント作成",
  };
}

export default function SignupPage() {
  return (
    <div className="flex min-h-[calc(100vh-var(--header-height)-32px-var(--footer-height))] items-center justify-center md:min-h-[calc(100vh-var(--header-height)-64px-var(--footer-height))]">
      <div className="w-full max-w-lg">
        <SignupForm />
      </div>
    </div>
  );
}
