// Imports and configuration
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import ForgotPasswordPage from './pages/ForgotPassword';
import ResetPasswordPage from './pages/ResetPassword';

// Styles
import './index.scss';

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route
                        path='/'
                        element={<HomePage />} 
                    />
                    <Route
                        path='/login'
                        element={<LoginPage />} 
                    />
                    <Route
                        path='/signup'
                        element={<SignupPage />} 
                    />
                    <Route
                        path='/forgot-password'
                        element={<ForgotPasswordPage />} 
                    />
                    <Route
                        path='/reset-password'
                        element={<ResetPasswordPage />} 
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

// Export main application function
export default App;