import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';

import { logout } from '../features/auth/authSlice';

function HomePage() {
    const [activeTab, setActiveTab] = useState('unanswered');
    const authedUser = useSelector((state)=> state.auth.authedUser);
    const users = useSelector((state)=> state.users);
    const questions = useSelector((state)=> state.questions);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

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
        <div>
            <h1>Employee Polls</h1>

            <button onClick={handleLogout}>Logout</button>

            <div>
                <button onClick={()=> setActiveTab('unanswered')}>
                    Unanswered
                </button>
                <button onClick={()=> setActiveTab('answered')}>
                    Answered
                </button>
            </div>

            <div>
                {displayedQuestions.map((question)=> (
                    <div key={question.id}>
                        <Link to={`/questions/${question.id}`}>
                            <h3>{users[question.author].name}</h3>
                            <p>Would you Rather</p>
                            <p>{question.optionOne.text}</p>
                            <p>OR</p>
                            <p>{question.optionTwo.text}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HomePage;