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

const useMaintenanceRecordsTotalCostStore =
  create<MaintenanceRecordsTotalCostStore>((set) => ({
    getMaintenanceRecordsTotalCostResponse: { status: undefined, message: "" },
    setGetMaintenanceRecordsTotalCostResponse: (
      nextGetMaintenanceRecordsTotalCostResponse,
    ) =>
      set(() => ({
        getMaintenanceRecordsTotalCostResponse:
          nextGetMaintenanceRecordsTotalCostResponse,
      })),

    isLoadingGetMaintenanceRecordsTotalCost: true,
    setIsLoadingGetMaintenanceRecordsTotalCost: (
      nextIsLoadingGetMaintenanceRecordsTotalCost,
    ) =>
      set(() => ({
        isLoadingGetMaintenanceRecordsTotalCost:
          nextIsLoadingGetMaintenanceRecordsTotalCost,
      })),
  }));
export default useMaintenanceRecordsTotalCostStore;
