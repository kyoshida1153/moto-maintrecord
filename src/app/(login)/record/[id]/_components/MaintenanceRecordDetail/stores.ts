import { create } from "zustand";
import type { MaintenanceRecordUniqueSelect } from "@/app/api/maintenance-records/[id]/route";

type GetMaintenanceRecordResponse = {
  status: "success" | "error" | undefined;
  message: string;
  result?: MaintenanceRecordUniqueSelect;
};

type MaintenanceRecordDetailState = {
  getMaintenanceRecordResponse: GetMaintenanceRecordResponse;
  setGetMaintenanceRecordResponse: (
    getMaintenanceRecordResponse: GetMaintenanceRecordResponse,
  ) => void;

  isLoadingGetMaintenanceRecordDetail: boolean;
  setIsLoadingGetMaintenanceRecordDetail: (
    isLoadingGetMaintenanceRecordDetail: boolean,
  ) => void;
};

export const useMaintenanceRecordDetailStore =
  create<MaintenanceRecordDetailState>((set) => ({
    getMaintenanceRecordResponse: {
      status: undefined,
      message: "",
    },
    setGetMaintenanceRecordResponse: (nextValue) =>
      set(() => ({
        getMaintenanceRecordResponse: nextValue,
      })),

    isLoadingGetMaintenanceRecordDetail: true,
    setIsLoadingGetMaintenanceRecordDetail: (nextValue) =>
      set(() => ({
        isLoadingGetMaintenanceRecordDetail: nextValue,
      })),
  }));
