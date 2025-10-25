"use client";

import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import RecordListCard from "./MaintenanceRecordListCard";
import MaintenanceRecordListPagination from "./MaintenanceRecordListPagination";
import isNumber from "@/utils/isNumber";
import { useSearchParams } from "next/navigation";
import findMaintenanceRecords from "./findMaintenanceRecords";
import type { MaintenanceRecordSelect } from "@/app/api/maintenance-records/route";

export default function MaintenanceRecordList() {
  const [maintenanceRecordGroups, setMaintenanceRecordGroups] = useState({});
  const [loading, setLoading] = useState<boolean>(true);

  const searchParams = useSearchParams();
  const pageString = searchParams.get("page") || "";
  const page = isNumber(pageString) ? pageString : "1";

  useEffect(() => {
    (async () => {
      setLoading(true);
      const params = { page };
      const result = await findMaintenanceRecords(params);

      if (!result) {
        setMaintenanceRecordGroups({});
        setLoading(false);
        return;
      }
      const resultGroup = Object.groupBy(
        result,
        (x) => String(x.calenderDate).split("T")[0],
      );

      setLoading(false);
      if (resultGroup) setMaintenanceRecordGroups(resultGroup);
    })();
  }, [page]);

  return (
    <div className="my-4 flex flex-col gap-6 md:my-6">
      {loading ? (
        <div className="flex w-full justify-center py-4">
          <Loading size="36px" />
        </div>
      ) : maintenanceRecordGroups ? (
        <>
          <div className="flex flex-col gap-4 md:my-6">
            {Object.entries(maintenanceRecordGroups).map(([date, records]) => (
              <section key={date}>
                <h3 className="my-1 text-lg font-[500] md:my-2 md:text-xl">
                  {date}
                </h3>
                <div className="flex flex-col gap-3">
                  {(records as MaintenanceRecordSelect[]).map((record) => (
                    <RecordListCard
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
          <MaintenanceRecordListPagination />
        </>
      ) : (
        <p>整備・出費記録はまだ登録されていません。</p>
      )}
    </div>
  );
}
