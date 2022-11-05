import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Header } from '../components';
import { Home, Store } from '../pages';
import { Login, Register } from '../pages/auth';
import { Admin, FormProduct } from '../pages/admin';

export const Router = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="store" element={<Store />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="admin" element={<Admin />} />
        <Route path='add-product' element={<FormProduct />}>
          <Route path=":id" element={<FormProduct />} />
        </Route>        
      </Routes>
    </>
  )
}