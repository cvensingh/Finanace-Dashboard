import React, { useMemo, useState } from "react";

function TransactionList({ transactions }) {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");

  const categories = useMemo(
    () => ["all", ...new Set(transactions.map((t) => t.category))],
    [transactions]
  );

  const filteredTransactions = useMemo(() => {
    const normalizedSearch = search.toLowerCase();

    return transactions
      .filter((t) => {
        if (filterType !== "all" && t.type !== filterType) {
          return false;
        }

        if (filterCategory !== "all" && t.category !== filterCategory) {
          return false;
        }

        const searchable = `${t.date} ${t.category} ${t.type} ${t.amount}`.toLowerCase();
        return searchable.includes(normalizedSearch);
      })
      .sort((a, b) => {
        if (sortBy === "amount") {
          return sortDirection === "asc" ? a.amount - b.amount : b.amount - a.amount;
        }

        if (sortBy === "category") {
          return sortDirection === "asc"
            ? a.category.localeCompare(b.category)
            : b.category.localeCompare(a.category);
        }

        const aDate = new Date(a.date).getTime();
        const bDate = new Date(b.date).getTime();
        return sortDirection === "asc" ? aDate - bDate : bDate - aDate;
      });
  }, [transactions, filterType, filterCategory, search, sortBy, sortDirection]);

  return (
    <div className="transactions">
      <div className="transactions-header">
        <div>
          <h2>Transactions</h2>
          <p className="transaction-summary">{filteredTransactions.length} items found</p>
        </div>

        <div className="transaction-controls">
          <input
            type="search"
            placeholder="Search by date, category, amount or type"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">All Types</option>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </option>
            ))}
          </select>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="date">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
            <option value="category">Sort by Category</option>
          </select>

          <select value={sortDirection} onChange={(e) => setSortDirection(e.target.value)}>
            <option value="desc">Newest / Highest</option>
            <option value="asc">Oldest / Lowest</option>
          </select>
        </div>
      </div>

      {filteredTransactions.length === 0 ? (
        <div className="no-results">No transactions match these filters.</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((t) => (
              <tr key={t.id} className={t.type}>
                <td>{t.date}</td>
                <td>₹{t.amount}</td>
                <td>{t.category}</td>
                <td>{t.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TransactionList;