import React from "react";

export default function modalEdit() {
  return (
    <dialog id="modal_edit" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">
          <span className="text-primary">Edit Transaction</span>
        </h3>
        <p className="py-4">Press ESC key or click the button below to close</p>
        <div className="modal-action">
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
