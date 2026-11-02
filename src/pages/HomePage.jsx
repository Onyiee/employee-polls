import { useSelector } from "react-redux";
import { useState } from "react";

function HomePage() {
    const [activeTab, setActiveTab] = useState('unanswered');
    const authedUser = useSelector((state)=> state.auth.authedUser);
    const users = useSelector((state)=> state.users);
    const questions = useSelector((state)=> state.questions);

    const currentUser = users[authedUser];

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
                        <h3>{users[question.author].name}</h3>
                        <p>Would you Rather</p>
                        <p>{question.optionOne.text}</p>
                        <p>OR</p>
                        <p>{question.optionTwo.text}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HomePage;