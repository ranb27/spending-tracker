"use client";

import { useEffect, useState } from "react";
import CardHistory from "./components/card-history";

function page() {
  return (
    <div className="grid grid-cols-1 gap-2">
      <h1 className="font-bold">History</h1>
      {/* select year */}
      <select className="select select-bordered w-full select-sm">
        <option disabled selected>
          Select a year
        </option>
        <option>2024</option>
        <option>2023</option>
        <option>2022</option>
      </select>

      <div className="divider">
        <h1 className="font-bold">2024-12</h1>
      </div>
      <CardHistory />
      <CardHistory />
      <CardHistory />
      <div className="divider">
        <h1 className="font-bold">2024-10</h1>
      </div>
      <CardHistory />
      <CardHistory />
      <CardHistory />
      <CardHistory />
      <CardHistory />
      <CardHistory />
      <div className="divider">
        <h1 className="font-bold">2024-09</h1>
      </div>
      <CardHistory />
      <CardHistory />
    </div>
  );
}

export default page;
