"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import TransactionTable from "./components/transaction-table";
import { useUser } from "@/app/user";
import { getClient } from "@/utils/supabase/client";
import Loading from "@/components/ui/loading";
import Swal from "sweetalert2";

type TransactionFormValues = {
  amount: number;
  description: string;
  category: string;
  is_income: boolean;
  user: string;
};

function Page() {
  const { user } = useUser();
  const [transactions, setTransactions] = useState<TransactionFormValues[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<TransactionFormValues>({
    defaultValues: {
      is_income: false,
    },
  });

  const onSubmit = (data: TransactionFormValues) => {
    setTransactions((prev) => [...prev, data]);
    reset();
  };

  const isIncome = watch("is_income");

  const handleInsert = async () => {
    if (transactions.length === 0) return;

    setIsLoading(true);
    setError(null);

    // SweetAlert confirmation
    const isConfirmed = await Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "Do you want to save these transactions?",
      showCancelButton: true,
      confirmButtonText: "Save",
      cancelButtonText: "Cancel",
      background: "oklch(var(--b1))",
      color: "oklch(var(--bc))",
      confirmButtonColor: "oklch(var(--su))",
      cancelButtonColor: "oklch(var(--er))",
    });

    if (!isConfirmed.isConfirmed) {
      setIsLoading(false);
      return;
    }

    try {
      const supabase = getClient();
      const { error: insertError } = await supabase
        .from("spending_tracker_db")
        .insert(
          transactions.map((transaction) => ({
            ...transaction,
            user: user?.email,
          }))
        );

      if (insertError) throw insertError;

      setTransactions([]);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Transactions saved successfully",
        background: "oklch(var(--b1))",
        color: "oklch(var(--bc))",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } catch (err) {
      setError("Failed to save transactions. Please try again.");
      console.error("Error inserting data: ", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to save transactions. Please try again.",
        background: "oklch(var(--b1))",
        color: "oklch(var(--bc))",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className="grid grid-cols-1 gap-4 pb-16">
        {/* Spending */}
        <h1 className="text-xl font-bold">Spend</h1>

        <div className="card bg-base-100 shadow-lg rounded-xl">
          <div className="card-body">
            <h2 className="card-title text-primary">Transaction</h2>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 gap-2"
            >
              <input
                type="number"
                id="amount"
                {...register("amount", { required: "Amount is required" })}
                placeholder="Amount"
                className="input w-full"
              />
              {errors.amount && (
                <p className="text-red-500 text-sm">{errors.amount.message}</p>
              )}

              <input
                type="text"
                id="description"
                {...register("description", {
                  required: "Description is required",
                })}
                placeholder="Description"
                className="input w-full"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}

              <label className="cursor-pointer label px-0">
                <span className="label-text font-semibold text-primary">
                  Income
                </span>
                <input
                  type="checkbox"
                  {...register("is_income")}
                  className="checkbox checkbox-success"
                />
              </label>

              <select
                {...register("category", { required: "Category is required" })}
                id="categories"
                className="select w-full"
              >
                {isIncome ? (
                  <>
                    <option value="salary">Salary</option>
                    <option value="bonus">Bonus</option>
                  </>
                ) : (
                  <>
                    <option value="fixed cost">Fixed Cost</option>
                    <option value="credit">Credit</option>
                    <option value="shopping">Shopping</option>
                  </>
                )}
                <option value="other">Other</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm">
                  {errors.category.message}
                </p>
              )}

              <div className="grid grid-cols-2 gap-2">
                <button
                  className="btn w-full btn-neutral btn-sm"
                  type="button"
                  onClick={() => reset()}
                >
                  Reset
                </button>
                <button className="btn btn-primary btn-sm w-full" type="submit">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="card bg-base-100 shadow-lg rounded-xl">
          <TransactionTable data={transactions} setData={setTransactions} />
        </div>
        <div className="flex justify-end gap-2">
          <button onClick={() => setTransactions([])} className="btn btn-sm">
            Clear
          </button>
          <button onClick={handleInsert} className="btn btn-success btn-sm">
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default Page;
