import { create } from "zustand";

type GetMaintenanceRecordsTotalCostResponse = {
  status: "success" | "error" | undefined;
  message: string;
  result?: {
    date: Date;
    cost_str: string;
  }[];
  groupBy?: "day" | "month";
  totalCost: number;
};

type ReportTableState = {
  getMaintenanceRecordsTotalCostResponse: GetMaintenanceRecordsTotalCostResponse;
  setGetMaintenanceRecordsTotalCostResponse: (
    getMaintenanceRecordsTotalCostResponse: GetMaintenanceRecordsTotalCostResponse,
  ) => void;

  isLoadingReportTable: boolean;
  setIsLoadingReportTable: (isLoadingReportTable: boolean) => void;
};

export const useReportTableStore = create<ReportTableState>((set) => ({
  getMaintenanceRecordsTotalCostResponse: {
    status: undefined,
    message: "",
    totalCost: 0,
  },
  setGetMaintenanceRecordsTotalCostResponse: (nextValue) =>
    set(() => ({
      getMaintenanceRecordsTotalCostResponse: nextValue,
    })),

  isLoadingReportTable: true,
  setIsLoadingReportTable: (nextValue) =>
    set(() => ({
      isLoadingReportTable: nextValue,
    })),
}));
