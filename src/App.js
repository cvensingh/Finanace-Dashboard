import React, { useEffect, useState } from "react";
import transactionsData from "./data/transactions";

import SummaryCards from "./components/Dashboard/SummaryCards";
import BalanceChart from "./components/Dashboard/BalanceChart";
import CategoryChart from "./components/Dashboard/CategoryChart";

import TransactionList from "./components/Transactions/TransactionList";
import AddTransaction from "./components/Transactions/AddTransaction";

import Insights from "./components/Insights/Insights";
import RoleSwitcher from "./components/Role/RoleSwitcher";

import "./styles/dashboard.css";

const STORAGE_KEY = "finance-transactions";

function App() {
  const [transactions, setTransactions] = useState(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : transactionsData;
    } catch {
      return transactionsData;
    }
  });

  const [role, setRole] = useState("viewer");
  const totalTransactions = transactions.length;

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    } catch {
      // Ignore local storage errors.
    }
  }, [transactions]);

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <span className="eyebrow">Finance Intelligence</span>
          <h1>💰 Finance Dashboard</h1>
          <p className="subtitle">Modern insights, real-time spending, and smarter budgets.</p>
        </div>

        <div className="header-actions">
          <div className="transactions-summary">{totalTransactions} transactions</div>
          <RoleSwitcher role={role} setRole={setRole} />
        </div>
      </header>

      <SummaryCards transactions={transactions} />

      <div className="charts">
        <BalanceChart transactions={transactions} />
        <CategoryChart transactions={transactions} />
      </div>

      {role === "admin" && (
        <section className="panel add-transaction-panel">
          <h2>Add a transaction</h2>
          <AddTransaction setTransactions={setTransactions} />
        </section>
      )}

      <div className="main-grid">
        <section className="panel panel--wide">
          <TransactionList transactions={transactions} />
        </section>

        <section className="panel panel--side">
          <Insights transactions={transactions} />
        </section>
      </div>
    </div>
  );
}

export default App;