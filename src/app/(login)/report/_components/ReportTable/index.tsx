"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

import { Loading } from "@/components";
import { useReportTableStore } from "./stores";

export default function ReportTable() {
  const { getMaintenanceRecordsTotalCostResponse, isLoadingReportTable } =
    useReportTableStore();

  const [tableData, setTableData] = useState<
    { during: string; cost: number; week?: string }[]
  >([]);

  useEffect(() => {
    setTableData([]);

    // 各期間と費用
    const newTableData =
      getMaintenanceRecordsTotalCostResponse.result &&
      getMaintenanceRecordsTotalCostResponse.result.map((item) => ({
        during:
          getMaintenanceRecordsTotalCostResponse.groupBy === "month"
            ? format(item.date, "M月", { locale: ja })
            : format(item.date, "M/d", { locale: ja }),
        cost: Number(item.cost_str),
        week:
          getMaintenanceRecordsTotalCostResponse.groupBy === "day"
            ? format(item.date, "E", { locale: ja })
            : undefined,
      }));
    if (newTableData) setTableData(newTableData);
  }, [getMaintenanceRecordsTotalCostResponse]);

  return (
    <>
      {isLoadingReportTable ? (
        <div className="flex w-full justify-center py-4">
          <Loading size="36px" />
        </div>
      ) : getMaintenanceRecordsTotalCostResponse.status === "success" ? (
        <div className="display flex h-fit justify-center rounded border border-solid border-[var(--border-color-gray)] bg-white px-6 py-6 md:px-8 md:py-8">
          {getMaintenanceRecordsTotalCostResponse.totalCost === 0 ? (
            <div className="w-full text-center">
              <p>該当データなし</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-2 text-right font-[400]" colSpan={2}>
                    <div className="flex w-full flex-nowrap items-baseline justify-between gap-1">
                      <div className="text-[18px] whitespace-nowrap">合計</div>
                      <div className="whitespace-nowrap">
                        <span className="font-alphanumeric mr-0.5 ml-3 text-[24px]">
                          {getMaintenanceRecordsTotalCostResponse.totalCost.toLocaleString()}
                        </span>
                        <span className="text-[14px]">円</span>
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row) => (
                  <tr
                    key={row.during}
                    className="border-b border-gray-200 odd:bg-gray-50 even:bg-white"
                  >
                    <td className="px-4 py-2 text-left">
                      <div className="whitespace-nowrap">
                        <span className="mr-0.5 text-[18px]">{row.during}</span>
                        {row.week ? (
                          <span className="text-[13px]">({row.week})</span>
                        ) : (
                          ""
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-2 text-right">
                      <div className="whitespace-nowrap">
                        <span className="font-alphanumeric mr-0.5 text-[18px]">
                          {row.cost.toLocaleString()}
                        </span>
                        <span className="text-[13px]">円</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ) : (
        <div className="w-full text-center">
          <p>{getMaintenanceRecordsTotalCostResponse.message}</p>
        </div>
      )}
    </>
  );
}
