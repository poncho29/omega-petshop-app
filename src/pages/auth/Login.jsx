import { useContext, useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

import Instance from '../../axios';
import AuthContext from '../../context/AuthContext';

import {Container, Row, Col, Button, Form, Spinner } from 'react-bootstrap';

export const Login = () => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const { auth, login } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Correo electronico invalido').required('Required'),
      password: Yup.string().min(6, 'Debe tener minimo 6 caracteres').required('Required'),
    }),
    onSubmit: values => {
      setErrors(false);
      onSubmitForm(values);
    },
  });

  const onSubmitForm = async(data) => {
    try {
      setLoading(true);
      const response = await Instance.post('/auth/login', data);
      const auth = response.data;
      login(auth);
      setLoading(false);
     } catch (error) {
      console.log(error);
      let errorMsg = error.response.data.msg || 'Error al iniciar sesión';
      setErrors(errorMsg);
      setLoading(false);
    }
  }

  // Si esta loggueado lo saca del login
  useEffect(() => {
    if (auth) {
      navigate('/');
    }
  }, [auth, navigate]);

  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <Col lg={6}>
          <h2 className="text-center mt-5">Bienvenido a Omega PetShop</h2>
          <Form className="mt-5" onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Correo electronico</Form.Label>
              <Form.Control 
                type="email"
                className="mb-2"
                placeholder="ejemplo@correo.com"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.touched.email && formik.errors.email ? (
                <div style={{ color: 'red', fontSize: '12px', fontWeight: 'bold' }}>{formik.errors.email}</div>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                className="mb-2"
                placeholder="Ingresa tu contraseña"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.touched.password && formik.errors.password ? (
                <div style={{ color: 'red', fontSize: '12px', fontWeight: 'bold' }}>{formik.errors.password}</div>
              ) : null}
            </Form.Group>

            { errors &&
              <div className='text-danger fs-6 fw-bold mb-2'>
                {errors}
              </div>
            }

            <Button className='d-flex align-items-center gap-2'  variant="primary" type="submit">
              Enviar
              <Spinner className={!loading ? 'd-none' : ''} animation="border" role="status" size="sm">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
};
