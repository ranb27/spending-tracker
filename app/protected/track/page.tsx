"use client";
import React, { useState, useEffect } from "react";
import { getClient } from "@/utils/supabase/client";
import { useUser } from "@/app/user";
import { GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import Card from "./components/card";
import Swal from "sweetalert2";
import { CircleSlash, CircleX, TrendingUp, TrendingDown } from "lucide-react";
import Loading from "@/components/ui/loading";
import Table from "./components/table";
import BalanceItem from "./components/balance-item";
import { formatMonthYear } from "@/utils/format-date-time";

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

function Page() {
  //! State
  const { user } = useUser();
  const [data, setData] = useState<Transaction[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>(
    formatMonthYear(new Date())
  );
  const [balance, setBalance] = useState<number>(0);
  const [overAllBalance, setOverAllBalance] = useState([
    {
      paid: 0,
      unpaid: 0,
      income: 0,
      expense: 0,
    },
  ]);
  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const renderBoolean = (params: any) => {
    return (
      <div className={`${params.value ? "text-success" : "opacity-25"}`}>
        {params.value ? <CircleSlash size={24} /> : <CircleX size={24} />}
      </div>
    );
  };

  const columns: GridColDef[] = [
    { field: "description", headerName: "Description", width: 200 },
    { field: "amount", headerName: "Amount", width: 150 },
    {
      field: "paid",
      headerName: "Paid",
      width: 120,
      type: "boolean",
      renderCell: renderBoolean,
    },
    {
      field: "is_income",
      headerName: "Income",
      width: 120,
      type: "boolean",
      renderCell: renderBoolean,
    },
    { field: "category", headerName: "Category", width: 150 },
  ];

  //! Fetch
  const fetchCurrMonthData = async () => {
    const client = getClient();

    const { data, error } = await client
      .from("spending_tracker_db")
      .select("*")
      .eq("user", user?.email)
      .eq("month_year", formatMonthYear(new Date()));

    if (error) {
      console.error(error);
      return;
    }
    setData(data);
  };

  useEffect(() => {
    if (user?.email) {
      fetchCurrMonthData();
    }
  }, [user?.email]);

  //! Functions

  // OverAll Balance
  useEffect(() => {
    const { paid, unpaid, income, expense } = data.reduce(
      (acc, transaction) => {
        // Add to income or expense based on `is_income`
        if (transaction.is_income && transaction.paid) {
          acc.income += transaction.amount;
        } else if (!transaction.is_income) {
          acc.expense += transaction.amount;
        } else {
          return acc;
        }

        // Only add to unpaid & paid if it's not income
        if (!transaction.paid) {
          acc.unpaid += transaction.amount;
        }

        // Add to paid only if the transaction is paid for transactions that are not income
        if (transaction.paid && !transaction.is_income) {
          acc.paid += transaction.amount;
        }

        return acc;
      },
      { paid: 0, unpaid: 0, income: 0, expense: 0 }
    );

    setOverAllBalance([{ paid, unpaid, income, expense }]);
  }, [data]);

  // Balance
  useEffect(() => {
    const balance = overAllBalance[0].income - overAllBalance[0].paid;
    setBalance(balance);
  }, [overAllBalance]);

  // Handle Row Selection
  const handleRowSelection = (newSelection: GridRowSelectionModel) => {
    setSelectedRows(newSelection);
  };

  // Update Transactions
  const updateTransactions = async (updateData: Partial<Transaction>) => {
    if (selectedRows.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please select transactions to update",
        background: "oklch(var(--b1))",
        color: "oklch(var(--bc))",
        confirmButtonColor: "oklch(var(--p))",
      });
      return;
    }
    const isConfirmed = await Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "Do you want to update the selected transactions?",
      showCancelButton: true,
      confirmButtonText: "Update",
      cancelButtonText: "Cancel",
      background: "oklch(var(--b1))",
      color: "oklch(var(--bc))",
      confirmButtonColor: "oklch(var(--wa))",
      cancelButtonColor: "oklch(var(--er))",
    });

    if (!isConfirmed.isConfirmed) return;

    try {
      const client = getClient();
      const { error } = await client
        .from("spending_tracker_db")
        .update(updateData)
        .in("id", selectedRows as string[]);

      if (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update transactions. Please try again.",
          background: "oklch(var(--b1))",
          color: "oklch(var(--bc))",
          confirmButtonColor: "oklch(var(--p))",
        });
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Transactions updated successfully",
        background: "oklch(var(--b1))",
        color: "oklch(var(--bc))",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } catch {
      console.log("Error updating transactions");
    } finally {
      setIsLoading(false);
      setSelectedRows([]);
    }

    fetchCurrMonthData();
  };

  // Delete Transactions
  const deleteTransactions = async () => {
    if (selectedRows.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please select transactions to delete",
        background: "oklch(var(--b1))",
        color: "oklch(var(--bc))",
      });
      return;
    }
    const isConfirmed = await Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "Do you want to delete the selected transactions? This action cannot be undone.",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      background: "oklch(var(--b1))",
      color: "oklch(var(--bc))",
      confirmButtonColor: "oklch(var(--er))",
      cancelButtonColor: "oklch(var(--wa))",
    });

    if (!isConfirmed.isConfirmed) return;

    try {
      setIsLoading(true);

      const client = getClient();
      const { error } = await client
        .from("spending_tracker_db")
        .delete()
        .in("id", selectedRows as string[]);

      if (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete transactions. Please try again.",
          background: "oklch(var(--b1))",
          color: "oklch(var(--bc))",
          confirmButtonColor: "oklch(var(--p))",
        });
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Transactions deleted successfully",
        background: "oklch(var(--b1))",
        color: "oklch(var(--bc))",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } catch {
      console.log("Error deleting transactions");
    } finally {
      setIsLoading(false);
      setSelectedRows([]);
    }

    fetchCurrMonthData();
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className="grid grid-cols-1 gap-4 pb-16">
        <h1 className="text-xl font-bold">Track</h1>
        <Card balance={balance} />

        <div className="text-xs opacity-50 font-semibold ml-auto">
          {data[0]?.month_year}
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          <BalanceItem
            title="Income"
            value={overAllBalance[0].income}
            icon={TrendingUp}
            color="bg-success"
          />
          <BalanceItem
            title="Expense"
            value={overAllBalance[0].expense}
            icon={TrendingDown}
            color="bg-error"
          />
          <BalanceItem
            title="Paid"
            value={overAllBalance[0].paid}
            icon={CircleSlash}
            color="bg-info"
          />
          <BalanceItem
            title="Unpaid"
            value={overAllBalance[0].unpaid}
            icon={CircleX}
            color="bg-warning"
          />
        </div>
        <Table
          data={data}
          columns={columns}
          handleRowSelection={handleRowSelection}
          selectedRows={selectedRows}
        />
        <div className="flex ml-auto gap-1">
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => updateTransactions({ paid: true })}
          >
            Paid
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => updateTransactions({ paid: false })}
          >
            Unpaid
          </button>

          <button className="btn btn-error btn-sm" onClick={deleteTransactions}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default Page;
