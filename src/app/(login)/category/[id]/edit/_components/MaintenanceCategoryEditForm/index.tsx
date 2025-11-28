"use client";

import { useEffect, useState } from "react";

import { Loading } from "@/components";
import { getMaintenanceCategory } from "@/lib/api";
import type { MaintenanceCategoryUniqueSelect } from "@/app/api/maintenance-categories/[id]/route";

import MaintenanceCategoryEditFormForm from "./MaintenanceCategoryEditFormForm";

type GetMaintenanceCategoryResponse = {
  status: "success" | "error" | undefined;
  message: string;
  result?: MaintenanceCategoryUniqueSelect;
};

export default function MaintenanceCategoryEditForm({
  maintenanceCategoryId,
}: {
  maintenanceCategoryId: string;
}) {
  // フォームのdefaultValueの設定で使うもの
  const [isLoadingGetMaintenanceCategory, setIsLoadingGetMaintenanceCategory] =
    useState<boolean>(true);
  const [getMaintenanceCategoryResponse, setGetMaintenanceCategoryResponse] =
    useState<GetMaintenanceCategoryResponse>({
      status: undefined,
      message: "",
    });

  // フォームのdefaultValueに設定するデータの読み込み
  useEffect(() => {
    (async () => {
      setIsLoadingGetMaintenanceCategory(true);
      const response = await getMaintenanceCategory(maintenanceCategoryId);
      setGetMaintenanceCategoryResponse({
        message: response.message,
        status: response.success === true ? "success" : "error",
        result: response.result,
      });
      setIsLoadingGetMaintenanceCategory(false);
    })();
  }, [maintenanceCategoryId]);

  return (
    <>
      {isLoadingGetMaintenanceCategory ? (
        <div className="flex w-full justify-center py-4">
          <Loading size="36px" />
        </div>
      ) : getMaintenanceCategoryResponse.status === "success" ? (
        <MaintenanceCategoryEditFormForm
          defaultValues={getMaintenanceCategoryResponse.result}
          maintenanceCategoryId={maintenanceCategoryId}
        />
      ) : (
        <p>{getMaintenanceCategoryResponse.message}</p>
      )}
    </>
  );
}
