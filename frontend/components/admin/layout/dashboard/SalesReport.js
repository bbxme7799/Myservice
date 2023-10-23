import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

// Register Chart.js elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Define chart options
const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Sales Report",
    },
  },
};

const API_BASE_URL = process.env.BACKEND_URL_CSR;

const SalesReport = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/orders/statistic`)
      .then((response) => {
        const data = response.data.data; // Extract data array from the response

        // Extract labels, salesData, and totals from the API data
        const labels = data.map((item) => item.created_at);
        const salesData = data.map((item) => item.count_order_items);
        const totals = data.map((item) => item.total);

        const chartData = {
          labels,
          datasets: [
            {
              label: "Count Order Items",
              data: salesData,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
          ],
        };

        // Set the chart data
        setChartData(chartData);
      })
      .catch((error) => {
        console.error("Error fetching data from the API:", error);
      });
  }, []);

  return (
    <div className="overflow-hidden bg-white border border-gray-200 rounded-xl lg:col-span-8">
      <div className="px-4 pt-5 sm:px-6">
        <div className="flex flex-wrap items-center justify-between">
          <p className="text-base font-bold text-gray-900 lg:order-1">
            Sales Report
          </p>
        </div>

        <div className="lg:col-span-8 chart-container">
          {chartData && <Line options={options} data={chartData} />}
        </div>
      </div>
    </div>
  );
};

export default SalesReport;
