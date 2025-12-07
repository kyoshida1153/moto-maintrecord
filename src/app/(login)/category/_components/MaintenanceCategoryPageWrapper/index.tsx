"use client";

import { useEffect } from "react";
import { useBreadcrumbsStore } from "@/components/Breadcrumbs/stores";
import { getMaintenanceCategories } from "@/lib/api";
import { useMaintenanceCategoryCardListStore } from "../MaintenanceCategoryCardList/stores";

export default function MaintenanceCategoryPageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setBreadcrumbItems, setIsLoadingBreadcrumbs } = useBreadcrumbsStore();
  const {
    setGetMaintenanceCategoriesResponse,
    setIsLoadingMaintenanceCategoryCardList,
  } = useMaintenanceCategoryCardListStore();

  useEffect(() => {
    // 各コンポーネントを読み込み中にする
    setIsLoadingBreadcrumbs(true);
    setIsLoadingMaintenanceCategoryCardList(true);

    (async () => {
      // 表示に必要なデータの読み込み
      const response = await getMaintenanceCategories();

      setGetMaintenanceCategoriesResponse({
        status: response.success === true ? "success" : "error",
        message: response.message,
        result: response.result,
      });

      // パンくずリストの設定
      setBreadcrumbItems([
        {
          text: "カテゴリー",
        },
      ]);

      // 各コンポーネントを読み込み完了にする
      setIsLoadingBreadcrumbs(false);
      setIsLoadingMaintenanceCategoryCardList(false);
    })();
  }, [
    setGetMaintenanceCategoriesResponse,
    setIsLoadingMaintenanceCategoryCardList,
    setBreadcrumbItems,
    setIsLoadingBreadcrumbs,
  ]);

  return <>{children}</>;
}
