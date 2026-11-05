import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import { logout } from '../features/auth/authSlice';

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <nav className="border-b border-gray-200 bg-white">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                <Link to="/home" className="text-2xl font-bold text-gray-900">
                    Employee Polls
                </Link>

                <div className="flex items-center gap-6">
                    <Link
                        to="/add"
                        className="text-sm font-medium text-gray-600 hover:text-blue-600"
                    >
                        Create New Poll
                    </Link>

                    <Link
                        to="/leaderboard"
                        className="text-sm font-medium text-gray-600 hover:text-blue-600"
                    >
                        Leaderboard
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;