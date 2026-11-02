import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";

import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";

function AppRouter(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />

                <Route elemet={<ProtectedRoute/>}>
                    <Route path="/" element={<HomePage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;