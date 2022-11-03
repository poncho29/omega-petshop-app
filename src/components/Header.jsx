import React from 'react';

import { Link } from 'react-router-dom';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

export const Header = () => {
  return (
    <Navbar bg="light" variant="light">
      <Container>        
        <Navbar.Brand>Omega PetShop</Navbar.Brand>
        <Nav className="me-auto">
          <Link to="/" style={{color: 'black', textDecoration:'none', marginRight: '10px'}}>Home</Link>
          <Link to="/store" style={{color: 'black', textDecoration:'none', marginRight: '10px'}}>Tienda</Link>
          <Link to="/login" style={{color: 'black', textDecoration:'none'}}>Login</Link>
        </Nav>
      </Container>
    </Navbar>
  )
}
