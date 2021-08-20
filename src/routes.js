import React from 'react';
import ChatApp from "./Page/ChatApp";
import { Navigate } from 'react-router-dom';
import LoginPage from "./Page/LoginPage"
import SignUpPage from "./Page/SignUpPage"

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