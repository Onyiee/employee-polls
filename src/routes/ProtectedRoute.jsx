import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute() {
    const location = useLocation();
    const authedUser = useSelector((state)=> state.auth.authedUser);

    return authedUser
        ? <Outlet />
        : <Navigate to="/login" state={{ from: location }} replace />;
}

export default ProtectedRoute;