import { useState, useEffect } from "react";
import { getClient } from "@/utils/supabase/client";
import Swal from "sweetalert2";
import { formatMonthYear } from "@/utils/format-date-time";
import { useUser } from "@/app/context/user";
import { useTriggerUpdate } from "@/app/context/trigger-update";

export default function modalEdit({ fetchData = () => {} }) {
  const { user } = useUser();
  const { trigger, setTrigger } = useTriggerUpdate();

  //! State
  const [selectMonth, setSelectMonth] = useState<string>(
    formatMonthYear(new Date())
  );
  const [amount, setAmount] = useState<number | null>(null);
  const [currentId, setCurrentId] = useState<string>("");

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
      setCurrentId("");

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

  return (
    <dialog id="modal_edit" className="modal modal-bottom">
      <div className="modal-box">
        <h3 className="font-bold text-lg">
          <span className="text-primary">Edit Transaction</span>
        </h3>
        <div className="">
          <label htmlFor="" className="label">
            <span className="label-text-alt">Select Month</span>
          </label>
          <input
            value={selectMonth}
            type="month"
            className="input input-bordered w-full input-sm md:input-disabled border-none shadow-md"
            onChange={(e) => setSelectMonth(e.target.value)}
          />
        </div>
        <div className="modal-action">
          {/* <button
            onClick={() => handleDelete("")}
            className="btn btn-error btn-xs mr-auto"
          >
            Delete
          </button> */}
          {/* <button className="btn btn-xs btn-neutral text-success">Save</button>
          <button className="btn btn-xs btn-ghost text-primary">Clear</button> */}
          <form method="dialog">
            <button className="btn btn-xs btn-ghost text-error">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
