"use client";

import { useEffect } from "react";
import { useBreadcrumbsStore } from "@/components/Breadcrumbs/stores";
import { useMaintenanceRecordCreateFormState } from "../MaintenanceRecordsCreateForm/stores";
import { getBikes, getMaintenanceCategories } from "@/lib/api";

export default function MaintenanceRecordCreatePageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setBreadcrumbItems, setIsLoadingBreadcrumbs } = useBreadcrumbsStore();
  const {
    setGetBikesResponse,
    setGetMaintenanceCategoriesResponse,
    setIsLoadingMaintenanceRecordCreateForm,
  } = useMaintenanceRecordCreateFormState();

  useEffect(() => {
    // 各コンポーネントを読み込み中にする
    setIsLoadingBreadcrumbs(true);
    setIsLoadingMaintenanceRecordCreateForm(true);

    Promise.all([
      // 表示に必要なデータの読み込み
      getBikes(),
      getMaintenanceCategories(),
    ]).then((values) => {
      // 表示に必要なデータを各コンポーネント用ストアにセット
      setGetBikesResponse({
        status: values[0].success === true ? "success" : "error",
        message: values[0].message,
        result: values[0].result,
      });
      setGetMaintenanceCategoriesResponse({
        status: values[1].success === true ? "success" : "error",
        message: values[1].message,
        result: values[1].result,
      });

      // パンくずリストの設定
      setBreadcrumbItems([
        {
          text: "整備・出費記録",
          href: "/record",
        },
        {
          text: "登録",
        },
      ]);

      // 各コンポーネントを読み込み完了にする
      setIsLoadingBreadcrumbs(false);
      setIsLoadingMaintenanceRecordCreateForm(false);
    });
  }, [
    setGetBikesResponse,
    setGetMaintenanceCategoriesResponse,
    setIsLoadingMaintenanceRecordCreateForm,
    setBreadcrumbItems,
    setIsLoadingBreadcrumbs,
  ]);

  return <>{children}</>;
}
