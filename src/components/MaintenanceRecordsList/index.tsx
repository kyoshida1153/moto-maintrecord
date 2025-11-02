"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

import Loading from "@/components/Loading";
import MaintenanceRecordsListCard from "./MaintenanceRecordsListCard";
import MaintenanceRecordsListPagination from "./MaintenanceRecordsListPagination";
import useMaintenanceRecordsStore from "@/stores/useMaintenanceRecordsStore";
import type { MaintenanceRecordSelect } from "@/app/api/maintenance-records/route";

type Props = {
  pagination?: boolean;
};

export default function MaintenanceRecordsList({ pagination = true }: Props) {
  const { getMaintenanceRecordsResponse, isLoadingGetMaintenanceRecords } =
    useMaintenanceRecordsStore();
  const [maintenanceRecordGroups, setMaintenanceRecordGroups] =
    useState<object>({});

  useEffect(() => {
    setMaintenanceRecordGroups({});
    if (getMaintenanceRecordsResponse.result?.length === 0) return;

    const resultGroup =
      getMaintenanceRecordsResponse.result &&
      Object.groupBy(getMaintenanceRecordsResponse.result, (x) =>
        format(x.calenderDate, "yyyy年M月d日", { locale: ja }),
      );
    if (resultGroup) setMaintenanceRecordGroups(resultGroup);
  }, [getMaintenanceRecordsResponse]);

  return (
    <div className="flex flex-col gap-8">
      {isLoadingGetMaintenanceRecords ? (
        <div className="flex w-full justify-center py-4">
          <Loading size="36px" />
        </div>
      ) : getMaintenanceRecordsResponse.status === "success" ? (
        <>
          {Object.keys(maintenanceRecordGroups).length > 0 ? (
            <>
              <div className="flex flex-col gap-4">
                {Object.entries(maintenanceRecordGroups).map(
                  ([date, records]) => (
                    <section key={date}>
                      <div className="my-1 flex justify-between md:my-2">
                        <h3 className="text-lg font-[500] md:text-xl">
                          {date}
                        </h3>
                        <p className="_font-[500] mr-[3.9em] md:mr-[4.6em]">
                          <span className="text-sm md:text-base">合計: </span>
                          <span className="font-alphanumeric text-lg md:text-xl">
                            {(records as MaintenanceRecordSelect[])
                              .reduce((sum, record) => sum + record.cost, 0)
                              .toLocaleString()}
                          </span>
                          <span className="ml-0.5 text-sm md:text-base">
                            円
                          </span>
                        </p>
                      </div>
                      <div className="flex flex-col gap-3">
                        {(records as MaintenanceRecordSelect[]).map(
                          (record) => (
                            <MaintenanceRecordsListCard
                              key={record.id}
                              id={record.id}
                              title={record.title}
                              categoryName={
                                record.maintenanceCategory?.name ?? ""
                              }
                              bikeName={record.bike?.name ?? ""}
                              cost={record.cost}
                            />
                          ),
                        )}
                      </div>
                    </section>
                  ),
                )}
              </div>
              {pagination ? <MaintenanceRecordsListPagination /> : ""}
            </>
          ) : (
            <p>整備・出費記録はまだ登録されていません。</p>
          )}
        </>
      ) : (
        <p>{getMaintenanceRecordsResponse.message}</p>
      )}
    </div>
  );
}
