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

interface Transaction {
  id: string;
  created_at: string;
  description: string;
  amount: number;
  paid: boolean;
  is_income: boolean;
  user: string;
  category: string;
}

function Page() {
  //! State
  const { user } = useUser();
  const [data, setData] = useState<Transaction[]>([]);
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

  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  //format DD-MM-YYYY
  const dateRange = `${firstDayOfMonth.getDate()}-${firstDayOfMonth.getMonth() + 1}-${firstDayOfMonth.getFullYear()} to ${lastDayOfMonth.getDate()}-${lastDayOfMonth.getMonth() + 1}-${lastDayOfMonth.getFullYear()}`;

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
      .gte("created_at", firstDayOfMonth.toISOString())
      .lte("created_at", lastDayOfMonth.toISOString());

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

  // Add this new function after other function declarations
  const updateTransactionDetails = async () => {
    if (selectedRows.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please select a transaction to update",
        background: "oklch(var(--b1))",
        color: "oklch(var(--bc))",
        confirmButtonColor: "oklch(var(--p))",
      });
      return;
    }

    if (selectedRows.length > 1) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please select only one transaction to update details",
        background: "oklch(var(--b1))",
        color: "oklch(var(--bc))",
        confirmButtonColor: "oklch(var(--p))",
      });
      return;
    }

    // Get current transaction details
    const currentTransaction = data.find(
      (transaction) => transaction.id === selectedRows[0]
    );

    const { value: formValues } = await Swal.fire({
      title: "Update Transaction",
      html: `
      <input
        id="swal-description"
        class="swal2-input"
        placeholder="Description"
        value="${currentTransaction?.description || ""}"
      >
      <input
        id="swal-amount"
        class="swal2-input"
        type="number"
        placeholder="Amount"
        value="${currentTransaction?.amount || ""}"
      >
      <select id="swal-category" class="swal2-input">
        ${
          currentTransaction?.is_income
            ? `
          <option value="salary" ${currentTransaction?.category === "salary" ? "selected" : ""}>Salary</option>
          <option value="bonus" ${currentTransaction?.category === "bonus" ? "selected" : ""}>Bonus</option>
        `
            : `
          <option value="fixed cost" ${currentTransaction?.category === "fixed cost" ? "selected" : ""}>Fixed Cost</option>
          <option value="credit" ${currentTransaction?.category === "credit" ? "selected" : ""}>Credit</option>
          <option value="shopping" ${currentTransaction?.category === "shopping" ? "selected" : ""}>Shopping</option>
        `
        }
        <option value="other" ${currentTransaction?.category === "other" ? "selected" : ""}>Other</option>
      </select>
    `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Update",
      cancelButtonText: "Cancel",
      background: "oklch(var(--b1))",
      color: "oklch(var(--bc))",
      confirmButtonColor: "oklch(var(--wa))",
      cancelButtonColor: "oklch(var(--er))",
      preConfirm: () => {
        const description = (
          document.getElementById("swal-description") as HTMLInputElement
        ).value;
        const amount = parseFloat(
          (document.getElementById("swal-amount") as HTMLInputElement).value
        );
        const category = (
          document.getElementById("swal-category") as HTMLSelectElement
        ).value;

        if (!description || !amount || !category) {
          Swal.showValidationMessage("Please fill all fields");
          return false;
        }

        return {
          description,
          amount,
          category,
        };
      },
    });

    if (!formValues) return;

    try {
      setIsLoading(true);
      const client = getClient();
      const { error } = await client
        .from("spending_tracker_db")
        .update({
          description: formValues.description,
          amount: formValues.amount,
          category: formValues.category,
        })
        .eq("id", selectedRows[0]);

      if (error) {
        throw error;
      }

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Transaction updated successfully",
        background: "oklch(var(--b1))",
        color: "oklch(var(--bc))",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });

      fetchCurrMonthData();
    } catch (error) {
      console.error("Error updating transaction:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update transaction. Please try again.",
        background: "oklch(var(--b1))",
        color: "oklch(var(--bc))",
        confirmButtonColor: "oklch(var(--p))",
      });
    } finally {
      setIsLoading(false);
      setSelectedRows([]);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className="grid grid-cols-1 gap-4 pb-16">
        <h1 className="text-xl font-bold">Track</h1>
        <Card balance={balance} />

        <div className="text-xs opacity-50 font-semibold ml-auto">
          Current Month: {dateRange}
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
          <button
            className="btn btn-secondary btn-sm"
            onClick={updateTransactionDetails}
          >
            Edit Details
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
