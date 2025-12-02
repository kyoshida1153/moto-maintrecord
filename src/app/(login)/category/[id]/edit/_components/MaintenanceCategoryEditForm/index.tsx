"use client";

import { useEffect, useState } from "react";

import { Loading } from "@/components";
import { getMaintenanceCategory } from "@/lib/api";
import MaintenanceCategoryEditFormForm from "./MaintenanceCategoryEditFormForm";
import { useMaintenanceCategoryEditFormStore } from "./stores";

export default function MaintenanceCategoryEditForm({
  maintenanceCategoryId,
}: {
  maintenanceCategoryId: string;
}) {
  const { getMaintenanceCategoryResponse, setGetMaintenanceCategoryResponse } =
    useMaintenanceCategoryEditFormStore();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadedStatus, setLoadedStatus] = useState<
    "success" | "error" | undefined
  >(undefined);

  // 必要なデータの読み込み～セット
  useEffect(() => {
    Promise.all([getMaintenanceCategory(maintenanceCategoryId)]).then(
      (values) => {
        setGetMaintenanceCategoryResponse({
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
      },
    );
  }, [setGetMaintenanceCategoryResponse, maintenanceCategoryId]);

  return (
    <>
      {isLoading ? (
        <div className="flex w-full justify-center py-4">
          <Loading size="36px" />
        </div>
      ) : loadedStatus === "success" ? (
        <MaintenanceCategoryEditFormForm
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
