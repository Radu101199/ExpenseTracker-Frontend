// src/services/expenseService.ts
import type { ExpenseDto, CreateExpenseInput, UpdateExpenseInput } from "../components/types/expense";

const API_URL = "http://localhost:5168/api/Expense";

export async function getExpenses(): Promise<ExpenseDto[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch expenses");
  return res.json();
}

export async function createExpense(expense: CreateExpenseInput): Promise<void> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense),
  });
  if (!res.ok) throw new Error("Failed to create expense");
}

export async function updateExpense(id: number, expense: UpdateExpenseInput): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense),
  });
  if (!res.ok) throw new Error("Failed to update expense");
}

export async function deleteExpense(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete expense");
}
