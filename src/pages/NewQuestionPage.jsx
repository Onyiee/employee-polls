import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { _saveQuestion } from '../../_DATA.js';
import { addQuestion } from '../features/questions/questionsSlice';
import { addUserQuestion } from '../features/users/usersSlice';

function NewQuestionPage() {
    const [optionOne, setOptionOne] = useState('');
    const [optionTwo, setOptionTwo] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const authedUser = useSelector(
        (state) => state.auth.authedUser
    );

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!optionOne.trim() || !optionTwo.trim()){
            return;
        }

        const questionData = {
            optionOneText: optionOne.trim(),
            optionTwoText: optionTwo.trim(),
            author: authedUser,
        };
        try {
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
            console.log('Failed to create poll:', error)
        }
    };

    return (
        <div>
            <h1>Create a New Poll</h1>

            <h2>Would You Rather</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="optionOne">
                        First option
                    </label>
                    <input
                        id="optionOne"
                        type="text"
                        placeholder="Enter the first option"
                        value={optionOne}
                        onChange={(e)=> setOptionOne(e.target.value)}
                    />
                </div>

                <p>OR</p>

                <div>
                    <label htmlFor="optionTwo">
                        Second option
                    </label>
                    <input
                        id="optionTwo"
                        type="text"
                        placeholder="Enter the second option"
                        value={optionTwo}
                        onChange={(e)=> setOptionTwo(e.target.value)}
                    />
                </div>

                <button type="submit">Create Poll</button>
            </form>
        </div>
    )
}

export default NewQuestionPage;