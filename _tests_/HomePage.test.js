import {render, fireEvent} from '@testing-library/react';
import {Provider} from "react-redux";
import {MemoryRouter} from "react-router-dom";
import {describe, it, expect} from "@jest/globals";
import {store} from "../src/app/store.js";
import HomePage from "../src/pages/HomePage.jsx";
import { _getUsers, _getQuestions } from '../_DATA.js';
import { setUsers } from '../src/features/users/usersSlice';
import { setQuestions } from '../src/features/questions/questionsSlice.ts';
import {login, logout} from '../src/features/auth/authSlice';

function renderWithProviders(ui){
   return render(
       <Provider store={store}>
           <MemoryRouter>
               {ui}
           </MemoryRouter>
       </Provider>
   )
}

async function setupStore() {
    store.dispatch(logout());
    const users = await _getUsers();
    const questions = await _getQuestions();
    store.dispatch(setUsers(users));
    store.dispatch(setQuestions(questions));
    store.dispatch(login('sarahedo'));
}

describe('HomePage', () => {
   it('should switch between unanswered and answered polls', async ()=>{
       await setupStore();
       const view = renderWithProviders(<HomePage />);
       expect(view.getAllByText('View poll')).toHaveLength(2);
       const answeredTab = view.getByRole('button', {name: 'Answered (4)'});
       fireEvent.click(answeredTab);
       expect(await view.findAllByText('View poll')).toHaveLength(4);
   })
})