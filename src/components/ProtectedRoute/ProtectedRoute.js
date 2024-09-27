import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from '../../constants/route-constants';
import { getUsername } from '../../utils/login-utils';

const ProtectedRoute = ({
  username = getUsername(),
  redirectPath = ROUTES.LOGIN,
  children,
}) => {
  if (!username?.length) {
    return <Navigate to={redirectPath} replace />;
  } 
  return children ? children : <Outlet />;
};

export default ProtectedRoute;