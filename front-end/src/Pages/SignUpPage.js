import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import UserIDForm from '../Components/UserIDForm';
import PasswordForm from '../Components/PasswordForm';
import {Alert, Snackbar} from "@material-ui/core";
import sha1 from "js-sha1";
import ChatAPI from "../Apis/ChatAPI";
import {Link as RouteLink} from "react-router-dom";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/Cutano">
                姜鸿博
            </Link>{' 刘林晖 卫金建 高喜颖 '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const steps = ['Information', 'Password'];

function SignUpContent() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [userID, setUserID] = React.useState();
    const [username, setUserName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmedPassword, setConfirmedPassword] = React.useState("");
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMsg, setSnackbarMsg] = React.useState("");
    const [avatar, setAvatar] = React.useState("");

    const handleRegisterResult = (data) => {
        if (data.result === "success") {
            setUserID(data.data.userID);
            setActiveStep((activeStep) => (activeStep + 1));
        } else {
            setSnackbarMsg("Register Failed!");
            setSnackbarOpen(true);
        }
    }

    const handleNext = () => {
        if (activeStep === 0 && (username === "" || avatar === "")) {
            setSnackbarMsg("Please Fill Username & Avatar!");
            setSnackbarOpen(true);
        } else if (activeStep === 1 && (password === "" || password !== confirmedPassword)) {
            setSnackbarMsg("Please Recheck Your Password!");
            setSnackbarOpen(true);
        } else if (activeStep === 1 && password !== "" && password === confirmedPassword) {
            const data = {
                username: username,
                password: sha1(password),
                userAvatar: avatar
            };
            ChatAPI.userRegister(data, handleRegisterResult);
        } else setActiveStep((activeStep) => (activeStep + 1));
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
        setSnackbarMsg("");
    }

    const handleUpdateAvatar = (dataUrl) => {
        if (dataUrl && dataUrl.trim() !== "") setAvatar(dataUrl);
    }

    const handleUsernameChange = (e) => {
        setUserName(e.target.value.trim());
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value.trim());
    }

    const handleConfirmedPasswordChange = (e) => {
        setConfirmedPassword(e.target.value.trim());
    }

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <UserIDForm onChange={handleUsernameChange} onUpdateAvatar={handleUpdateAvatar}
                                   username={username}/>;
            case 1:
                return <PasswordForm onPasswordChange={handlePasswordChange}
                                     onConfirmedPasswordChange={handleConfirmedPasswordChange} password={password}
                                     confirmedPassword={confirmedPassword}/>;
            default:
                throw new Error('Unknown step');
        }
    }

    return (
        <React.Fragment>
            <AppBar
                position="absolute"
                color="default"
                elevation={0}
                sx={{
                    position: 'relative',
                    borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                }}
            >
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Swift Messenger
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container component="main" maxWidth="sm" sx={{mb: 4}}>
                <Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
                    <Typography component="h1" variant="h4" align="center">
                        Sign Up
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{pt: 3, pb: 5}}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography variant="h5" gutterBottom>
                                    Signed Up Successfully!
                                </Typography>
                                <Typography variant="subtitle1">
                                    {username}, You have successfully signed up to Swift Messenger with the UserID {
                                    <span style={{fontWeight: "bold"}}>{userID}</span>},
                                    please login in the main page.
                                </Typography>
                                <Button component={RouteLink} fullWidth variant="contained" to={`/chat?userid=${userID}&cipher=${sha1(password)}`} sx={{margin: 2}}>
                                    Start Chat!
                                </Button>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {getStepContent(activeStep)}
                                <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                    {activeStep !== 0 && (
                                        <Button onClick={handleBack} sx={{mt: 3, ml: 1}}>
                                            Back
                                        </Button>
                                    )}

                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{mt: 3, ml: 1}}
                                    >
                                        {activeStep === steps.length - 1 ? 'Sign Up' : 'Next'}
                                    </Button>
                                </Box>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                </Paper>
                <Copyright/>
                <Snackbar anchorOrigin={{vertical: "bottom", horizontal: "center"}} open={snackbarOpen}
                          autoHideDuration={6000} onClose={handleSnackbarClose}>
                    <Alert onClose={handleSnackbarClose} severity="warning" sx={{width: '100%'}}>
                        {snackbarMsg}
                    </Alert>
                </Snackbar>
            </Container>
        </React.Fragment>
    );
}

export default function signUpPage() {
    return <SignUpContent/>;
}
