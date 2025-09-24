import React, { useEffect, useState } from "react";
import type { ExpenseDto } from "../types/expense";
import ExpenseForm from "./ExpenseForm";
import ExpenseItem from "./ExpenseItem";
import { getExpenses, createExpense, updateExpense, deleteExpense } from "../../services/expenseService";

const ExpenseList: React.FC = () => {
  const [expenses, setExpenses] = useState<ExpenseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingExpense, setEditingExpense] = useState<ExpenseDto | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const data = await getExpenses();
      const normalized = data.map(e => ({ ...e, date: new Date(e.date).toISOString().split("T")[0] }));
      setExpenses(normalized);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (expense: Omit<ExpenseDto, "id">, id?: number) => {
  try {
    if (id) {
      await updateExpense(id, expense);
      setMessage({ type: "success", text: "Expense updated successfully!" });
    } else {
      await createExpense(expense);
      setMessage({ type: "success", text: "Expense added successfully!" });
    }
    setEditingExpense(null);
    fetchExpenses();
  } catch (err) {
    console.error(err);
    setMessage({ type: "error", text: "Something went wrong. Please try again." });
  }
};

const handleDelete = async (id: number) => {
  try {
    await deleteExpense(id);
    setMessage({ type: "success", text: "Expense deleted successfully!" });
    fetchExpenses();
  } catch (err) {
    console.error(err);
    setMessage({ type: "error", text: "Failed to delete expense." });
  }
};

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div>
    {/* Success/Error banner */}
    {message && (
      <div
        className={`mb-4 p-3 rounded text-center ${
          message.type === "success"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {message.text}
      </div>
    )}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {/* Left side: Form */}
    <div className="md:col-span-2">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <ExpenseForm
          onSubmit={(data) => {
            if (editingExpense) return handleSubmit(data, editingExpense.id);
            else return handleSubmit(data);
          }}
          initialData={editingExpense ?? undefined}
        />
      </div>
    </div>

    {/* Right side: Expense list */}
    <div className="md:col-span-1">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-3">
          Expenses
        </h2>
        {expenses.length === 0 ? (
          <div className="text-gray-600">No expenses</div>
        ) : (
          <div className="divide-y">
            {expenses.map((exp) => (
              <ExpenseItem
                key={exp.id}
                expense={exp}
                onEdit={(e) => setEditingExpense(e)}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
  </div>
);
};

export default ExpenseList;