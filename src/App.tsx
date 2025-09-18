import { useState, useEffect } from "react";
import ExpenseList from "./components/ui/ExpenseList";
import ExpenseForm from "./components/ui/ExpenseForm";
import type { ExpenseDto, ExpenseInput } from "./components/types/expense";

function App() {
  const [expenses, setExpenses] = useState<ExpenseDto[]>([]);

  // Fetch all expenses when app loads
  useEffect(() => {
    fetch("http://localhost:5168/api/Expense")
      .then((res) => res.json())
      .then((data: ExpenseDto[]) => setExpenses(data))
      .catch((err) => console.error("Error fetching expenses:", err));
  }, []);

  // Handle adding a new expense
  const addExpense = async (expense: ExpenseInput) => {
    const response = await fetch("http://localhost:5168/api/Expense", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(expense),
    });

    if (response.ok) {
      const newExpense: ExpenseDto = await response.json();
      setExpenses((prev) => [...prev, newExpense]);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>Expense Tracker</h1>

      {/* Form for adding new expenses */}
      <ExpenseForm onSubmit={addExpense} />

      {/* List of expenses */}
      <ExpenseList expenses={expenses} />
    </div>
  );
}

export default App;
