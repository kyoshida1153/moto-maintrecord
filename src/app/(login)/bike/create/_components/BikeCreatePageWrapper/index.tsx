"use client";

import { useEffect } from "react";
import { useBreadcrumbsStore } from "@/components/Breadcrumbs/stores";

export default function BikeCreatePageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setBreadcrumbItems, setIsLoadingBreadcrumbs } = useBreadcrumbsStore();

  useEffect(() => {
    // 各コンポーネントを読み込み中にする
    setIsLoadingBreadcrumbs(true);

    // パンくずリストの設定
    setBreadcrumbItems([
      {
        text: "所有バイク",
        href: "/bike",
      },
      {
        text: "登録",
      },
    ]);

    // 各コンポーネントを読み込み完了にする
    setIsLoadingBreadcrumbs(false);
  }, [setBreadcrumbItems, setIsLoadingBreadcrumbs]);

  return <>{children}</>;
}
