import { create } from "zustand";
import type { MaintenanceCategorySelect } from "@/app/api/maintenance-categories/route";

type GetMaintenanceCategoriesResponse = {
  status: "success" | "error" | undefined;
  message: string;
  result?: MaintenanceCategorySelect[];
};

type MaintenanceCategoryCardListState = {
  getMaintenanceCategoriesResponse: GetMaintenanceCategoriesResponse;
  setGetMaintenanceCategoriesResponse: (
    getMaintenanceCategoriesResponse: GetMaintenanceCategoriesResponse,
  ) => void;

  isLoadingGetMaintenanceCategories: boolean;
  setIsLoadingGetMaintenanceCategories: (
    isLoadingGetMaintenanceCategories: boolean,
  ) => void;
};

export const useMaintenanceCategoryCardListStore =
  create<MaintenanceCategoryCardListState>((set) => ({
    getMaintenanceCategoriesResponse: {
      status: undefined,
      message: "",
    },
    setGetMaintenanceCategoriesResponse: (nextValue) =>
      set(() => ({
        getMaintenanceCategoriesResponse: nextValue,
      })),

    isLoadingGetMaintenanceCategories: true,
    setIsLoadingGetMaintenanceCategories: (nextValue) =>
      set(() => ({
        isLoadingGetMaintenanceCategories: nextValue,
      })),
  }));
