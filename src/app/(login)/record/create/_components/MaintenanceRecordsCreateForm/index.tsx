"use client";

import { useEffect, useState } from "react";
import { Loading } from "@/components";
import { getBikes, getMaintenanceCategories } from "@/lib/api";
import MaintenanceRecordCreateFormForm from "./MaintenanceRecordCreateFormForm";
import { useMaintenanceRecordCreateFormState } from "./stores";

export default function MaintenanceRecordCreateForm() {
  const { setGetBikesResponse, setGetMaintenanceCategoriesResponse } =
    useMaintenanceRecordCreateFormState();

  // 各データの読み込み～stateにセット
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadedStatus, setLoadedStatus] = useState<
    "success" | "error" | undefined
  >(undefined);

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
    ]).then(() => {
      setLoadedStatus("success");
      setIsLoading(false);
    });
  }, [setGetBikesResponse, setGetMaintenanceCategoriesResponse]);

  return (
    <>
      {isLoading ? (
        <div className="flex w-full justify-center py-4">
          <Loading size="36px" />
        </div>
      ) : loadedStatus === "success" ? (
        <MaintenanceRecordCreateFormForm />
      ) : (
        <p>読み込みに失敗しました。</p>
      )}
    </>
  );
}
