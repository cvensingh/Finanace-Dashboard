import React, { useState } from "react";

function AddTransaction({ setTransactions }) {
  const [form, setForm] = useState({
    date: "",
    amount: "",
    category: "",
    type: "expense",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    setTransactions((prev) => [
      ...prev,
      { ...form, id: Date.now(), amount: Number(form.amount) },
    ]);

    setForm({ date: "", amount: "", category: "", type: "expense" });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        placeholder="Date"
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />

      <input
        placeholder="Amount"
        type="number"
        step="0.01"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
      />

      <input
        placeholder="Category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />

      <select
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value })}
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <button type="submit">Add Transaction</button>
    </form>
  );
}

export default AddTransaction;