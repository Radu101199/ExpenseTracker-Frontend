import React, {useState, useEffect} from 'react';
import type { ExpenseInput } from "../types/expense";

interface ExpenseFormProps{
    onSubmit: (expense: ExpenseInput) => void;
    initialData?: ExpenseInput;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onSubmit, initialData }) => {
  const [form, setForm] = useState<ExpenseInput>({
    title: "",
    amount: 0,
    date: new Date().toISOString().split("T")[0], // yyyy-MM-dd
    categoryId: 1,
    userId: 1,
  });

  // Dacă primim date inițiale (la editare), le încărcăm în form
  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "amount" || name === "categoryId" || name === "userId"
        ? Number(value)
        : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        className="border p-2 w-full"
        required
      />

      <input
        type="number"
        name="amount"
        value={form.amount}
        onChange={handleChange}
        placeholder="Amount"
        className="border p-2 w-full"
        required
      />

      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />

      <input
        type="number"
        name="categoryId"
        value={form.categoryId}
        onChange={handleChange}
        placeholder="Category ID"
        className="border p-2 w-full"
      />

      <input
        type="number"
        name="userId"
        value={form.userId}
        onChange={handleChange}
        placeholder="User ID"
        className="border p-2 w-full"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {initialData ? "Update Expense" : "Add Expense"}
      </button>
    </form>
  );
};

export default ExpenseForm;
