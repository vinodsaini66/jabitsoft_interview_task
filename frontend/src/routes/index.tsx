import React from 'react';
import { Routes } from 'react-router-dom';
import { Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';
import Layout from '../layouts/guest/Layout';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import Dashboard from '../pages/Dashboard';


const Index: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
  
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
         
        </Route>
       
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default Index;
