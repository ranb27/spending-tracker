import React from "react";

interface Props {
  description: string;
  amount: number;
  category: string;
  is_income: boolean;
}
export default function recently({
  description,
  amount,
  category,
  is_income,
}: Props) {
  return (
    <div className="bg-base-100 rounded-lg flex gap-2 justify-between">
      <h2 className="text-xs my-auto">
        <span className="font-semibold">{description}</span> -{" "}
        {category.toUpperCase()}
      </h2>
      <div className="flex gap-2">
        <span
          className={`my-auto text-sm ${is_income ? "text-success" : "text-error"}`}
        >
          {amount}
        </span>{" "}
        <p className="my-auto text-xs">THB</p>
      </div>
    </div>
  );
}
