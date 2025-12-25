import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import SessionProviderWrapper from "./_components/SessionProviderWrapper";

const appName = process.env.NEXT_PUBLIC_APP_NAME;
if (!appName) {
  throw new Error("NEXT_PUBLIC_APP_NAME が設定されていません。");
}

const appNameSub = process.env.NEXT_PUBLIC_APP_NAME_SUB;
if (!appNameSub) {
  throw new Error("NEXT_PUBLIC_APP_NAME_SUB が設定されていません。");
}

const appUrl = process.env.NEXT_PUBLIC_APP_URL;
if (!appUrl) {
  throw new Error("NEXT_PUBLIC_APP_URL が設定されていません。");
}

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    template: `%s | ${appName}: ${appNameSub}`,
    default: `${appName}: ${appNameSub}`,
  },
};

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  fallback: ["Hiragino Sans", "Hiragino Kaku Gothic ProN", "sans-serif"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <meta name="robots" content="noindex" />
      </head>
      <body
        className={`${notoSansJp.variable} relative bg-[#f0f2f5] antialiased`}
      >
        <SessionProviderWrapper>{children}</SessionProviderWrapper>
      </body>
    </html>
  );
}
