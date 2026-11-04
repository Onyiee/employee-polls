import '@testing-library/jest-dom';
import { describe, it, expect } from '@jest/globals';
import { _saveQuestion, _saveQuestionAnswer, _getUsers, _getQuestions } from "../_DATA.js";

describe('_saveQuestion',  ()=>{
    it('should successfully save a question', async ()=>{
        const question = {
            author: 'sarahedo',
            optionOneText: 'Build our new application with Javascript',
            optionTwoText: 'Build our new application with Typescript',
        }
        const result = await _saveQuestion(question);
        expect(result.author).toEqual(question.author);
        expect(result.optionOne.text).toEqual(question.optionOneText);
        expect(result.optionTwo.text).toEqual(question.optionTwoText);
        expect(typeof result.id).toEqual('string');
        expect(typeof result.timestamp).toEqual('number');
        expect(result.optionOne.votes).toEqual([]);
        expect(result.optionTwo.votes).toEqual([]);
    });
    it('should return an error when question details are missing', async ()=> {
        const incompleteQues = {
            optionOneText: 'Build our new application with Javascript',
            optionTwoText: 'Build our new application with Typescript',
        }
         await expect(_saveQuestion(incompleteQues))
             .rejects.toEqual('Please provide optionOneText, optionTwoText, and author');
    })
});

describe('_saveQuestionAnswer',  ()=>{
    it(`should successfully save a user's answer`, async ()=>{
        const newQuestion = await _saveQuestion({
            author: 'sarahedo',
            optionOneText: 'Build our new application with Javascript',
            optionTwoText: 'Build our new application with Typescript',
        })
        const answer = {
            authedUser: 'sarahedo',
            qid: newQuestion.id,
            answer: 'optionOne'
        }
    const result = await _saveQuestionAnswer(answer);
    const users = await _getUsers();
    const questions = await _getQuestions();
    expect(result).toEqual(true);
    expect(users[answer.authedUser].answers[answer.qid]).toEqual('optionOne');
    expect(questions[answer.qid].optionOne.votes).toContain(answer.authedUser);
    })
    it('should return an error when answer details are missing', async ()=>{
        const incompleteAnswer = {
            authedUser: 'sarahedo',
            answer: 'optionOne'
        }
        await expect(_saveQuestionAnswer(incompleteAnswer))
            .rejects.toEqual('Please provide authedUser, qid, and answer');
    })
})