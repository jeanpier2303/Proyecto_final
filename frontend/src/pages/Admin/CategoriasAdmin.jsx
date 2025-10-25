import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { Table, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";

const CategoriasAdmin = () => {
  const [categories, setCategories] = useState([]);
  const [newCat, setNewCat] = useState("");

  const fetchCategories = async () => {
    const res = await axios.get(`${API_URL}/admin/categories/all`);
    setCategories(res.data);
  };

  const addCategory = async () => {
    if (!newCat.trim()) return;
    await axios.post(`${API_URL}/admin/categories`, { name: newCat });
    setNewCat("");
    fetchCategories();
    Swal.fire("✅ Éxito", "Categoría creada correctamente", "success");
  };

  const deleteCategory = async (id) => {
    await axios.delete(`${API_URL}/admin/categories/${id}`);
    fetchCategories();
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-3">
      <h3>🏷️ Categorías</h3>
      <div className="d-flex gap-2 my-3">
        <Form.Control
          type="text"
          placeholder="Nueva categoría..."
          value={newCat}
          onChange={(e) => setNewCat(e.target.value)}
        />
        <Button onClick={addCategory}>Agregar</Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr><th>ID</th><th>Nombre</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          {categories.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => deleteCategory(c.id)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CategoriasAdmin;
