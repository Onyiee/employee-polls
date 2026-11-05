import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach, jest } from '@jest/globals';

import { store } from '../src/app/store';
import NewQuestionPage from '../src/pages/NewQuestionPage';
import { login, logout } from '../src/features/auth/authSlice';
import { setUsers } from '../src/features/users/usersSlice';
import { setQuestions } from '../src/features/questions/questionsSlice.ts';
import { _saveQuestion, _getUsers, _getQuestions } from '../_DATA.js';

jest.mock('../_DATA.js', () => {
    const actual = jest.requireActual('../_DATA.js');

    return {
        ...actual,
        _saveQuestion: jest.fn(),
    };
});


function renderWithProviders(ui) {
    return render(
        <Provider store={store}>
            <MemoryRouter>
                {ui}
            </MemoryRouter>
        </Provider>
    );
}

async function setupStore() {
    store.dispatch(logout());

    const users = await _getUsers();
    const questions = await _getQuestions();

    store.dispatch(setUsers(users));
    store.dispatch(setQuestions(questions));

    store.dispatch(login('sarahedo'));
}

describe('NewQuestionPage', () => {
    beforeEach(async () => {
        await setupStore();
        jest.clearAllMocks();
    });

    it('should render the poll creation form', () => {
        const view = renderWithProviders(<NewQuestionPage />);

        expect(view.getByLabelText('First option')).toBeInTheDocument();
        expect(view.getByLabelText('Second option')).toBeInTheDocument();
        expect(view.getByRole('button', { name: 'Create Poll' })).toBeInTheDocument();
    });

    it('should disable the Create Poll button when the options are empty', () => {
        const view = renderWithProviders(<NewQuestionPage />);

        expect(view.getByRole('button', { name: 'Create Poll' })).toBeDisabled();
    });

    it('should enable the Create Poll button when both options are provided', () => {
        const view = renderWithProviders(<NewQuestionPage />);

        fireEvent.change(view.getByLabelText('First option'), {
            target: { value: 'Use JavaScript' },
        });

        fireEvent.change(view.getByLabelText('Second option'), {
            target: { value: 'Use TypeScript' },
        });

        expect(view.getByRole('button', { name: 'Create Poll' })).toBeEnabled();
    });

    it('should not submit the form when an option contains only whitespace', () => {
        const view = renderWithProviders(<NewQuestionPage />);

        fireEvent.change(view.getByLabelText('First option'), {
            target: { value: '   ' },
        });

        fireEvent.change(view.getByLabelText('Second option'), {
            target: { value: 'Use TypeScript' },
        });

        expect(view.getByRole('button', { name: 'Create Poll' })).toBeDisabled();
    });

    it('should create a poll and update Redux when the form is submitted', async () => {
        const savedQuestion = {
            id: 'new-question-id',
            timestamp: 123456789,
            author: 'sarahedo',
            optionOne: { votes: [], text: 'Use JavaScript' },
            optionTwo: { votes: [], text: 'Use TypeScript' },
        };

        _saveQuestion.mockResolvedValue(savedQuestion);

        const view = renderWithProviders(<NewQuestionPage />);

        fireEvent.change(view.getByLabelText('First option'), {
            target: { value: ' Use JavaScript ' },
        });

        fireEvent.change(view.getByLabelText('Second option'), {
            target: { value: ' Use TypeScript ' },
        });

        fireEvent.click(view.getByRole('button', { name: 'Create Poll' }));

        expect(await view.findByText('Would You Rather')).toBeInTheDocument();

        expect(_saveQuestion).toHaveBeenCalledWith({
            optionOneText: 'Use JavaScript',
            optionTwoText: 'Use TypeScript',
            author: 'sarahedo',
        });

        expect(store.getState().questions[savedQuestion.id]).toEqual(savedQuestion);
        expect(store.getState().users.sarahedo.questions).toContain(savedQuestion.id);
    });
});
