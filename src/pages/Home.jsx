import React, { useState, useEffect } from 'react';
import Instance from '../axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async() => {
      try {
        const { data } = await Instance.get('/products');
        console.log(data);
        setProducts(data.products);
      } catch (error) {
        console.error(error);
      }
    }

    getProducts();
  }, []);

  return (
    <Container>
      <Row>
        <Col><h1>Productos</h1></Col>
      </Row>
      <Row>
        <ul>
          {
            products.map((product) => (
              <li key={product._id}>{product.name}</li>
            ))
          }
        </ul>
      </Row>
    </Container>
  )
}
