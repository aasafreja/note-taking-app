
import React, { useState } from 'react';
import { registerUser } from '../../api/auth';
import { PersonAdd as RegisterIcon } from '@mui/icons-material';
import {
    Button,
    TextField,
    Typography,
    Container,
    Box,
    Paper,
    Stack,
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const Register = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(name, email, password)
            enqueueSnackbar('Successfully registered! Please log in to continue.', { variant: 'success' });

            navigate('/users/login')
        }
        catch (error) {
            console.error("Error registering user:", error);
            enqueueSnackbar('Registration failed. Try again.', { variant: 'error' });
        }
    }

    return (
        <Container
            maxWidth="xs"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}
        >
            <Paper
                elevation={6}
                sx={{ p: 4, borderRadius: 3, width: '100%', textAlign: 'center' }}
            >
                <Typography variant="h4" gutterBottom>
                    Create Account
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                    Register to get started
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Stack spacing={2}>
                        <TextField
                            label="Name"
                            type="text"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <TextField
                            label="Email"
                            type="email"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
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
                            startIcon={<RegisterIcon />}
                        >
                            Register
                        </Button>
                    </Stack>
                </Box>

                <Typography variant="body2" sx={{ mt: 3 }}>
                    Already have an account?{' '}
                    <Link to="/users/login" style={{ textDecoration: 'none' }}>
                        Login
                    </Link>
                </Typography>
            </Paper>
        </Container>
    );
};

export default Register;
