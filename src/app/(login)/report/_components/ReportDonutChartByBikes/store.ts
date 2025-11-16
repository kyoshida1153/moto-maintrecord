import { create } from "zustand";
import type { MaintenanceRecordAggregateCostByBike } from "@/app/api/maintenance-records/aggregate/cost/by-bikes/route";

type GetMaintenanceRecordsTotalCostByBikesResponse = {
  status: "success" | "error" | undefined;
  message: string;
  result?: MaintenanceRecordAggregateCostByBike[];
  totalCost: number;
};

type ReportDonutChartByBikesState = {
  getMaintenanceRecordsTotalCostByBikesResponse: GetMaintenanceRecordsTotalCostByBikesResponse;
  setGetMaintenanceRecordsTotalCostByBikesResponse: (
    getMaintenanceRecordsTotalCostByBikesResponse: GetMaintenanceRecordsTotalCostByBikesResponse,
  ) => void;
  isLoadingGetMaintenanceRecordsTotalCostByBikes: boolean;
  setIsLoadingGetMaintenanceRecordsTotalCostByBikes: (
    isLoadingGetMaintenanceRecordsTotalCostByBikes: boolean,
  ) => void;
};

const useReportDonutChartByBikesStore = create<ReportDonutChartByBikesState>(
  (set) => ({
    getMaintenanceRecordsTotalCostByBikesResponse: {
      status: undefined,
      message: "",
      totalCost: 0,
    },
    setGetMaintenanceRecordsTotalCostByBikesResponse: (nextValue) =>
      set(() => ({
        getMaintenanceRecordsTotalCostByBikesResponse: nextValue,
      })),
    isLoadingGetMaintenanceRecordsTotalCostByBikes: true,
    setIsLoadingGetMaintenanceRecordsTotalCostByBikes: (nextValue) =>
      set(() => ({
        isLoadingGetMaintenanceRecordsTotalCostByBikes: nextValue,
      })),
  }),
);

export default useReportDonutChartByBikesStore;
