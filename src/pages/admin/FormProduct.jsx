import { useContext, useState, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import Instance from '../../axios';
import { capitalize, popUpSuccess } from '../../utils';
import AuthContext from '../../context/AuthContext';

import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import {Container, Row, Col, Button, Form, Spinner } from 'react-bootstrap';

const DEFAULT_ERROR = 'Error al crear el usuario, intentalo de nuevo';

const initialValues = {
  name: '',
  price: 0,
  quantity: 0,
  description: '',
  category: '',
  role: ''
}

export const FormProduct = () => {
  const { id } = useParams('id');
  const navigate = useNavigate();
  const { auth, user } = useContext(AuthContext);

  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async() => {
      try {
        const { data } = await Instance.get('/categories');
        console.log(data);
        setCategories(data.categories);
      } catch (error) {
        console.log(error)
      }
    }

    getCategories()
  }, []);

  // Si existe un id se agregan los campos al formulario
  useEffect(() => {
    if (id) {
      const getUserById = async() => {
        try {
          const { data } = await Instance.get(`/products/${id}`);
          formik.setValues({
            name: data.name,
            price: data.price,
            quantity: data.quantity,
            description: data.description,
            category: data.category._id,
            role: user.role
          });
        } catch (error) {
          console.log(error);
        }
      }

      getUserById();
    } else {
      formik.setFieldValue('role', user.role);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Si esta loggueado lo saca del login
  useEffect(() => {
    if (!auth) {
      navigate('/');
    }
  }, [auth, navigate]);

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      name: Yup.string().required('El nombre del producto es querido'),
      price: Yup.number().required('El precio es querido'),
      quantity: Yup.number().required('La cantidad es requerida'),
      description: Yup.string().required('La descripción es requerido'),
      category: Yup.string().required('La categoria es requerido'),
    }),
    onSubmit: async (values) => {
      setErrors(false);
      console.log(values);

      try {
        setLoading(true);
        if (id) {
          await Instance.put(`/products/${id}`, values);
          await popUpSuccess('Producto actualizado');  
          navigate('/admin');
        } else {
          await Instance.post('/products', values);
          await popUpSuccess('Producto creado');
          navigate('/admin');
        }
        formik.resetForm();        
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        let errorMsg = error.response.data.errors[0].msg || DEFAULT_ERROR;
        setErrors(errorMsg);
      }
    },
  });

  return (
    <Container>
      <Row className="d-flex justify-content-center mt-5">
          <Col xs={12}>
            <button
              type="button"
              onClick={() => { navigate('/admin') }}
              className="border-0 bg-transparent d-flex align-items-center gap-1 fw-bold" 
            >
              <MdOutlineArrowBackIosNew /> Atras
            </button>
          </Col>
          <Col lg={6}>            
            <h2 className="text-center mt-3">Crear producto</h2>
            <Form className="mt-5" onSubmit={formik.handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre del producto</Form.Label>
                <Form.Control
                  type="text"
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
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  className="mb-2"
                  placeholder="20000"
                  name="price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                />
                {formik.touched.price && formik.errors.price ? (
                  <div className="text-danger fs-6 fw-bold">{formik.errors.price}</div>
                ) : null}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Cantidad</Form.Label>
                <Form.Control 
                  type="number"
                  className="mb-2"
                  placeholder="Ingrese la cantidad del producto"
                  name="quantity"
                  value={formik.values.quantity}
                  onChange={formik.handleChange}
                />
                {formik.touched.quantity && formik.errors.quantity ? (
                  <div className="text-danger fs-6 fw-bold">{formik.errors.quantity}</div>
                ) : null}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control 
                  type="text"
                  className="mb-2"
                  placeholder="Ingrese una descripción"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                />
                {formik.touched.description && formik.errors.description ? (
                  <div className="text-danger fs-6 fw-bold">{formik.errors.description}</div>
                ) : null}
              </Form.Group>

              <Form.Group className="mb-3" >
                <Form.Label>Categoria</Form.Label>
                <Form.Select                
                  name="category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                >
                  <option value="">Seleccione una categoria</option>
                  {
                    categories && categories.map((category) => (
                      <option
                        key={category._id}
                        value={category._id}                      
                      >
                        {capitalize(category.name)}
                      </option>
                    ))
                  }
                </Form.Select>
                {formik.touched.category && formik.errors.category ? (
                  <div className="text-danger fs-6 fw-bold">{formik.errors.category}</div>
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
