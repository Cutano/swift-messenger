import 'react-perfect-scrollbar/dist/css/styles.css';
import { ThemeProvider } from '@material-ui/core';
import theme from './theme';
import routes from './routes';
import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import ChatApp from "./Pages/ChatApp";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage"

const App = () => {

    return (
        <React.StrictMode>
            <CssBaseline />
            <Router>
                <Switch>
                    <Route path="/chat">
                        <ChatApp />
                    </Route>
                    <Route path="/auth/login">
                        <LoginPage />
                    </Route>
                    <Route path="/auth/register">
                        <SignUpPage />
                    </Route>
                    <Route path="/">
                        <Redirect to="/auth/login"/>
                    </Route>
                </Switch>
            </Router>
        </React.StrictMode>
    );
};

export default App;
