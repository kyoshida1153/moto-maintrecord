import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import MuiLink from "@mui/material/Link";
import RecordCalendar from "@/components/RecordCalendar";
import RecordList from "@/components/RecordList";

export default function TopPage() {
  const dummyRecords = [
    {
      id: "1",
      name: "任意保険更新",
      date: "2025-10-05",
      category_id: "3",
      category_name: "保険料",
      bike_id: "1",
      bike_name: "Ninja250",
      cost: "15,000",
    },
    {
      id: "2",
      name: "オイル交換",
      date: "2025-10-01",
      category_id: "1",
      category_name: "メンテナンス",
      bike_id: "1",
      bike_name: "Ninja250",
      cost: "4,000",
    },
    {
      id: "3",
      name: "タイヤ交換",
      date: "2025-09-21",
      category_id: "1",
      category_name: "メンテナンス",
      bike_id: "1",
      bike_name: "Ninja250",
      cost: "20,000",
    },
    {
      id: "4",
      name: "ガソリン代",
      date: "2025-09-15",
      category_id: "2",
      category_name: "燃料費",
      bike_id: "1",
      bike_name: "Ninja250",
      cost: "3,000",
    },
    {
      id: "5",
      name: "チェーン清掃",
      date: "2025-08-30",
      category_id: "1",
      category_name: "メンテナンス",
      bike_id: "1",
      bike_name: "Ninja250",
      cost: "1,500",
    },
    {
      id: "5",
      name: "バッテリー交換",
      date: "2025-08-30",
      category_id: "1",
      category_name: "メンテナンス",
      bike_id: "1",
      bike_name: "Ninja250",
      cost: "8,000",
    },
  ];

  const dummyRecordsList = dummyRecords.filter((record) => {
    const date1 = new Date("2025-09-01");
    const date2 = new Date(record.date);
    const isSameMonth =
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth();
    if (isSameMonth) return record;
  });

  const dummyRecordsCalendar = dummyRecords.map((record) => ({
    title: record.cost,
    start: record.date,
  }));

  return (
    <>
      <div className="mb-8 flex flex-col gap-8 md:mb-0 xl:flex-row">
        <div className="xl:w-[50%]">
          <div className="mt-4 mb-8 text-center md:mt-0 md:mb-6 md:text-left">
            <Button
              component={MuiLink}
              variant="contained"
              disableElevation
              startIcon={<AddIcon />}
              href="/record/create"
            >
              新しい整備・出費記録を追加
            </Button>
          </div>
          <RecordCalendar events={dummyRecordsCalendar} />
        </div>
        <div className="flex flex-col gap-4 xl:w-[50%]">
          <h2 className="border-b border-gray-800 text-xl font-[500] md:text-2xl">
            2025年10月の合計：{" "}
            <span className="font-alphanumeric mr-0.5 text-3xl md:text-4xl">
              19,000
            </span>
            円
          </h2>
          <RecordList records={dummyRecordsList} />
        </div>
      </div>
    </>
  );
}
