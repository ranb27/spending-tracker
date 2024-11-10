"use client";

import { useEffect, useState } from "react";
import Loading from "@/components/ui/loading";
import { GridColDef } from "@mui/x-data-grid";
import { getClient } from "@/utils/supabase/client";
import { useUser } from "@/app/user";
import { Pencil } from "lucide-react";
import { formatMonthYear } from "@/utils/format-date-time";

//! Components
import Table from "./components/table";
import PieChart from "./components/pie-chart";
import TopSpend from "./components/top-spend";
import ModalEdit from "./components/modal-edit";

function page() {
  const { user } = useUser();

  //! State
  const [data, setData] = useState<[]>([]);
  const columns: GridColDef[] = [
    {
      field: "edit",
      headerName: "",
      width: 60,
      renderCell: (params: any) => {
        return (
          <button
            onClick={() => {
              (
                document.getElementById("modal_edit") as HTMLDialogElement
              ).showModal();
            }}
            className="btn btn-sm btn-ghost text-info"
          >
            <Pencil size={16} />
          </button>
        );
      },
    },
    {
      field: "description",
      headerName: "Description",
      width: 200,
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 150,
    },
    {
      field: "category",
      headerName: "Category",
      width: 150,
    },
    {
      field: "is_income",
      headerName: "Income",
      width: 150,
      renderCell: (params: any) => {
        return (
          <div className={`${params.value ? "text-success" : "text-error"}`}>
            {params.value ? "Income" : "Expense"}
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

  //! Function
  return (
    <div className="grid grid-cols-1 gap-4 mb-16">
      <h1 className="font-bold">Overview</h1>
      <div className="animate-fade-in">
        <PieChart />
        <div className="divider divider-start font-bold">Top Spend</div>
        <TopSpend />
        <div className="divider divider-start font-bold">Data Table</div>

        <Table data={data} columns={columns} />
      </div>

      <ModalEdit />
    </div>
  );
}

export default page;
