"use client";

import { useState, useEffect } from "react";
import Loading from "@/components/ui/loading";

//! Components
import UserProfile from "./components/user-profile";
import Balance from "./components/balance";
import CardLast from "./components/card-last";
import Trend from "./components/trend";

function page() {
  return (
    <div className="grid grid-cols-1 mb-16 gap-4">
      <h1 className="font-bold">Home</h1>
      <div className="animate-fade-in">
        <UserProfile />
        <Balance />

        <div className="grid gap-2">
          <div className="divider divider-start font-bold">
            <h1 className="font-bold">Last Transaction</h1>
          </div>
          <CardLast />
          <CardLast />
          <CardLast />
        </div>

        <div className="grid gap-2">
          <div className="divider divider-start font-bold">
            <h1 className="font-bold">Trend</h1>
          </div>
          <Trend />
        </div>
      </div>
    </div>
  );
}

export default page;
