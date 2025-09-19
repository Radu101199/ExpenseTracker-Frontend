// src/components/types/expense.schema.ts
import { z } from "zod";

export const expenseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  amount: z.number().positive("Amount must be greater than 0"),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  categoryId: z.number().int().positive("Category is required"),
  userId: z.number().int().positive("User is required"),
});

// Infer TypeScript type from schema
export type ExpenseInput = z.infer<typeof expenseSchema>;
export type CreateExpenseInput = ExpenseInput;
export type UpdateExpenseInput = ExpenseInput;

// src/components/types/expense.dto.ts
export interface ExpenseDto {
  id: number;
  title: string;
  amount: number;
  date: string; // ISO string
  categoryId: number;
  userId: number;
}
