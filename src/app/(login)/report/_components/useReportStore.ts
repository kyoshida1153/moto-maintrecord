import { create } from "zustand";
import type { MaintenanceRecordAggregateCostByBike } from "@/app/api/maintenance-records/aggregate/cost/by-bikes/route";
import type { MaintenanceRecordAggregateCostByCategory } from "@/app/api/maintenance-records/aggregate/cost/by-categories/route";
import type { MaintenanceRecordAggregateCalenderDateByYears } from "@/app/api/maintenance-records/aggregate/calender-date/by-years/route";

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

type GetMaintenanceRecordsCalenderDateByYearsResponse = {
  status: "success" | "error" | undefined;
  message: string;
  result?: MaintenanceRecordAggregateCalenderDateByYears[];
};

type ReportState = {
  // 月別 or 日別の出費
  getMaintenanceRecordsTotalCostResponse: GetMaintenanceRecordsTotalCostResponse;
  setGetMaintenanceRecordsTotalCostResponse: (
    getMaintenanceRecordsTotalCostResponse: GetMaintenanceRecordsTotalCostResponse,
  ) => void;
  isLoadingGetMaintenanceRecordsTotalCost: boolean;
  setIsLoadingGetMaintenanceRecordsTotalCost: (
    isLoadingGetMaintenanceRecordsTotalCost: boolean,
  ) => void;

  // 所有バイク別の出費
  getMaintenanceRecordsTotalCostByBikesResponse: GetMaintenanceRecordsTotalCostByBikesResponse;
  setGetMaintenanceRecordsTotalCostByBikesResponse: (
    getMaintenanceRecordsTotalCostByBikesResponse: GetMaintenanceRecordsTotalCostByBikesResponse,
  ) => void;
  isLoadingGetMaintenanceRecordsTotalCostByBikes: boolean;
  setIsLoadingGetMaintenanceRecordsTotalCostByBikes: (
    isLoadingGetMaintenanceRecordsTotalCostByBikes: boolean,
  ) => void;

  // カテゴリー別の出費
  getMaintenanceRecordsTotalCostByCategoriesResponse: GetMaintenanceRecordsTotalCostByCategoriesResponse;
  setGetMaintenanceRecordsTotalCostByCategoriesResponse: (
    getMaintenanceRecordsTotalCostByCategoriesResponse: GetMaintenanceRecordsTotalCostByCategoriesResponse,
  ) => void;
  isLoadingGetMaintenanceRecordsTotalCostByCategories: boolean;
  setIsLoadingGetMaintenanceRecordsTotalCostByCategories: (
    isLoadingGetMaintenanceRecordsTotalCostByCategories: boolean,
  ) => void;

  // 記録のある年
  getMaintenanceRecordsCalenderDateByYearsResponse: GetMaintenanceRecordsCalenderDateByYearsResponse;
  setGetMaintenanceRecordsCalenderDateByYearsResponse: (
    getMaintenanceRecordsCalenderDateByYearsResponse: GetMaintenanceRecordsCalenderDateByYearsResponse,
  ) => void;
  isLoadingGetMaintenanceRecordsCalenderDateByYears: boolean;
  setIsLoadingGetMaintenanceRecordsCalenderDateByYears: (
    isLoadingGetMaintenanceRecordsCalenderDateByYears: boolean,
  ) => void;
};

const useReportStore = create<ReportState>((set) => ({
  // 月別 or 日別の出費
  getMaintenanceRecordsTotalCostResponse: {
    status: undefined,
    message: "",
    totalCost: 0,
  },
  setGetMaintenanceRecordsTotalCostResponse: (nextValue) =>
    set(() => ({
      getMaintenanceRecordsTotalCostResponse: nextValue,
    })),
  isLoadingGetMaintenanceRecordsTotalCost: true,
  setIsLoadingGetMaintenanceRecordsTotalCost: (nextValue) =>
    set(() => ({
      isLoadingGetMaintenanceRecordsTotalCost: nextValue,
    })),

  // 所有バイク別の出費
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

  // カテゴリー別の出費
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

  // 記録のある年
  getMaintenanceRecordsCalenderDateByYearsResponse: {
    status: undefined,
    message: "",
  },
  setGetMaintenanceRecordsCalenderDateByYearsResponse: (nextValue) =>
    set(() => ({
      getMaintenanceRecordsCalenderDateByYearsResponse: nextValue,
    })),
  isLoadingGetMaintenanceRecordsCalenderDateByYears: true,
  setIsLoadingGetMaintenanceRecordsCalenderDateByYears: (nextValue) =>
    set(() => ({
      isLoadingGetMaintenanceRecordsCalenderDateByYears: nextValue,
    })),
}));

export default useReportStore;
