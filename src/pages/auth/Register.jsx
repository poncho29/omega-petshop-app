import { useContext, useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

import Instance from '../../axios';
import { popUpSuccess } from '../../utils';
import AuthContext from '../../context/AuthContext';

import {Container, Row, Col, Button, Form, Spinner } from 'react-bootstrap';

const defaultMsg = 'Error al crear el usuario, intentalo de nuevo';

export const Register = () => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const { auth } = useContext(AuthContext);

  // Si esta loggueado lo saca del login
  useEffect(() => {
    if (auth) {
      navigate('/');
    }
  }, [auth, navigate]);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      cedula: '',
      role: 'USER_ROLE',
      phone: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('El nombre es querido'),
      email: Yup.string().email('Correo electronico invalido').required('El email es querido'),
      cedula: Yup.string().required('La cedula es requerido'),
      phone: Yup.number().min(11, 'Debe tener minimo 11 caracteres'),
      password: Yup.string().min(6, 'Debe tener minimo 6 caracteres').required('La contraseña es requerido'),
    }),
    onSubmit: values => {
      setErrors(false);
      //console.log(values);

      const { phone, ...data } = values;
      const newUser = {
        phone: JSON.stringify(phone),
        ...data
      }
      onSubmitForm(newUser);
    },
  });

  const onSubmitForm = async(data) => {
    try {
      setLoading(true);
      await Instance.post('/users', data);
      formik.resetForm();
      const ok = popUpSuccess('Usuaria creado');;
      if (ok) navigate('/login');      
      setLoading(false);
     } catch (error) {
      let errorMsg = error.response.data.errors[0].msg || defaultMsg;
      setErrors(errorMsg);
      setLoading(false);
    }
  }

  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <Col lg={6}>
          <h2 className="text-center mt-5">Registrate a Omega PetShop</h2>
          <Form className="mt-5" onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre completo</Form.Label>
              <Form.Control
                type="name"
                className="mb-2"
                placeholder="Ingres tú nombre completo"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-danger fs-6 fw-bold">{formik.errors.name}</div>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3">
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
                <div className="text-danger fs-6 fw-bold">{formik.errors.email}</div>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cedula</Form.Label>
              <Form.Control 
                type="cedula"
                className="mb-2"
                placeholder="Ingrese un número de cedula"
                name="cedula"
                value={formik.values.cedula}
                onChange={formik.handleChange}
              />
              {formik.touched.cedula && formik.errors.cedula ? (
                <div className="text-danger fs-6 fw-bold">{formik.errors.cedula}</div>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Número de teléfono</Form.Label>
              <Form.Control 
                type="number"
                className="mb-2"
                placeholder="Ingrese su número de teléfono"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
              />
              {formik.touched.phone && formik.errors.phone ? (
                <div className="text-danger fs-6 fw-bold">{formik.errors.phone}</div>
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
                <div className="text-danger fs-6 fw-bold">{formik.errors.password}</div>
              ) : null}
            </Form.Group>

            { errors &&
              <div className='text-danger fs-6 fw-bold mb-2'>
                {errors}
              </div>
            }

            <Button className='d-flex align-items-center gap-2 px-5 ms-auto'  variant="primary" type="submit">
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
}
