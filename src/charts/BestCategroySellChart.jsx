import axios from "axios";
import React, { useEffect, useState } from "react";


import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { base_url } from "../utils/base_url";

ChartJS.register(ArcElement, Tooltip, Legend);

const BestCategroySellChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${base_url}api/user/all-order-admin`); // Replace with your API endpoint for fetching order data
        const orders = response?.data?.order;

        const categoryCounts = orders.reduce((acc, order) => {
          order.products.forEach((item) => {
            const category = item.p_category;

            if (acc[category]) {
              acc[category] += 1;
            } else {
              acc[category] = 1;
            }
          });
          return acc;
        }, {});

        const labels = Object.keys(categoryCounts);
        const data = Object.values(categoryCounts);

        setChartData({
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(211, 84, 88)",
                "rgba(153, 102, 255, 0.6)",
              ],
            },
          ],
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 rounded-md bg-white shadow-md h-full">
      <h2 className="text-2xl font-bold mb-5">Best Sell Category</h2>
      {chartData && <Pie data={chartData} />}
    </div>
  );
};

export default BestCategroySellChart;
