"use client";

import { Eraser } from "lucide-react";

export default function transactionTable({
  data,
  setData,
}: {
  data: any;
  setData: any;
}) {
  return (
    <div className="card-body">
      <div className="overflow-x-auto h-44 w-full">
        <table className="table">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Desc</th>
              <th>Income</th>
              <th>Categories</th>
            </tr>
          </thead>
          <tbody>
            {data.map((transaction: any, index: number) => (
              <tr key={index}>
                <td>{transaction.amount}</td>
                <td>{transaction.description}</td>
                <td
                  className={`${transaction.is_income ? "text-success" : "text-error"}`}
                >
                  {transaction.is_income ? "Income" : "Expense"}
                </td>
                <td>{transaction.category}</td>
                {/* remove */}
                <td>
                  <button
                    onClick={() => {
                      setData((prev: any) =>
                        prev.filter((_: any, i: number) => i !== index)
                      );
                    }}
                    className="btn btn-sm btn-ghost"
                  >
                    <Eraser color="oklch(var(--er))" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
