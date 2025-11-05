import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import "../../assets/styles/admin.css";

const StatsCard = ({ color = "purple", label, endpoint, field, sublabel }) => {
  const [value, setValue] = useState("-");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchStat = async () => {
      if (!endpoint || !field) return;
      try {
        const res = await axios.get(`${API_URL}/admin/${endpoint}`);
        if (!mounted) return;

        let val = res.data[field] ?? "-";

        // Si el campo es de ventas totales, mostrar en formato COP
        if (field === "sales_total") {
          val = new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0,
          }).format(val || 0);
        }

        setValue(val);
      } catch (err) {
        console.error("Error cargando estadísticas:", err);
        setValue("0");
      } finally {
        setLoading(false);
      }
    };
    fetchStat();
    return () => (mounted = false);
  }, [endpoint, field]);

  return (
    <div className="stat-card">
      <div className={`stat-icon ${color}`}>
        <i className={`fas fa-${getIcon(label)}`}></i>
      </div>
      <div className="stat-details">
        <div className="stat-labell">{label}</div>
        <div className="stat-value">
          {loading ? "..." : value}
          {field === "sales_total" && !loading && " COP"}
        </div>
        {sublabel && (
          <div
            className={`stat-change ${
              sublabel.includes("-") ? "negative" : "positive"
            }`}
          >
            {sublabel}
          </div>
        )}
      </div>
    </div>
  );
};

const getIcon = (label) => {
  if (/ventas/i.test(label)) return "dollar-sign";
  if (/pedidos/i.test(label)) return "shopping-bag";
  if (/usuario/i.test(label)) return "users";
  if (/producto/i.test(label)) return "box";
  return "chart-line";
};

export default StatsCard;
