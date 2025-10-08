import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  fallback: ["Hiragino Sans", "Hiragino Kaku Gothic ProN", "sans-serif"],
});

export const metadata: Metadata = {
  title: "バイクの整備記録・出費管理アプリ",
  description: "バイクの整備記録と維持費を管理するアプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loginStatus = true;

  return (
    <html lang="ja">
      <body
        className={`${notoSansJp.variable} relative antialiased ${loginStatus ? "bg-white" : "bg-[#f0f2f5]"}`}
      >
        {loginStatus ? (
          // ログインユーザー
          <>
            <Header loginStatus={loginStatus} />
            <div className="block md:grid md:grid-cols-[var(--sidebar-width)_1fr]">
              <div className="hidden md:col-span-1 md:block">
                <Sidebar />
              </div>
              <main className="p-4 md:col-span-1 md:p-8">{children}</main>
            </div>
          </>
        ) : (
          // 非ログインユーザー
          <>
            <Header loginStatus={loginStatus} />
            <main className="p-4 md:p-8">{children}</main>
          </>
        )}
      </body>
    </html>
  );
}
