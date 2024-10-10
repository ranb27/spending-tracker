"use client";

import { Banknote } from "lucide-react";
import { useState } from "react";

function page() {
  const [balance, setBalance] = useState<number>(1000);

  return (
    <div className="p-4 space-y-6">
      {/* Balance Card */}
      <div className="card bg-base-100 shadow-lg rounded-xl max-w-sm">
        <div className="card-body grid grid-cols-2">
          <div className="w-full">
            <h2 className="card-title">Balance</h2>
            <div className="flex justify-between">
              <p
                className={`text-3xl font-bold ${balance < 0 ? "text-error" : "text-success"}`}
              >
                {balance}
              </p>
              <p className="mt-auto text-end">Baht</p>
            </div>
          </div>
          <div className="full ml-auto my-auto">
            <Banknote
              color={`${balance < 0 ? "oklch(var(--er))" : "oklch(var(--su))"}`}
              size={56}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
