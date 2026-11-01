import { createSlice } from '@reduxjs/toolkit';
import { fetchInitialData } from '../../app/thunks';

const initialState = {};

const questionsSlice = createSlice({
    name: 'questions',
    initialState,

    reducers: {
        setQuestions: (state, action) => {
            return action.payload;
        },

        addQuestion: (state, action) => {
            const question = action.payload;
            state[question.id] = question;
        },

        addQuestionAnswer: (state, action) => {
            const { qid, answer, authedUser } = action.payload;

            state[qid][answer].votes.push(authedUser);
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchInitialData.fulfilled, (state, action) => {
            return action.payload.questions;
        });
    },
});

export const {
    setQuestions,
    addQuestion,
    addQuestionAnswer,
} = questionsSlice.actions;

export default questionsSlice.reducer;