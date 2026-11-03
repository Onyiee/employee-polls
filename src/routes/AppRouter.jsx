import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import QuestionPage from '../pages/QuestionPage';
import ProtectedRoute from './ProtectedRoute';
import NewQuestionPage from "../pages/NewQuestionPage.jsx";

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />

                <Route element={<ProtectedRoute />}>
                    <Route path="/home" element={<HomePage />} />
                    <Route
                        path="/questions/:question_id"
                        element={<QuestionPage />}
                    />
                    <Route path="/add" element={<NewQuestionPage/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;