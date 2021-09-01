import React, {lazy} from 'react';
import ChatApp from "./Pages/ChatApp";
import {Redirect} from 'react-router-dom';
import LoginPage from "./Pages/LoginPage"
import SignUpPage from "./Pages/SignUpPage"

const routes = [
    {
        path: '/',
        component: () => <Redirect to="/auth/login"/>
    },
    {
        path: '/chat',
        exact: true,
        component: <ChatApp/>
    },
    {
        path: '/auth/login',
        exact: true,
        component: <LoginPage/>
    },
    {
        path: '/auth/register',
        exact: true,
        component: <SignUpPage/>
    },
    {
        path: '*',
        component: <Redirect to="/auth/login"/>
    }
];

export default routes;