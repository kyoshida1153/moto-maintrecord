"use client";

import { useEffect } from "react";
import { useBreadcrumbsStore } from "@/components/Breadcrumbs/stores";
import { getMaintenanceCategory } from "@/lib/api";
import { useMaintenanceRecordCategoryDeleteFormStore } from "../MaintenanceCategoryDeleteForm/stores";

export default function MaintenanceCategoryDeletePageWrapper({
  children,
  maintenanceCategoryId,
}: {
  children: React.ReactNode;
  maintenanceCategoryId: string;
}) {
  const { setBreadcrumbItems, setIsLoadingBreadcrumbs } = useBreadcrumbsStore();
  const {
    setGetMaintenanceCategoryResponse,
    setIsLoadingMaintenanceRecordCategoryDeleteForm,
  } = useMaintenanceRecordCategoryDeleteFormStore();

  useEffect(() => {
    // 各コンポーネントを読み込み中にする
    setIsLoadingBreadcrumbs(true);
    setIsLoadingMaintenanceRecordCategoryDeleteForm(true);

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
          text: `${response?.result?.name ?? "データ無し"}: 削除`,
        },
      ]);

      // 各コンポーネントを読み込み完了にする
      setIsLoadingBreadcrumbs(false);
      setIsLoadingMaintenanceRecordCategoryDeleteForm(false);
    })();
  }, [
    maintenanceCategoryId,
    setGetMaintenanceCategoryResponse,
    setIsLoadingMaintenanceRecordCategoryDeleteForm,
    setBreadcrumbItems,
    setIsLoadingBreadcrumbs,
  ]);

  return <>{children}</>;
}
