import React, { useState, useEffect } from 'react';
import Instance from '../axios';

import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const urlImg = "https://laika.com.co/cdn-cgi/image/fit=scale-down,width=400,format=auto,quality=80,onerror=redirect/https://laikapp.s3.amazonaws.com/dev_images_products/1450_157685_Pedigree___Alimento_Para_Perro_Adulto_1652114827_500x500.jpg";

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
      <Row className="mt-5">
        <Col><h1 className="text-center mb-0">Nuestros Productos</h1></Col>
      </Row>
      <Row className="mt-5">
          {
            products.map((product) => (
              <Col sm={12} md={6} lg={4} xl={3} className="d-flex justify-content-center" key={product._id} >
                <Card className="w-100 mb-3" style={{ maxWidth: "300px" }}>
                  <Card.Img variant="top" src={urlImg} />
                  <Card.Body>
                    <Card.Title className="fs-6 fw-bold mb-0" style={{ height: '40px' }}>{product.name}</Card.Title>
                    <Card.Text style={{ height: '60px' }}>{product.description}</Card.Text>
                    <Button className="w-100 text-dark fw-bold" style={{ backgroundColor: 'var(--orange)', border: 'none' }}>
                      Ver más
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          }
      </Row>
    </Container>
  )
}
