"use client";

import { signIn } from "next-auth/react";
import { GoogleIcon } from "./GoogleIcon";

export function LoginButtonOAuth({ provider }: { provider: "google" }) {
  return (
    <div
      className="transition-bg flex justify-center rounded border border-gray-300 bg-gray-100 px-4 py-2 duration-200 hover:cursor-pointer hover:bg-gray-200"
      onClick={() => signIn(provider)}
    >
      <div className="flex items-center gap-2 text-sm font-[500]">
        {provider === "google" && (
          <>
            <GoogleIcon />
            Googleでログイン
          </>
        )}
      </div>
    </div>
  );
}
