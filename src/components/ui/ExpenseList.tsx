import type { ExpenseDto } from "../types/expense";

type ExpenseListProps = {
  expenses: ExpenseDto[];
};

const ExpenseList = ({ expenses }: ExpenseListProps) => {
  if (expenses.length === 0) {
    return <p>No expenses yet.</p>;
  }

  return (
    <div>
      <h2>Expenses</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.title} - {expense.amount} RON
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
