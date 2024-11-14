import React from "react";
import { getClient } from "@/utils/supabase/client";
import Swal from "sweetalert2";

export default function modalEdit({ fetchData = () => {} }) {
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

  return (
    <dialog id="modal_edit" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">
          <span className="text-primary">Edit Transaction</span>
        </h3>
        <p className="py-4">Press ESC key or click the button below to close</p>
        <div className="modal-action">
          <button
            onClick={() => handleDelete("")}
            className="btn btn-error btn-xs mr-auto"
          >
            Delete
          </button>
          <button className="btn btn-xs btn-neutral text-success">Save</button>
          <button className="btn btn-xs btn-ghost text-primary">Clear</button>
          <form method="dialog">
            <button className="btn btn-xs btn-ghost text-error">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
