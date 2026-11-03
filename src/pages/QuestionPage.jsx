import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { _saveQuestionAnswer } from '../../_DATA.js';
import { addQuestionAnswer } from '../features/questions/questionsSlice';
import { addUserAnswer } from '../features/users/usersSlice';

function QuestionPage(){
    const dispatch = useDispatch();
    const {question_id} = useParams();
    const [selectedOption, setSelectedOption] = useState('');

    const question = useSelector(
        (state)=> state.questions[question_id]
    );

    const users = useSelector((state)=> state.users);

    const authedUser = useSelector(
        (state) => state.auth.authedUser
    );

    if (!question) {
        return <p>Question not found.</p>;
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
            <div>
                <h1>Poll by {author.name}</h1>
                <h2>Would You Rather</h2>

                <div>
                    <h3>{question.optionOne.text}</h3>
                    <p>{optionOneVotes} {optionOneVotes === 1 ? 'vote' : 'votes'}</p>
                    <p>{optionOnePercentage.toFixed(1)}%</p>
                    <progress
                        value={optionOnePercentage}
                        max="100"
                        />
                    {hasAnswered === 'optionOne' && (
                        <p>Your vote</p>
                    )}
                </div>

                <p>OR</p>

                <div>
                    <h3>{question.optionTwo.text}</h3>
                    <p>{optionTwoVotes} {optionTwoVotes === 1 ? 'vote' : 'votes'}</p>
                    <p>{optionTwoPercentage.toFixed(1)}%</p>
                    <progress
                        value={optionTwoPercentage}
                        max="100"
                        />
                    {hasAnswered === 'optionTwo' && (
                        <p>Your vote</p>
                    )}
                </div>

                <p>Total votes: {totalVotes}</p>
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
       <div>
           <div>
               <label>
                   <input
                       type="radio"
                       name="pollOption"
                       value="optionOne"
                       checked={selectedOption === 'optionOne'}
                       onChange={(e) => setSelectedOption(e.target.value)}
                   />
                   {question.optionOne.text}
               </label>

               <p>OR</p>

               <label>
                   <input
                       type="radio"
                       name="pollOption"
                       value="optionTwo"
                       checked={selectedOption === 'optionTwo'}
                       onChange={(e) => setSelectedOption(e.target.value)}
                   />
                   {question.optionTwo.text}
               </label>
           </div>

           <button
               onClick={handleVote}
               disabled={!selectedOption}
           >
               Submit Vote
           </button>
       </div>

    );
}

export default QuestionPage;
