"use client";

import { useState, useEffect } from "react";
import Loading from "@/components/ui/loading";
import { getClient } from "@/utils/supabase/client";
import Swal from "sweetalert2";
import { formatMonthYear } from "@/utils/format-date-time";
import { useUser } from "@/app/user";
import { useTriggerUpdate } from "@/app/context/trigger-update";

//! Components
import UserProfile from "./components/user-profile";
import Balance from "./components/balance";
import CardLast from "./components/card-last";
import Trend from "./components/trend";

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

  useEffect(() => {
    fetchData();
  }, [user, trigger, selectMonth]);

  //! Function

  return (
    <div className="grid grid-cols-1 mb-16 gap-4">
      <h1 className="font-bold">Home</h1>
      <div className="animate-fade-in">
        <div className="grid gap-2">
          <UserProfile data={data} />
          <input
            value={selectMonth}
            type="month"
            className="input input-bordered w-full input-sm md:input-disabled border-none"
            onChange={(e) => setSelectMonth(e.target.value)}
          />
          <Balance data={data} />
        </div>
        <div className="grid gap-1">
          <div className="divider divider-start font-bold">
            <h1 className="font-bold">Last Transaction</h1>
          </div>
          {/* <CardLast /> */}
          {data.length > 0 ? (
            data
              .slice(0, 3)
              .map((item, index) => (
                <CardLast
                  key={item.id}
                  description={item.description}
                  amount={item.amount}
                  category={item.category}
                  is_income={item.is_income}
                />
              ))
          ) : (
            <p className="text-center">No Transaction</p>
          )}
        </div>

        <div className="grid gap-2">
          <div className="divider divider-start font-bold">
            <h1 className="font-bold">Trend</h1>
          </div>
          <Trend data={data} />
        </div>
      </div>
    </div>
  );
}

export default page;
