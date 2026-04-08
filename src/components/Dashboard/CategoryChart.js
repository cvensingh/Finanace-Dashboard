import React from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

function CategoryChart({ transactions }) {
  const expenses = transactions.filter((t) => t.type === "expense");

  const categoryMap = {};
  expenses.forEach((t) => {
    categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
  });

  const data = {
    labels: Object.keys(categoryMap),
    datasets: [
      {
        data: Object.values(categoryMap),
        backgroundColor: [
          "#8b5cf6",
          "#22d3ee",
          "#fb7185",
          "#f97316",
          "#4ade80",
          "#60a5fa",
        ],
        borderColor: "rgba(255,255,255,0.12)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: "#cbd5e1" },
      },
    },
  };

  return (
    <div className="chart-box">
      <h3>Spending Breakdown</h3>
      <Pie data={data} options={options} />
    </div>
  );
}

export default CategoryChart;