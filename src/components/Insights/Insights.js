import React from "react";

function Insights({ transactions }) {
  const expenses = transactions.filter((t) => t.type === "expense");

  const totalByCategory = {};
  expenses.forEach((t) => {
    totalByCategory[t.category] = (totalByCategory[t.category] || 0) + t.amount;
  });

  const topCategory =
    Object.keys(totalByCategory).reduce(
      (a, b) => (totalByCategory[a] > totalByCategory[b] ? a : b),
      ""
    ) || "No spending yet";
  const monthlySummary = transactions.reduce((summary, transaction) => {
    const date = new Date(transaction.date);
    const monthKey = date.toLocaleString("default", {
      month: "short",
      year: "numeric",
    });

    if (!summary[monthKey]) {
      summary[monthKey] = { income: 0, expense: 0, count: 0 };
    }

    summary[monthKey].count += 1;
    summary[monthKey][transaction.type] += transaction.amount;
    return summary;
  }, {});

  const months = Object.keys(monthlySummary).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );
  const latestMonth = months[months.length - 1] || "N/A";
  const latest = monthlySummary[latestMonth] || { income: 0, expense: 0, count: 0 };
  const previousMonth = months[months.length - 2] || "N/A";
  const previous = monthlySummary[previousMonth] || { income: 0, expense: 0, count: 0 };

  const monthlyExpenseAverage =
    months.length > 0
      ? Math.round(expenses.reduce((sum, item) => sum + item.amount, 0) / months.length)
      : 0;

  const topExpenseMonth =
    months.reduce((best, month) => {
      if (!best) return month;
      return monthlySummary[month].expense > monthlySummary[best].expense ? month : best;
    }, "") || "N/A";

  const expenseTrend =
    previous.expense > 0
      ? latest.expense > previous.expense
        ? "up"
        : "down"
      : "steady";
  const totalSpending = expenses.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="insights">
      <h2>Insights</h2>
      <div className="insight-grid">
        <div className="insight-card">
          <strong>Top Spending Category</strong>
          <span>{topCategory}</span>
        </div>
        <div className="insight-card">
          <strong>Monthly Expense Avg</strong>
          <span>₹{monthlyExpenseAverage.toLocaleString()}</span>
        </div>
        <div className="insight-card">
          <strong>Latest Month</strong>
          <span>{latestMonth}</span>
        </div>
        <div className="insight-card">
          <strong>{latestMonth} Expense</strong>
          <span>₹{latest.expense.toLocaleString()}</span>
        </div>
      </div>
      <p>
        {latestMonth !== "N/A" && previousMonth !== "N/A"
          ? `Expense trend is ${expenseTrend} compared to ${previousMonth}.`
          : "Add more transactions to see monthly trends."}
      </p>
      <p>Top expense month: {topExpenseMonth}</p>
    </div>
  );
}

export default Insights;