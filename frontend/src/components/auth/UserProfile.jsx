// UserProfile.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser, fetchUser } from '../../api/auth';

import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Avatar,
    Button,
    Box,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

const UserProfile = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const getUserData = async () => {
            try {
                const userData = await fetchUser();
                setUsername(userData.name); // например { name: "John Doe" }
            } catch (err) {
                console.error('Failed to fetch user:', err);
            }
        };
        getUserData();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await logoutUser();
            navigate('/users/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <AppBar position="static" sx={{ mb: 2, backgroundColor: 'grey.500', color: 'black' }} >
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Hello, {username}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar>{username ? username.charAt(0).toUpperCase() : '?'}</Avatar>

                    <Button
                        color="inherit"
                        startIcon={<LogoutIcon />}
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default UserProfile;
