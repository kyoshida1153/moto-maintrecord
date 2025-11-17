import type { Metadata } from "next";
import SignupForm from "./_components/SignupForm";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "アカウント作成",
  };
}

export default function SignupPage() {
  return (
    <div className="flex h-[calc(100vh-var(--header-height)-32px)] items-center justify-center md:h-[calc(100vh-var(--header-height)-64px)]">
      <div className="w-full max-w-lg">
        <SignupForm />
      </div>
    </div>
  );
}
