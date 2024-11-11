import React from "react";

export default function TopSpend() {
  const topSpends = [
    { name: "Groceries", amount: "฿150", percentage: "25%", icon: "🛒" },
    { name: "Rent", amount: "฿800", percentage: "40%", icon: "🏠" },
    { name: "Utilities", amount: "฿100", percentage: "10%", icon: "💡" },
    { name: "Entertainment", amount: "฿80", percentage: "8%", icon: "🎬" },
    { name: "Other", amount: "฿70", percentage: "17%", icon: "🔄" },
  ];

  return (
    <div className="card px-4">
      <div className="grid gap-2">
        {topSpends.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-base-100 rounded-lg hover:bg-base-300 transition"
          >
            <div className="flex items-center space-x-4">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-xs opacity-50">{item.percentage} of Total</p>
              </div>
            </div>
            <p className="text-lg font-semibold text-accent">{item.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
