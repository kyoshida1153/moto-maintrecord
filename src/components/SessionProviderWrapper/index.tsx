"use client";

import { SessionProvider } from "next-auth/react";

// 認証コンテキスト
export default function SessionProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
