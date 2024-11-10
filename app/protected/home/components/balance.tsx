import React from "react";

interface Props {
  data: any;
}

export default function balance({ data }: Props) {
  const balance = data.reduce(
    (acc: number, curr: { amount: number }) => acc + curr.amount,
    0
  );

  return (
    <div className="card bg-accent glass shadow-sm text-accent-content mt-4">
      <div className="card-body">
        <h2 className="font-semibold">Your Balance (THB)</h2>
        <div className="flex justify-between">
          <p className="menu-title text-primary-content/50">Total available</p>
          <span className="card-title text-2xl">{balance}</span>
        </div>
      </div>
    </div>
  );
}
