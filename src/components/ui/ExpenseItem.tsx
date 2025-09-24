import React from "react";
import type { ExpenseInput } from "../types/expense";

interface Props {
  expense: ExpenseInput & { id: number };
  onEdit: (e: ExpenseInput & { id: number }) => void;
  onDelete: (id: number) => void;
}

const ExpenseItem: React.FC<Props> = ({ expense, onEdit, onDelete }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3">
      <div>
        <h3 className="font-semibold text-gray-800">{expense.title}</h3>
        <p className="text-sm text-gray-600">
          {new Date(expense.date).toLocaleDateString()}
        </p>
        <p className="mt-1 text-gray-700">{expense.amount.toFixed(2)} RON</p>
        <div className="text-xs text-gray-500 mt-1">
          Cat: {expense.categoryId} • User: {expense.userId}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mt-3 sm:mt-0">
        <button
          onClick={() => onEdit(expense)}
          className="bg-yellow-400 text-white px-3 py-1 rounded hover:brightness-90"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(expense.id)}
          className="bg-red-600 text-white px-3 py-1 rounded hover:brightness-90"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ExpenseItem;