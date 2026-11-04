import {Provider} from "react-redux";
import {MemoryRouter} from "react-router-dom";
import LoginPage from '../src/pages/LoginPage';
import {store} from '../src/app/store';
import { describe, it, expect } from '@jest/globals';
import {render, fireEvent} from "@testing-library/react";

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
    it('should display an error when the user enters an incorrect password',()=> {
        const view = renderWithProviders(<LoginPage />);
        const usernameSelect = view.getByLabelText('Username');
        fireEvent.change(usernameSelect, {target: {value: 'sarahedo'}})
        const passwordInput = view.getByLabelText('Password')
        fireEvent.change(passwordInput, {target: {value: 'wrongpassword'}})
        const loginButton =  view.getByRole('button', {name: 'Log In'})
        fireEvent.submit(loginButton.closest('form'));
        expect(view.getByText('Invalid username or password')).toBeInTheDocument()
    })
})