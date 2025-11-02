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

type MaintenanceRecordsState = {
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

const useMaintenanceRecordsStore = create<MaintenanceRecordsState>((set) => ({
  getMaintenanceRecordsResponse: { status: undefined, message: "" },
  setGetMaintenanceRecordsResponse: (nextGetMaintenanceRecordsResponse) =>
    set(() => ({
      getMaintenanceRecordsResponse: nextGetMaintenanceRecordsResponse,
    })),

  isLoadingGetMaintenanceRecords: true,
  setIsLoadingGetMaintenanceRecords: (nextIsLoadingGetMaintenanceRecords) =>
    set(() => ({
      isLoadingGetMaintenanceRecords: nextIsLoadingGetMaintenanceRecords,
    })),

  getMaintenanceRecordsCountResponse: { status: undefined, message: "" },
  setGetMaintenanceRecordsCountResponse: (
    nextGetMaintenanceRecordsCountResponse,
  ) =>
    set(() => ({
      getMaintenanceRecordsCountResponse:
        nextGetMaintenanceRecordsCountResponse,
    })),

  isLoadingGetMaintenanceRecordsCount: true,
  setIsLoadingGetMaintenanceRecordsCount: (
    nextIsLoadingGetMaintenanceRecordsCount,
  ) =>
    set(() => ({
      isLoadingGetMaintenanceRecordsCount:
        nextIsLoadingGetMaintenanceRecordsCount,
    })),
}));

export default useMaintenanceRecordsStore;
