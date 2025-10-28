"use client";

import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import MaintenanceRecordsListCard from "./MaintenanceRecordsListCard";
import MaintenanceRecordsListPagination from "./MaintenanceRecordsListPagination";
import useMaintenanceRecordsStore from "@/stores/useMaintenanceRecordsStore";
import type { MaintenanceRecordSelect } from "@/app/api/maintenance-records/route";

type Props = {
  pagination?: boolean;
};

export default function MaintenanceRecordsList({ pagination = true }: Props) {
  const { maintenanceRecords, maintenanceRecordsLoading } =
    useMaintenanceRecordsStore();
  const [maintenanceRecordGroups, setMaintenanceRecordGroups] =
    useState<object>({});

  useEffect(() => {
    if (maintenanceRecords.length === 0) {
      setMaintenanceRecordGroups({});
      return;
    }
    const resultGroup = Object.groupBy(
      maintenanceRecords,
      (x) => String(x.calenderDate).split("T")[0],
    );
    if (resultGroup) setMaintenanceRecordGroups(resultGroup);
  }, [maintenanceRecords]);

  return (
    <div className="flex flex-col gap-8">
      {maintenanceRecordsLoading ? (
        <div className="flex w-full justify-center py-4">
          <Loading size="36px" />
        </div>
      ) : Object.keys(maintenanceRecordGroups).length > 0 ? (
        <>
          <div className="flex flex-col gap-4">
            {Object.entries(maintenanceRecordGroups).map(([date, records]) => (
              <section key={date}>
                <div className="my-1 flex justify-between md:my-2">
                  <h3 className="text-lg font-[500] md:text-xl">
                    {date.replace(
                      /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/g,
                      (match, p1, p2, p3) => {
                        return `${Number(p1)}年${Number(p2)}月${Number(p3)}日`;
                      },
                    )}
                  </h3>
                  <p className="_font-[500] mr-[3.9em] md:mr-[4.6em]">
                    <span className="text-sm md:text-base">合計: </span>
                    <span className="font-alphanumeric text-lg md:text-xl">
                      {(records as MaintenanceRecordSelect[])
                        .reduce((sum, record) => sum + record.cost, 0)
                        .toLocaleString()}
                    </span>
                    <span className="ml-0.5 text-sm md:text-base">円</span>
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  {(records as MaintenanceRecordSelect[]).map((record) => (
                    <MaintenanceRecordsListCard
                      key={record.id}
                      id={record.id}
                      title={record.title}
                      categoryName={record.maintenanceCategory?.name ?? ""}
                      bikeName={record.bike?.name ?? ""}
                      cost={record.cost}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
          {pagination ? <MaintenanceRecordsListPagination /> : ""}
        </>
      ) : (
        <p>整備・出費記録はまだ登録されていません。</p>
      )}
    </div>
  );
}
