import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute() {
    const authedUser = useSelector((state)=> state.auth.authedUser);

    return authedUser ? <Outlet/> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;