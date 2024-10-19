import React from "react";
import { Bitcoin, CreditCard } from "lucide-react";
interface overAllBalance {
  paid: number;
  unpaid: number;
  income: number;
  expense: number;
}
export default function card({ balance }: { balance: number }) {
  return (
    <div className="items-center justify-center flex w-full">
      <div className="card bg-base-100 shadow-lg w-full">
        <div className="card-body ">
          <div className="grid grid-cols-2">
            <div className="grid gap-2">
              <h2 className="card-title text-primary">Balance</h2>
              <p>
                <span className="text-3xl font-bold flex gap-2">
                  <Bitcoin size={32} /> {balance}
                </span>
              </p>
            </div>
            <CreditCard size={56} className="ml-auto my-auto text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
}
