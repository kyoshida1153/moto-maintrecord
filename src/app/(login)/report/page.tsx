import Heading from "@/components/Heading";
import ReportBarChart from "@/components/ReportBarChart";
import ReportDonutChart from "@/components/ReportDonutChart";
import ReportTable from "@/components/ReportTable";
import YearPicker from "@/components/YearPicker";

export default function ReportPage() {
  const BarChartData = [
    { key: "1月", value: 3400 },
    { key: "2月", value: 6300 },
    { key: "3月", value: 7500 },
    { key: "4月", value: 11200 },
    { key: "5月", value: 22600 },
    { key: "6月", value: 9700 },
    { key: "7月", value: 16500 },
    { key: "8月", value: 15000 },
    { key: "9月", value: 24500 },
    { key: "10月", value: 10480 },
    { key: "11月", value: 20520 },
    { key: "12月", value: 30750 },
  ];

  const DonutCharName1 = "所有バイク";
  const DonutCharData1 = [
    { label: "YAMAHA MT-09", value: 400 },
    { label: "KAWASAKI NINJA ZX-6R", value: 300 },
    { label: "HONDA CBR650R", value: 300 },
  ];

  const DonutCharName2 = "カテゴリー";
  const DonutCharData2 = [
    { label: "メンテナンス", value: 400 },
    { label: "カスタム", value: 300 },
    { label: "ツーリング", value: 300 },
  ];

  return (
    <div>
      <div className="flex flex-row items-center gap-6 md:gap-8">
        <Heading level={1}>レポート</Heading>
        <section className="mb-4 max-w-[120px] md:mb-6">
          <YearPicker />
        </section>
      </div>
      <div className="flex flex-col gap-6 md:gap-8">
        <div className="flex flex-col gap-6 md:gap-8 xl:flex-row">
          <div className="flex w-full max-w-[1000px] flex-col gap-6 md:gap-8">
            <section className="display rounded border border-solid border-[var(--border-color-gray)] bg-white py-6 md:py-8">
              <ReportBarChart data={BarChartData} />
            </section>
            <section className="flex w-full flex-col items-center gap-4 rounded border border-solid border-[var(--border-color-gray)] bg-white pb-6 md:pb-8 xl:flex-row xl:items-start xl:justify-evenly">
              <ReportDonutChart
                groupName={DonutCharName1}
                groupData={DonutCharData1}
              />
              <ReportDonutChart
                groupName={DonutCharName2}
                groupData={DonutCharData2}
              />
            </section>
          </div>
          <section className="display flex h-fit justify-center rounded border border-solid border-[var(--border-color-gray)] bg-white px-6 py-6 md:px-8 md:py-8">
            <ReportTable data={BarChartData} />
          </section>
        </div>
      </div>
    </div>
  );
}
