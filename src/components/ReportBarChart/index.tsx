"use client";

import { BarChart } from "@mui/x-charts/BarChart";

// 補助線が表示されない場合
// import dynamic from "next/dynamic";
// const BarChart = dynamic(
//   () => import("@mui/x-charts/BarChart").then((mod) => mod.BarChart),
//   { ssr: false },
// );

export default function ReportBarChart({
  data,
}: {
  data: { key: string; value: number }[];
}) {
  return (
    <BarChart
      dataset={data}
      xAxis={[
        {
          dataKey: "key",
        },
      ]}
      series={[
        {
          dataKey: "value",
          label: "費用 (円)",
          color: "#0088FE",
        },
      ]}
      // width={}
      height={400}
      grid={{ horizontal: true }}
      slotProps={{
        legend: {
          direction: "horizontal",
          position: { vertical: "bottom", horizontal: "center" },
        },
      }}
    />
  );
}
