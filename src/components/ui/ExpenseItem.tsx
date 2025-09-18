import React from "react";
import type { ExpenseInput } from "../types/expense";

interface ExpenseItemProps {
  expense: ExpenseInput & { id: number };
  onEdit: (expense: ExpenseInput & { id: number }) => void;
  onDelete: (id: number) => void;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense, onEdit, onDelete }) => {
  return (
    <div className="flex justify-between items-center border p-3 rounded mb-2">
      <div>
        <h3 className="font-bold">{expense.title}</h3>
        <p>{expense.amount} RON - {new Date(expense.date).toLocaleDateString()}</p>
        <small>Category: {expense.categoryId} | User: {expense.userId}</small>
      </div>
      <div className="space-x-2">
        <button
          onClick={() => onEdit(expense)}
          className="bg-yellow-500 text-white px-3 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(expense.id)}
          className="bg-red-600 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ExpenseItem;
