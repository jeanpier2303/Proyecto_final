import { Row, Col } from 'react-bootstrap';
import ProductCard from '../../components/ProductCard';

export default function Home() {
  // Temporalmente creamos productos falsos (mock)
  const productos = [
    { id: 1, name: 'Jugo de Mango', price: 8000, img: '/mango.jpg' },
    { id: 2, name: 'Jugo de Fresa', price: 8500, img: '/fresa.jpg' },
    { id: 3, name: 'Jugo Verde', price: 9000, img: '/verde.jpg' },
  ];

  return (
    <>
      <h1 className="text-center text-success mb-4">Nuestros Jugos Naturales</h1>
      <Row>
        {productos.map(p => (
          <Col key={p.id} md={4} className="mb-4">
            <ProductCard product={p} />
          </Col>
        ))}
      </Row>
    </>
  );
}
