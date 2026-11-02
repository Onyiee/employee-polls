import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchInitialData } from './app/thunks';
import LoginPage from './pages/LoginPage';
import { logout } from './features/auth/authSlice';

function App() {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users);
  const questions = useSelector((state) => state.questions);
  const authedUser = useSelector((state)=> state.auth.authedUser);

  useEffect(() => {
    dispatch(fetchInitialData());
  }, [dispatch]);

  if (Object.keys(users).length === 0) {
    return <p>Loading application data...</p>;
  }

  if(!authedUser){
      return <LoginPage />
  }

  const handleLogout = ()=> {
      dispatch(logout());
  };

  return (
      <div>
        <h1>Welcome, {users[authedUser].name}!</h1>
        <p>Users loaded: {Object.keys(users).length}</p>
        <p>Questions loaded: {Object.keys(questions).length}</p>

        <button onClick={handleLogout}>
            Logout
        </button>
      </div>
  );
}

export default App;