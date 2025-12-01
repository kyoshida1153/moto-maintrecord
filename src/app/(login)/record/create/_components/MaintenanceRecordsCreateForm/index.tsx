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
    Promise.all([getBikes(), getMaintenanceCategories()]).then((values) => {
      setGetBikesResponse({
        status: values[0].success === true ? "success" : "error",
        message: values[0].message,
        result: values[0].result,
      });
      setGetMaintenanceCategoriesResponse({
        status: values[1].success === true ? "success" : "error",
        message: values[1].message,
        result: values[1].result,
      });
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
