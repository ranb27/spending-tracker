import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { pieArcLabelClasses } from "@mui/x-charts/PieChart";

export default function pieChart() {
  const data = [
    { id: 0, value: 10, label: "series A" },
    { id: 1, value: 15, label: "series B" },
    { id: 2, value: 20, label: "series C" },
  ];

  return (
    <div>
      <PieChart
        series={[
          {
            data: data, // Dynamically set data
            arcLabel: (item) => `${item.value}`, // Show percentage value on the arcs
            arcLabelMinAngle: 20,
            arcLabelRadius: "75%",
            innerRadius: 50,
            paddingAngle: 2.5,
            cornerRadius: 5,
            highlightScope: { fade: "global", highlight: "item" },
            faded: { innerRadius: 75, additionalRadius: -25, color: "gray" },
          },
        ]}
        height={300}
        margin={{ top: 0, right: 20, bottom: 40, left: 20 }}
        slotProps={{
          legend: {
            direction: "row",
            position: { vertical: "bottom", horizontal: "middle" },
            labelStyle: {
              fontSize: 14,
              fill: "oklch(var(--bc))",
            },
          },
        }}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fontWeight: "bold",
            fontSize: 14,
            fill: "oklch(var(--b1))",
          },
          ".MuiPieArc-root": {
            stroke: "none !important",
          },
          ".css-1f57y8b": {
            fill: "oklch(var(--p)) !important",
          },
        }}
      />
    </div>
  );
}
