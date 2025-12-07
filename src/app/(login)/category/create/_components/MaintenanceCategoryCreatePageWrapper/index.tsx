"use client";

import { useEffect } from "react";
import { useBreadcrumbsStore } from "@/components/Breadcrumbs/stores";

export default function MaintenanceCategoryCreatePageWrapper({
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
        text: "カテゴリー",
        href: "/category",
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
