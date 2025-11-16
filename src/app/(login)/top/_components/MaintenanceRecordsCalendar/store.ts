import { create } from "zustand";
import type { MaintenanceRecordSelect } from "@/app/api/maintenance-records/route";

type GetMaintenanceRecordsResponse = {
  status: "success" | "error" | undefined;
  message: string;
  result?: MaintenanceRecordSelect[];
};

type MaintenanceRecordsCalendarState = {
  getMaintenanceRecordsResponse: GetMaintenanceRecordsResponse;
  setGetMaintenanceRecordsResponse: (
    getMaintenanceRecordsResponse: GetMaintenanceRecordsResponse,
  ) => void;

  isLoadingGetMaintenanceRecords: boolean;
  setIsLoadingGetMaintenanceRecords: (
    isLoadingGetMaintenanceRecords: boolean,
  ) => void;
};

const useMaintenanceRecordsCalendarStore =
  create<MaintenanceRecordsCalendarState>((set) => ({
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
  }));

export default useMaintenanceRecordsCalendarStore;
