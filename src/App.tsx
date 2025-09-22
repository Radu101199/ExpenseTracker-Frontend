// src/App.tsx
import React from "react";
import ExpenseList from "./components/ui/ExpenseList";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="w-full px-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Expense Tracker</h1>
        <ExpenseList />
      </div>
    </div>
  );
};

export default App;
