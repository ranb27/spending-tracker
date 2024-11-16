import React from "react";

interface TopSpendData {
  category: string;
  amount: number;
}

interface TopSpendProps {
  data: TopSpendData[];
}

export default function TopSpend({ data }: TopSpendProps) {
  // Total sum of all amounts to calculate percentages
  const totalAmount = data.reduce((sum, item) => sum + item.amount, 0);

  // Mapping category to icons (optional; default fallback is 🔄)
  const categoryIcons: Record<string, string> = {
    "fixed cost": "💸",
    credit: "💳",
    shopping: "🛍️",
    investment: "💼",
    other: "🔄",
  };

  return (
    <div className="card">
      <div className="grid gap-2">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-base-100 rounded-lg hover:bg-base-300 transition"
          >
            <div className="flex items-center space-x-4">
              <span className="text-2xl">
                {categoryIcons[item.category] || "🔄"}
              </span>
              <div>
                <p className="font-semibold">{item.category}</p>
                <p className="text-xs opacity-50">
                  {((item.amount / totalAmount) * 100).toFixed(2)}% of Total
                </p>
              </div>
            </div>
            <p className="text-lg font-semibold text-accent">
              ฿{item.amount.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
