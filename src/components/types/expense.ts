export interface ExpenseInput {
  title: string;
  amount: number;
  date: string;
  categoryId: number;
  userId: number;
}
export interface ExpenseDto {
  id: number;
  title: string;
  amount: number;
  date: string;
  categoryId: number;
  userId: number;
}