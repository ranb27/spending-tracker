import React from "react";

interface Props {
  data: any;
}

export default function balance({ data }: Props) {
  const balance = data.reduce(
    (acc: number, curr: { amount: number; is_income: boolean }) =>
      curr.is_income ? acc + curr.amount : acc - curr.amount,
    0
  );

  return (
    <div className="card bg-gradient-to-r from-primary to-secondary/75 text-base-100 shadow-md">
      <div className="card-body">
        <h2 className="font-semibold text-lg">Total balance</h2>
        <div className="flex justify-between">
          <p className="menu-title text-base-100/50">Available (THB)</p>
          <span
            className={`card-title text-3xl ${
              balance >= 0 ? "text-primary" : "text-error"
            }`}
          >
            {balance.toLocaleString()}.-
          </span>
        </div>
      </div>
    </div>
  );
}
