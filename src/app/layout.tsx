import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import SessionProviderWrapper from "./_components/SessionProviderWrapper";

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  fallback: ["Hiragino Sans", "Hiragino Kaku Gothic ProN", "sans-serif"],
});

const appName = process.env.NEXT_PUBLIC_APP_NAME;
if (!appName) {
  throw new Error("NEXT_PUBLIC_APP_NAMEが設定されていません。");
}

const appDescription = process.env.NEXT_PUBLIC_APP_DESCRIPTION;
if (!appDescription) {
  throw new Error("NEXT_PUBLIC_APP_DESCRIPTIONが設定されていません。");
}

export const metadata: Metadata = {
  title: {
    template: `%s | ${appName}`,
    default: appName,
  },
  description: appDescription,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${notoSansJp.variable} relative bg-[#f0f2f5] antialiased`}
      >
        <SessionProviderWrapper>{children}</SessionProviderWrapper>
      </body>
    </html>
  );
}
