// Imports and configuration 
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import MainLayout from '../layouts/MainLayout';

// Styles
import '../styles/pages/profile.scss';
import 'react-toastify/dist/ReactToastify.css';

// Images
import AddIcon from '../assets/images/pngs/add.png';
import StarIcon from '../assets/images/pngs/star.png';
import Sort from '../assets/images/pngs/sort.png';
import CloseIcon from '../assets/images/svgs/remove.svg';
import UpIcon from '../assets/images/pngs/up.png';
import DownIcon from '../assets/images/pngs/down.png';
import NoneIcon from '../assets/images/pngs/none.png';

// Interfaces
import Goal from '../interfaces/GenericGoal';

/**
 * Profile component.
 * 
 * @returns {JSX.Element} Rendered profile page component.
 */
const Profile = () => {
    // Set document title for current page
    document.title = 'Joop | Your profile';

    // State to hold user data
    const [user, setUser] = useState(null);

    // State to handle showing all or limited goals
    const [showAllGoals, setShowAllGoals] = useState(false);

    // State to handle goals filter option pop-up screen
    const [displayFilters, setDisplayFilters] = useState(false);

    // State to track whether screen width is less than 425px
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

    // Initialize hook for programmatic navigation
    const navigate = useNavigate();

    // Sort and filter states
    const [sortByName, setSortByName] = useState('none');
    const [sortByTime, setSortByTime] = useState('none');
    const [minDays, setMinDays] = useState('');
    const [maxDays, setMaxDays] = useState('');

    // Applied filters state (used when 'Show filters' is clicked)
    const [appliedFilters, setAppliedFilters] = useState({
        sortByName: 'none',
        sortByTime: 'none',
        minDays: '',
        maxDays: ''
    });

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
                    toast.warning('You need to login to your account.');
                    navigate('/login');
                }
            }
        };        

        // Fetch user data when component mounts
        fetchUserData();

        // Listen for window resize events and update screen width state
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize); // Add event listener for resizing

        // Clean up event listener on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [navigate]); // Dependency array includes navigate to avoid stale closures

    // Sample goals data for rendering purposes
    const goalsData = [
        { name: 'Quit Smoking', time: '159 D' },
        { name: 'Eat Healthy Food', time: '17 D' },
        { name: 'Stop Drinking Alcohol', time: '6 D' },
        { name: 'Exercise Regularly Every Day for Better Health', time: '1398 D' },
        { name: 'Read Books', time: '5 D' },
        { name: 'Meditation', time: '8 D' },
        { name: 'Sleep Early', time: '12 D' }
    ];

    // Function to toggle view between top 4 goals and all goals
    const handleViewAllGoals = () => {
        setShowAllGoals(!showAllGoals);
    };

    // Function to toggle pop-up window for goals filter
    const handleDisplayFilters = () => {
        setDisplayFilters(!displayFilters); 
    };

    // Function to toogle goals based on selected filter options
    const handleApplyFilters = () => {
        setAppliedFilters({
            sortByName,
            sortByTime,
            minDays,
            maxDays
        });
        setDisplayFilters(false); // Close the filter panel
    };

    // Sorting logic
    const sortGoals = (goals) => {
        let sortedGoals = [...goals];
        const { sortByName, sortByTime } = appliedFilters;

        if (sortByName !== 'none') {
            sortedGoals.sort((a, b) => {
                if (sortByName === 'asc') {
                    return a.name.localeCompare(b.name); // Sort alphabetically
                }
                if (sortByName === 'desc') {
                    return b.name.localeCompare(a.name); // Sort reverse-alphabetically
                }
                return 0;
            });
        }

        if (sortByTime !== 'none') {
            sortedGoals.sort((a, b) => {
                const aTime = parseInt(a.time.split(' ')[0], 10); // Extract number of days
                const bTime = parseInt(b.time.split(' ')[0], 10);
                if (sortByTime === 'asc') return aTime - bTime; // Sort by ascending days
                if (sortByTime === 'desc') return bTime - aTime; // Sort by descending days
                return 0;
            });
        }

        return sortedGoals;
    };

    // Filtering logic
    const filterGoals = (goals) => {
        const { minDays, maxDays } = appliedFilters;
        return goals.filter((goal) => {
            const goalDays = parseInt(goal.time.split(' ')[0], 10); // Extract days as a number
            const min = minDays ? parseInt(minDays, 10) : 0;
            const max = maxDays ? parseInt(maxDays, 10) : Infinity;

            return goalDays >= min && goalDays <= max;
        });
    };

    // Apply sorting and filtering after 'Show filters' is clicked
    let filteredGoals = filterGoals(goalsData);
    filteredGoals = sortGoals(filteredGoals);

    // Logic to decide how many goals to display 
    const displayedGoals = showAllGoals ? filteredGoals : filteredGoals.slice(0, 4); // Display all or the first 4 if more

    // Utility function to truncate goal name based on screen width and characters length of goal title
    const truncateGoalName = (name) => {
        if (isSmallScreen && name.length > 20) {
            return `${name.slice(0, 19)}...`; // Truncate if screen is small and name is too long
        } else if (name.length > 37) {
            return `${name.slice(0, 36)}...`; // Truncate if characters length of goal title is too long
        }
        return name; // Return full name if not truncating
    };

    // Render profile component
    return (
        <MainLayout>
            {/* Configure react-toastify container */}
            <ToastContainer 
                position="top-center"  
                autoClose={5000}  
                hideProgressBar={false} 
                closeOnClick 
                pauseOnHover  
                draggable 
                theme="light" 
                transition={Bounce} 
            />
            
            {/* Main content of the profile page */}
            <main className='profile-page-container' style={{ opacity: displayFilters ? '0.1' : '1.0' }}>
                {/* Section containing user's profile information */}
                <section className='profile-info'>
                    {/* Profile picture container */}
                    <div className='profile-picture' />

                    {/* Background behind the profile picture */}
                    <div className='profile-background' />

                    {/* Display the user's name; show 'Loading...' if user data is still being fetched */}
                    <p className='profile-name'>{user ? user.username : 'N / A'}</p>
                </section>

                {/* Container for goals section */}
                <section className='goals-container'>
                    {/* Controls for managing goals such as adding, sorting, and filtering */}
                    <div className='goals-controller'>
                        <p className='title'>Personal Goals</p>  {/* Goals section title */}
                        
                        {/* Goal management options: sorting, filtering, and adding a new goal */}
                        <div className='goals-options'>
                            <img
                                className='sort-icon option-icon'
                                src={Sort}
                                alt='Sort Goals Icon'
                                onClick={handleDisplayFilters}
                            />
                            <img
                                className='option-icon'
                                src={AddIcon}
                                alt='Add New Goal Icon'
                            />
                        </div>
                    </div>

                    {/* Container for displaying individual goals */}
                    <div className='goals-info'>
                        {/* Display message if no goals are available */}
                        {goalsData.length === 0 ? (
                            <p>You have no goals to reach</p>
                        ) : (
                            <>
                                {/* Render each goal, truncated if needed, with its time */}
                                {displayedGoals.map((goal, index) => (
                                    <article className='goal' key={index}>
                                        <img className='goal-star-icon' src={StarIcon} alt='Star Icon' />
                                        <span className='goal-name'>{truncateGoalName(goal.name)}</span>
                                        <span className='goal-time'>{goal.time}</span>
                                    </article>
                                ))}

                                {/* Button to view all goals or collapse the view to top 4 */}
                                <button className='view-all-goals-button' onClick={handleViewAllGoals}>
                                    {showAllGoals ? 'Less' : 'More'}
                                </button>
                            </>
                        )}
                    </div>
                </section>
            </main>

            {/* Section to display pop-up window with filter options for personal goals */}
            <section className='goal-filter-option' style={{ display: displayFilters ? 'inline' : 'none' }}>
                {/* Close button to hide the filter options pop-up */}
                <img 
                    className='close-button-icon'
                    src={CloseIcon}
                    alt='Close Button Icon'
                    onClick={handleDisplayFilters} // Toggle display of filters
                />

                {/* Section for sorting options */}
                <section className='sort-options'>
                    <p className='sort-options-title'>Goal sort options</p>

                    {/* Sorting by goal name options */}
                    <div className='sort-by-name'>
                        <p>Goal name</p>
                        <div className='options-box'>
                            {/* Ascending sort by name */}
                            <div className='option'>
                                <input 
                                    type='radio' 
                                    className='option-btn' 
                                    name='sortByName'
                                    value='asc'
                                    onChange={(e) => setSortByName(e.target.value)} // Update state to 'asc'
                                />
                                <img
                                    className='checkbox-meaning'
                                    src={UpIcon}
                                    alt='Sort Ascending Icon'
                                />
                            </div>
                            {/* Descending sort by name */}
                            <div className='option'>
                                <input 
                                    type='radio' 
                                    className='option-btn' 
                                    name='sortByName'
                                    value='desc'
                                    onChange={(e) => setSortByName(e.target.value)} // Update state to 'desc'
                                />
                                <img
                                    className='checkbox-meaning'
                                    src={DownIcon}
                                    alt='Sort Descending Icon'
                                />
                            </div>
                            {/* No sort for name */}
                            <div className='option'>
                                <input 
                                    type='radio' 
                                    className='option-btn' 
                                    name='sortByName'
                                    value='none'
                                    onChange={(e) => setSortByName(e.target.value)} // Set to 'none'
                                />
                                <img
                                    className='checkbox-meaning'
                                    src={NoneIcon}
                                    alt='No Option Icon'
                                />
                            </div>
                        </div>
                    </div>

                    {/* Sorting by goal duration (days) options */}
                    <div className='sort-by-time'>
                        <p>Goal days</p>
                        <div className='options-box'>
                            {/* Ascending sort by time (days) */}
                            <div className='option'>
                                <input 
                                    type='radio' 
                                    className='option-btn' 
                                    name='sortByTime'
                                    value='asc'
                                    onChange={(e) => setSortByTime(e.target.value)} // Set to 'asc'
                                />
                                <img
                                    className='checkbox-meaning'
                                    src={UpIcon}
                                    alt='Sort Ascending Icon'
                                />
                            </div>
                            {/* Descending sort by time (days) */}
                            <div className='option'>
                                <input 
                                    type='radio' 
                                    className='option-btn' 
                                    name='sortByTime'
                                    value='desc'
                                    onChange={(e) => setSortByTime(e.target.value)} // Set to 'desc'
                                />
                                <img
                                    className='checkbox-meaning'
                                    src={DownIcon}
                                    alt='Sort Descending Icon'
                                />
                            </div>
                            {/* No sort for time (days) */}
                            <div className='option'>
                                <input 
                                    type='radio' 
                                    className='option-btn' 
                                    name='sortByTime'
                                    value='none'
                                    onChange={(e) => setSortByTime(e.target.value)} // Set to 'none'
                                />
                                <img
                                    className='checkbox-meaning'
                                    src={NoneIcon}
                                    alt='No Option Icon'
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section for filter options based on time range */}
                <section className='filter-options'>
                    <p className='filter-options-title'>Goal filter options</p>

                    {/* Filter by goal duration (days) */}
                    <div className='filter-by-time'>
                        <p>Goal days</p>
                        <div className='options-box'>
                            {/* Input for minimum number of days */}
                            <div className='option'>
                                <p>MIN</p>
                                <input 
                                    type='text' 
                                    className='number-input' 
                                    name='min-days'
                                    value={minDays}
                                    onChange={(e) => setMinDays(e.target.value)} // Update state with min days
                                />
                            </div>
                            {/* Input for maximum number of days */}
                            <div className='option'>
                                <input 
                                    type='text' 
                                    className='number-input' 
                                    name='max-days'
                                    value={maxDays}
                                    onChange={(e) => setMaxDays(e.target.value)} // Update state with max days
                                />
                                <p>MAX</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Buttons to apply or remove filters */}
                <div className='apply-options-buttons'>
                    {/* Button to apply the selected filters */}
                    <button className='view-filtered-goals-button' onClick={handleApplyFilters}>
                        Show filters
                    </button>
                    {/* Button to reset filters and sorting */}
                    <button className='remove-filters-button' onClick={() => {
                        setSortByName('none');   // Reset sorting by name
                        setSortByTime('none');   // Reset sorting by time
                        setMinDays('');          // Clear min days filter
                        setMaxDays('');          // Clear max days filter
                        setAppliedFilters({      // Reset the applied filters state
                            sortByName: 'none',
                            sortByTime: 'none',
                            minDays: '',
                            maxDays: ''
                        });
                    }}>
                        Remove filters
                    </button>
                </div>
            </section>
        </MainLayout>
    );
};

// Export Profile component across application
export default Profile;
