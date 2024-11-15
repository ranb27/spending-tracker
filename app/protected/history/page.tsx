"use client";

import { useEffect, useState } from "react";
import CardHistory from "./components/card-history";
import Loading from "@/components/ui/loading";
import { getClient } from "@/utils/supabase/client";
import Swal from "sweetalert2";
import { formatMonthYear, formatYear } from "@/utils/format-date-time";
import { useUser } from "@/app/context/user";
import { useTriggerUpdate } from "@/app/context/trigger-update";

interface Transaction {
  id: number;
  created_at: string;
  description: string;
  amount: number;

  is_income: boolean;
  user: string;
  category: string;
  month_year: string;
}

function Page() {
  const { user } = useUser();
  const { trigger } = useTriggerUpdate();

  //! State
  const [selectYear, setSelectYear] = useState<string>(formatYear(new Date()));
  const [yearOptions, setYearOptions] = useState<string[]>([]);
  const [groupedData, setGroupedData] = useState<{
    [key: string]: Transaction[];
  }>({});

  //! Fetch Year Options
  useEffect(() => {
    const fetchYear = async () => {
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

      const yearOptions = data
        .map((item: Transaction) => item.month_year)
        .map((monthYear: string) => formatYear(new Date(monthYear)));

      const uniqueYearOptions = Array.from(new Set(yearOptions));
      setYearOptions(uniqueYearOptions as string[]);
    };

    fetchYear();
  }, [trigger]);

  //! Fetch Data and Group by month_year
  const fetchData = async () => {
    const client = getClient();

    const { data, error } = await client
      .from("spending_tracker_db")
      .select("*")
      .eq("user", user?.email)
      .like("month_year", `${selectYear}%`)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    // Group transactions by month_year
    const grouped = data.reduce(
      (acc: { [key: string]: Transaction[] }, transaction: Transaction) => {
        const { month_year } = transaction;
        if (!acc[month_year]) acc[month_year] = [];
        acc[month_year].push(transaction);
        return acc;
      },
      {}
    );

    setGroupedData(grouped);
  };

  useEffect(() => {
    fetchData();
  }, [trigger, selectYear]);

  //! Render
  return (
    <div className="grid grid-cols-1 gap-2 mb-16">
      <h1 className="font-bold">History</h1>
      <div className="animate-fade-in grid gap-2">
        <select
          className="select select-bordered w-full select-sm border-none"
          value={selectYear}
          onChange={(e) => {
            setSelectYear(e.target.value);
          }}
        >
          <option value="" disabled>
            Select a year
          </option>
          {yearOptions.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        {Object.keys(groupedData).length === 0 ? (
          <Loading />
        ) : (
          Object.entries(groupedData).map(([monthYear, transactions]) => (
            <div key={monthYear} className="grid gap-2">
              <div className="divider font-bold divider-start">
                <h1 className="font-bold menu-title">{monthYear}</h1>
              </div>
              {transactions.map((transaction) => (
                <CardHistory key={transaction.id} transaction={transaction} />
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Page;
