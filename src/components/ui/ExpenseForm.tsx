import React, { useEffect, useState } from "react";
import type { ExpenseInput } from "../types/expense";
import { expenseSchema } from "../types/expense";

interface ExpenseFormProps {
  onSubmit: (expense: ExpenseInput) => void;
  initialData?: ExpenseInput;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onSubmit, initialData }) => {
  const [form, setForm] = useState<ExpenseInput>({
    title: "",
    amount: 0,
    date: new Date().toISOString().split("T")[0],
    categoryId: 1,
    userId: 1,
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === "amount" || name === "categoryId" || name === "userId" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = expenseSchema.safeParse(form);
    if (!result.success) {
      const firstError = Object.values(result.error.flatten().fieldErrors)[0]?.[0];
      alert(firstError || "Invalid input");
      return;
    }
    onSubmit(result.data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        {initialData ? "Update Expense" : "Add Expense"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="md:col-span-2 border border-gray-300 rounded-lg px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          name="amount"
          type="number"
          value={form.amount}
          onChange={handleChange}
          placeholder="Amount"
          className="border border-gray-300 rounded-lg px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          name="categoryId"
          type="number"
          value={form.categoryId}
          onChange={handleChange}
          placeholder="Category ID"
          className="border border-gray-300 rounded-lg px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="userId"
          type="number"
          value={form.userId}
          onChange={handleChange}
          placeholder="User ID"
          className="border border-gray-300 rounded-lg px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
        />
      </div>

      <div className="mt-6 flex gap-4">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition">
          {initialData ? "Update Expense" : "Add Expense"}
        </button>
        <button
          type="button"
          className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
          onClick={() =>
            setForm({
              title: "",
              amount: 0,
              date: new Date().toISOString().split("T")[0],
              categoryId: 1,
              userId: 1,
            })
          }
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;