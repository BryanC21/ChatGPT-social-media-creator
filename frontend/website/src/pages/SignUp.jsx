import * as React from 'react';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";
import Header from '../components/Header';
import { config } from '../config';
import useAuth from "../hooks/useAuth";
import Footer from '../components/Footer';



export default function SignUp() {
    const navigate = useNavigate();
    const { authed } = useAuth();
    const { state } = useLocation();
    const [error, setError] = React.useState();
    const [loading, setLoading] = React.useState(false);

    let goToLogin;

    // is user logged in redirect to search page
    React.useEffect(() => {
        if (authed) {
            navigate(state?.path || "/home");
        }

        return () => clearTimeout(goToLogin);
    }, []);

    React.useEffect(() => {
        if (showMsg) {
            goToLogin = setTimeout(() => {
                navigate('/login');
            }, 2000);

        }
        return () => clearTimeout(goToLogin);
    }, [showMsg]);


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleDateChange = (newValue) => {
        setInputs(values => ({ ...values, dateOfBirth: newValue }))
    };

    const handleSubmit = () => {
        setLoading(true);
        const { firstName, lastName, email, password } = inputs;
        axios.post(`${config.BASE_URL}/signup`, {
            firstName,
            lastName,
            email,
            password
        })
            .then(function (response) {
                setShowMsg(true);
                setLoading(false);
                setError();
            })
            .catch(function (error) {
                console.log(error);
                setShowMsg(false);
                setLoading(false);
                setError(error.response.data.message);
            });
    };

    return (
        <>
            <Header />
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        marginBottom: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <AccountCircleRoundedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <Box component="form" style={{ width: '100%' }} >
                        <Stack spacing={2}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="first_name"
                                label="First Name"
                                name="first_name"
                                autoComplete="name"
                                autoFocus
                                onChange={handleChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="last_name"
                                label="Last Name"
                                name="last_name"
                                autoComplete="name"
                                autoFocus
                                onChange={handleChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={handleChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={handleChange}
                            />
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                Register
                            </Button>
                            <p style={{ color: "red" }}>{error}</p>
                        </Stack>
                    </Box>
                </Box>
            </Container>
            <Footer />
        </>
    );
}