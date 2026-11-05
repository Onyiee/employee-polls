import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { _saveQuestionAnswer } from '../../_DATA.js';
import { addQuestionAnswer } from '../features/questions/questionsSlice.ts';
import { addUserAnswer } from '../features/users/usersSlice';
import { ArrowLeft } from 'lucide-react';
import NotFoundPage from "./NotFoundPage.jsx";

function QuestionPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { question_id } = useParams();
    const [selectedOption, setSelectedOption] = useState('');

    const question = useSelector(
        (state) => state.questions[question_id]
    );

    const users = useSelector((state) => state.users);

    const authedUser = useSelector(
        (state) => state.auth.authedUser
    );

    if (!question) {
        return <NotFoundPage />;
    }

    const currentUser = users[authedUser];

    if (!currentUser) {
        return <p>Loading user data...</p>;
    }

    const author = users[question.author];

    const optionOneVotes = question.optionOne.votes.length;
    const optionTwoVotes = question.optionTwo.votes.length;
    const totalVotes = optionOneVotes + optionTwoVotes;

    const optionOnePercentage =
        totalVotes === 0 ? 0 : (optionOneVotes / totalVotes) * 100;

    const optionTwoPercentage =
        totalVotes === 0 ? 0 : (optionTwoVotes / totalVotes) * 100;

    const hasAnswered = currentUser.answers[question_id];

    if (hasAnswered) {
        return (
            <div className="min-h-screen bg-gray-50 px-4 py-12">
                <button
                    type="button"
                    onClick={() => navigate('/home')}
                    className="mb-8 flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-blue-600"
                >
                    <ArrowLeft size={20} aria-hidden="true" />
                    Back to Dashboard
                </button>
                <div className="mx-auto max-w-2xl rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
                    <div className="mb-8 text-center">
                        <img
                            src={author.avatarURL}
                            alt={`${author.name}'s avatar`}
                            className="mx-auto mb-4 h-16 w-16 rounded-full object-cover"
                        />

                        <h1 className="mb-2 text-3xl font-bold text-gray-900">
                            Poll by {author.name}
                        </h1>

                        <h2 className="text-lg font-medium text-gray-500">
                            Would You Rather
                        </h2>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                        <h3 className="mb-4 text-lg font-semibold text-gray-800">
                            {question.optionOne.text}
                        </h3>

                        <p className="mb-1 text-sm text-gray-600">
                            {optionOneVotes} {optionOneVotes === 1 ? 'vote' : 'votes'}
                        </p>

                        <p className="mb-3 text-sm font-medium text-gray-700">
                            {optionOnePercentage.toFixed(1)}%
                        </p>

                        <progress
                            className="h-3 w-full overflow-hidden rounded-full"
                            value={optionOnePercentage}
                            max="100"
                        />

                        {hasAnswered === 'optionOne' && (
                            <p className="mt-3 text-sm font-semibold text-blue-600">
                                Your vote
                            </p>
                        )}
                    </div>

                    <p className="my-4 text-center font-semibold text-gray-400">
                        OR
                    </p>

                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                        <h3 className="mb-4 text-lg font-semibold text-gray-800">
                            {question.optionTwo.text}
                        </h3>

                        <p className="mb-1 text-sm text-gray-600">
                            {optionTwoVotes} {optionTwoVotes === 1 ? 'vote' : 'votes'}
                        </p>

                        <p className="mb-3 text-sm font-medium text-gray-700">
                            {optionTwoPercentage.toFixed(1)}%
                        </p>

                        <progress
                            className="h-3 w-full overflow-hidden rounded-full"
                            value={optionTwoPercentage}
                            max="100"
                        />

                        {hasAnswered === 'optionTwo' && (
                            <p className="mt-3 text-sm font-semibold text-blue-600">
                                Your vote
                            </p>
                        )}
                    </div>

                    <p className="mt-6 text-center font-semibold text-gray-700">
                        Total votes: {totalVotes}
                    </p>
                </div>
            </div>
        );
    }

    const handleVote = async () => {
        if (!selectedOption) {
            return;
        }

        const answerData = {
            authedUser,
            qid: question_id,
            answer: selectedOption,
        };

        try {
            await _saveQuestionAnswer(answerData);

            dispatch(addQuestionAnswer(answerData));
            dispatch(addUserAnswer(answerData));
        } catch (error) {
            console.error('Failed to submit vote:', error);
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
                    <img
                        src={author.avatarURL}
                        alt={`${author.name}'s avatar`}
                        className="mx-auto mb-4 h-16 w-16 rounded-full object-cover"
                    />

                    <h1 className="mb-2 text-3xl font-bold text-gray-900">
                        Poll by {author.name}
                    </h1>

                    <h2 className="text-lg font-medium text-gray-500">
                        Would You Rather
                    </h2>
                </div>

                <div className="space-y-4">
                    <label
                        className={`flex cursor-pointer items-center gap-4 rounded-xl border p-6 transition ${
                            selectedOption === 'optionOne'
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                        }`}
                    >
                        <input
                            type="radio"
                            name="pollOption"
                            value="optionOne"
                            checked={selectedOption === 'optionOne'}
                            onChange={(e) => setSelectedOption(e.target.value)}
                            className="h-5 w-5 accent-blue-600"
                        />

                        <span className="font-medium text-gray-800">
              {question.optionOne.text}
            </span>
                    </label>

                    <p className="text-center font-semibold text-gray-400">
                        OR
                    </p>

                    <label
                        className={`flex cursor-pointer items-center gap-4 rounded-xl border p-6 transition ${
                            selectedOption === 'optionTwo'
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                        }`}
                    >
                        <input
                            type="radio"
                            name="pollOption"
                            value="optionTwo"
                            checked={selectedOption === 'optionTwo'}
                            onChange={(e) => setSelectedOption(e.target.value)}
                            className="h-5 w-5 accent-blue-600"
                        />

                        <span className="font-medium text-gray-800">
              {question.optionTwo.text}
            </span>
                    </label>
                </div>

                <button
                    onClick={handleVote}
                    disabled={!selectedOption}
                    className="mt-8 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                    Submit Vote
                </button>
            </div>
        </div>
    );
}

export default QuestionPage;
