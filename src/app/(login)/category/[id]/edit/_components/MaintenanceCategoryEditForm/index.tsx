"use client";

import { Loading } from "@/components";
import MaintenanceCategoryEditFormForm from "./MaintenanceCategoryEditFormForm";
import { useMaintenanceCategoryEditFormStore } from "./stores";

export default function MaintenanceCategoryEditForm() {
  const { getMaintenanceCategoryResponse, isLoadingGetMaintenanceCategory } =
    useMaintenanceCategoryEditFormStore();

  return (
    <>
      {isLoadingGetMaintenanceCategory ? (
        <div className="flex w-full justify-center py-4">
          <Loading size="36px" />
        </div>
      ) : getMaintenanceCategoryResponse.status === "success" ? (
        getMaintenanceCategoryResponse.result ? (
          <MaintenanceCategoryEditFormForm
            maintenanceCategoryId={getMaintenanceCategoryResponse.result.id}
          />
        ) : (
          <p>表示できるデータがありませんでした。</p>
        )
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
