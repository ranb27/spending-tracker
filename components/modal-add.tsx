"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/app/user";
import { getClient } from "@/utils/supabase/client";
import Loading from "@/components/ui/loading";
import Swal from "sweetalert2";
import { formatMonthYear } from "@/utils/format-date-time";
import { TicketMinus, TicketPlus } from "lucide-react";

interface dataPostTransaction {
  description: string; // input text
  amount: number | null; // input number
  category: string; // select option
  is_income: boolean; // checkbox
  user: string | null; // user?.email
  month_year: string; // formatMonthYear(new Date()) = YYYY-MM
}

export default function modalAdd() {
  const { user } = useUser();

  const [dataPostTransaction, setDataPostTransaction] =
    useState<dataPostTransaction>({
      description: "",
      amount: null,
      category: "",
      is_income: false,
      user: user?.email || null,
      month_year: formatMonthYear(new Date()),
    });

  console.log(dataPostTransaction);

  const handleSubmit = async () => {
    //require all fields
    if (
      !dataPostTransaction.description ||
      !dataPostTransaction.amount ||
      !dataPostTransaction.category
    ) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const client = getClient();
      const { error } = await client.from("spending_tracker_db").insert([
        {
          description: dataPostTransaction.description,
          amount: dataPostTransaction.amount,
          category: dataPostTransaction.category,
          is_income: dataPostTransaction.is_income,
          user: dataPostTransaction.user,
          month_year: dataPostTransaction.month_year,
        },
      ]);

      if (error) {
        console.error(error);
        return;
      }

      handleClear();
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
      const modal = document.getElementById(
        "modal_add_tracnsaction"
      ) as HTMLDialogElement | null;
      if (modal) {
        modal.close();
      }
    }
  };

  const handleClear = () => {
    setDataPostTransaction({
      description: "",
      amount: null,
      category: "",
      is_income: false,
      user: user?.email || null,
      month_year: formatMonthYear(new Date()),
    });
  };

  return (
    <div>
      <dialog id="modal_add_tracnsaction" className="modal modal-top">
        <div className="modal-box bg-base-200">
          <h3 className="font-bold text-lg">
            <span className="text-primary">
              {dataPostTransaction.is_income ? "Add Income" : "Add Expense"}
            </span>
          </h3>

          <div className="form-control w-full flex flex-row items-center">
            <label className="label">
              <span className="label-text flex gap-2">
                <p className="my-auto">
                  {dataPostTransaction.is_income ? "Income" : "Expense"}
                </p>
                {dataPostTransaction.is_income ? (
                  <TicketPlus color="oklch(var(--su))" />
                ) : (
                  <TicketMinus color="oklch(var(--er))" />
                )}
              </span>
            </label>
            <label className="cursor-pointer label ml-auto">
              <input
                checked={dataPostTransaction.is_income}
                type="checkbox"
                className="toggle toggle-success"
                onChange={(e) => {
                  setDataPostTransaction({
                    ...dataPostTransaction,
                    is_income: e.target.checked,
                  });
                }}
              />
            </label>
          </div>

          <div className="grid grid-cols-1">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <input
              value={dataPostTransaction.description}
              type="text"
              placeholder="Enter description"
              className="input input-bordered w-full input-sm border-none"
              onChange={(e) => {
                setDataPostTransaction({
                  ...dataPostTransaction,
                  description: e.target.value,
                });
              }}
            />

            <label className="label">
              <span className="label-text">Amount</span>
            </label>
            <input
              value={dataPostTransaction.amount || ""}
              type="number"
              placeholder="Enter amount"
              className="input input-bordered w-full input-sm border-none"
              onChange={(e) => {
                setDataPostTransaction({
                  ...dataPostTransaction,
                  amount: Number(e.target.value),
                });
              }}
            />

            <label className="label">
              <span className="label-text">
                Month ({dataPostTransaction.month_year})
              </span>
            </label>
            <input
              value={dataPostTransaction.month_year}
              type="month"
              className="input input-bordered w-full input-sm md:input-disabled border-none"
              onChange={(e) => {
                setDataPostTransaction({
                  ...dataPostTransaction,
                  month_year: formatMonthYear(new Date(e.target.value)),
                });
              }}
            />

            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select
              value={dataPostTransaction.category}
              onChange={(e) => {
                setDataPostTransaction({
                  ...dataPostTransaction,
                  category: e.target.value,
                });
              }}
              className="select w-full select-sm border-none"
            >
              {dataPostTransaction.category === "" && (
                <option value="" disabled>
                  Pick your category
                </option>
              )}
              {dataPostTransaction.is_income ? (
                <>
                  <option value="salary">Salary</option>
                  <option value="bonus">Bonus</option>
                  <option value="gift">Gift</option>
                  <option value="part time">Part Time</option>
                </>
              ) : (
                <>
                  <option value="fixed cost">Fixed Cost</option>
                  <option value="credit">Credit</option>
                  <option value="shopping">Shopping</option>
                  <option value="investment">Investment</option>
                </>
              )}
              <option value="other">Other</option>
            </select>
          </div>

          <div className="modal-action">
            <button
              onClick={handleSubmit}
              className="btn btn-xs text-accent btn-neutral"
            >
              Submit
            </button>
            <button
              onClick={handleClear}
              className="btn btn-xs text-primary btn-ghost"
            >
              Clear
            </button>
            <form method="dialog">
              <button
                onClick={handleClear}
                className="btn btn-xs text-error btn-ghost"
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
