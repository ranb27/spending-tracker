"use client";

import { useState, useEffect } from "react";
import Loading from "@/components/ui/loading";
import { getClient } from "@/utils/supabase/client";
import Swal from "sweetalert2";
import { formatMonthYear } from "@/utils/format-date-time";
import { useUser } from "@/app/context/user";
import { useTriggerUpdate } from "@/app/context/trigger-update";
import Link from "next/link";

//! Components
import UserProfile from "./components/user-profile";
import Balance from "./components/balance";
import Recently from "./components/recently";
import Gauge from "./components/gauge";

interface Transaction {
  id: string;
  created_at: string;
  description: string;
  amount: number;
  paid: boolean;
  is_income: boolean;
  user: string;
  category: string;
  month_year: string;
}

function page() {
  const { user } = useUser();
  const { trigger } = useTriggerUpdate();

  //! State
  const [selectMonth, setSelectMonth] = useState<string>(
    formatMonthYear(new Date())
  );
  const [data, setData] = useState<Transaction[]>([]);
  const [rencentlyData, setRecentlyData] = useState<Transaction[]>([]);
  const [dataPercent, setDataPercent] = useState<number>(0);

  //! Fetch
  const fetchData = async () => {
    const client = getClient();

    const { data, error } = await client
      .from("spending_tracker_db")
      .select("*")
      .eq("user", user?.email)
      .eq("month_year", selectMonth)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }
    setData(data);
  };

  const fetchRecentlyData = async () => {
    const client = getClient();

    const { data, error } = await client
      .from("spending_tracker_db")
      .select("*")
      .eq("user", user?.email)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }
    setRecentlyData(data);
  };

  useEffect(() => {
    fetchData();
    fetchRecentlyData();
  }, [user, trigger, selectMonth]);

  //! Function
  // Calculate Percentage
  useEffect(() => {
    if (data.length > 0) {
      const totalAmount = data.reduce(
        (acc, item) => (item.is_income === false ? acc + item.amount : acc),
        0
      );
      const totalIncome = data.reduce(
        (acc, item) => (item.is_income === true ? acc + item.amount : acc),
        0
      );

      setDataPercent((totalAmount / totalIncome) * 100);
    }
  }, [data]);
  console.log(dataPercent);

  return (
    <div className="grid grid-cols-1 mb-16 gap-4">
      <h1 className="font-bold">Home</h1>
      <div className="animate-fade-in">
        <div className="grid gap-2">
          <UserProfile data={data} />
          <input
            value={selectMonth}
            type="month"
            className="input input-bordered w-full input-sm md:input-disabled border-none shadow-md"
            onChange={(e) => setSelectMonth(e.target.value)}
          />
          <Balance data={data} />
        </div>
        <div className="grid gap-1">
          <div className="divider divider-start font-bold">
            <h1 className="font-bold menu-title">Spend</h1>
          </div>

          <Gauge data={data} dataPercent={dataPercent} />

          <div className="divider divider-start font-bold">
            <h1 className="font-bold menu-title">Recently</h1>
          </div>

          {rencentlyData.length > 0 ? (
            <ul className="timeline timeline-vertical timeline-compact">
              {rencentlyData.slice(0, 4).map((item, index) => (
                <li key={item.id}>
                  <div className="timeline-start text-xs opacity-75">
                    {new Date(item.created_at).toLocaleString()}
                  </div>
                  <div className="timeline-middle">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="timeline-end timeline-box">
                    <Recently
                      description={item.description}
                      amount={item.amount}
                      category={item.category}
                      is_income={item.is_income}
                      month_year={item.month_year}
                    />
                  </div>
                  {index < 2 && <hr />}
                </li>
              ))}

              <li className="flex justify-center items-center">
                <Link
                  href={"/protected/history"}
                  className="btn btn-xs bg-base-100 w-fit mt-2"
                >
                  View more
                </Link>
              </li>
            </ul>
          ) : (
            <p className="text-center">No Transaction</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default page;
