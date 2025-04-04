import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ response }) => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  return isAuthenticated && role === 'Admin' ? (
    response
  ) : (
    <Navigate to='/not-authorized' />
  );
};

export default AdminRoute;
