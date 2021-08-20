import React from 'react';
import ChatApp from "./Pages/ChatApp";
import { Navigate } from 'react-router-dom';
import LoginPage from "./Pages/LoginPage"
import SignUpPage from "./Pages/SignUpPage"

const routes = [
    {
        path: 'chat',
        element: <ChatApp/>
    },
    {
        path: 'auth/login',
        element: <LoginPage/>
    },
    {
        path: 'auth/register',
        element: <SignUpPage/>
    },
    {
        path: '/',
        element: <Navigate to="auth/login"/>
    },
    {
        path: '*',
        element: <Navigate to="auth/login"/>
    }
];

export default routes;