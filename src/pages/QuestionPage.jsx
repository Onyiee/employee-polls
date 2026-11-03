import { useParams } from 'react-router-dom';
import {useSelector} from "react-redux";

function QuestionPage(){
    const {question_id} = useParams();

    const question = useSelector(
        (state)=> state.questions[question_id]
    );

    const users = useSelector((state)=> state.users);

    if(!question){
        return <p>Question not found.</p>
    }

    const author = users[question.author];

    return (
        <div>
            <h1>Poll by {author.name}</h1>
            <h2>Would you Rather</h2>

            <p>{question.optionOne.text}</p>
            <p>OR</p>
            <p>{question.optionTwo.text}</p>
        </div>
    );
}

export default QuestionPage;
