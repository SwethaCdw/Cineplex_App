import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from '../../constants/route-constants';

const ProtectedRoute = ({
  username,
  redirectPath = ROUTES.LOGIN,
  children,
}) => {
  if (!username?.length) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;