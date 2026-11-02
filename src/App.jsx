import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchInitialData } from './app/thunks';
import AppRouter from "./routes/AppRouter.jsx";

function App() {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchInitialData());
  }, [dispatch]);

  if (Object.keys(users).length === 0) {
    return <p>Loading application data...</p>;
  }

  return (
     <AppRouter/>
  );
}

export default App;