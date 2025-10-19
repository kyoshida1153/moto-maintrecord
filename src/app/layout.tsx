import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import getCurrentUser from "@/actions/getCurrentUser";
import CommonLayout from "@/components/CommonLayout";

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  fallback: ["Hiragino Sans", "Hiragino Kaku Gothic ProN", "sans-serif"],
});

export const metadata: Metadata = {
  title: {
    template: `%s | バイクの整備記録・出費管理アプリ`,
    default: "バイクの整備記録・出費管理アプリ",
  },
  description: "バイクの整備記録と維持費を管理するアプリ",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  const sessionExist: boolean = currentUser ? true : false;
  const userName: string = currentUser?.name as string;

  return (
    <html lang="ja">
      <body
        className={`${notoSansJp.variable} relative bg-[#f0f2f5] antialiased`}
      >
        <SessionProviderWrapper>
          <CommonLayout sessionExist={sessionExist} userName={userName}>
            {children}
          </CommonLayout>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
