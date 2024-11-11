import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

const seriesA = {
  data: [2, 3, 1, 4, 5],
  label: "Series A",
};

export default function barChart() {
  return (
    <div className="card bg-base-100 p-4">
      <BarChart
        height={200}
        series={[
          {
            data: [2, 3, 1, 4, 5],
            label: "Series A",
          },
        ]}
        slotProps={{ legend: { hidden: true } }}
        leftAxis={null}
        margin={{ top: 0, right: 20, bottom: 0, left: 20 }}
        sx={{
          ".MuiChartsAxis-tickLabel": {
            fill: "oklch(var(--bc)) !important",
          },
          ".MuiChartsAxis-domain": {
            stroke: "oklch(var(--bc)) !important",
          },
          ".MuiChartsAxis-tick": {
            stroke: "transparent !important",
          },
          ".MuiChartsAxis-line": {
            stroke: "transparent !important",
          },
          ".css-1f57y8b": {
            fill: "oklch(var(--p)) !important",
          },

          ".MuiBarLabel-root": {
            fontWeight: "bold",
            fill: "oklch(var(--b1))",
            fontSize: 14,
          },
        }}
      />
    </div>
  );
}
