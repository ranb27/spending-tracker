import React from "react";

export default function modalEdit() {
  return (
    <dialog id="modal_edit" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Edit Transaction</h3>
        <p className="py-4">Press ESC key or click the button below to close</p>
        <div className="modal-action">
          <button className="btn btn-sm btn-neutral text-accent">Save</button>
          <form method="dialog">
            <button className="btn btn-sm">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
