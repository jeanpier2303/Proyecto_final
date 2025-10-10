import { useParams } from "react-router-dom";

export default function Product() {
  const { id } = useParams(); 

  return (
    <div className="container mt-4">
      <h2>Detalles del producto</h2>
      <p>ID del producto: {id}</p>
    </div>
  );
}
