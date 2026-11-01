import { createAsyncThunk } from '@reduxjs/toolkit';

import { _getUsers, _getQuestions } from "../../_DATA.js";

export const fetchInitialData = createAsyncThunk(
    'app/fetchInitialData',
    async ()=> {
        const [users, questions] = await Promise.all([
            _getUsers(),
            _getQuestions(),
        ]);

        return { users, questions };
    }
)