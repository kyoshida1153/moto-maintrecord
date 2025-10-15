"use client";

import { useEffect } from "react";
import { useRouter, redirect } from "next/navigation";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function LoginSuccess() {
  const router = useRouter();

  useEffect(() => {
    console.log("refresh");
    router.refresh();

    setTimeout(() => {
      redirect("/");
    }, 1500);
  }, []);

  return (
    <div className="flex h-[calc(100vh-var(--header-height)-48px)] items-center justify-center md:h-[calc(100vh-var(--header-height)-64px)]">
      <div className="m-4 mx-auto w-full max-w-lg rounded bg-white p-6 shadow-md shadow-gray-300/50 md:p-8">
        <h1 className="mb-6 text-center text-xl md:mb-8 md:text-2xl">
          ログイン
        </h1>
        <p className="my-6 flex justify-center md:my-8">
          <CheckCircleIcon
            sx={{ fontSize: "1.6em", color: "var(--icon-color-success)" }}
          />
          <span>ログインに成功しました。</span>
        </p>
      </div>
    </div>
  );
}
