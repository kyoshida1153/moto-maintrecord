"use client";

import { Loading } from "@/components";
import { useMaintenanceRecordEditFormState } from "./stores";
import MaintenanceRecordEditFormForm from "./MaintenanceRecordEditFormForm";

export default function MaintenanceRecordEditForm({
  maintenanceRecordId,
}: {
  maintenanceRecordId: string;
}) {
  const { isLoadingMaintenanceRecordEditForm } =
    useMaintenanceRecordEditFormState();

  return (
    <>
      {isLoadingMaintenanceRecordEditForm ? (
        <div className="flex w-full justify-center py-4">
          <Loading size="36px" />
        </div>
      ) : (
        <MaintenanceRecordEditFormForm
          maintenanceRecordId={maintenanceRecordId}
        />
      )}
    </>
  );
}
