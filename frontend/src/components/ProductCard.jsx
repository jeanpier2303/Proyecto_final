import { Card, Button } from 'react-bootstrap';

export default function ProductCard({ product }) {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Img variant="top" src={product.img || '/placeholder.jpg'} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>Precio: ${product.price}</Card.Text>
        <Button variant="success" className="mt-auto">Agregar al carrito</Button>
      </Card.Body>
    </Card>
  );
}
