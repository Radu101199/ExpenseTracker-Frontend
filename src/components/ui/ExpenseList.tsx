import React, { useEffect, useState } from "react";
import type { ExpenseDto } from "../types/expense";
import ExpenseForm from "./ExpenseForm";
import { getExpenses, createExpense, updateExpense, deleteExpense } from "../../services/expenseService";

const ExpenseList: React.FC = () => {
  const [expenses, setExpenses] = useState<ExpenseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingExpense, setEditingExpense] = useState<ExpenseDto | null>(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const data = await getExpenses();
      // strip time part
      const normalized = data.map((expense) => ({
        ...expense,
        date: expense.date.split("T")[0],
      }));
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
      } else {
        await createExpense(expense);
      }
      setEditingExpense(null);
      fetchExpenses();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteExpense(id);
      fetchExpenses();
    } catch (err) {
      console.error(err);
    }
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
