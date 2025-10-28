import { create } from "zustand";

type MaintenanceRecordsTotalCostStore = {
  maintenanceRecordsTotalCost: number | undefined;
  setMaintenanceRecordsTotalCost: (
    maintenanceRecordsTotalCost: number | undefined,
  ) => void;

  maintenanceRecordsTotalCostLoading: boolean;
  setMaintenanceRecordsTotalCostLoading: (
    maintenanceRecordsTotalCostLoading: boolean,
  ) => void;
};

const useMaintenanceRecordsTotalCostStore =
  create<MaintenanceRecordsTotalCostStore>((set) => ({
    maintenanceRecordsTotalCost: undefined,
    setMaintenanceRecordsTotalCost: (nextMaintenanceRecordsTotalCost) =>
      set(() => ({
        maintenanceRecordsTotalCost: nextMaintenanceRecordsTotalCost,
      })),

    maintenanceRecordsTotalCostLoading: true,
    setMaintenanceRecordsTotalCostLoading: (
      nextMaintenanceRecordsTotalCostLoading,
    ) =>
      set(() => ({
        maintenanceRecordsTotalCostLoading:
          nextMaintenanceRecordsTotalCostLoading,
      })),
  }));
export default useMaintenanceRecordsTotalCostStore;
