"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getMaintenanceRecords, getMaintenanceRecordsCount } from "@/lib/api";
import { useMaintenanceRecordsListStore } from "@/components/MaintenanceRecordsList/stores";
import { useBreadcrumbsStore } from "@/components/Breadcrumbs/stores";

export default function MaintenanceRecordsPageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    setGetMaintenanceRecordsResponse,
    setIsLoadingGetMaintenanceRecords,
    setGetMaintenanceRecordsCountResponse,
    setIsLoadingGetMaintenanceRecordsCount,
  } = useMaintenanceRecordsListStore();
  const { setBreadcrumbItems, setIsLoadingGetBreadcrumbItems } =
    useBreadcrumbsStore();

  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "";
  const date = searchParams.get("date") || "";
  const order = "calender_date_desc";

  useEffect(() => {
    Promise.all([
      (async () => {
        setIsLoadingGetMaintenanceRecords(true);
        const response = await getMaintenanceRecords({ page, date, order });
        setGetMaintenanceRecordsResponse({
          status: response.success === true ? "success" : "error",
          message: response.message,
          result: response.result,
        });
        setIsLoadingGetMaintenanceRecords(false);
      })(),
      (async () => {
        setIsLoadingGetMaintenanceRecordsCount(true);
        const response = await getMaintenanceRecordsCount({ date });
        setGetMaintenanceRecordsCountResponse({
          status: response.success === true ? "success" : "error",
          message: response.message,
          result: response.result,
        });
        setIsLoadingGetMaintenanceRecordsCount(false);
      })(),
      (async () => {
        setIsLoadingGetBreadcrumbItems(true);
        setBreadcrumbItems([
          {
            text: "整備・出費記録",
          },
        ]);
        setIsLoadingGetBreadcrumbItems(false);
      })(),
    ]);
  }, [
    page,
    date,
    setGetMaintenanceRecordsResponse,
    setIsLoadingGetMaintenanceRecords,
    setGetMaintenanceRecordsCountResponse,
    setIsLoadingGetMaintenanceRecordsCount,
    setBreadcrumbItems,
    setIsLoadingGetBreadcrumbItems,
  ]);

  return <>{children}</>;
}
