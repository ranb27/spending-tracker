import React from "react";

export default function cardLast() {
  return (
    <div className="card bg-base-100 shadow-sm w-full">
      <div className="p-4">
        <div className="flex gap-2 justify-between">
          <h2 className="text-sm my-auto overflow-scroll">
            Description - Category
          </h2>
          <div className="flex gap-2">
            <span className="text-error my-auto">99999</span>{" "}
            <p className="my-auto text-xs">THB</p>
          </div>
        </div>
      </div>
    </div>
  );
}
