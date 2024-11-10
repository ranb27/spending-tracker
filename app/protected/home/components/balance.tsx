import React from "react";

export default function balance() {
  return (
    <div className="card bg-accent glass shadow-sm text-accent-content mt-4">
      <div className="card-body">
        <h2 className="font-semibold">Your Balance (THB)</h2>
        <div className="flex justify-between">
          <p className="menu-title text-primary-content/50">Total available</p>
          <span className="card-title text-2xl">999999.00</span>
        </div>
      </div>
    </div>
  );
}
