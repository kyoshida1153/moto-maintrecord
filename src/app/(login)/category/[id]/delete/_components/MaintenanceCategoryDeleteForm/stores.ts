import { create } from "zustand";
import type { MaintenanceCategoryUniqueSelect } from "@/app/api/maintenance-categories/[id]/route";

type GetMaintenanceCategoryResponse = {
  status: "success" | "error" | undefined;
  message: string;
  result?: MaintenanceCategoryUniqueSelect;
};

type MaintenanceCategoryDeleteFormState = {
  getMaintenanceCategoryResponse: GetMaintenanceCategoryResponse;
  setGetMaintenanceCategoryResponse: (
    getMaintenanceCategoryResponse: GetMaintenanceCategoryResponse,
  ) => void;

  isLoadingMaintenanceRecordCategoryDeleteForm: boolean;
  setIsLoadingMaintenanceRecordCategoryDeleteForm: (
    isLoadingMaintenanceRecordCategoryDeleteForm: boolean,
  ) => void;
};

export const useMaintenanceRecordCategoryDeleteFormStore =
  create<MaintenanceCategoryDeleteFormState>((set) => ({
    getMaintenanceCategoryResponse: {
      status: undefined,
      message: "",
    },
    setGetMaintenanceCategoryResponse: (nextValue) =>
      set(() => ({
        getMaintenanceCategoryResponse: nextValue,
      })),

    isLoadingMaintenanceRecordCategoryDeleteForm: true,
    setIsLoadingMaintenanceRecordCategoryDeleteForm: (nextValue) =>
      set(() => ({
        isLoadingMaintenanceRecordCategoryDeleteForm: nextValue,
      })),
  }));
