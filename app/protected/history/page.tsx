"use client";

import { useEffect, useState } from "react";
import CardHistory from "./components/card-history";

function page() {
  return (
    <div className="grid grid-cols-1 gap-2 mb-16">
      <h1 className="font-bold">History</h1>
      <div className="animate-fade-in grid gap-2">
        <select
          className="select select-bordered w-full select-sm border-none"
          defaultValue={2024}
        >
          <option value="" disabled>
            Select a year
          </option>
          <option value={2024}>2024</option>
          <option value={2023}>2023</option>
          <option value={2022}>2022</option>
        </select>

        <div className="divider font-bold divider-start">2024-12</div>
        <CardHistory />
        <CardHistory />
        <CardHistory />
        <div className="divider font-bold divider-start">2024-10</div>
        <CardHistory />
        <CardHistory />
        <CardHistory />
        <CardHistory />
        <CardHistory />
        <CardHistory />
        <div className="divider font-bold divider-start">2024-09</div>
        <CardHistory />
        <CardHistory />
      </div>
    </div>
  );
}

export default page;
