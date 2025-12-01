import { create } from "zustand";

import type { BikeSelect } from "@/app/api/bikes/route";
import type { MaintenanceCategorySelect } from "@/app/api/maintenance-categories/route";

type GetBikesResponse = {
  status: "success" | "error" | undefined;
  message: string;
  result?: BikeSelect[];
};

type GetMaintenanceCategoriesResponse = {
  status: "success" | "error" | undefined;
  message: string;
  result?: MaintenanceCategorySelect[];
};

type MaintenanceRecordCreateFormState = {
  getBikesResponse: GetBikesResponse;
  setGetBikesResponse: (getBikesResponse: GetBikesResponse) => void;
  getMaintenanceCategoriesResponse: GetMaintenanceCategoriesResponse;
  setGetMaintenanceCategoriesResponse: (
    getMaintenanceCategoriesResponse: GetMaintenanceCategoriesResponse,
  ) => void;
};

export const useMaintenanceRecordCreateFormState =
  create<MaintenanceRecordCreateFormState>((set) => ({
    getBikesResponse: {
      status: undefined,
      message: "",
    },
    setGetBikesResponse: (nextValue) =>
      set(() => ({
        getBikesResponse: nextValue,
      })),
    getMaintenanceCategoriesResponse: {
      status: undefined,
      message: "",
    },
    setGetMaintenanceCategoriesResponse: (nextValue) =>
      set(() => ({
        getMaintenanceCategoriesResponse: nextValue,
      })),
  }));
