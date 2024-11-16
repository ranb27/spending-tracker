import React from "react";

export default function cardEdit({
  id,
  title,
  value,
  is_income,
  setCurrentId,
  currentId,
  category,
}: {
  id: number;
  title: string;
  value: number;
  is_income: boolean;
  setCurrentId: (id: number) => void;
  currentId: number | null;
  category: string;
}) {
  return (
    <div
      onClick={() => setCurrentId(id)}
      className={`card bg-base-100 cursor-pointer min-w-64 border-4 ${currentId === id && is_income ? "border-success" : currentId === id && !is_income ? "border-error" : ""} duration-300`}
    >
      <div className="card-body">
        <p className="menu-title">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </p>
        <p className="text-lg">{title}</p>
        <p className="card-title text-accent drop-shadow-sm flex w-full justify-center">
          {value}
        </p>
      </div>
    </div>
  );
}
