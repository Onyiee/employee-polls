import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action) => {
            return action.payload;
        },

        addUserQuestion: (state, action) => {
            const { author, qid } = action.payload;

            state[author].questions.push(qid);
        },

        addUserAnswer: (state, action) => {
            const { authedUser, qid, answer } = action.payload;

            state[authedUser].answers[qid] = answer;
        },
    },
});

export const {
    setUsers,
    addUserQuestion,
    addUserAnswer,
} = usersSlice.actions;

export default usersSlice.reducer;