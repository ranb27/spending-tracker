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

//! Components
import Table from "./components/table";
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
            <Pencil size={12} />
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
    {
      field: "delete",
      headerName: "Del",
      width: 60,
      renderCell: (params: any) => {
        return (
          <button
            onClick={() => {
              handleDelete(params.row.id);
            }}
            className="btn btn-sm btn-error"
          >
            <Trash size={12} />
          </button>
        );
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

  const handleDelete = async (id: string) => {
    //confirm
    const isConfirmed = await Swal.fire({
      title: `Are you sure? ID: ${id}`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "oklch(var(--p))",
      cancelButtonColor: "oklch(var(--er))",
      confirmButtonText: "Delete",
      background: "oklch(var(--b1))",
      color: "oklch(var(--bc))",
    });

    if (!isConfirmed.isConfirmed) {
      return;
    }

    const client = getClient();
    try {
      await client.from("spending_tracker_db").delete().eq("id", id);
      const toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      toast.fire({
        icon: "success",
        title: "Transaction added successfully",
        background: "oklch(var(--b1))",
        color: "oklch(var(--bc))",
        confirmButtonColor: "oklch(var(--p))",
      });
    } catch (error) {
      console.error(error);
    } finally {
      await fetchData();
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 mb-16">
      <h1 className="font-bold">Insight</h1>
      <div className="animate-fade-in">
        <div className="divider divider-start font-bold">Top Spend</div>
        <TopSpend />
        <div className="divider divider-start font-bold">Data Table</div>

        <Table data={data} columns={columns} />

        <div className="grid gap-2">
          <div className="divider divider-start font-bold">
            <h1 className="font-bold">Trend</h1>
          </div>
          <Trend data={data} />
        </div>
      </div>

      <ModalEdit />
    </div>
  );
}

export default page;
