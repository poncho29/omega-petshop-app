import { useContext, useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import Instance from '../../axios';
import { capitalize, formatterPeso, popUpDialog, popUpSuccess } from '../../utils';
import AuthContext from '../../context/AuthContext';

import { BiEdit, BiTrash } from 'react-icons/bi';
import {Container, Row, Col, Button, Spinner, Table } from 'react-bootstrap';


export const Admin = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProducts = async() => {
      try {
        setLoading(true);
        const { data } = await Instance.get('/products');
        // console.log(data);
        setProducts(data.products);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    }

    getProducts();
  }, []);

  // Si esta loggueado lo saca del login
  useEffect(() => {
    if (!auth) {
      navigate('/');
    }
  }, [auth, navigate]);

  const deleteProduct = async (id) => {
    const { isConfirmed } = await popUpDialog('Estas seguro?')
    if (!isConfirmed) return;
    
    try {
      await Instance.delete(`/products/${id}`);
      await popUpSuccess('Producto eliminado');
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <Row className="mt-5">
        <Col className="d-flex justify-content-between align-items-center">
          <h2>Productos</h2>
          <Button 
            type="button"
            variant="primary"
            className="rounded-circle fw-bold"
            style={{ width: "35px", height: "35px" }}
            onClick={() => { navigate('/add-product') }}
          >
              +
          </Button>
        </Col>
      </Row>

      <Row className="mt-2">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Descripción</th>
              <th>Categoria</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {
              products && !loading ?
              products.map((product, i) => (
                <tr key={product._id}>
                  <td>{i}</td>
                  <td>{capitalize(product.name)}</td>
                  <td>{formatterPeso.format(product.price)}</td>
                  <td>{product.quantity}</td>
                  <td>{product.description}</td>
                  <td>{product.category.name}</td>
                  <td className="d-flex justify-content-between">
                    <BiEdit size={24} style={{cursor: 'pointer'}} onClick={() => { navigate(`/add-product/${product._id}`) }} />
                    <BiTrash size={24} style={{cursor: 'pointer'}} onClick={() => deleteProduct(product._id)} />
                  </td>
                </tr>
              )) :
              <tr>
                <td className="text-center align-middle" style={{ height: '200px' }} colSpan={7}>
                  <Spinner animation="grow" role="status" size="lg">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </td>
              </tr>
            }            
          </tbody>
        </Table>
      </Row>
    </Container>
  )
}
