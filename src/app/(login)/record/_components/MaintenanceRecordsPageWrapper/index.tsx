"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import getMaintenanceRecords from "@/lib/getMaintenanceRecords";
import getMaintenanceRecordsCount from "@/lib/getMaintenanceRecordsCount";
import useMaintenanceRecordsStore from "@/stores/useMaintenanceRecordsStore";

export default function MaintenanceRecordsPageWrapper({
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

  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "";
  const date = searchParams.get("date") || "";
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
    ]);
  }, [page, date, setMaintenanceRecords, setMaintenanceRecordsCount]);

  return <>{children}</>;
}
