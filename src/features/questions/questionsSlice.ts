
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchInitialData } from '../../app/thunks';

interface QuestionOption {
    text: string;
    votes: string[];
}

interface Question {
    id: string;
    author: string;
    timestamp: number;
    optionOne: QuestionOption;
    optionTwo: QuestionOption;
}

type QuestionsState = Record<string, Question>;

type AnswerPayload = {
    qid: string;
    answer: 'optionOne' | 'optionTwo';
    authedUser: string;
};

const initialState: QuestionsState = {};

const questionsSlice = createSlice({
    name: 'questions',
    initialState,

    reducers: {
        setQuestions: (state, action: PayloadAction<QuestionsState>) => {
            return action.payload;
        },

        addQuestion: (state, action: PayloadAction<Question>) => {
            const question = action.payload;
            state[question.id] = question;
        },

        addQuestionAnswer: (state, action: PayloadAction<AnswerPayload>) => {
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
