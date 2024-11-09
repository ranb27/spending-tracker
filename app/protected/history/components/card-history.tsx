import React from "react";

export default function cardHistory() {
  return (
    <div className="card bg-base-100">
      <div className="flex justify-between p-4">
        <div className="grid">
          <h2 className="text-sm">History</h2>
          <p className="text-xs opacity-80">2023-01-01 09:00</p>
        </div>
        <div className="flex gap-2">
          <span className="text-success my-auto">99999 </span>{" "}
          <p className="my-auto text-xs">THB</p>
        </div>
      </div>
    </div>
  );
}
