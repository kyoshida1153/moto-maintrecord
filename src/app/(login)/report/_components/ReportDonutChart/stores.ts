import { create } from "zustand";
import type { MaintenanceRecordAggregateCostByBike } from "@/app/api/maintenance-records/aggregate/cost/by-bikes/route";
import type { MaintenanceRecordAggregateCostByCategory } from "@/app/api/maintenance-records/aggregate/cost/by-categories/route";

type GetMaintenanceRecordsTotalCostByBikesResponse = {
  status: "success" | "error" | undefined;
  message: string;
  result?: MaintenanceRecordAggregateCostByBike[];
  totalCost: number;
};

type GetMaintenanceRecordsTotalCostByCategoriesResponse = {
  status: "success" | "error" | undefined;
  message: string;
  result?: MaintenanceRecordAggregateCostByCategory[];
  totalCost: number;
};

type ReportDonutChartStore = {
  getMaintenanceRecordsTotalCostByBikesResponse: GetMaintenanceRecordsTotalCostByBikesResponse;
  setGetMaintenanceRecordsTotalCostByBikesResponse: (
    getMaintenanceRecordsTotalCostByBikesResponse: GetMaintenanceRecordsTotalCostByBikesResponse,
  ) => void;

  getMaintenanceRecordsTotalCostByCategoriesResponse: GetMaintenanceRecordsTotalCostByCategoriesResponse;
  setGetMaintenanceRecordsTotalCostByCategoriesResponse: (
    getMaintenanceRecordsTotalCostByCategoriesResponse: GetMaintenanceRecordsTotalCostByCategoriesResponse,
  ) => void;

  isLoadingReportDonutChart: boolean;
  setIsLoadingReportDonutChart: (isLoadingReportDonutChart: boolean) => void;
};

export const useReportDonutChartStore = create<ReportDonutChartStore>(
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

    getMaintenanceRecordsTotalCostByCategoriesResponse: {
      status: undefined,
      message: "",
      totalCost: 0,
    },
    setGetMaintenanceRecordsTotalCostByCategoriesResponse: (nextValue) =>
      set(() => ({
        getMaintenanceRecordsTotalCostByCategoriesResponse: nextValue,
      })),

    isLoadingReportDonutChart: true,
    setIsLoadingReportDonutChart: (nextValue) =>
      set(() => ({
        isLoadingReportDonutChart: nextValue,
      })),
  }),
);
