"use client";

import { useEffect, useState } from "react";
import Loading from "@/components/ui/loading";
import { GridColDef } from "@mui/x-data-grid";

//! Components
import Table from "./components/table";
import PieChart from "./components/pie-chart";
import TopSpend from "./components/top-spend";

function page() {
  //! State
  const [rows, setRows] = useState<[]>([]);
  const columns: GridColDef[] = [
    {
      field: "edit",
      headerName: "",
      width: 50,
      renderCell: (params: any) => {
        return <button className="btn btn-xs btn-warning">Edit</button>;
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
      field: "date",
      headerName: "Date",
      width: 150,
    },
  ];
  return (
    <div className="grid grid-cols-1 gap-4 mb-16">
      <h1 className="font-bold">Overview</h1>
      <div className="animate-fade-in">
        <PieChart />
        <div className="divider divider-start font-bold">Top Spend</div>
        <TopSpend />
        <div className="divider divider-start font-bold">Data Table</div>

        <Table data={rows} columns={columns} />
      </div>
    </div>
  );
}

export default page;
