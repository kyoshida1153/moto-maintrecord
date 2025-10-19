"use client";

import { useEffect } from "react";
import { useRouter, redirect } from "next/navigation";
import Loading from "@/components/Loading";

export default function RefreshContent() {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
    setTimeout(() => {
      redirect("/");
    }, 1500);
  }, []);

  return (
    <div className="flex h-[calc(100vh-var(--header-height)-48px)] items-center justify-center md:h-[calc(100vh-var(--header-height)-64px)]">
      <div className="m-4 mx-auto w-full max-w-lg rounded bg-white p-6 shadow-md shadow-gray-300/50 md:p-8">
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="flex items-center gap-1">
            <Loading size="24px" />
            <span>読み込み中</span>
          </p>
        </div>
      </div>
    </div>
  );
}
