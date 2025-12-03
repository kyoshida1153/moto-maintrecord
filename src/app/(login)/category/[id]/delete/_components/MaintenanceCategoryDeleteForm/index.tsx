"use client";

import { useEffect, useState } from "react";

import { Loading } from "@/components";
import { getMaintenanceCategory } from "@/lib/api";
import { useMaintenanceRecordCategoryFormStore } from "./stores";
import MaintenanceCategoryDeleteFormForm from "./MaintenanceCategoryDeleteFormForm";

export default function MaintenanceCategoryDeleteForm({
  maintenanceCategoryId,
}: {
  maintenanceCategoryId: string;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadedStatus, setLoadedStatus] = useState<
    "success" | "error" | undefined
  >(undefined);

  const { getMaintenanceCategoryResponse, setGetMaintenanceCategoryResponse } =
    useMaintenanceRecordCategoryFormStore();

  // 必要なデータの読み込み～セット
  useEffect(() => {
    (async () => {
      const response = await getMaintenanceCategory(maintenanceCategoryId);
      setGetMaintenanceCategoryResponse({
        status: response.success === true ? "success" : "error",
        message: response.message,
        result: response.result,
      });

      if (response.success === true) {
        setLoadedStatus("success");
      } else {
        setLoadedStatus("error");
      }

      setIsLoading(false);
    })();
  }, [setGetMaintenanceCategoryResponse, maintenanceCategoryId]);

  return (
    <>
      {isLoading ? (
        <div className="flex w-full justify-center py-4">
          <Loading size="36px" />
        </div>
      ) : loadedStatus === "success" ? (
        <MaintenanceCategoryDeleteFormForm
          maintenanceCategoryId={maintenanceCategoryId}
        />
      ) : (
        <p>
          {getMaintenanceCategoryResponse.message
            ? getMaintenanceCategoryResponse.message
            : "読み込みに失敗しました。"}
        </p>
      )}
    </>
  );
}
