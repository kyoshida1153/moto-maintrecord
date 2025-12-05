"use client";

import { Loading } from "@/components";
import { useMaintenanceRecordCategoryDeleteFormStore } from "./stores";
import MaintenanceCategoryDeleteFormForm from "./MaintenanceCategoryDeleteFormForm";

export default function MaintenanceCategoryDeleteForm() {
  const { getMaintenanceCategoryResponse, isLoadingGetMaintenanceCategory } =
    useMaintenanceRecordCategoryDeleteFormStore();

  return (
    <>
      {isLoadingGetMaintenanceCategory ? (
        <div className="flex w-full justify-center py-4">
          <Loading size="36px" />
        </div>
      ) : getMaintenanceCategoryResponse.status === "success" ? (
        getMaintenanceCategoryResponse.result ? (
          <MaintenanceCategoryDeleteFormForm
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
