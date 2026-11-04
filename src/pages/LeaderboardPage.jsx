import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function LeaderboardPage() {
    const navigate = useNavigate();
    const users = useSelector((state)=> state.users);

    const leaderboard = Object.values(users)
        .map((user)=> {
            const questionsAsked = user.questions.length;
            const questionsAnswered = Object.keys(user.answers).length;

            return {
                ...user,
                questionsAsked,
                questionsAnswered,
                totalScore: questionsAsked + questionsAnswered,
            };
        })
        .sort((a,b)=> b.totalScore - a.totalScore);

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-10">
            <div className="mx-auto max-w-3xl">

                <button
                    type="button"
                    onClick={() => navigate('/home')}
                    className="mb-8 flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-blue-600"
                >
                    <ArrowLeft size={20} aria-hidden="true" />
                    Back to Dashboard
                </button>

                <h1 className="mb-8 text-center text-4xl font-bold text-gray-900">
                    Leaderboard
                </h1>
                {leaderboard.map((user, index) => (
                    <div
                        key={user.id}
                        className="mb-4 flex items-center gap-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
                    >
                        <span className="text-2xl font-bold text-gray-400">
                          {index + 1}
                        </span>

                        <img
                            src={user.avatarURL}
                            alt={`${user.name}'s avatar`}
                            className="h-16 w-16 rounded-full object-cover"
                        />

                        <div className="flex-1">
                            <h2 className="text-lg font-semibold text-gray-900">
                                {user.name}
                            </h2>

                            <p className="text-sm text-gray-500">
                                Questions Asked: {user.questionsAsked}
                            </p>

                            <p className="text-sm text-gray-500">
                                Questions Answered: {user.questionsAnswered}
                            </p>
                        </div>

                        <div className="text-right">
                            <p className="text-2xl font-bold text-blue-600">
                                {user.totalScore}
                            </p>
                            <p className="text-xs text-gray-500">Points</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LeaderboardPage;