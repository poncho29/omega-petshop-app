import { useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../context/AuthContext';

import { Container, Button, Navbar, Nav } from 'react-bootstrap';

export const Header = () => {
  const { auth, logout } = useContext(AuthContext);

  return (
    <Navbar bg="light" variant="light">
      <Container>        
        <Navbar.Brand>Omega PetShop</Navbar.Brand>
        <Nav className="me-auto">
          <Link to="/" style={{color: 'black', textDecoration:'none', marginRight: '10px'}}>Home</Link>
          <Link to="/store" style={{color: 'black', textDecoration:'none', marginRight: '10px'}}>Tienda</Link>
          <Link 
            to="/login"
            className={`text-dark text-decoration-none ${auth ? 'd-none' : ''}`}
          >
            Login
          </Link>
        </Nav>
        { auth &&
          <div className='d-flex align-items-center gap-2'>
            <span className='fw-bold'></span>
            <Button variant="secondary" type="submit" onClick={logout}>
              Cerrar sesión            
            </Button>
          </div>
        }
      </Container>
    </Navbar>
  )
}
