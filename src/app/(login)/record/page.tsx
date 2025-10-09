import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import MuiLink from "@mui/material/Link";
import Heading from "@/components/Heading";
import RecordCard from "@/components/RecordCard";

export default function RecordPage() {
  const dummyRecords = Object.groupBy(
    [
      {
        id: "1",
        name: "オイル交換",
        date: "2025-10-01",
        category_id: "1",
        category_name: "メンテナンス",
        bike_id: "1",
        bike_name: "Ninja250",
        cost: "5,000",
      },
      {
        id: "2",
        name: "タイヤ交換",
        date: "2025-09-21",
        category_id: "1",
        category_name: "メンテナンス",
        bike_id: "1",
        bike_name: "Ninja250",
        cost: "20,000",
      },
      {
        id: "3",
        name: "ガソリン代",
        date: "2025-09-15",
        category_id: "2",
        category_name: "燃料費",
        bike_id: "1",
        bike_name: "Ninja250",
        cost: "3,000",
      },
      {
        id: "4",
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
    ],
    (x) => x.date,
  );

  console.log(dummyRecords);

  return (
    <>
      <Heading level={1}>整備・出費記録</Heading>
      <div className="my-4 text-center md:my-6 md:text-left">
        <Button
          component={MuiLink}
          variant="contained"
          disableElevation
          startIcon={<AddIcon />}
          href="/record/create"
        >
          整備・出費記録の登録
        </Button>
      </div>
      <div className="my-4 flex w-full max-w-3xl flex-col gap-4 md:my-6">
        {Object.entries(dummyRecords).map(([date, records]) => (
          <div key={date}>
            <h2 className="my-1 text-lg font-[500] md:my-2 md:text-xl">
              {date}
            </h2>
            <div className="flex flex-col gap-3">
              {records.map((record) => (
                <RecordCard
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
          </div>
        ))}
      </div>
    </>
  );
}
