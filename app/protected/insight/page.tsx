"use client";

import { useEffect, useState } from "react";
import Loading from "@/components/ui/loading";
import { GridColDef } from "@mui/x-data-grid";
import { getClient } from "@/utils/supabase/client";
import { useUser } from "@/app/context/user";
import { Pencil, Trash } from "lucide-react";
import { formatMonthYear } from "@/utils/format-date-time";
import Swal from "sweetalert2";
import Trend from "./components/trend";
import { useTriggerUpdate } from "@/app/context/trigger-update";

//! Components
import Table from "./components/table";
import TopSpend from "./components/top-spend";

function page() {
  const { user } = useUser();
  const { trigger } = useTriggerUpdate();

  //! State
  const [data, setData] = useState<[]>([]);
  const columns: GridColDef[] = [
    {
      field: "description",
      headerName: "Description",
      width: 200,
      // renderCell: (params: any) => {
      //   return (
      //     <button
      //       onClick={() => {
      //         (
      //           document.getElementById("modal_edit") as HTMLDialogElement
      //         ).showModal();
      //       }}
      //       className="btn btn-sm btn-ghost text-info"
      //     >
      //       {params.value}
      //     </button>
      //   );
      // },
    },

    {
      field: "amount",
      headerName: "Amount",
      width: 150,
      renderCell: (params: any) => {
        return (
          <div className="flex gap-2">
            <span
              className={`my-auto ${params.row.is_income ? "text-success" : "text-error"}`}
            >
              {params.value.toLocaleString()}
            </span>
            <p className="my-auto text-xs">THB</p>
          </div>
        );
      },
    },
    {
      field: "created_at",
      headerName: "Month",
      width: 150,
      renderCell: (params: any) => {
        return <div>{formatMonthYear(new Date(params.value))}</div>;
      },
    },
  ];

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
  }, []);

  console.log("data", data);

  //! Function

  return (
    <div className="grid grid-cols-1 gap-4 mb-16">
      <h1 className="font-bold">Insight</h1>
      <div className="animate-fade-in">
        <div className="divider divider-start menu-title font-bold">
          Top Spend
        </div>
        <TopSpend />
        {/* <div className="divider divider-start menu-title font-bold">
          Data Table
        </div>

        <Table data={data} columns={columns} /> */}

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
