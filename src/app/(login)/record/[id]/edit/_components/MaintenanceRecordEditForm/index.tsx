"use client";

import { useEffect, useState } from "react";

import { Loading } from "@/components";
import {
  getBikes,
  getMaintenanceCategories,
  getMaintenanceRecord,
} from "@/lib/api";
import { useMaintenanceRecordEditFormState } from "./stores";
import MaintenanceRecordEditFormForm from "./MaintenanceRecordEditFormForm";

export default function MaintenanceRecordEditForm({
  maintenanceRecordId,
}: {
  maintenanceRecordId: string;
}) {
  const {
    setGetBikesResponse,
    setGetMaintenanceCategoriesResponse,
    getMaintenanceRecordResponse,
    setGetMaintenanceRecordResponse,
  } = useMaintenanceRecordEditFormState();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadedStatus, setLoadedStatus] = useState<
    "success" | "error" | undefined
  >(undefined);

  // 必要なデータの読み込み～セット
  useEffect(() => {
    Promise.all([
      (async () => {
        const response = await getBikes();
        setGetBikesResponse({
          status: response.success === true ? "success" : "error",
          message: response.message,
          result: response.result,
        });
      })(),
      (async () => {
        const response = await getMaintenanceCategories();
        setGetMaintenanceCategoriesResponse({
          status: response.success === true ? "success" : "error",
          message: response.message,
          result: response.result,
        });
      })(),
      (async () => {
        const response = await getMaintenanceRecord(maintenanceRecordId);
        setGetMaintenanceRecordResponse({
          status: response.success === true ? "success" : "error",
          message: response.message,
          result: response.result,
        });
      })(),
    ]).then(() => {
      setLoadedStatus("success");
      setIsLoading(false);
    });
  }, [
    maintenanceRecordId,
    setGetBikesResponse,
    setGetMaintenanceCategoriesResponse,
    setGetMaintenanceRecordResponse,
  ]);

  return (
    <>
      {isLoading ? (
        <div className="flex w-full justify-center py-4">
          <Loading size="36px" />
        </div>
      ) : loadedStatus === "success" ? (
        <MaintenanceRecordEditFormForm
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
