import { create } from "zustand";

import type { MaintenanceRecordUniqueSelect } from "@/app/api/maintenance-records/[id]/route";

type GetMaintenanceRecordResponse = {
  status: "success" | "error" | undefined;
  message: string;
  result?: MaintenanceRecordUniqueSelect;
};

type MaintenanceRecordDeleteFormState = {
  getMaintenanceRecordResponse: GetMaintenanceRecordResponse;
  setGetMaintenanceRecordResponse: (
    getMaintenanceRecordResponse: GetMaintenanceRecordResponse,
  ) => void;
};

export const useMaintenanceRecordDeleteFormStore =
  create<MaintenanceRecordDeleteFormState>((set) => ({
    getMaintenanceRecordResponse: {
      status: undefined,
      message: "",
    },
    setGetMaintenanceRecordResponse: (nextValue) =>
      set(() => ({
        getMaintenanceRecordResponse: nextValue,
      })),
  }));
