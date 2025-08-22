import React, { useState, useEffect } from "react";
import axios from "axios";
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
import { Line } from "react-chartjs-2";
import "./StockChart.css"; // file css riêng

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function StockChart() {
  const [timeFrame, setTimeFrame] = useState("daily");
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://chart.stockscan.io/candle/v3/TSLA/${timeFrame}/NASDAQ`;
        const response = await axios.get(url);
        const data = response.data;

        const labels = data.candles.map((item) => item.date);
        const values = data.candles.map((item) => item.close);

        setChartData({
          labels,
          datasets: [
            {
              label: `TSLA CLOSE (${timeFrame})`,
              data: values,
              borderColor: "#e11d48",
              backgroundColor: "rgba(225,29,72,0.2)",
              tension: 0.3,
              pointRadius: 3,
              pointBackgroundColor: "#be123c",
            },
          ],
        });
      } catch (error) {
        console.error("Lỗi lấy dữ liệu:", error);
      }
    };

    fetchData();
  }, [timeFrame]);

  return (
    <div className="container">
      <header className="header">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg"
          alt="Tesla Logo"
          className="logo"
        />
        <h1 className="title">Tesla Stock Chart</h1>
      </header>

      <div className="button-group">
        {['hourly','daily','weekly','monthly'].map((tf) => (
          <button
            key={tf}
            onClick={() => setTimeFrame(tf)}
            className={`btn ${timeFrame === tf ? "active" : ""}`}
          >
            {tf.charAt(0).toUpperCase() + tf.slice(1)}
          </button>
        ))}
      </div>

      <div className="chart-card">
        {chartData ? (
          <Line
            data={chartData}
            options={{
              responsive: true,
              plugins: { legend: { position: "top" } },
              scales: {
                x: {
                  title: { display: true, text: "Date" },
                },
                y: {
                  title: { display: true, text: "Close ($)" },
                },
              },
            }}
          />
        ) : (
          <p className="loading">Đang tải dữ liệu...</p>
        )}
      </div>
    </div>
  );
}
