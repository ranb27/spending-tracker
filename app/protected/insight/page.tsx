"use client";

import { useEffect, useState } from "react";
import Loading from "@/components/ui/loading";
import { GridColDef } from "@mui/x-data-grid";
import { getClient } from "@/utils/supabase/client";
import { useUser } from "@/app/context/user";
import { Pencil, Trash } from "lucide-react";
import { formatYear } from "@/utils/format-date-time";
import Swal from "sweetalert2";
import { useTriggerUpdate } from "@/app/context/trigger-update";

//! Components
import TopSpend from "./components/top-spend";
import PieChart from "./components/pie-chart";
import BarChart from "./components/bar-chart";

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

interface TopSpend {
  category: string;
  amount: number;
}

interface TrendData {
  month_year: string;
  amount: number;
}

function page() {
  const { user } = useUser();
  const { trigger } = useTriggerUpdate();

  //! State
  const [loading, setLoading] = useState<boolean>(true);
  const [selectYear, setSelectYear] = useState<string>(formatYear(new Date()));
  const [yearOptions, setYearOptions] = useState<string[]>([]);

  const [data, setData] = useState<Transaction[]>([]);
  const [top3Spend, setTop3Spend] = useState<TopSpend[]>([]);
  const [topSpend, setTopSpend] = useState<TopSpend[]>([]);
  const [dataTrend, setDataTrend] = useState<TrendData[]>([]);

  //! Fetch
  const fetchData = async () => {
    try {
      setLoading(true);
      const client = getClient();
      const { data, error } = await client
        .from("spending_tracker_db")
        .select("*")
        .eq("user", user?.email)
        .eq("is_income", false)
        .like("month_year", `${selectYear}%`)
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        return;
      }

      setData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user, trigger, selectYear]);

  //sum("amount") group by category order by sum("amount") desc limit 3
  useEffect(() => {
    const topSpend = data.reduce<Record<string, number>>((acc, transaction) => {
      const { category, amount } = transaction;
      if (!acc[category]) acc[category] = 0;
      acc[category] += amount;
      return acc;
    }, {});

    // Convert object to array of entries, sort by amount (descending), and map to desired format
    const sortedTopSpend: TopSpend[] = Object.entries(topSpend)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3) // limit to 3
      .map(([category, amount]) => ({ category, amount }));

    setTop3Spend(sortedTopSpend); // Set as array of objects
  }, [data, trigger, selectYear]);

  //sum("amount") group by category order by sum("amount") desc where is_income = false
  useEffect(() => {
    const topSpend = data.reduce<Record<string, number>>((acc, transaction) => {
      const { category, amount } = transaction;
      if (!acc[category]) acc[category] = 0;
      acc[category] += amount;
      return acc;
    }, {});

    // Convert object to array of entries, sort by amount (descending), and map to desired format
    const sortedTopSpend: TopSpend[] = Object.entries(topSpend)
      .sort(([, a], [, b]) => b - a)
      .map(([category, amount]) => ({ category, amount }));

    setTopSpend(sortedTopSpend); // Set as array of objects
  }, [data, trigger, selectYear]);

  //dataTrend ["month_year" (xaxis), "amount" (yaxis)] --> sum("amount") where is_income = false group by month_year order by month_year asc
  useEffect(() => {
    const trendDataMap = data.reduce<Record<string, number>>(
      (acc, transaction) => {
        const { month_year, amount } = transaction;
        if (!acc[month_year]) acc[month_year] = 0;
        acc[month_year] += amount;
        return acc;
      },
      {}
    );

    // Convert to array and sort by `month_year` (ascending)
    const sortedDataTrend: TrendData[] = Object.entries(trendDataMap)
      .sort(([a], [b]) => a.localeCompare(b)) // Compare month_year as strings
      .map(([month_year, amount]) => ({ month_year, amount }));

    setDataTrend(sortedDataTrend);
  }, [data, trigger, selectYear]);

  //* Fetch Year Options
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

  //! Function

  return (
    <div className="grid grid-cols-1 gap-4 mb-16">
      <h1 className="font-bold">Insight</h1>
      {loading && <Loading />}
      <div className="animate-fade-in">
        <select
          className="select select-bordered w-full select-sm border-none shadow-md"
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

        <div className="divider divider-start menu-title font-bold">
          Top 3 Category
        </div>
        <div className="w-full flex justify-center">
          <PieChart data={top3Spend} />
        </div>

        <div className="divider divider-start menu-title font-bold">
          Top Spend
        </div>
        <TopSpend data={topSpend} />

        <div className="grid gap-2">
          <div className="divider divider-start font-bold">
            <h1 className="menu-title font-bold">Trend by Month</h1>
          </div>
          <BarChart data={dataTrend} />
        </div>
      </div>
    </div>
  );
}

export default page;
