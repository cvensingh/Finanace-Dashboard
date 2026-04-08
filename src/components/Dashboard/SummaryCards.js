import React from "react";

function SummaryCards({ transactions }) {
  const income = transactions
    .filter(t => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const balance = income - expense;

  return (
    <div className="cards">
      <div className="card balance">₹{balance}<p>Balance</p></div>
      <div className="card income">₹{income}<p>Income</p></div>
      <div className="card expense">₹{expense}<p>Expense</p></div>
    </div>
  );
}

export default SummaryCards;