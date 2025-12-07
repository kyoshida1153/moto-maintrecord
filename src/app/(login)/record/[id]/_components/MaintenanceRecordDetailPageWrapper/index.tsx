"use client";

import { useEffect } from "react";
import { useBreadcrumbsStore } from "@/components/Breadcrumbs/stores";
import { useMaintenanceRecordDetailStore } from "../MaintenanceRecordDetail/stores";
import { getMaintenanceRecord } from "@/lib/api";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

export default function MaintenanceRecordDetailPageWrapper({
  children,
  maintenanceRecordId,
}: {
  children: React.ReactNode;
  maintenanceRecordId: string;
}) {
  const { setBreadcrumbItems, setIsLoadingBreadcrumbs } = useBreadcrumbsStore();
  const {
    setGetMaintenanceRecordResponse,
    setIsLoadingGetMaintenanceRecordDetail,
  } = useMaintenanceRecordDetailStore();

  useEffect(() => {
    // 各コンポーネントを読み込み中にする
    setIsLoadingBreadcrumbs(true);
    setIsLoadingGetMaintenanceRecordDetail(true);

    (async () => {
      // 表示に必要なデータの読み込み
      const response = await getMaintenanceRecord(maintenanceRecordId);

      // 表示に必要なデータを各コンポーネント用ストアにセット
      setGetMaintenanceRecordResponse({
        status: response.success === true ? "success" : "error",
        message: response.message,
        result: response.result,
      });

      // パンくずリストの設定
      const title = response?.result?.title ?? "データ無し";
      const calenderDate = response.result?.calenderDate
        ? format(response.result.calenderDate, "yyyy年M月d日", { locale: ja })
        : "";

      setBreadcrumbItems([
        {
          text: "整備・出費記録",
          href: "/record",
        },
        {
          text: `${calenderDate} ${title}`,
        },
      ]);

      // 各コンポーネントを読み込み完了にする
      setIsLoadingBreadcrumbs(false);
      setIsLoadingGetMaintenanceRecordDetail(false);
    })();
  }, [
    maintenanceRecordId,
    setGetMaintenanceRecordResponse,
    setIsLoadingGetMaintenanceRecordDetail,
    setBreadcrumbItems,
    setIsLoadingBreadcrumbs,
  ]);

  return <>{children}</>;
}
