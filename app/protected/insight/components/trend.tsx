import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

interface TrendData {
  month_year: string;
  amount: number;
}
export default function trend({ data }: { data: TrendData[] }) {
  console.log("data in trend comp", data);

  const xData = data.map((item) => item.month_year);
  const yData = data.map((item) => item.amount);

  return (
    <div>
      <LineChart
        xAxis={[{ data: xData }]}
        series={[
          {
            data: yData,
          },
        ]}
        height={400} // Increased height
        width={600} // Optionally specify a width
        colors={["oklch(var(--s))"]}
        leftAxis={null}
        margin={{ top: 0, right: 10, left: 10 }}
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
