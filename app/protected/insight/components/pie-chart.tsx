import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

interface PieChartData {
  category: string;
  amount: number;
}

interface PieChartProps {
  data: PieChartData[];
}

export default function PieChartComponent({ data }: PieChartProps) {
  // Transform the data into the format required by the PieChart
  const chartData = data.map((item, index) => ({
    id: index,
    value: item.amount,
    label: item.category,
  }));

  return (
    <PieChart
      series={[
        {
          data: chartData,
          arcLabel: undefined,
          arcLabelMinAngle: 20,
          arcLabelRadius: "50%",
          innerRadius: 25,
          paddingAngle: 2.5,
          cornerRadius: 1,
          highlightScope: { fade: "global", highlight: "item" },
          faded: { innerRadius: 50, additionalRadius: -25, color: "gray" },
        },
      ]}
      height={150}
      width={300}
      margin={{ top: 0, right: 120, bottom: 0, left: 0 }}
      // slotProps={{ legend: { hidden: true } }}
      slotProps={{
        legend: {
          direction: "column",
          position: { vertical: "middle", horizontal: "right" },
          labelStyle: {
            fontSize: 14,
            fill: "oklch(var(--bc))",
          },
        },
      }}
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
