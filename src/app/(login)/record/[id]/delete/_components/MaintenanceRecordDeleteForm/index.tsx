"use client";

import { Loading } from "@/components";
import MaintenanceRecordDeleteFormForm from "./MaintenanceRecordDeleteFormForm";
import { useMaintenanceRecordDeleteFormStore } from "./stores";

export default function MaintenanceRecordDeleteForm({
  maintenanceRecordId,
}: {
  maintenanceRecordId: string;
}) {
  const { isLoadingMaintenanceRecordDeleteForm } =
    useMaintenanceRecordDeleteFormStore();

  return (
    <>
      {isLoadingMaintenanceRecordDeleteForm ? (
        <div className="flex w-full justify-center py-4">
          <Loading size="36px" />
        </div>
      ) : (
        <MaintenanceRecordDeleteFormForm
          maintenanceRecordId={maintenanceRecordId}
        />
      )}
    </>
  );
}
