import React from "react";
import { ArrowDownNarrowWide, ArrowUpNarrowWide } from "lucide-react";

const SpendingGauge = ({
  data,
  dataPercent,
}: {
  data: any;
  dataPercent: number;
}) => {
  const income = data.reduce(
    (acc: number, item: { amount: number; is_income: boolean }) =>
      item.is_income ? acc + item.amount : acc,
    0
  );
  const expense = data.reduce(
    (acc: number, item: { amount: number; is_income: boolean }) =>
      item.is_income ? acc : acc + item.amount,
    0
  );
  const formatAmount = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="w-full bg-base-100/75 card shadow-md">
      <div className="p-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="menu-title">Spending Gauge</h3>
          </div>
          <div className="flex items-center justify-between gap-8">
            <div className="relative flex-1">
              <svg className="w-32 h-32" viewBox="0 0 100 100">
                <circle
                  className="stroke-secondary dark:stroke-neutral fill-none"
                  strokeWidth="10"
                  cx="50"
                  cy="50"
                  r="40"
                />
                <circle
                  className="stroke-primary fill-none transition-all duration-300 ease-in-out"
                  strokeWidth="10"
                  strokeLinecap="round"
                  cx="50"
                  cy="50"
                  r="40"
                  strokeDasharray={`${Math.min(dataPercent, 100) * 2.51}, 251.2`}
                  transform="rotate(-90 50 50)"
                />
                <text
                  x="50"
                  y="50"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  className="font-bold fill-primary"
                >
                  {dataPercent > 100 ? ">100" : dataPercent.toFixed(0)}%
                </text>
              </svg>
            </div>
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <ArrowUpNarrowWide className="w-5 h-5 text-success" />
                  <span className="text-sm">Income</span>
                </div>
                <p className="text-2xl font-bold text-success">
                  {formatAmount(income)}
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <ArrowDownNarrowWide className="w-5 h-5 text-error" />
                  <span className="text-sm">Expenses</span>
                </div>
                <p className="text-2xl font-bold text-error">
                  {formatAmount(expense)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpendingGauge;
