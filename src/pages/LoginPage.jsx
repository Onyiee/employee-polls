import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";
import { login } from '../features/auth/authSlice';

function LoginPage() {
    const authedUser = useSelector((state) => state.auth.authedUser);
    const dispatch = useDispatch();

    const users = useSelector((state)=> state.users);

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
        return <Navigate to="/home" replace />;
    }

    return (
        <div>
            <h1>Employee Polls</h1>
            <h2>Log In</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>

                    <select
                    id="username"
                    value={selectedUser}
                    onChange={(e)=> setSelectedUser(e.target.value)}
                    required
                    >
                        <option value="">Select a user</option>
                        {Object.values(users).map((user)=> (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="password">Password</label>

                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        required
                    />
                </div>

                {error && <p>{error}</p>}
                <button type="submit">Log In</button>
            </form>
        </div>
    );
}

export default LoginPage;