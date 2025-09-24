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

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === "amount" || name === "categoryId" || name === "userId" ? Number(value) : value,
    }));
  };
 
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const result = expenseSchema.safeParse(form);

  if (!result.success) {
    const fieldErrors: Record<string, string> = {};
    const errors = result.error.flatten().fieldErrors;

    (Object.keys(errors) as (keyof typeof errors)[]).forEach((key) => {
      const err = errors[key];
      if (err?.[0]) {
        fieldErrors[key] = err[0];
      }
    });

    setErrors(fieldErrors);
    return;
  }

  setErrors({});
  setLoading(true); // start loading
  try {
    await onSubmit(result.data); // wait for async submit
  } finally {
    setLoading(false); // stop loading after completion
  }
};

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        {initialData ? "Update Expense" : "Add Expense"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="border border-gray-300 rounded-lg px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        {errors.title && <p className="text-red-600 text-sm">{errors.title}</p>}

        <input
          name="amount"
          type="number"
          value={form.amount}
          onChange={handleChange}
          placeholder="Amount"
          className="border border-gray-300 rounded-lg px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        {errors.amount && <p className="text-red-600 text-sm mt-1">{errors.amount}</p>}

        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        {errors.date && <p className="text-red-600 text-sm mt-1">{errors.date}</p>}

        <input
          name="categoryId"
          type="number"
          value={form.categoryId}
          onChange={handleChange}
          placeholder="Category ID"
          className="border border-gray-300 rounded-lg px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="md:col-span-2 flex justify-center">
          <input
            name="userId"
            type="number"
            value={form.userId}
            onChange={handleChange}
            placeholder="User ID"
            className="w-full md:w-1/2 border border-gray-300 rounded-lg px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="mt-6 flex gap-4 items-center">
        <button
          type="submit"
          disabled={loading}
          className={`flex items-center justify-center gap-2 px-6 py-2 rounded-lg shadow text-white transition ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading && (
            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
          )}
          {initialData
            ? loading
              ? "Updating..."
              : "Update Expense"
            : loading
            ? "Saving..."
            : "Add Expense"}
        </button>

        <button
          type="button"
          disabled={loading}
          className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition disabled:opacity-50"
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