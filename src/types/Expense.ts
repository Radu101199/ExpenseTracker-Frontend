export interface Expense {
  id: number;
  title: string;
  amount: number;
  date: string; // vine ca ISO string din API
  categoryId: number;
  userId: number;
}
