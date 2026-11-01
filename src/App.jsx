import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchInitialData } from './app/thunks';

function App() {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users);
  const questions = useSelector((state) => state.questions);

  useEffect(() => {
    dispatch(fetchInitialData());
  }, [dispatch]);

  if (Object.keys(users).length === 0) {
    return <p>Loading application data...</p>;
  }

  return (
      <div>
        <h1>Employee Polls</h1>

        <p>Users loaded: {Object.keys(users).length}</p>

        <p>Questions loaded: {Object.keys(questions).length}</p>
      </div>
  );
}

export default App;