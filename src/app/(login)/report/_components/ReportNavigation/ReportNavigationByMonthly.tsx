"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

import { isDateYyyy, isDateYyyyMm } from "@/utils";
import { Loading } from "@/components";
import SelectBoxLink from "./SelectBoxLink";
import useReportNavigationStore from "./store";

export default function ReportNavigationByMonthly() {
  // URLパラメーターを元にセレクトボックスのdefaultValueを作成
  const searchParams = useSearchParams();
  const paramDate = searchParams.get("date") || "";

  const currentYear = isDateYyyyMm(paramDate)
    ? paramDate.split("-")[0]
    : isDateYyyy(paramDate)
      ? paramDate
      : format(new Date(), "yyyy", { locale: ja });

  const currentMonth = isDateYyyyMm(paramDate)
    ? paramDate.split("-")[1]
    : undefined;

  const defaultValue = currentMonth
    ? `${currentYear}-${currentMonth}`
    : currentYear;

  // ここからセレクトボックス内の選択肢を作成
  const {
    getMaintenanceRecordsCalenderDateByYearsResponse,
    isLoadingGetMaintenanceRecordsCalenderDateByYears,
  } = useReportNavigationStore();

  const [itemList, setItemList] =
    useState<{ value: string | undefined; text: string }[]>();

  useEffect(() => {
    setItemList([]);

    if (
      getMaintenanceRecordsCalenderDateByYearsResponse.result === undefined ||
      getMaintenanceRecordsCalenderDateByYearsResponse.result.length === 0
    )
      return;

    const newItemList = [...Array(12).keys()].map((i) => {
      const month = i + 1;
      return {
        value: `${currentYear}-${month.toString().padStart(2, "0")}`,
        text: `${month}月`,
      };
    });

    setItemList([
      {
        value: currentYear,
        text: `すべて`,
      },
      ...newItemList,
    ]);
  }, [currentYear, getMaintenanceRecordsCalenderDateByYearsResponse]);

  // disabled
  const isDisabled =
    getMaintenanceRecordsCalenderDateByYearsResponse.result === undefined ||
    getMaintenanceRecordsCalenderDateByYearsResponse.result.length === 0
      ? true
      : false;
  return (
    <>
      {isLoadingGetMaintenanceRecordsCalenderDateByYears ? (
        <div className="flex w-full min-w-[120px] items-center justify-center">
          <Loading size="24px" />
        </div>
      ) : (
        <SelectBoxLink
          name="month"
          label="月を選択"
          itemList={itemList}
          defaultValue={defaultValue}
          disabled={isDisabled}
        />
      )}
    </>
  );
}
