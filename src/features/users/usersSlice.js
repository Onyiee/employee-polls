import { createSlice } from '@reduxjs/toolkit';
import { fetchInitialData } from '../../app/thunks';

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

    extraReducers: (builder) => {
        builder.addCase(fetchInitialData.fulfilled, (state, action) => {
            return action.payload.users;
        });
    },
});

export const {
    setUsers,
    addUserQuestion,
    addUserAnswer,
} = usersSlice.actions;

export default usersSlice.reducer;