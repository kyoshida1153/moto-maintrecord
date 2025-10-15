"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function CommonLayout({
  children,
  sessionExist,
}: {
  children: React.ReactNode;
  sessionExist: boolean;
}) {
  console.log("sessionExist", sessionExist);

  return sessionExist ? (
    // ログインユーザー
    <>
      <Header sessionExist={sessionExist} />
      <div className="block md:grid md:grid-cols-[var(--sidebar-width)_1fr]">
        <div className="hidden md:col-span-1 md:block">
          <Sidebar sessionExist={sessionExist} />
        </div>
        <main className="p-4 md:col-span-1 md:p-8">{children}</main>
      </div>
    </>
  ) : (
    // 非ログインユーザー
    <>
      <Header sessionExist={sessionExist} />
      <main className="p-4 md:p-8">{children}</main>
    </>
  );
}
