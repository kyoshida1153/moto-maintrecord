"use client";

import { Loading } from "@/components";
import { useMaintenanceRecordCategoryDeleteFormStore } from "./stores";
import MaintenanceCategoryDeleteFormForm from "./MaintenanceCategoryDeleteFormForm";

export default function MaintenanceCategoryDeleteForm({
  maintenanceCategoryId,
}: {
  maintenanceCategoryId: string;
}) {
  const { isLoadingMaintenanceRecordCategoryDeleteForm } =
    useMaintenanceRecordCategoryDeleteFormStore();

  return (
    <>
      {isLoadingMaintenanceRecordCategoryDeleteForm ? (
        <div className="flex w-full justify-center py-4">
          <Loading size="36px" />
        </div>
      ) : (
        <MaintenanceCategoryDeleteFormForm
          maintenanceCategoryId={maintenanceCategoryId}
        />
      )}
    </>
  );
}
