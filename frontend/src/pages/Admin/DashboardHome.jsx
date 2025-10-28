import React, { useEffect, useState } from "react";
import StatsCard from "../../components/administrativo/StatsCard";
import ChartCard from "../../components/administrativo/ChartCard";
import TablePedidos from "../../components/administrativo/TablePedidos";
import axios from "axios";
import { API_URL } from "../../config";
import "../../assets/styles/admin.css";

const DashboardHome = () => {
  const [stats, setStats] = useState({});
  const [salesData, setSalesData] = useState({ labels: [], datasets: [] });
  const [categoriesData, setCategoriesData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const load = async () => {
      try {
        const [statsRes, salesRes, catRes] = await Promise.all([
          axios.get(`${API_URL}/admin/stats`),
          axios.get(`${API_URL}/admin/sales?range=30`),
          axios.get(`${API_URL}/admin/categories`),
        ]);

        // Estadísticas generales
        // Datos de ventas
        let salesLabels = salesRes.data.labels ?? [];
        let salesValues = salesRes.data.data ?? [];

        // Si no hay ventas en el mes actual, intentar cargar del último mes con registros
        if (salesValues.length === 0) {
          try {
            const lastMonthRes = await axios.get(`${API_URL}/admin/sales?range=30&last_with_sales=true`);
            salesLabels = lastMonthRes.data.labels ?? [];
            salesValues = lastMonthRes.data.data ?? [];
          } catch (err2) {
            console.warn("⚠️ No hay registros de ventas en meses anteriores tampoco.");
          }
        }

        setSalesData({
          labels: salesLabels,
          datasets: [
            {
              label: "Ventas",
              data: salesValues,
              borderColor: "#8B3A9C",
              backgroundColor: "rgba(139,58,156,0.08)",
              fill: true,
              tension: 0.4,
            },
          ],
        });

        // Datos de categorías
        setCategoriesData({
          labels: catRes.data.labels ?? [],
          datasets: [
            {
              data: catRes.data.data ?? [],
              backgroundColor: [
                "#8B3A9C",
                "#FF8C42",
                "#10B981",
                "#3B82F6",
                "#F59E0B",
              ],
            },
          ],
        });
      } catch (err) {
        console.error("Error cargando dashboard:", err);
      }
    };

    load();
  }, []);

  return (
    <div className="dashboard-container">
      {/* Tarjetas de estadísticas */}
      <div className="stats-grid">
        <StatsCard
          color="purple"
          label="Ventas Totales"
          endpoint="stats"
          field="sales_total"
          sublabel="↑ 12.5% vs mes anterior"
        />
        <StatsCard
          color="orange"
          label="Pedidos"
          endpoint="stats"
          field="orders_count"
          sublabel="↑ 8.3% vs mes anterior"
        />
        <StatsCard
          color="green"
          label="Usuarios Activos"
          endpoint="stats"
          field="users_active"
          sublabel="↑ 15.7% vs mes anterior"
        />
        <StatsCard
          color="blue"
          label="Productos"
          endpoint="stats"
          field="products_count"
          sublabel="↓ 2.1% stock bajo"
        />
      </div>

      {/* Gráficos */}
      <div className="charts-section">
        <ChartCard type="line" title="Ventas del Mes" chartData={salesData} />
        <ChartCard type="doughnut" title="Categorías Populares" chartData={categoriesData} />
      </div>

      {/* Tabla de pedidos */}
      <div className="table-section-container">
        <TablePedidos endpoint="orders?limit=10" />
      </div>
    </div>
  );
};

export default DashboardHome;
