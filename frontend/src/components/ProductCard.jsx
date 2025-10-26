/* import React from "react";
import "../assets/styles/Productos.css";

const ProductCard = ({ producto }) => {
  const handleAddToCart = () => {
    // Obtener el carrito actual o inicializar vacío
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Agregar el producto
    cart.push(producto);

    // Guardar el carrito actualizado
    localStorage.setItem("cart", JSON.stringify(cart));

    // 🔹 Notificar al NavPrivate que el carrito fue actualizado
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div className="product-card">
      <img src={producto.imagen} alt={producto.nombre} />
      <h3>{producto.nombre}</h3>
      <p>${producto.precio.toLocaleString()}</p>
      <button className="btn-agregar" onClick={handleAddToCart}>
        Agregar al carrito
      </button>
    </div>
  );
};

export default ProductCard;
 */