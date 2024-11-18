import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

interface TrendData {
  month_year: string;
  amount: number;
}

export default function barChart({ data }: { data: TrendData[] }) {
  const xData = data.map((item) => item.month_year);
  const yData = data.map((item) => item.amount);

  // console.log("data in bar comp", xData);

  return (
    <div className="">
      <BarChart
        height={250}
        series={[
          {
            data: yData,
            label: "Amount",
            color: "oklch(var(--s))",
          },
        ]}
        slotProps={{ legend: { hidden: true } }}
        leftAxis={null}
        xAxis={[{ scaleType: "band", data: xData }]}
        margin={{ top: 0, right: 20, bottom: 20, left: 20 }}
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
