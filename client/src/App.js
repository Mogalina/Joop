// Imports and configuration
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import HomePage from './pages/Home';
import AuthPage from './pages/Auth';

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
                        path='/authentificate'
                        element={<AuthPage />} 
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

// Export main application function
export default App;