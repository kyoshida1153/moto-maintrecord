import React from "react";
import { BarChart } from "@mui/x-charts";

type Props = {
  chartData: {
    during: string;
    cost: number;
  }[];
  groupBy?: string;
};

export default function BarChartHorizontal({ chartData, groupBy }: Props) {
  return (
    <BarChart
      skipAnimation
      dataset={chartData}
      xAxis={[
        {
          valueFormatter: (value: number) => `${value / 1000}K`,
          label: "出費金額（千円単位）",
          position: "top",
        },
      ]}
      yAxis={[
        {
          dataKey: "during",
        },
      ]}
      series={[
        {
          dataKey: "cost",
          // label: "出費金額",
          color: "#2979ff",
        },
      ]}
      layout="horizontal"
      // height={800}
      height={groupBy === "day" ? 800 : 500}
      grid={{ vertical: true }}
      slotProps={{
        legend: {
          direction: "horizontal",
          position: { vertical: "bottom", horizontal: "center" },
        },
      }}
      sx={{
        "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
          fill: "#555",
          fontSize: "13px!important",
        },
        "& .MuiChartsAxis-top .MuiChartsAxis-tickLabel": {
          fill: "#555",
          fontSize: "13px!important",
        },
      }}
    />
  );
}
