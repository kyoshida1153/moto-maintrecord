"use client";

import { Loading } from "@/components";
import MaintenanceRecordDeleteFormForm from "./MaintenanceRecordDeleteFormForm";
import { useMaintenanceRecordDeleteFormStore } from "./stores";

export default function MaintenanceRecordDeleteForm() {
  const { isLoadingMaintenanceRecordDeleteForm } =
    useMaintenanceRecordDeleteFormStore();

  return (
    <>
      {isLoadingMaintenanceRecordDeleteForm ? (
        <div className="flex w-full justify-center py-4">
          <Loading size="36px" />
        </div>
      ) : (
        <MaintenanceRecordDeleteFormForm />
      )}
    </>
  );
}
