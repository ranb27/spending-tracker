import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

export default function pieChart() {
  const data = [
    { id: 0, value: 10, label: "series A" },
    { id: 1, value: 15, label: "series B" },
    { id: 2, value: 20, label: "series C" },
    { id: 3, value: 10, label: "series D" },
  ];

  return (
    <PieChart
      series={[
        {
          data: data,
          arcLabel: undefined,
          arcLabelMinAngle: 20,
          arcLabelRadius: "75%",
          innerRadius: 5,
          paddingAngle: 2.5,
          cornerRadius: 1,
          // highlightScope: { fade: "global", highlight: "item" },
          // faded: { innerRadius: 50, additionalRadius: -25, color: "gray" },
        },
      ]}
      height={150}
      width={150}
      margin={{ top: 0, right: 20, bottom: 0, left: 20 }}
      slotProps={{ legend: { hidden: true } }}
      sx={{
        ".MuiPieArc-root": {
          stroke: "none !important",
        },
        ".css-1f57y8b": {
          fill: "oklch(var(--p)) !important",
        },
      }}
    />
  );
}
