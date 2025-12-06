// LoginPage.jsx
import React, { useState } from 'react';
import { loginUser } from '../../api/auth';
import { useNavigate, Link } from 'react-router-dom';
import {
    Button,
    TextField,
    Typography,
    Container,
    Box,
    Paper,
    Stack,
} from '@mui/material';
import { Login as LoginIcon } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

const Login = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser(email, password)
            if (data.error) {
                enqueueSnackbar('Incorrect email or password', { variant: 'error' });
                return;
            }
            enqueueSnackbar('Login successful!', { variant: 'success' });
            navigate('/notes');
        }
        catch (error) {
            console.error("Error logging user:", error);
        }
    }

    return (
        <Container maxWidth="xs"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}>
            <Paper elevation={6}
                sx={{ p: 4, borderRadius: 3, width: '100%', textAlign: 'center' }}
            >
                <Typography variant="h4" gutterBottom>
                    Welcome Back
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                    Login to your account
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Stack spacing={2}>
                        <TextField label="Email"
                            type="email"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required />
                        <TextField
                            label="Password"
                            type="password"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            startIcon={<LoginIcon />}
                        >
                            Login
                        </Button>
                    </Stack>
                </Box>
                <Typography variant="body2" sx={{ mt: 3 }} >
                    Don’t have an account?{' '}
                    <Link to="/users/register" style={{ textDecoration: 'none' }}>
                        Register
                    </Link>
                </Typography>
            </Paper>
        </Container >
    );
};



export default Login;

