"use client";

import { useEffect } from "react";
import { useBreadcrumbsStore } from "@/components/Breadcrumbs/stores";
import { useMaintenanceRecordEditFormState } from "../MaintenanceRecordEditForm/stores";
import {
  getBikes,
  getMaintenanceCategories,
  getMaintenanceRecord,
} from "@/lib/api";

import { format } from "date-fns";
import { ja } from "date-fns/locale";

export default function MaintenanceRecordEditPageWrapper({
  children,
  maintenanceRecordId,
}: {
  children: React.ReactNode;
  maintenanceRecordId: string;
}) {
  const { setBreadcrumbItems, setIsLoadingGetBreadcrumbItems } =
    useBreadcrumbsStore();
  const {
    setGetBikesResponse,
    setGetMaintenanceCategoriesResponse,
    setGetMaintenanceRecordResponse,
    setIsLoadingMaintenanceRecordEditForm,
  } = useMaintenanceRecordEditFormState();

  useEffect(() => {
    // 各コンポーネントを読み込み中にする
    setIsLoadingGetBreadcrumbItems(true);
    setIsLoadingMaintenanceRecordEditForm(true);

    Promise.all([
      // 表示に必要なデータの読み込み
      getBikes(),
      getMaintenanceCategories(),
      getMaintenanceRecord(maintenanceRecordId),
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
      setGetMaintenanceRecordResponse({
        status: values[2].success === true ? "success" : "error",
        message: values[2].message,
        result: values[2].result,
      });

      // パンくずリストの設定
      const title = values[2]?.result?.title ?? "データ無し";
      const calenderDate = values[2].result?.calenderDate
        ? format(values[2].result.calenderDate, "yyyy年M月d日", { locale: ja })
        : "";

      setBreadcrumbItems([
        {
          text: "整備・出費記録",
          href: "/record",
        },
        {
          text: `${calenderDate} ${title}`,
          href: values[2]?.result?.id
            ? `/record/${values[2]?.result?.id}`
            : undefined,
        },
        {
          text: "編集",
        },
      ]);

      // 各コンポーネントを読み込み完了にする
      setIsLoadingGetBreadcrumbItems(false);
      setIsLoadingMaintenanceRecordEditForm(false);
    });
  }, [
    setBreadcrumbItems,
    setIsLoadingGetBreadcrumbItems,
    setGetBikesResponse,
    setGetMaintenanceCategoriesResponse,
    setGetMaintenanceRecordResponse,
    setIsLoadingMaintenanceRecordEditForm,
    maintenanceRecordId,
  ]);

  return <>{children}</>;
}
