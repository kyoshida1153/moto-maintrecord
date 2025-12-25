import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

import Image from "next/image";
import AddIcon from "@mui/icons-material/Add";
import LoginIcon from "@mui/icons-material/Login";

import Header from "./_components/Header";
import FeatureCard from "./(logout)/index/_components/FeatureCard";
import { LinkButton } from "@/components";

import type { Metadata } from "next";
import Footer from "./(logout)/_components/Footer";

const appName = process.env.NEXT_PUBLIC_APP_NAME;
if (!appName) {
  throw new Error("NEXT_PUBLIC_APP_NAME が設定されていません。");
}

const appNameSub = process.env.NEXT_PUBLIC_APP_NAME_SUB;
if (!appNameSub) {
  throw new Error("NEXT_PUBLIC_APP_NAME_SUB が設定されていません。");
}

const appDescription = process.env.NEXT_PUBLIC_APP_DESCRIPTION;
if (!appDescription) {
  throw new Error("NEXT_PUBLIC_APP_DESCRIPTION が設定されていません。");
}

const appUrl = process.env.NEXT_PUBLIC_APP_URL;
if (!appUrl) {
  throw new Error("NEXT_PUBLIC_APP_URL が設定されていません。");
}

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  description: appDescription,
  openGraph: {
    title: `${appName}: ${appNameSub}`,
    description: appDescription,
    url: "/",
    images: ["/assets/img/thumbnail-1200x630.min.png"],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  other: {
    thumbnail: "/assets/img/thumbnail-640x640.min.png",
  },
};

export default async function RootPage() {
  const session = await auth();
  if (session) {
    redirect("/top");
  }

  return (
    <>
      <Header isLogin={false} />
      <main>
        <div className="mb-8 h-full max-h-[800px] md:mb-0 md:p-8">
          <div className="mx-auto max-w-[1400px] bg-white">
            <div className="relative md:flex md:flex-row">
              <div className="absolute top-[50%] z-1 aspect-[3/1] max-h-[700px] w-full translate-y-[-100%] bg-[#ffffffb3] backdrop-blur-md md:static md:top-[0%] md:aspect-square md:w-[50%] md:translate-y-[0%] md:bg-white">
                <div className="flex h-full w-full items-center justify-center">
                  <div className="flex flex-col items-center">
                    <h1 className="w-[22vw] max-w-[350px] min-w-[260px] text-center leading-none">
                      <Image
                        src="/assets/img/logo.svg"
                        width={440}
                        height={40}
                        alt={process.env.NEXT_PUBLIC_APP_NAME || ""}
                        priority
                        className="h-full w-full"
                      />
                    </h1>
                    <span className="text-[clamp(16px,1.38vw,22px)] leading-none tracking-[0.01em] text-[#1E4051]">
                      {process.env.NEXT_PUBLIC_APP_NAME_SUB}
                    </span>
                  </div>
                </div>
              </div>

              <div className="aspect-square max-h-[700px] w-full md:w-[50%]">
                <div className="relative min-h-full min-w-full bg-[url(/assets/img/index/mv-bg-960x960.min.png)] bg-cover bg-no-repeat md:flex md:flex-row md:items-center md:justify-center">
                  <div className="absolute top-[75%] left-[50%] z-1 flex translate-x-[-50%] translate-y-[-50%] flex-col gap-2 md:static md:top-0 md:left-0 md:translate-none">
                    <LinkButton
                      href="/signup"
                      variant="outlined"
                      sx={{
                        fontSize: "16px",
                        px: "1.5em",
                        "@media screen and (min-width:48rem)": {
                          fontSize: "20px",
                        },
                      }}
                      startIcon={<AddIcon />}
                    >
                      アカウントを作成する
                    </LinkButton>
                    <LinkButton
                      href="/login"
                      variant="outlined"
                      sx={{
                        fontSize: "16px",
                        px: "1.5em",
                        "@media screen and (min-width:48rem)": {
                          fontSize: "20px",
                        },
                      }}
                      startIcon={<LoginIcon />}
                    >
                      ログイン
                    </LinkButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-[1200px] md:p-8">
          <section className="mx-4 flex max-w-[800px] flex-col gap-4 md:mx-auto">
            <p className="md:text-xl">
              <b>Moto MaintRecord</b>
              は、「バイクの維持費が毎月どれだけかかってるのか把握したい」「バイクの整備記録と出費記録をまとめて管理したい」といった方に向けたWebアプリです。
            </p>
          </section>

          <h2 className="mt-10 mb-8 text-center text-2xl font-[500] md:mt-20 md:mb-12 md:text-3xl">
            主な機能
          </h2>

          <div className="mx-4 my-8 flex max-w-5xl flex-col gap-8 md:mx-auto md:my-12">
            <FeatureCard
              title="整備・出費記録"
              pcImages={[
                {
                  key: 1,
                  url: "/assets/img/index/feature-record-pc.png",
                },
                {
                  key: 2,
                  url: "/assets/img/index/feature-record-create-pc.png",
                },
                {
                  key: 3,
                  url: "/assets/img/index/feature-record-detail-pc.png",
                },
                {
                  key: 4,
                  url: "/assets/img/index/feature-record-edit-pc.png",
                },
              ]}
              spImages={[
                {
                  key: 1,
                  url: "/assets/img/index/feature-record-sp.png",
                },
                {
                  key: 2,
                  url: "/assets/img/index/feature-record-create-sp.png",
                },
                {
                  key: 3,
                  url: "/assets/img/index/feature-record-detail-sp.png",
                },
                {
                  key: 4,
                  url: "/assets/img/index/feature-record-edit-sp.png",
                },
              ]}
            >
              バイクに関係する出費が発生したとき、その内容を記録する。
              <br />
              <br />
              例）ガソリンスタンドで給油したとき。バイクショップでタイヤ交換したとき。通販でバイクジャケットやグローブを買ったとき。
            </FeatureCard>

            <FeatureCard
              title="所有バイク"
              pcImages={[
                {
                  key: 1,
                  url: "/assets/img/index/feature-bike-pc.png",
                },
                {
                  key: 2,
                  url: "/assets/img/index/feature-bike-create-pc.png",
                },
                {
                  key: 3,
                  url: "/assets/img/index/feature-bike-detail-pc.png",
                },
                {
                  key: 4,
                  url: "/assets/img/index/feature-bike-edit-pc.png",
                },
              ]}
              spImages={[
                {
                  key: 1,
                  url: "/assets/img/index/feature-bike-sp.png",
                },
                {
                  key: 2,
                  url: "/assets/img/index/feature-bike-create-sp.png",
                },
                {
                  key: 3,
                  url: "/assets/img/index/feature-bike-detail-sp.png",
                },
                {
                  key: 4,
                  url: "/assets/img/index/feature-bike-edit-sp.png",
                },
              ]}
              isColReverse={true}
            >
              現在乗っているバイクを登録する。
              <br />
              <br />
              新しい「整備・出費記録」を登録するときに所有バイクを選択することで、「レポート」で所有バイクごとの出費金額の割合が把握できるようになる。
            </FeatureCard>

            <FeatureCard
              title="カテゴリー"
              pcImages={[
                {
                  key: 1,
                  url: "/assets/img/index/feature-category-pc.png",
                },
                {
                  key: 2,
                  url: "/assets/img/index/feature-category-create-pc.png",
                },
                {
                  key: 3,
                  url: "/assets/img/index/feature-category-edit-pc.png",
                },
              ]}
              spImages={[
                {
                  key: 1,
                  url: "/assets/img/index/feature-category-sp.png",
                },
                {
                  key: 2,
                  url: "/assets/img/index/feature-category-create-sp.png",
                },
                {
                  key: 3,
                  url: "/assets/img/index/feature-category-edit-sp.png",
                },
              ]}
            >
              「整備・出費記録」を内容ごとに分類できる。
              <br />
              <br />
              例）整備代、ガソリン代、高速料金、保険料（任意保険・自賠責）、駐車料金、バイク用品など。
              <br />
              <br />
              新しい「整備・出費記録」を登録するときにカテゴリーを選択することで、「レポート」でカテゴリーごとの出費金額の割合が把握できるようになる。
            </FeatureCard>

            <FeatureCard
              title="カレンダー"
              pcImages={[
                {
                  key: 1,
                  url: "/assets/img/index/feature-calender-pc.png",
                },
              ]}
              spImages={[
                {
                  key: 1,
                  url: "/assets/img/index/feature-calender-sp.png",
                },
              ]}
              isColReverse={true}
            >
              月の合計金額や、その日いくら出費したのかをカレンダーで把握できる。
              <br />
              <br />
              スケジュールとして使うことも可能。「整備・出費記録」で来月の整備などの予定を登録し、来月は整備などの支払いで合計いくら必要、といったことが把握できる。
            </FeatureCard>

            <FeatureCard
              title="レポート"
              pcImages={[
                {
                  key: 1,
                  url: "/assets/img/index/feature-report-pc.png",
                },
                {
                  key: 2,
                  url: "/assets/img/index/feature-report-monthly-pc.png",
                },
              ]}
              spImages={[
                {
                  key: 1,
                  url: "/assets/img/index/feature-report-barchart-sp.png",
                },
                {
                  key: 2,
                  url: "/assets/img/index/feature-report-donutchart-sp.png",
                },
                {
                  key: 3,
                  url: "/assets/img/index/feature-report-table-sp.png",
                },
              ]}
            >
              バイクの出費金額をグラフ化。
              <br />
              <br />
              年間や月間の合計金額や、合計金額の内訳（月別、日別、カテゴリー別、所有バイク別）が把握できる。
            </FeatureCard>

            <FeatureCard
              title="アカウント管理"
              pcImages={[
                { key: 1, url: "/assets/img/index/feature-account-pc.png" },
              ]}
              spImages={[
                { key: 1, url: "/assets/img/index/feature-account-sp.png" },
              ]}
              isColReverse={true}
            >
              ユーザー名、メールアドレス、パスワードの変更ができる。
            </FeatureCard>
          </div>

          <div className="my-16 flex flex-row items-center justify-center">
            <div className="flex flex-col gap-4">
              <LinkButton
                href="/signup"
                variant="contained"
                sx={{
                  fontSize: "18px",
                  px: "1.5em",
                  "@media screen and (min-width:48rem)": {
                    fontSize: "20px",
                  },
                }}
                startIcon={<AddIcon />}
              >
                アカウントを作成する
              </LinkButton>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
