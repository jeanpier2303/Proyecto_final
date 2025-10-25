import axios from "axios";
import { API_URL } from "../config";

const getAuthHeader = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    // si tu backend devuelve token: user.token
    if (user && user.token) {
      return { Authorization: `Bearer ${user.token}` };
    }
  } catch (e) { /* ignore */ }
  return {};
};

const adminService = {
  // estadísticas generales
  getStats: async () => {
    const res = await axios.get(`${API_URL}/admin/stats`, {
      headers: getAuthHeader(),
    });
    return res.data; // { salesTotal, ordersCount, usersActive, productsCount }
  },

  // pedidos recientes (limit opcional)
  getRecentOrders: async (limit = 10) => {
    const res = await axios.get(`${API_URL}/orders?limit=${limit}`, {
      headers: getAuthHeader(),
    });
    return res.data; // { orders: [...] } o [...]
  },

  // datos para gráfico de ventas
  getSalesChart: async (range = 7) => {
    const res = await axios.get(`${API_URL}/admin/sales?range=${range}`, {
      headers: getAuthHeader(),
    });
    return res.data; // { labels: [...], data: [...] }
  },

  // categorías (para donut)
  getCategories: async () => {
    const res = await axios.get(`${API_URL}/admin/categories`, {
      headers: getAuthHeader(),
    });
    return res.data; // { labels: [...], data: [...] }
  },
};

export default adminService;
