import {Provider} from "react-redux";
import {MemoryRouter} from "react-router-dom";
import LoginPage from '../src/pages/LoginPage';
import {store} from '../src/app/store';
import { describe, it, expect } from '@jest/globals';
import {render, fireEvent} from "@testing-library/react";
import {logout} from "../src/features/auth/authSlice.js";
import { setUsers } from "../src/features/users/usersSlice.js";
import { _getUsers } from "../_DATA.js";


function renderWithProviders(ui){
    return render(
        <Provider store={store}>
            <MemoryRouter>
                {ui}
            </MemoryRouter>
        </Provider>
    )
}

describe('<LoginPage />', () => {
    it('should match the snapshot',  ()=> {
        const view = renderWithProviders(<LoginPage />);

        expect(view.asFragment()).toMatchSnapshot()
    })
    it('should display an error when the user enters an incorrect password',async ()=> {
        store.dispatch(logout());
        const users = await _getUsers();
        store.dispatch(setUsers(users));
        const view = renderWithProviders(<LoginPage />);
        const usernameSelect = view.getByLabelText('Username');
        fireEvent.change(usernameSelect, {target: {value: 'sarahedo'}});
        const passwordInput = view.getByLabelText('Password');
        fireEvent.change(passwordInput, {target: {value: 'wrongpassword'}});
        const loginButton =  view.getByRole('button', {name: 'Log In'});
        fireEvent.submit(loginButton.closest('form'));
        expect(view.getByText('Invalid username or password')).toBeInTheDocument();
    })
    it('should successfully log in with valid credentials', async ()=> {
        store.dispatch(logout());
        const users = await _getUsers();
        store.dispatch(setUsers(users));
        const view = renderWithProviders(<LoginPage />);
        const usernameSelect = view.getByLabelText('Username');
        fireEvent.change(usernameSelect, {target: {value: 'sarahedo'}});
        const passwordInput = view.getByLabelText('Password');
        fireEvent.change(passwordInput, {target: {value: 'password123'}});
        const loginButton = view.getByRole('button', {name: 'Log In'});
        fireEvent.submit(loginButton.closest('form'));
        expect(store.getState().auth.authedUser).toEqual('sarahedo');
    })
    it('should require a username before submitting the login form', async () => {
        store.dispatch(logout());

        const users = await _getUsers();
        store.dispatch(setUsers(users));

        const view = renderWithProviders(<LoginPage />);

        const usernameSelect = view.getByLabelText('Username');

        expect(usernameSelect).toBeRequired();
    });
    it('should clear the error message when the username changes', async ()=> {
        store.dispatch(logout());
        const users = await _getUsers();
        store.dispatch(setUsers(users));
        const view = renderWithProviders(<LoginPage />);
        const usernameSelect = view.getByLabelText('Username');
        fireEvent.change(usernameSelect, {target: {value: 'sarahedo'}});
        const passwordInput = view.getByLabelText('Password');
        fireEvent.change(passwordInput, {target: {value: 'wrongpassword'}});
        const loginButton = view.getByRole('button', {name: 'Log In'});
        fireEvent.submit(loginButton.closest('form'));
        expect(view.getByText('Invalid username or password'))
            .toBeInTheDocument();
        fireEvent.change(usernameSelect, {
            target: {value: 'tylermcginnis'}
        })
        expect(view.queryByText('Invalid username or password'))
            .not.toBeInTheDocument();
    })

})