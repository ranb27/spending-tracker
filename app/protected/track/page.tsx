"use client";
import { useState, useEffect } from "react";
import { getClient } from "@/utils/supabase/client";
import { useUser } from "@/app/user";
import { Eraser } from "lucide-react";

import Card from "./components/card";

function page() {
  //! State
  const { user } = useUser();
  const [data, setData] = useState<any>([
    {
      created_at: null,
      description: null,
      amount: null,
      paid: null,
      is_income: null,
      user: null,
      category: null,
    },
  ]);

  const [balance, setBalance] = useState(0);

  //! Fetch
  const fetchCurrMonthData = async () => {
    const client = getClient();

    // Get the first and last day of the current month
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const { data, error } = await client
      .from("spending_tracker_db")
      .select("*")
      .eq("user", user?.email)
      .gte("created_at", firstDayOfMonth.toISOString())
      .lte("created_at", lastDayOfMonth.toISOString());

    if (error) {
      console.error(error);
      return;
    }
    setData(data);
  };

  useEffect(() => {
    fetchCurrMonthData();
  }, [user?.email]);

  console.log(data);

  //! Function
  const deleteTransaction = async (id: string) => {
    const client = getClient();

    const { error } = await client
      .from("spending_tracker_db")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      return;
    }

    fetchCurrMonthData();
  };

  //updatePaid
  const updatePaid = async (id: string) => {
    const client = getClient();

    const { error } = await client
      .from("spending_tracker_db")
      .update({ paid: true })
      .eq("id", id);

    if (error) {
      console.error(error);
      return;
    }

    fetchCurrMonthData();
  };

  useEffect(() => {
    let income = 0;
    let expense = 0;

    data.reduce((acc: any, transaction: any) => {
      if (transaction.is_income) {
        income += transaction.amount;
      } else {
        expense += transaction.amount;
      }
    }, 0);

    setBalance(income - expense);
  }, [data]);

  return (
    <div className="grid grid-cols-1 gap-4 pb-16">
      <h1 className="text-xl font-bold">Track</h1>

      <Card balance={balance} />

      <div className="card">
        <div className="card-body">
          <div className="overflow-x-auto h-40 w-full">
            <table className="table">
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Desc</th>
                  <th>Income</th>
                  <th>Categories</th>
                  <th>Paid</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {data.map((transaction: any, index: number) => (
                  <tr key={index}>
                    <td>{transaction.amount}</td>
                    <td>{transaction.description}</td>
                    <td
                      className={`${
                        transaction.is_income ? "text-success" : "text-error"
                      }`}
                    >
                      {transaction.is_income ? "Income" : "Expense"}
                    </td>
                    <td>{transaction.category}</td>
                    <td>
                      <button
                        onClick={() => {
                          updatePaid(transaction.id);
                        }}
                        className="btn btn-sm btn-ghost"
                      >
                        {transaction.paid ? "Paid" : "Not Paid"}
                      </button>
                    </td>
                    {/* remove */}
                    <td>
                      <button
                        onClick={() => {
                          deleteTransaction(transaction.id);
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
      </div>
    </div>
  );
}

export default page;
