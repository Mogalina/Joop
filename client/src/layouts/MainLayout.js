// Components
import Footer from '../components/Footer';
import Header from '../components/Header';

// Styles
import '../styles/components/main-layout.scss';

/**
 * MainLayout layout component.
 *
 * @param {Object} props - Props object.
 * @param {React.ReactNode} props.children - Child components to be rendered.
 * 
 * @returns {JSX.Element} A layout component containing Header, main content, Footer.
 */
const MainLayout = ({ children }) => {
    return (
        <div className='main-layout-container'>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    );
};

// Export main layout function
export default MainLayout;