"use client";

import * as React from "react";
import { DefaultizedPieValueType } from "@mui/x-charts/models";
import { PieChart } from "@mui/x-charts/PieChart";
import { legendClasses } from "@mui/x-charts/ChartsLegend";

export default function ReportDonutChart({
  groupName,
  groupData,
}: {
  groupName: string;
  groupData: {
    label: string;
    value: number;
  }[];
}) {
  const TOTAL = groupData.map((item) => item.value).reduce((a, b) => a + b, 0);
  const getArcLabel = (params: DefaultizedPieValueType) => {
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%`;
  };

  return (
    <div className="relative w-[300px]">
      <PieChart
        width={300}
        height={300}
        margin={{ right: 0 }}
        // hideLegend={true}
        series={[
          {
            data: groupData,
            innerRadius: 70,
            outerRadius: 100,
            arcLabel: getArcLabel,
            arcLabelRadius: "84%",
            arcLabelMinAngle: 20,
          },
        ]}
        sx={{
          ["& .MuiPieArc-root"]: {
            // stroke: "#fff",
            strokeWidth: 0,
          },
          ["& .MuiPieArcLabel-root"]: {
            fill: "#555",
            fontSize: 14,
            textAnchor: "middle",
          },
          // ["& .MuiChartsLegend-root"]: {
          //   transform: "translate(5px, 0)",
          // },
        }}
        slotProps={{
          legend: {
            direction: "horizontal",
            position: {
              vertical: "bottom",
              horizontal: "center",
            },
            sx: {
              fontSize: "13px",
              gap: "12px",
              [`.${legendClasses.root}`]: {
                alignItems: "center",
              },
              [`.${legendClasses.mark}`]: {
                height: 12,
                width: 12,
              },
              [`.${legendClasses.series}`]: {
                gap: "3px",
              },
              [`.${legendClasses.label}`]: {
                maxWidth: "10em",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: "1",
                lineHeight: "1.3",
              },
            },
          },
        }}
      ></PieChart>
      <div className="pointer-events-none absolute top-[150px] left-[50%] line-clamp-1 max-w-[40%] -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="text-[15px] text-[#333]">{groupName}</div>
      </div>
    </div>
  );
}
