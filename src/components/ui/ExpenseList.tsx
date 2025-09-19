// components/ui/ExpenseList.tsx
import React, { useEffect, useState } from "react";
import type { ExpenseDto, CreateExpenseInput, UpdateExpenseInput } from "../types/expense";
import ExpenseForm from "./ExpenseForm";

const ExpenseList: React.FC = () => {
  const [expenses, setExpenses] = useState<ExpenseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingExpense, setEditingExpense] = useState<ExpenseDto | null>(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const res = await fetch("http://localhost:5168/api/Expense");
    const data: ExpenseDto[] = await res.json();

    // ✅ Normalize dates for UI (strip time part)
    const normalized = data.map((expense) => ({
      ...expense,
      date: expense.date.split("T")[0], // keep only yyyy-MM-dd
    }));

    setExpenses(normalized);
    setLoading(false);
  };

  const handleSubmit = async (
    expense: CreateExpenseInput | UpdateExpenseInput,
    id?: number
  ) => {
    console.log("Sending expense:", expense, "with id:", id);

    if (id) {
      // UPDATE
      await fetch(`http://localhost:5168/api/Expense/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expense),
      });
    } else {
      // CREATE
      await fetch("http://localhost:5168/api/Expense", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expense),
      });
    }

    setEditingExpense(null);
    fetchExpenses();
  };

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:5168/api/Expense/${id}`, { method: "DELETE" });
    fetchExpenses();
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <ExpenseForm
        onSubmit={(data) => {
          if (editingExpense) {
            handleSubmit(data, editingExpense.id);
          } else {
            handleSubmit(data);
          }
        }}
        initialData={editingExpense || undefined}
      />

      <h2>Expenses</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.title} - {expense.amount} RON -{" "}
            {new Date(expense.date).toLocaleDateString()}
            <button onClick={() => setEditingExpense(expense)}>Edit</button>
            <button onClick={() => handleDelete(expense.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
