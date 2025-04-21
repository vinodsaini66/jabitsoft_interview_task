import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute = () => {
  const  token  = localStorage.getItem('token') || '';
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
