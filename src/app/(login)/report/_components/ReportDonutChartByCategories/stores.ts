import { create } from "zustand";
import type { MaintenanceRecordAggregateCostByCategory } from "@/app/api/maintenance-records/aggregate/cost/by-categories/route";

type GetMaintenanceRecordsTotalCostByCategoriesResponse = {
  status: "success" | "error" | undefined;
  message: string;
  result?: MaintenanceRecordAggregateCostByCategory[];
  totalCost: number;
};

type ReportDonutChartByCategoriesState = {
  getMaintenanceRecordsTotalCostByCategoriesResponse: GetMaintenanceRecordsTotalCostByCategoriesResponse;
  setGetMaintenanceRecordsTotalCostByCategoriesResponse: (
    getMaintenanceRecordsTotalCostByCategoriesResponse: GetMaintenanceRecordsTotalCostByCategoriesResponse,
  ) => void;
  isLoadingGetMaintenanceRecordsTotalCostByCategories: boolean;
  setIsLoadingGetMaintenanceRecordsTotalCostByCategories: (
    isLoadingGetMaintenanceRecordsTotalCostByCategories: boolean,
  ) => void;
};

export const useReportDonutChartByCategoriesStore =
  create<ReportDonutChartByCategoriesState>((set) => ({
    getMaintenanceRecordsTotalCostByCategoriesResponse: {
      status: undefined,
      message: "",
      totalCost: 0,
    },
    setGetMaintenanceRecordsTotalCostByCategoriesResponse: (nextValue) =>
      set(() => ({
        getMaintenanceRecordsTotalCostByCategoriesResponse: nextValue,
      })),
    isLoadingGetMaintenanceRecordsTotalCostByCategories: true,
    setIsLoadingGetMaintenanceRecordsTotalCostByCategories: (nextValue) =>
      set(() => ({
        isLoadingGetMaintenanceRecordsTotalCostByCategories: nextValue,
      })),
  }));
