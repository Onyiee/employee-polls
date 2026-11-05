import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

function ProtectedLayout() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Outlet />
        </div>
    );
}

export default ProtectedLayout;
