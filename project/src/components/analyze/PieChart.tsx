import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  data: { [key: string]: number };
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const chartData = {
    labels: ["Happy", "Neutral", "Unhappy"],
    datasets: [
      {
        label: "Sentiment Distribution",
        data: [data.Happy, data.Neutral, data.Unhappy],
        backgroundColor: ["#4CAF50", "#FFC107", "#F44336"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
      },
    },
  };

  return (
    <div
      className="mx-auto"
      style={{
        width: "400px", // Adjust the width here
        height: "400px", // Adjust the height here
      }}
    >
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
};

export default PieChart;