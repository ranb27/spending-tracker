import React from "react";

export default function balanceItem({
  title,
  value,
  icon: Icon,
  color,
}: {
  title: string;
  value: number;
  icon: any;
  color: string;
}) {
  return (
    <div className={`py-2 px-4 rounded-lg ${color} text-base-100`}>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm opacity-80 font-semibold">{title}</p>
          <p className="text-xl font-bold">฿{value}</p>
        </div>
        <Icon size={32} />
      </div>
    </div>
  );
}
