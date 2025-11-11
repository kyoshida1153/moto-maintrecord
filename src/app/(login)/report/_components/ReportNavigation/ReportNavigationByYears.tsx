"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

import isDateYyyy from "@/utils/isDateYyyy";
import isDateYyyyMm from "@/utils/isDateYyyyMm";
import Loading from "@/components/Loading";
import SelectBoxLink from "./SelectBoxLink";
import useReportStore from "../useReportStore";

export default function ReportNavigationByYears() {
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
  } = useReportStore();

  const [itemList, setItemList] = useState<
    { value: string | undefined; text: string }[]
  >([]);

  useEffect(() => {
    setItemList([]);

    if (
      getMaintenanceRecordsCalenderDateByYearsResponse.result === undefined ||
      getMaintenanceRecordsCalenderDateByYearsResponse.result.length === 0
    )
      return;

    const years = getMaintenanceRecordsCalenderDateByYearsResponse.result;

    const newItemList = currentMonth
      ? years.map((i) => {
          return {
            value: `${i.year}-${currentMonth.toString().padStart(2, "0")}`,
            text: `${i.year}年`,
          };
        })
      : years.map((i) => {
          return {
            value: i.year,
            text: `${i.year}年`,
          };
        });

    setItemList(newItemList);
  }, [currentMonth, getMaintenanceRecordsCalenderDateByYearsResponse]);

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
          name="year"
          label="年を選択"
          itemList={itemList}
          defaultValue={defaultValue}
          disabled={isDisabled}
        />
      )}
    </>
  );
}
