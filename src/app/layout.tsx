import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

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
  return (
    <html lang="ja">
      <body className={`${notoSansJp.variable} relative antialiased`}>
        <Header />
        <div className="block md:grid md:grid-cols-[220px_1fr]">
          <div className="hidden md:col-span-1 md:block">
            <Sidebar />
          </div>
          <main className="md:col-span-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
