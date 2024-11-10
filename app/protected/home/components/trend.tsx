import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

interface Props {
  data: any;
}
export default function trend({ data }: Props) {
  return (
    <div>
      <LineChart
        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
        series={[
          {
            data: [2, 5.5, 2, 8.5, 1.5, 5],
          },
        ]}
        height={250}
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
            stroke: "oklch(var(--bc)) !important",
          },
          ".MuiChartsAxis-line": {
            stroke: "oklch(var(--bc)) !important",
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
