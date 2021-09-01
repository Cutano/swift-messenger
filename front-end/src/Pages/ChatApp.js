import * as React from 'react';
import Box from '@material-ui/core/Box';

import Chat from '../Components/Chat';
import MainAppBar from "../Components/MainAppBar";
import {useEffect, useState} from "react";
import ChatAPI from "../Apis/ChatAPI";
import {Paper, ThemeProvider} from "@material-ui/core";
import {light, dark} from "../theme";

export default function ChatApp() {
    const [userID, setUserID] = useState();
    const [verified, setVerified] = useState(false);
    const [darkTheme, setDarkTheme] = React.useState(true);

    const handleLoginResult = (data) => {
        if (data.result === "success") {
            setVerified(true);
        }
    }

    const handleToggleTheme = () => {
        setDarkTheme((darkTheme) => (!darkTheme));

    }

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const uid = parseInt(urlParams.get('userid'));
        const pwd = urlParams.get('cipher');
        if (uid && typeof (uid) === "number" && pwd) {
            setUserID(uid);
            ChatAPI.userLogin({userID: uid, password: pwd}, handleLoginResult);
        } else window.location.href = "/";

        return function cleanup() {
            setUserID(undefined);
        };
    }, []);

    return (
        <ThemeProvider theme={darkTheme ? dark : light}>
            <Paper square sx={{height: "100%", display: "flex", flexDirection: "column", overflow: "hidden"}}>
                <MainAppBar darkTheme={darkTheme} onToggle={handleToggleTheme}/>
                {verified && <Chat userID={userID}/>}
            </Paper>
        </ThemeProvider>
    );
}
