"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getMaintenanceRecords, getMaintenanceRecordsCount } from "@/lib/api";
import { useMaintenanceRecordsListStore } from "@/components/MaintenanceRecordsList/stores";
import { useBreadcrumbsStore } from "@/components/Breadcrumbs/stores";
import { isNumber } from "@/utils";

export default function MaintenanceRecordsPageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setBreadcrumbItems, setIsLoadingBreadcrumbs } = useBreadcrumbsStore();
  const {
    setGetMaintenanceRecordsResponse,
    setIsLoadingGetMaintenanceRecords,
    setGetMaintenanceRecordsCountResponse,
    setIsLoadingGetMaintenanceRecordsCount,
  } = useMaintenanceRecordsListStore();

  const searchParams = useSearchParams();
  const paramPage = searchParams.get("page") || "";
  const paramDate = searchParams.get("date") || "";
  const paramOrder = "calender_date_desc";

  useEffect(() => {
    // 各コンポーネントを読み込み中にする
    setIsLoadingBreadcrumbs(true);
    setIsLoadingGetMaintenanceRecords(true);
    setIsLoadingGetMaintenanceRecordsCount(true);

    Promise.all([
      // 表示に必要なデータの読み込み
      getMaintenanceRecords({
        page: paramPage,
        date: paramDate,
        order: paramOrder,
      }),
      getMaintenanceRecordsCount({ date: paramPage }),
    ]).then((values) => {
      // 表示に必要なデータを各コンポーネント用ストアにセット
      setGetMaintenanceRecordsResponse({
        status: values[0].success === true ? "success" : "error",
        message: values[0].message,
        result: values[0].result,
      });
      setGetMaintenanceRecordsCountResponse({
        status: values[1].success === true ? "success" : "error",
        message: values[1].message,
        result: values[1].result,
      });

      // パンくずリストの設定
      const breadcrumbItems = [];

      const limit = Number(
        process.env.NEXT_PUBLIC_MAINTENANCE_RECORD_LIST_LIMIT,
      );
      const count =
        typeof values[1]?.result === "number"
          ? Math.ceil(values[1]?.result / limit)
          : undefined;

      if (
        typeof count === "number" &&
        isNumber(paramPage) &&
        Number(paramPage) > 0 &&
        Number(paramPage) <= count
      ) {
        breadcrumbItems.push({
          text: "整備・出費記録",
          href: "/record",
        });
        breadcrumbItems.push({
          text: `Page ${paramPage}/${count}`,
        });
      } else {
        breadcrumbItems.push({
          text: "整備・出費記録",
        });
      }

      setBreadcrumbItems(breadcrumbItems);

      // 各コンポーネントを読み込み完了にする
      setIsLoadingBreadcrumbs(false);
      setIsLoadingGetMaintenanceRecords(false);
      setIsLoadingGetMaintenanceRecordsCount(false);
    });
  }, [
    paramPage,
    paramDate,
    setGetMaintenanceRecordsResponse,
    setIsLoadingGetMaintenanceRecords,
    setGetMaintenanceRecordsCountResponse,
    setIsLoadingGetMaintenanceRecordsCount,
    setBreadcrumbItems,
    setIsLoadingBreadcrumbs,
  ]);

  return <>{children}</>;
}
