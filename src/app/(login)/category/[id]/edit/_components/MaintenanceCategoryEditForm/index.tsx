"use client";

import { Loading } from "@/components";
import MaintenanceCategoryEditFormForm from "./MaintenanceCategoryEditFormForm";
import { useMaintenanceCategoryEditFormStore } from "./stores";

export default function MaintenanceCategoryEditForm({
  maintenanceCategoryId,
}: {
  maintenanceCategoryId: string;
}) {
  const { isLoadingMaintenanceCategoryEditForm } =
    useMaintenanceCategoryEditFormStore();

  return (
    <>
      {isLoadingMaintenanceCategoryEditForm ? (
        <div className="flex w-full justify-center py-4">
          <Loading size="36px" />
        </div>
      ) : (
        <MaintenanceCategoryEditFormForm
          maintenanceCategoryId={maintenanceCategoryId}
        />
      )}
    </>
  );
}
