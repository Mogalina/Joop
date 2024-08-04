// Imports and configuration
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import ForgotPasswordPage from './pages/ForgotPassword';
import ResetPasswordPage from './pages/ResetPassword';
import EmailConfirmationPage from './pages/EmailConfirmation';

// Styles
import './index.scss';

/**
 * Main application component.
 * 
 * @returns {JSX.Element} Rendered application component with defined routes.
 */
function App() {
    return (
        <div>
            {/* Define website routes */}
            <BrowserRouter>
                <Routes>
                    <Route
                        path='/' // Home route
                        element={<HomePage />} // Render HomePage component 
                    />
                    <Route
                        path='/login' // Login route
                        element={<LoginPage />} // Render LoginPage component
                    />
                    <Route
                        path='/signup' // Signup route
                        element={<SignupPage />} // Render SignupPage component
                    />
                    <Route
                        path='/forgot-password' // Forgot password route
                        element={<ForgotPasswordPage />} // ForgotPasswordPage component
                    />
                    <Route
                        path='/reset-password' // Reset password route
                        element={<ResetPasswordPage />} // ResetPasswordPage component
                    />
                    <Route
                        path='/email-confirmation' // Email confirmation route
                        element={<EmailConfirmationPage />} // EmailConfirmationPage component
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

// Export main application component across application
export default App;