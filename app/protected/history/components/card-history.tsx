import React from "react";

import { TrendingUp, TrendingDown } from "lucide-react";

export default function cardHistory() {
  return (
    <div className="card bg-base-100">
      <div className="flex justify-between p-4 gap-4">
        <div className="flex gap-2">
          <TrendingUp size={32} className="text-success" />
          {/* <TrendingDown size={32} className="text-error" /> */}

          <div className="grid">
            <h2 className="text-sm overflow-scroll">Description</h2>
            <p className="text-xs opacity-80">2023-01-01 09:00</p>
          </div>
        </div>
        <div className="flex gap-2">
          <span className="text-success my-auto">99999 </span>{" "}
          <p className="my-auto text-xs">THB</p>
        </div>
      </div>
    </div>
  );
}
