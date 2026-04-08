import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

function BalanceChart({ transactions }) {
  const data = {
    labels: transactions.map((t) => t.date),
    datasets: [
      {
        label: "Balance Trend",
        data: transactions.map((t) => t.amount),
        fill: true,
        borderColor: "#7c3aed",
        backgroundColor: "rgba(124, 58, 237, 0.18)",
        pointRadius: 4,
        tension: 0.32,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { color: "rgba(148, 163, 184, 0.12)" },
        ticks: { color: "#cbd5e1" },
      },
      y: {
        grid: { color: "rgba(148, 163, 184, 0.12)" },
        ticks: { color: "#cbd5e1" },
      },
    },
  };

  return (
    <div className="chart-box">
      <h3>Balance Trend</h3>
      <Line data={data} options={options} />
    </div>
  );
}

export default BalanceChart;