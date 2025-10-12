"use client";

import RecordListCard from "./MaintenanceRecordListCard";

type MaintenanceRecords = {
  id: string;
  name: string;
  date: string;
  category_id: string;
  category_name: string;
  bike_id: string;
  bike_name: string;
  cost: string;
}[];

export default function MaintenanceRecordList({
  records,
}: {
  records: MaintenanceRecords;
}) {
  const recordsGroup = Object.groupBy(records, (x) => x.date);

  return (
    <>
      {Object.entries(recordsGroup).map(([date, records]) => (
        <section key={date}>
          <h3 className="my-1 text-lg font-[500] md:my-2 md:text-xl">{date}</h3>
          <div className="flex flex-col gap-3">
            {records.map((record) => (
              <RecordListCard
                key={record.id}
                id={record.id}
                name={record.name}
                category_id={record.category_id}
                category_name={record.category_name}
                bike_id={record.bike_id}
                bike_name={record.bike_name}
                cost={record.cost}
              />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
