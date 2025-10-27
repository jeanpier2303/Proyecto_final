import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import "../../assets/styles/admin.css";

const TablePedidos = ({ endpoint = "orders" }) => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async (pageNum = 1) => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/admin/${endpoint}?page=${pageNum}&limit=10`);

      // ✅ Extrae correctamente la lista de pedidos
      const data = res.data?.data || [];

      setOrders(data);
      setPage(res.data?.page || 1);
      setTotalPages(res.data?.total_pages || 1);
    } catch (err) {
      console.error("❌ Error cargando pedidos:", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(page);
  }, [endpoint, page]);

  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  return (
    <div className="table-section">
      <div className="table-header d-flex justify-content-between align-items-center mb-3">
        <div className="table-title">Pedidos Recientes</div>
        <div className="table-actions">
          <button className="btn btn-outline">
            <i className="fas fa-filter"></i> Filtrar
          </button>
          <button className="btn btn-primary">
            <i className="fas fa-download"></i> Exportar
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center" style={{ padding: "20px" }}>
          Cargando pedidos...
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center" style={{ padding: "20px" }}>
                  No hay pedidos
                </td>
              </tr>
            ) : (
              orders.map((o, index) => (
                <tr key={o.id}>
                  <td><strong>{(page - 1) * 10 + index + 1}</strong></td>
                  <td>{o.customer}</td>
                  <td>{o.date}</td>
                  <td><strong>${o.total}</strong></td>
                  <td>
                    <span className={`status-badge ${getStatusClass(o.status)}`}>
                      {o.status}
                    </span>
                  </td>
                  <td>
                    <button className="action-btn" title="Ver">
                      <i className="fas fa-eye"></i>
                    </button>
                    <button className="action-btn" title="Editar">
                      <i className="fas fa-edit"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      {/* 🔹 Paginación */}
      <div
        className="pagination-controls d-flex justify-content-center align-items-center mt-3"
        style={{ gap: "10px" }}
      >
        <button
          className="btn btn-outline"
          disabled={page <= 1}
          onClick={handlePrevPage}
        >
          <i className="fas fa-chevron-left"></i> Anterior
        </button>

        <span>
          Página <strong>{page}</strong> de <strong>{totalPages}</strong>
        </span>

        <button
          className="btn btn-outline"
          disabled={page >= totalPages}
          onClick={handleNextPage}
        >
          Siguiente <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

// 🔹 Estilos visuales de los estados
const getStatusClass = (s) => {
  if (!s) return "";
  const st = s.toString().toLowerCase();
  if (st.includes("cancel")) return "status-cancelled";
  if (st.includes("proc") || st.includes("proceso")) return "status-processing";
  if (st.includes("pend")) return "status-pending";
  if (st.includes("entreg") || st.includes("completed"))
    return "status-completed";
  return "";
};

export default TablePedidos;
