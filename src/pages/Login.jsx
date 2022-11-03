import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import {Container, Row, Col, Button, Form } from 'react-bootstrap';
import Instance from '../axios';

export const Login = () => {
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
      //alert(JSON.stringify(values, null, 2));
      console.log(values);
      onSubmitForm(values);
    },
  });

  const onSubmitForm = async(data) => {
    try {
      const response = await Instance.post('/auth/login', data);
      const token = response.data.token;
      localStorage.setItem('x-token', token);
      console.log(response.data);
     } catch (error) {
      console.log(error);
    }
  }

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

            <Button variant="primary" type="submit">
              Enviar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
};
