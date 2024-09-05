// Imports and configuration 
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import MainLayout from '../layouts/MainLayout';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Profile component.
 * 
 * @returns {JSX.Element} Rendered prfile page component.
 */
const Profile = () => {
    // State to hold user data
    const [user, setUser] = useState(null);

    // Initialize hook for programmatic navigation
    const navigate = useNavigate();

    // Fetch user data on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // GET request to server to retrieve user data
                const response = await axios.get('http://localhost:3001/api/auth/profile', {
                    withCredentials: true // Ensure cookies are sent with request
                });
        
                console.log('User data fetched successfully:', response.data); // Debug confirmation message
                setUser(response.data); // Update state with user data
            } catch (error) {
                console.error('Error fetching user data:', error.response ? error.response.data : error.message);
                toast.error('Failed to fetch user data. Please try again later.');
        
                // Redirect user to login page if unauthorized                
                if (error.response && error.response.status === 401) {
                    navigate('/login');
                }
            }
        };        

        // Fetch user data when component mounts
        fetchUserData();
    }, [navigate]); // Dependency array includes navigate to avoid stale closures

    return (
        <MainLayout>
            <ToastContainer />
            <main className='profile-page-container'>
                
            </main>
        </MainLayout>
    );
};

// Export Profile component across application
export default Profile;
