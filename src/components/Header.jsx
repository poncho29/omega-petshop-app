import { useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../context/AuthContext';

import { Container, Button, Navbar, Nav } from 'react-bootstrap';

export const Header = () => {

  const { auth, user, logout } = useContext(AuthContext);

  return (
    <Navbar bg="light" variant="light">
      <Container>        
        <Navbar.Brand>Omega PetShop</Navbar.Brand>
        <Nav className="me-auto">
          <Link to="/" className="text-dark text-decoration-none me-3">Home</Link>
          {/* <Link to="/store" className="text-dark text-decoration-none me-3">Tienda</Link> */}
          {
            auth && user.role ==='ADMIN_ROLE' &&
            <Link to="/admin" className="text-dark text-decoration-none me-3">Admin</Link>
          }      
        </Nav>
        { auth ?
          <div className="d-flex align-items-center gap-2 fs-6">
            <span className='fw-bold'>{ user ? user.name : '' }</span>
            <Button variant="secondary" type="submit" onClick={logout}>
              Cerrar sesión            
            </Button>
          </div> :
          <>
            <Link 
              to="/login"
              className={`text-dark text-decoration-none me-3 ${auth ? 'd-none' : ''}`}
            >
              Login
            </Link>
            <Link 
              to="/register"
              className={`text-dark text-decoration-none ${auth ? 'd-none' : ''}`}
            >
              Registro
            </Link>
          </>
        }
      </Container>
    </Navbar>
  )
}
