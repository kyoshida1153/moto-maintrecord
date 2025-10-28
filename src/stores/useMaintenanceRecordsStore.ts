import { create } from "zustand";
import type { MaintenanceRecordSelect } from "@/app/api/maintenance-records/route";

type MaintenanceRecordsState = {
  maintenanceRecords: MaintenanceRecordSelect[];
  setMaintenanceRecords: (
    maintenanceRecords: MaintenanceRecordSelect[],
  ) => void;

  maintenanceRecordsLoading: boolean;
  setMaintenanceRecordsLoading: (maintenanceRecordsLoading: boolean) => void;

  maintenanceRecordsCount: number | undefined;
  setMaintenanceRecordsCount: (
    maintenanceRecordsCount: number | undefined,
  ) => void;

  maintenanceRecordsCountLoading: boolean;
  setMaintenanceRecordsCountLoading: (
    maintenanceRecordsCountLoading: boolean,
  ) => void;
};

const useMaintenanceRecordsStore = create<MaintenanceRecordsState>((set) => ({
  maintenanceRecords: [],
  setMaintenanceRecords: (nextMaintenanceRecords) =>
    set(() => ({ maintenanceRecords: nextMaintenanceRecords })),

  maintenanceRecordsLoading: true,
  setMaintenanceRecordsLoading: (nextMaintenanceRecordsLoading) =>
    set(() => ({
      maintenanceRecordsLoading: nextMaintenanceRecordsLoading,
    })),

  maintenanceRecordsCount: undefined,
  setMaintenanceRecordsCount: (nextMaintenanceRecordsCount) =>
    set(() => ({ maintenanceRecordsCount: nextMaintenanceRecordsCount })),

  maintenanceRecordsCountLoading: true,
  setMaintenanceRecordsCountLoading: (nextMaintenanceRecordsCountLoading) =>
    set(() => ({
      maintenanceRecordsCountLoading: nextMaintenanceRecordsCountLoading,
    })),
}));
export default useMaintenanceRecordsStore;
