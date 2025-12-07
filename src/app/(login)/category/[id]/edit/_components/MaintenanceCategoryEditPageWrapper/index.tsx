"use client";

import { useEffect } from "react";
import { useBreadcrumbsStore } from "@/components/Breadcrumbs/stores";
import { getMaintenanceCategory } from "@/lib/api";
import { useMaintenanceCategoryEditFormStore } from "../MaintenanceCategoryEditForm/stores";

export default function MaintenanceCategoryEditPageWrapper({
  children,
  maintenanceCategoryId,
}: {
  children: React.ReactNode;
  maintenanceCategoryId: string;
}) {
  const {
    setGetMaintenanceCategoryResponse,
    setIsLoadingMaintenanceCategoryEditForm,
  } = useMaintenanceCategoryEditFormStore();
  const { setBreadcrumbItems, setIsLoadingBreadcrumbs } = useBreadcrumbsStore();

  useEffect(() => {
    // 各コンポーネントを読み込み中にする
    setIsLoadingBreadcrumbs(true);
    setIsLoadingMaintenanceCategoryEditForm(true);

    (async () => {
      // 表示に必要なデータの読み込み
      const response = await getMaintenanceCategory(maintenanceCategoryId);

      // 表示に必要なデータを各コンポーネント用ストアにセット
      setGetMaintenanceCategoryResponse({
        status: response.success === true ? "success" : "error",
        message: response.message,
        result: response.result,
      });

      // パンくずリストの設定
      setBreadcrumbItems([
        {
          text: "カテゴリー",
          href: "/category",
        },
        {
          text: `${response?.result?.name ?? "データ無し"}: 編集`,
        },
      ]);

      // 各コンポーネントを読み込み完了にする
      setIsLoadingBreadcrumbs(false);
      setIsLoadingMaintenanceCategoryEditForm(false);
    })();
  }, [
    maintenanceCategoryId,
    setGetMaintenanceCategoryResponse,
    setIsLoadingMaintenanceCategoryEditForm,
    setBreadcrumbItems,
    setIsLoadingBreadcrumbs,
  ]);

  return <>{children}</>;
}
