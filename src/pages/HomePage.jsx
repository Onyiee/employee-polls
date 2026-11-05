import { useSelector } from "react-redux";
import { useState } from "react";
import { Link } from 'react-router-dom';

function HomePage() {
    const [activeTab, setActiveTab] = useState('unanswered');
    const authedUser = useSelector((state)=> state.auth.authedUser);
    const users = useSelector((state)=> state.users);
    const questions = useSelector((state)=> state.questions);

    const currentUser = users[authedUser];
    if (!currentUser) {
        return <p>Loading user data...</p>;
    }

    const answeredQuestions = Object.values(questions)
        .filter((question)=> currentUser.answers[question.id])
        .sort((a, b)=>b.timestamp - a.timestamp);

    const unansweredQuestions = Object.values(questions)
        .filter((question)=> !currentUser.answers[question.id])
        .sort((a, b)=> b.timestamp - a.timestamp);

    const displayedQuestions =
        activeTab === 'unanswered'
            ? unansweredQuestions
            : answeredQuestions;

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="mx-auto max-w-4xl px-6 py-10">
                <h2 className="mb-6 text-3xl font-bold text-gray-900">
                    Dashboard
                </h2>

                <div className="mb-8 flex border-b border-gray-200">
                    <button
                        onClick={() => setActiveTab('unanswered')}
                        className={`px-5 py-3 text-sm font-semibold transition ${
                            activeTab === 'unanswered'
                                ? 'border-b-2 border-blue-600 text-blue-600'
                                : 'text-gray-500 hover:text-gray-800'
                        }`}
                    >
                        Unanswered ({unansweredQuestions.length})
                    </button>

                    <button
                        onClick={() => setActiveTab('answered')}
                        className={`px-5 py-3 text-sm font-semibold transition ${
                            activeTab === 'answered'
                                ? 'border-b-2 border-blue-600 text-blue-600'
                                : 'text-gray-500 hover:text-gray-800'
                        }`}
                    >
                        Answered ({answeredQuestions.length})
                    </button>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                    {displayedQuestions.map((question) => (
                        <div
                            key={question.id}
                            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                        >
                            <div className="mb-4 flex items-center gap-3">
                                <img
                                    src={users[question.author].avatarURL}
                                    alt={`${users[question.author].name}'s avatar`}
                                    className="h-10 w-10 rounded-full object-cover"
                                />

                                <h3 className="font-semibold text-gray-900">
                                    {users[question.author].name}
                                </h3>
                            </div>

                            <p className="mb-4 text-sm font-medium text-gray-500">
                                Would You Rather
                            </p>

                            <div className="space-y-3">
                                <p className="rounded-lg bg-gray-50 p-3 text-gray-700">
                                    {question.optionOne.text}
                                </p>

                                <p className="text-center text-sm font-semibold text-gray-400">
                                    OR
                                </p>

                                <p className="rounded-lg bg-gray-50 p-3 text-gray-700">
                                    {question.optionTwo.text}
                                </p>
                            </div>

                            <Link
                                to={`/questions/${question.id}`}
                                className="mt-5 inline-block text-sm font-semibold text-blue-600 hover:text-blue-800"
                            >
                                View poll
                            </Link>
                        </div>
                    ))}
                </div>

            </main>
        </div>
    );
}

export default HomePage;