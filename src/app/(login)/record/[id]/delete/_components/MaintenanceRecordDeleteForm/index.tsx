"use client";

import { useEffect, useState } from "react";

import { Loading } from "@/components";
import { getMaintenanceRecord } from "@/lib/api";
import MaintenanceRecordDeleteFormForm from "./MaintenanceRecordDeleteFormForm";
import { useMaintenanceRecordDeleteFormStore } from "./stores";

export default function MaintenanceRecordDeleteForm({
  maintenanceRecordId,
}: {
  maintenanceRecordId: string;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadedStatus, setLoadedStatus] = useState<
    "success" | "error" | undefined
  >(undefined);

  const { getMaintenanceRecordResponse, setGetMaintenanceRecordResponse } =
    useMaintenanceRecordDeleteFormStore();

  // 必要なデータの読み込み～セット
  useEffect(() => {
    Promise.all([getMaintenanceRecord(maintenanceRecordId)]).then((values) => {
      setGetMaintenanceRecordResponse({
        status: values[0].success === true ? "success" : "error",
        message: values[0].message,
        result: values[0].result,
      });

      if (values[0].success === true) {
        setLoadedStatus("success");
      } else {
        setLoadedStatus("error");
      }

      setIsLoading(false);
    });
  }, [setGetMaintenanceRecordResponse, maintenanceRecordId]);

  return (
    <>
      {isLoading ? (
        <div className="flex w-full justify-center py-4">
          <Loading size="36px" />
        </div>
      ) : loadedStatus === "success" ? (
        <MaintenanceRecordDeleteFormForm
          maintenanceRecordId={maintenanceRecordId}
        />
      ) : (
        <p>
          {getMaintenanceRecordResponse.message
            ? getMaintenanceRecordResponse.message
            : "読み込みに失敗しました。"}
        </p>
      )}
    </>
  );
}
