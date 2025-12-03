import { create } from "zustand";

type GetMaintenanceRecordsTotalCostResponse = {
  status: "success" | "error" | undefined;
  message: string;
  result?: number;
};

type MaintenanceRecordsTotalCostStore = {
  getMaintenanceRecordsTotalCostResponse: GetMaintenanceRecordsTotalCostResponse;
  setGetMaintenanceRecordsTotalCostResponse: (
    getMaintenanceRecordsTotalCostResponse: GetMaintenanceRecordsTotalCostResponse,
  ) => void;

  isLoadingGetMaintenanceRecordsTotalCost: boolean;
  setIsLoadingGetMaintenanceRecordsTotalCost: (
    isLoadingGetMaintenanceRecordsTotalCost: boolean,
  ) => void;
};

export const useMaintenanceRecordsTotalCostStore =
  create<MaintenanceRecordsTotalCostStore>((set) => ({
    getMaintenanceRecordsTotalCostResponse: { status: undefined, message: "" },
    setGetMaintenanceRecordsTotalCostResponse: (nextValue) =>
      set(() => ({
        getMaintenanceRecordsTotalCostResponse: nextValue,
      })),

    isLoadingGetMaintenanceRecordsTotalCost: true,
    setIsLoadingGetMaintenanceRecordsTotalCost: (nextValue) =>
      set(() => ({
        isLoadingGetMaintenanceRecordsTotalCost: nextValue,
      })),
  }));
