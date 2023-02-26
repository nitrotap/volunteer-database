import React, { useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import Copyright from '../components/Copyright'

import Link from 'next/link'
import { useRouter } from "next/router";
import Nav from '../components/Nav';
import styles from '../styles/Home.module.css'
import { useMediaQuery } from '@mui/material';


function Login(props) {
    const router = useRouter();

    const [formState, setFormState] = useState({ email: '', password: '' });
    const [emailState, setEmailState] = useState(false);
    const [passwordState, setPasswordState] = useState(false);
    const [pwHelper, setPwHelper] = useState('');
    const [emailHelper, setEmailHelper] = useState('');
    const [checked, setChecked] = useState(false);


    const handleFormSubmit = async (event) => {
        event.preventDefault();
        formState.email = formState.email.toLowerCase();

        try {
            // send a post message to the server sending the email and password, checking the password, and returning a token
            const response = await fetch('/api/sessions', {
                method: 'POST',
                body: JSON.stringify({ formState }),
                headers: { 'Content-Type': 'application/json' },
            });

            response.json().then((data) => {
                if (!data.ok) {
                    setEmailState(false)
                    setEmailHelper('Email or password is incorrect. Please try again.')
                } else {
                    setEmailState(true)
                    setEmailHelper('Login successful. Redirecting...')
                    router.push('/all')
                }
            })

        } catch (error) {
            setEmailState(false)
            setEmailHelper('Email already exists. Please try logging in.')
        }
    };

    const handleChangePw = (event) => {
        const { name, value } = event.target;
        if (value.length > 8) {
            setPasswordState(true)
        } else {
            setPasswordState(false)
            setPwHelper('Password must be at least 8 characters.')
        }

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleChangeEmail = (event) => {
        const { name, value } = event.target;
        const validEmail = new RegExp(/^([a-zA-Z0-9_.-]+)@([\da-zA-Z.-]+)\.([a-zA-Z.]{2,6})$/)
        if (validEmail.test(value)) {
            setEmailState(true)
        } else {
            setEmailState(false)
            setEmailHelper('Please enter a valid email')
        }
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const mediaQuery = useMediaQuery('(max-width:600px)');

    return (

        <div className={styles.login}>
            <Nav />

            <Container component="main" maxWidth="xs" sx={{
                backgroundColor: 'white', marginTop: '100px', marginBottom: '250px', border: '.5px solid black', borderRadius: '10px'
            }}>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Log In
                    </Typography>

                    <Box component="form" noValidate onSubmit={handleFormSubmit} sx={{ mt: 1 }}>
                        <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            onChange={handleChangeEmail}
                            error={!emailState}
                            helperText={emailHelper}
                            margin="normal"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            onChange={handleChangePw}
                            error={!passwordState}
                            helperText={pwHelper}
                        />

                        <FormControlLabel
                            control={<Checkbox value="legal" color="primary" />}
                            label="I confirm that I have read the legal documents and agree to the terms."
                            checked={checked}
                            onChange={() => setChecked(!checked)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={!(emailState && passwordState && checked)}
                        >
                            Log In
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item style={{ color: 'blue' }}>
                                <Link href="/signup" variant="body2">
                                    Need to make an account? Sign up here.
                                </Link>
                            </Grid>
                        </Grid>

                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </div >
    )
}
export default Login;
