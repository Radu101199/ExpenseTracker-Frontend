// src/App.tsx
import React from "react";
import ExpenseList from "./components/ui/ExpenseList";

const App: React.FC = () => {
  return (
    <div>
      <h1>Expense Tracker</h1>
      <ExpenseList />
    </div>
  );
};

export default App;
