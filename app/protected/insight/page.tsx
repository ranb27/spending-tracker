"use client";

import { useEffect, useState } from "react";
import Loading from "@/components/ui/loading";
import { GridColDef } from "@mui/x-data-grid";
import { getClient } from "@/utils/supabase/client";
import { useUser } from "@/app/context/user";
import { Pencil, Trash } from "lucide-react";
import { formatMonthYear } from "@/utils/format-date-time";
import Swal from "sweetalert2";
import { useTriggerUpdate } from "@/app/context/trigger-update";

//! Components
import TopSpend from "./components/top-spend";
import Trend from "./components/trend";
import PieChart from "./components/pie-chart";

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

function page() {
  const { user } = useUser();
  const { trigger } = useTriggerUpdate();

  //! State
  const [data, setData] = useState<Transaction[]>([]);
  const [top3Spend, setTop3Spend] = useState<TopSpend[]>([]);
  const [topSpend, setTopSpend] = useState<TopSpend[]>([]);

  //! Fetch
  const fetchData = async () => {
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
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, [user, trigger]);

  console.log("data", data);

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
  }, [data, trigger]);

  //sum("amount") group by category order by sum("amount") desc where is_income = false
  useEffect(() => {
    const topSpend = data
      .filter((transaction) => !transaction.is_income) // Filter where is_income is false
      .reduce<Record<string, number>>((acc, transaction) => {
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
  }, [data, trigger]);

  console.log("topSpend", topSpend);

  //

  //! Function

  return (
    <div className="grid grid-cols-1 gap-4 mb-16">
      <h1 className="font-bold">Insight</h1>
      <div className="animate-fade-in">
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
            <h1 className="menu-title font-bold">Trend</h1>
          </div>
          <Trend data={data} />
        </div>
      </div>
    </div>
  );
}

export default page;
