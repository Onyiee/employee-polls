import { createSlice } from '@reduxjs/toolkit';

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
});

export const {
    setQuestions,
    addQuestion,
    addQuestionAnswer,
} = questionsSlice.actions;

export default questionsSlice.reducer;