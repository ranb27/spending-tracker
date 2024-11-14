import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface TransactionProps {
  transaction: {
    description: string;
    created_at: string;
    amount: number;
    is_income: boolean;
    category: string;
  };
}

export default function CardHistory({ transaction }: TransactionProps) {
  const { description, created_at, amount, is_income, category } = transaction;
  const icon = is_income ? (
    <TrendingUp size={32} className="text-success my-auto" />
  ) : (
    <TrendingDown size={32} className="text-error my-auto" />
  );

  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="flex justify-between p-3 gap-4">
        <div className="flex gap-4">
          {icon}
          <div className="grid">
            <h2 className="overflow-scroll">{description}</h2>
            <p className="text-xs opacity-75">{category}</p>
          </div>
        </div>
        <div className="grid">
          <div className="flex gap-2 ml-auto">
            <span
              className={`my-auto ${is_income ? "text-success" : "text-error"}`}
            >
              {amount.toLocaleString()}{" "}
            </span>
            <p className="my-auto text-xs">THB</p>
          </div>
          <p className="text-xs opacity-50">
            {new Date(created_at).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
