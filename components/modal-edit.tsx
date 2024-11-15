import { useState, useEffect } from "react";
import { getClient } from "@/utils/supabase/client";
import Swal from "sweetalert2";
import { formatMonthYear } from "@/utils/format-date-time";
import { useUser } from "@/app/context/user";
import { useTriggerUpdate } from "@/app/context/trigger-update";
import CardEdit from "./ui/card-edit";

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

export default function modalEdit() {
  const { user } = useUser();
  const { trigger, setTrigger } = useTriggerUpdate();

  //! State
  const [selectMonth, setSelectMonth] = useState<string>(
    formatMonthYear(new Date())
  );

  const [data, setData] = useState<Transaction[]>([]);

  const [amount, setAmount] = useState<number | null>(null);
  const [currentId, setCurrentId] = useState<number | null>(null);

  const fetchData = async () => {
    const client = getClient();

    const { data, error } = await client
      .from("spending_tracker_db")
      .select("*")
      .eq("user", user?.email)
      .eq("month_year", selectMonth)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, [trigger, selectMonth]);

  const handleDelete = async (id: string) => {
    //confirm
    const isConfirmed = window.confirm(
      `Are you sure? ID: ${id}\nYou won't be able to revert this!`
    );

    if (!isConfirmed) {
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
      fetchData();
    }
  };

  const handleUpdateAmount = async () => {
    if (!currentId || !amount) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please ensure all fields are filled!",
        background: "oklch(var(--b1))",
        color: "oklch(var(--bc))",
        confirmButtonColor: "oklch(var(--p))",
      });
      return;
    }

    const client = getClient();
    try {
      await client
        .from("spending_tracker_db")
        .update({ amount: amount })
        .eq("id", currentId);

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
        title: "Transaction updated successfully",
        background: "oklch(var(--b1))",
        color: "oklch(var(--bc))",
        confirmButtonColor: "oklch(var(--p))",
      });

      // Reset form
      setAmount(null);
      setCurrentId(null);

      // Close modal
      const modal = document.getElementById("modal_edit") as HTMLDialogElement;
      modal.close();

      // Refresh data
      fetchData();
      setTrigger(!trigger);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        background: "oklch(var(--b1))",
        color: "oklch(var(--bc))",
        confirmButtonColor: "oklch(var(--p))",
      });
    }
  };

  console.log(data);

  const handleClear = () => {
    setAmount(null);
    setCurrentId(null);
  };

  return (
    <dialog id="modal_edit" className="modal modal-top">
      <div className="modal-box bg-base-200">
        <h3 className="font-bold text-lg">
          <span className="text-primary">Edit Transaction</span>
        </h3>
        <div className="grid grid-cols-1 gap-2">
          <label htmlFor="" className="label">
            <span className="label-text-alt">Select Month</span>
          </label>
          <input
            value={selectMonth}
            type="month"
            className="input input-bordered w-full input-sm md:input-disabled border-none"
            onChange={(e) => setSelectMonth(e.target.value)}
          />

          <label htmlFor="" className="label">
            <span className="label-text-alt">Select Card</span>
          </label>
          <div className="flex gap-2 w-full overflow-scroll p-4">
            {data.map((item) => (
              <CardEdit
                key={item.id}
                id={item.id}
                is_income={item.is_income}
                title={item.description}
                value={item.amount}
                setCurrentId={setCurrentId}
                currentId={currentId}
                category={item.category}
              />
            ))}
          </div>

          <label htmlFor="" className="label">
            <span className="label-text-alt">
              Amount {currentId && `(${currentId})`}
            </span>
          </label>

          <input
            value={amount || ""}
            placeholder="Enter amount"
            type="number"
            className="input input-bordered w-full input-sm md:input-disabled border-none"
            onChange={(e) => setAmount(parseInt(e.target.value))}
          />
        </div>
        <div className="modal-action">
          <button
            onClick={() => handleDelete("")}
            className="btn btn-error btn-xs mr-auto"
          >
            Delete
          </button>
          <button
            onClick={handleUpdateAmount}
            className="btn btn-xs btn-neutral text-success"
          >
            Save
          </button>
          <button
            onClick={handleClear}
            className="btn btn-xs btn-ghost text-primary"
          >
            Clear
          </button>
          <form method="dialog">
            <button className="btn btn-xs btn-ghost text-error">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
