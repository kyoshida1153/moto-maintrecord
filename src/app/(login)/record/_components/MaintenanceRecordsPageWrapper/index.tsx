"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getMaintenanceRecords, getMaintenanceRecordsCount } from "@/lib/api";
import useMaintenanceRecordsStore from "@/stores/useMaintenanceRecordsStore";

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
  } = useMaintenanceRecordsStore();

  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "";
  const date = searchParams.get("date") || "";
  const order = "calender_date_desc";

  useEffect(() => {
    Promise.all([
      (async () => {
        setIsLoadingGetMaintenanceRecords(true);
        const response = await getMaintenanceRecords({ page, date, order });
        if (response.success === false) {
          setGetMaintenanceRecordsResponse({
            status: "error",
            message: response.message,
          });
          setIsLoadingGetMaintenanceRecords(false);
          return;
        }
        setGetMaintenanceRecordsResponse({
          status: "success",
          message: response.message,
          result: response.result,
        });
        setIsLoadingGetMaintenanceRecords(false);
      })(),
      (async () => {
        setIsLoadingGetMaintenanceRecordsCount(true);
        const response = await getMaintenanceRecordsCount({ date });
        if (response.success === false) {
          setGetMaintenanceRecordsCountResponse({
            status: "error",
            message: response.message,
          });
          setIsLoadingGetMaintenanceRecordsCount(false);
          return;
        }
        setGetMaintenanceRecordsCountResponse({
          status: "success",
          message: response.message,
          result: response.result,
        });
        setIsLoadingGetMaintenanceRecordsCount(false);
      })(),
    ]);
  }, [
    page,
    date,
    setGetMaintenanceRecordsResponse,
    setIsLoadingGetMaintenanceRecords,
    setGetMaintenanceRecordsCountResponse,
    setIsLoadingGetMaintenanceRecordsCount,
  ]);

  return <>{children}</>;
}
