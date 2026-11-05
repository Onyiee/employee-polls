import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import { _saveQuestion } from '../../_DATA.js';
import { addQuestion } from '../features/questions/questionsSlice.ts';
import { addUserQuestion } from '../features/users/usersSlice';

function NewQuestionPage() {
    const [optionOne, setOptionOne] = useState('');
    const [optionTwo, setOptionTwo] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const authedUser = useSelector(
        (state) => state.auth.authedUser
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!optionOne.trim() || !optionTwo.trim()) {
            setError('Please provide both poll options.');
            return;
        }

        const questionData = {
            optionOneText: optionOne.trim(),
            optionTwoText: optionTwo.trim(),
            author: authedUser,
        };

        try {
            setIsSubmitting(true);

            const savedQuestion = await _saveQuestion(questionData);

            dispatch(addQuestion(savedQuestion));

            dispatch(
                addUserQuestion({
                    author: authedUser,
                    qid: savedQuestion.id,
                })
            );

            navigate(`/questions/${savedQuestion.id}`);
        } catch (error) {
            console.error('Failed to create poll:', error);
            setError('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-12">
            <div className="mx-auto max-w-2xl rounded-xl border border-gray-200 bg-white p-8 shadow-sm">

                <button
                    type="button"
                    onClick={() => navigate('/home')}
                    className="mb-8 flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-blue-600"
                >
                    <ArrowLeft size={20} aria-hidden="true" />
                    Back to Dashboard
                </button>

                <div className="mb-8 text-center">
                    <h1 className="mb-3 text-3xl font-bold text-gray-900">
                        Create a New Poll
                    </h1>

                    <h2 className="text-lg font-medium text-gray-500">
                        Would You Rather
                    </h2>

                    <p className="mt-2 text-sm text-gray-400">
                        Create a question for your colleagues to answer.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    <div>
                        <label
                            htmlFor="optionOne"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            First option
                        </label>

                        <input
                            id="optionOne"
                            type="text"
                            placeholder="Enter the first option"
                            value={optionOne}
                            onChange={(e) => setOptionOne(e.target.value)}
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    <p className="text-center font-semibold text-gray-400">
                        OR
                    </p>

                    <div>
                        <label
                            htmlFor="optionTwo"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Second option
                        </label>

                        <input
                            id="optionTwo"
                            type="text"
                            placeholder="Enter the second option"
                            value={optionTwo}
                            onChange={(e) => setOptionTwo(e.target.value)}
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    {error && (
                        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting || !optionOne.trim() || !optionTwo.trim()}
                        className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                    >
                        {isSubmitting ? 'Creating Poll...' : 'Create Poll'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default NewQuestionPage;
