import { create } from "zustand";

import type { BikeSelect } from "@/app/api/bikes/route";
import type { MaintenanceCategorySelect } from "@/app/api/maintenance-categories/route";
import type { MaintenanceRecordUniqueSelect } from "@/app/api/maintenance-records/[id]/route";

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

type GetMaintenanceRecordResponse = {
  status: "success" | "error" | undefined;
  message: string;
  result?: MaintenanceRecordUniqueSelect;
};

type MaintenanceRecordEditFormState = {
  getBikesResponse: GetBikesResponse;
  setGetBikesResponse: (getBikesResponse: GetBikesResponse) => void;

  getMaintenanceCategoriesResponse: GetMaintenanceCategoriesResponse;
  setGetMaintenanceCategoriesResponse: (
    getMaintenanceCategoriesResponse: GetMaintenanceCategoriesResponse,
  ) => void;

  getMaintenanceRecordResponse: GetMaintenanceRecordResponse;
  setGetMaintenanceRecordResponse: (
    getMaintenanceRecordResponse: GetMaintenanceRecordResponse,
  ) => void;
};

export const useMaintenanceRecordEditFormState =
  create<MaintenanceRecordEditFormState>((set) => ({
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

    getMaintenanceRecordResponse: {
      status: undefined,
      message: "",
    },
    setGetMaintenanceRecordResponse: (nextValue) =>
      set(() => ({
        getMaintenanceRecordResponse: nextValue,
      })),
  }));
