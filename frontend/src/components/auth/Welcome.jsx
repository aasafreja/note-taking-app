import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Box, Container, Stack } from '@mui/material';
import { Login as LoginIcon, PersonAdd as RegisterIcon, MenuBook as NoteIcon, } from '@mui/icons-material';

const Welcome = () => {
    return (
        <Container maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            {/* App Title */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
                    <NoteIcon color="primary" sx={{ fontSize: 40 }} />   {/* иконка слева */}
                    <Typography variant="h3" component="h1">
                        SnapNotes
                    </Typography>
                </Stack>
                <Typography variant="h6" color="textSecondary">
                    Your Personal Note Taking App
                </Typography>
            </Box>

            {/* Buttons Box */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
                {/* Login Button */}
                <Link to="/users/login" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" fullWidth startIcon={<LoginIcon />}>
                        Login
                    </Button>
                </Link>

                {/* Register Button */}
                <Link to="/users/register" style={{ textDecoration: 'none' }}>
                    <Button variant="outlined" fullWidth startIcon={<RegisterIcon />}>
                        Register
                    </Button>
                </Link>
            </Box>
        </Container>
    );
};

export default Welcome;
