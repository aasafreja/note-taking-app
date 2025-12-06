import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUser } from '../../api/auth'; // Adjust the import path as needed

const AuthRoute = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                await fetchUser();  // Your existing function to check the user
                setAuthenticated(true);  // If fetchUser succeeds, user is authenticated
            } catch (error) {
                setAuthenticated(false);  // If an error occurs, user is not authenticated
                setErrorMessage(error.message);
            }
        };

        checkAuthStatus();
    }, []);

    if (authenticated === false) {
        // If not authenticated, display a message and offer a redirect to login page
        return (
            <div>
                <h2>{errorMessage || "You are not logged in. Please log in to access this page."}

                </h2>
                <button onClick={() => navigate('/users/login')}>Go to Login</button>
            </div>
        );
    }

    return children;
};

export default AuthRoute;
