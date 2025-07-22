import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem('admin'));
  return admin ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
