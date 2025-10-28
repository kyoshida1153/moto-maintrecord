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
    setMaintenanceRecords,
    setMaintenanceRecordsLoading,
    setMaintenanceRecordsCount,
    setMaintenanceRecordsCountLoading,
  } = useMaintenanceRecordsStore();
  const {
    setMaintenanceRecordsTotalCost,
    setMaintenanceRecordsTotalCostLoading,
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
        setMaintenanceRecordsLoading(true);
        const result = await getMaintenanceRecords({ page, date, order });
        if (!result) {
          setMaintenanceRecords([]);
          setMaintenanceRecordsLoading(false);
          return;
        }
        setMaintenanceRecords(result);
        setMaintenanceRecordsLoading(false);
      })(),
      (async () => {
        setMaintenanceRecordsCountLoading(true);
        const result = await getMaintenanceRecordsCount({ date });
        if (result === false) {
          setMaintenanceRecordsCount(0);
          return;
        }
        setMaintenanceRecordsCount(result);
        setMaintenanceRecordsCountLoading(false);
      })(),
      (async () => {
        setMaintenanceRecordsTotalCostLoading(true);
        const result = await getMaintenanceRecordsTotalCost({ date });
        if (result === false) {
          setMaintenanceRecordsTotalCost(undefined);
          setMaintenanceRecordsTotalCostLoading(false);
          return;
        }
        setMaintenanceRecordsTotalCost(result);
        setMaintenanceRecordsTotalCostLoading(false);
      })(),
    ]);
  }, [
    page,
    date,
    setMaintenanceRecords,
    setMaintenanceRecordsCount,
    setMaintenanceRecordsTotalCost,
  ]);

  return <>{children}</>;
}
