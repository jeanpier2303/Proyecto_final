import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import "../../assets/styles/admin.css";

const ChartCard = ({ type, title, chartData }) => {
  const canvasRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (!canvasRef.current || !chartData?.labels?.length) return;

    if (chartInstance) chartInstance.destroy();

    const newChart = new Chart(canvasRef.current, {
      type,
      data: chartData,
      options: {
        plugins: {
          legend: { position: "bottom" },
        },
        maintainAspectRatio: false,
        responsive: true,
      },
    });

    setChartInstance(newChart);
  }, [chartData]);

  return (
    <div className="chart-card">
      <div className="chart-header">
        <div className="chart-title">{title}</div>
      </div>
      {!chartData?.labels?.length ? (
        <p style={{ textAlign: "center", padding: "30px" }}>
          No hay datos disponibles
        </p>
      ) : (
        <div className="chart-container">
          <canvas ref={canvasRef}></canvas>
        </div>
      )}
    </div>
  );
};

export default ChartCard;
