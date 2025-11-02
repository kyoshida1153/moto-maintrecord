"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { format } from "date-fns";
import getMaintenanceRecords from "@/lib/getMaintenanceRecords";
import getMaintenanceRecordsCount from "@/lib/getMaintenanceRecordsCount";
import getMaintenanceRecordsTotalCost from "@/lib/getMaintenanceRecordsTotalCost";
import useMaintenanceRecordsStore from "@/stores/useMaintenanceRecordsStore";
import useMaintenanceRecordsTotalCostStore from "@/stores/useMaintenanceRecordsTotalCostStore";

export default function TopPageWrapper({
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
  const {
    setGetMaintenanceRecordsTotalCostResponse,
    setIsLoadingGetMaintenanceRecordsTotalCost,
  } = useMaintenanceRecordsTotalCostStore();

  const searchParams = useSearchParams();
  // const page = searchParams.get("page") || "";
  const page = "all";
  const date =
    searchParams.get("date") ||
    `${format(new Date(), "yyyy")}-${format(new Date(), "MM")}`;
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
      (async () => {
        setIsLoadingGetMaintenanceRecordsTotalCost(true);
        const response = await getMaintenanceRecordsTotalCost({ date });
        if (response.success === false) {
          setGetMaintenanceRecordsTotalCostResponse({
            status: "error",
            message: response.message,
          });
          setIsLoadingGetMaintenanceRecordsTotalCost(false);
          return;
        }
        setGetMaintenanceRecordsTotalCostResponse({
          status: "success",
          message: response.message,
          result: response.result,
        });
        setIsLoadingGetMaintenanceRecordsTotalCost(false);
      })(),
    ]);
  }, [
    page,
    date,
    setGetMaintenanceRecordsResponse,
    setGetMaintenanceRecordsCountResponse,
    setGetMaintenanceRecordsTotalCostResponse,
  ]);

  return <>{children}</>;
}
