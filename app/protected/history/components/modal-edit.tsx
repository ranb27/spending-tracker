import React, { useEffect, useState } from "react";

interface Transaction {
  id: string;
  description: string;
  created_at: string;
  amount: number;
  is_income: boolean;
  category: string;
}

export default function ModalEdit() {
  const [transaction, setTransaction] = useState<Transaction | null>(null);

  useEffect(() => {
    const handleEditTransaction = (event: CustomEvent<Transaction>) => {
      setTransaction(event.detail);
    };

    // Listen for the custom event
    window.addEventListener(
      "editTransaction",
      handleEditTransaction as EventListener
    );

    return () => {
      window.removeEventListener(
        "editTransaction",
        handleEditTransaction as EventListener
      );
    };
  }, []);

  const handleSave = () => {
    // Handle saving the edited transaction
    console.log("Saving transaction:", transaction);
    // Close the modal
    const modalElement = document.getElementById(
      "modal_edit"
    ) as HTMLDialogElement;
    modalElement?.close();
  };

  return (
    <dialog id="modal_edit" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Edit Transaction</h3>
        {transaction && (
          <div className="py-4 space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={transaction.description}
                onChange={(e) =>
                  setTransaction((prev) =>
                    prev ? { ...prev, description: e.target.value } : null
                  )
                }
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Amount</span>
              </label>
              <input
                type="number"
                className="input input-bordered"
                value={transaction.amount}
                onChange={(e) =>
                  setTransaction((prev) =>
                    prev ? { ...prev, amount: Number(e.target.value) } : null
                  )
                }
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={transaction.category}
                onChange={(e) =>
                  setTransaction((prev) =>
                    prev ? { ...prev, category: e.target.value } : null
                  )
                }
              />
            </div>
          </div>
        )}
        <div className="modal-action">
          <button
            className="btn btn-sm btn-neutral text-accent"
            onClick={handleSave}
          >
            Save
          </button>
          <form method="dialog">
            <button className="btn btn-sm">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
