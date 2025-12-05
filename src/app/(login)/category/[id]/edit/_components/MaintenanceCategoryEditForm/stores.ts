import { create } from "zustand";
import type { MaintenanceCategoryUniqueSelect } from "@/app/api/maintenance-categories/[id]/route";

type GetMaintenanceCategoryResponse = {
  status: "success" | "error" | undefined;
  message: string;
  result?: MaintenanceCategoryUniqueSelect;
};

type MaintenanceCategoryEditFormState = {
  getMaintenanceCategoryResponse: GetMaintenanceCategoryResponse;
  setGetMaintenanceCategoryResponse: (
    getMaintenanceCategoryResponse: GetMaintenanceCategoryResponse,
  ) => void;

  isLoadingGetMaintenanceCategory: boolean;
  setIsLoadingGetMaintenanceCategory: (
    isLoadingGetMaintenanceCategory: boolean,
  ) => void;
};

export const useMaintenanceCategoryEditFormStore =
  create<MaintenanceCategoryEditFormState>((set) => ({
    getMaintenanceCategoryResponse: {
      status: undefined,
      message: "",
    },
    setGetMaintenanceCategoryResponse: (nextValue) =>
      set(() => ({
        getMaintenanceCategoryResponse: nextValue,
      })),

    isLoadingGetMaintenanceCategory: true,
    setIsLoadingGetMaintenanceCategory: (nextValue) =>
      set(() => ({
        isLoadingGetMaintenanceCategory: nextValue,
      })),
  }));
