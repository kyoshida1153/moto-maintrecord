import React from "react";
import { BarChart } from "@mui/x-charts";

type Props = {
  chartData: {
    during: string;
    cost: number;
  }[];
  groupBy?: string;
};

// 補助線が表示されない場合
// import dynamic from "next/dynamic";
// const BarChart = dynamic(
//   () => import("@mui/x-charts/BarChart").then((mod) => mod.BarChart),
//   { ssr: false },
// );

export default function BarChartVertical({ chartData, groupBy }: Props) {
  return (
    <BarChart
      skipAnimation
      dataset={chartData}
      xAxis={[
        {
          dataKey: "during",
        },
      ]}
      yAxis={[
        {
          valueFormatter: (value: number) => `${value / 1000}K`,
          label: "出費金額（千円単位）",
          tickLabelStyle: {
            textOrientation: "upright",
          },
        },
      ]}
      series={[
        {
          dataKey: "cost",
          // label: "出費金額",
          color: "#2979ff",
        },
      ]}
      height={400}
      grid={{ horizontal: true }}
      slotProps={{
        legend: {
          direction: "horizontal",
          position: { vertical: "bottom", horizontal: "center" },
        },
      }}
      sx={{
        "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
          fill: "#555",
        },

        "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
          fill: "#555",
          transform:
            groupBy === "day"
              ? "rotate(-45deg) translateX(-1%) translateY(0.5%)"
              : undefined,
          textAnchor: groupBy === "day" ? "end" : undefined,
        },

        "& .MuiChartsAxis-label text": {
          writingMode: "vertical-rl",
          textOrientation: "upright",
          transform: "translate(16px,0)!important",
        },
      }}
    />
  );
}
