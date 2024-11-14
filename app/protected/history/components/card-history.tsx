import React, { useState, useRef } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface Transaction {
  id: string;
  description: string;
  created_at: string;
  amount: number;
  is_income: boolean;
  category: string;
}

interface CardHistoryProps {
  transaction: Transaction;
}

export default function CardHistory({ transaction }: CardHistoryProps) {
  const { description, created_at, amount, is_income, category } = transaction;
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchTimer, setTouchTimer] = useState<NodeJS.Timeout | null>(null);
  const modalRef = useRef<HTMLDialogElement>(null);

  const icon = is_income ? (
    <TrendingUp size={32} className="text-success my-auto" />
  ) : (
    <TrendingDown size={32} className="text-error my-auto" />
  );

  const handleTouchStart = () => {
    const timer = setTimeout(() => {
      if (modalRef.current) {
        // @ts-ignore
        window.modal_edit.showModal();
        // Pass transaction data to modal via custom event
        const event = new CustomEvent("editTransaction", {
          detail: transaction,
        });
        window.dispatchEvent(event);
      }
    }, 2000);

    setTouchTimer(timer);
    setTouchStart(Date.now());
  };

  const handleTouchEnd = () => {
    if (touchTimer) {
      clearTimeout(touchTimer);
    }
    setTouchStart(0);
  };

  return (
    <>
      <div
        className="card bg-base-100 shadow-sm touch-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        <div className="flex justify-between p-3 gap-4">
          <div className="flex gap-4">
            {icon}
            <div className="grid">
              <h2 className="overflow-scroll">{description}</h2>
              <p className="text-xs opacity-75">{category}</p>
            </div>
          </div>
          <div className="grid">
            <div className="flex gap-2 ml-auto">
              <span
                className={`my-auto ${is_income ? "text-success" : "text-error"}`}
              >
                {amount.toLocaleString()}{" "}
              </span>
              <p className="my-auto text-xs">THB</p>
            </div>
            <p className="text-xs opacity-50">
              {new Date(created_at).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
