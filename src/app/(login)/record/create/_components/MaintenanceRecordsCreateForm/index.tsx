"use client";

import { Loading } from "@/components";
import MaintenanceRecordCreateFormForm from "./MaintenanceRecordCreateFormForm";
import { useMaintenanceRecordCreateFormState } from "./stores";

export default function MaintenanceRecordCreateForm() {
  const { isLoadingMaintenanceRecordCreateForm } =
    useMaintenanceRecordCreateFormState();

  return (
    <>
      {isLoadingMaintenanceRecordCreateForm ? (
        <div className="flex w-full justify-center py-4">
          <Loading size="36px" />
        </div>
      ) : (
        <MaintenanceRecordCreateFormForm />
      )}
    </>
  );
}
