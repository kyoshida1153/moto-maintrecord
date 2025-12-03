import { create } from "zustand";
import type { MaintenanceRecordSelect } from "@/app/api/maintenance-records/route";

type GetMaintenanceRecordsResponse = {
  status: "success" | "error" | undefined;
  message: string;
  result?: MaintenanceRecordSelect[];
};

type GetMaintenanceRecordsCountResponse = {
  status: "success" | "error" | undefined;
  message: string;
  result?: number;
};

type MaintenanceRecordsListState = {
  getMaintenanceRecordsResponse: GetMaintenanceRecordsResponse;
  setGetMaintenanceRecordsResponse: (
    getMaintenanceRecordsResponse: GetMaintenanceRecordsResponse,
  ) => void;

  isLoadingGetMaintenanceRecords: boolean;
  setIsLoadingGetMaintenanceRecords: (
    isLoadingGetMaintenanceRecords: boolean,
  ) => void;

  getMaintenanceRecordsCountResponse: GetMaintenanceRecordsCountResponse;
  setGetMaintenanceRecordsCountResponse: (
    getMaintenanceRecordsCountResponse: GetMaintenanceRecordsCountResponse,
  ) => void;

  isLoadingGetMaintenanceRecordsCount: boolean;
  setIsLoadingGetMaintenanceRecordsCount: (
    isLoadingGetMaintenanceRecordsCount: boolean,
  ) => void;
};

export const useMaintenanceRecordsListStore =
  create<MaintenanceRecordsListState>((set) => ({
    getMaintenanceRecordsResponse: { status: undefined, message: "" },
    setGetMaintenanceRecordsResponse: (nextValue) =>
      set(() => ({
        getMaintenanceRecordsResponse: nextValue,
      })),

    isLoadingGetMaintenanceRecords: true,
    setIsLoadingGetMaintenanceRecords: (nextValue) =>
      set(() => ({
        isLoadingGetMaintenanceRecords: nextValue,
      })),

    getMaintenanceRecordsCountResponse: { status: undefined, message: "" },
    setGetMaintenanceRecordsCountResponse: (nextValue) =>
      set(() => ({
        getMaintenanceRecordsCountResponse: nextValue,
      })),

    isLoadingGetMaintenanceRecordsCount: true,
    setIsLoadingGetMaintenanceRecordsCount: (nextValue) =>
      set(() => ({
        isLoadingGetMaintenanceRecordsCount: nextValue,
      })),
  }));
