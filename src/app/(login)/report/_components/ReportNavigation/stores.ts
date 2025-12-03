import { create } from "zustand";
import type { MaintenanceRecordAggregateCalenderDateByYears } from "@/app/api/maintenance-records/aggregate/calender-date/by-years/route";

type GetMaintenanceRecordsCalenderDateByYearsResponse = {
  status: "success" | "error" | undefined;
  message: string;
  result?: MaintenanceRecordAggregateCalenderDateByYears[];
};

type ReportNavigationState = {
  getMaintenanceRecordsCalenderDateByYearsResponse: GetMaintenanceRecordsCalenderDateByYearsResponse;
  setGetMaintenanceRecordsCalenderDateByYearsResponse: (
    getMaintenanceRecordsCalenderDateByYearsResponse: GetMaintenanceRecordsCalenderDateByYearsResponse,
  ) => void;
  isLoadingGetMaintenanceRecordsCalenderDateByYears: boolean;
  setIsLoadingGetMaintenanceRecordsCalenderDateByYears: (
    isLoadingGetMaintenanceRecordsCalenderDateByYears: boolean,
  ) => void;
};

export const useReportNavigationStore = create<ReportNavigationState>(
  (set) => ({
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
  }),
);
