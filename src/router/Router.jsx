import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Home } from '../pages/Home';
import { Store } from '../pages/Store';
import { Header } from '../components/Header';
import { Login } from '../pages/Login';

export const Router = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="store" element={<Store />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </>
  )
}