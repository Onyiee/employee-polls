import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { login } from '../features/auth/authSlice';

function LoginPage() {
    const location = useLocation();
    const from = location.state?.from || '/home';
    const authedUser = useSelector((state) => state.auth.authedUser);
    const dispatch = useDispatch();

    const users = useSelector((state) => state.users);

    const [selectedUser, setSelectedUser] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = users[selectedUser];

        if (!user || user.password !== password) {
            setError('Invalid username or password');
            return;
        }

        dispatch(login(selectedUser));
    };

    if (authedUser) {
        return <Navigate to={from} replace />;
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
            <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 shadow-sm">

                <div className="mb-8 text-center">
                    <h1 className="mb-2 text-3xl font-bold text-gray-900">
                        Employee Polls
                    </h1>

                    <p className="text-gray-500">
                        Log in to continue
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label
                            htmlFor="username"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Username
                        </label>

                        <select
                            id="username"
                            value={selectedUser}
                            onChange={(e) => {
                                setSelectedUser(e.target.value);
                                setPassword('');
                                setError('');
                            }}
                            required
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        >
                            <option value="">Select a user</option>

                            {Object.values(users).map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {selectedUser && (
                        <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                            <img
                                src={users[selectedUser].avatarURL}
                                alt={`${users[selectedUser].name}'s avatar`}
                                className="h-12 w-12 rounded-full object-cover"
                            />

                            <span className="font-medium text-gray-800">
                {users[selectedUser].name}
              </span>
                        </div>
                    )}

                    <div>
                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            placeholder="Enter your password"
                        />
                    </div>

                    {error && (
                        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
